import { prisma } from '@/lib/db'; // Adjust the import path as necessary
import { getIp } from '@/lib/getIp';
import { rateLimitMiddleware } from '@/middleware';
// Import your rate limiting middleware
import { NextRequest, NextResponse } from 'next/server';
import { uid } from 'uid';

export async function POST(req: NextRequest) {
  // Apply rate limiting middleware
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  } // Return if rate limit exceeded

  try {
    const data = await req.json();
    const { longURL, userId } = data;

    if (!longURL) {
      return NextResponse.json(
        { message: 'No Long URL Provided' },
        { status: 400 },
      );
    }

    // Generate a unique short URL
    let shorturl = uid(8);
    let isExist = true;

    while (isExist) {
      const existingURL = await prisma.uRL.findUnique({
        where: { shortURL: shorturl },
      });
      if (!existingURL) {
        isExist = false;
      } else {
        shorturl = uid(8);
      }
    }

    // Create the new URL entry in the database
    const newURL = await prisma.uRL.create({
      data: {
        shortURL: shorturl,
        longURL,
        userId, // Optional: associate with a user if provided
      },
    });

    // Log analytics (if needed)
    await prisma.analytics.create({
      data: {
        urlId: newURL.id,
        userAgent: req.headers.get('user-agent') || null,
        ipAddress: req.headers.get('x-forwarded-for') || getIp(req),
      },
    });

    return NextResponse.json({
      shortURL: `${shorturl}`,
      longURL: `${longURL}`,
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Unable to create your quick URL, try again', error },
      { status: 500 },
    );
  }
}
