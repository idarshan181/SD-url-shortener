import { prisma } from '@/lib/db';
import { getIp } from '@/lib/getIp';
import { urlRouteSchema } from '@/lib/zodSchema';
import { NextRequest, NextResponse } from 'next/server';
import { uid } from 'uid';

// Schema for input validation using Zod

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate input with Zod
    const parsedData = urlRouteSchema.safeParse(data);
    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: parsedData.error.format() },
        { status: 400 },
      );
    }

    const { longURL, shortURL, userId } = parsedData.data;

    // Determine final short URL
    let finalShortURL: string = shortURL ?? uid(8);

    if (shortURL) {
      // Check if the custom shortURL is already in use
      const existingShort = await prisma.uRL.findUnique({
        where: { shortURL },
      });

      if (existingShort) {
        return NextResponse.json(
          { message: 'Custom short URL is already taken' },
          { status: 400 },
        );
      }
    } else {
      // Ensure generated shortURL is unique
      while (await prisma.uRL.findUnique({ where: { shortURL: finalShortURL } })) {
        finalShortURL = uid(8);
      }
    }

    // Create the new URL entry in the database
    const newURL = await prisma.uRL.create({
      data: {
        shortURL: finalShortURL,
        longURL,
        userId: userId || null, // Ensure proper DB handling for null values
      },
    });

    // Log analytics (user agent & IP tracking)
    await prisma.analytics.create({
      data: {
        urlId: newURL.id,
        userAgent: req.headers.get('user-agent') || null,
        ipAddress: req.headers.get('x-forwarded-for') || getIp(req),
      },
    });

    return NextResponse.json(
      {
        shortURL: finalShortURL,
        longURL,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating short URL:', error);
    return NextResponse.json(
      { message: 'Unable to create your quick URL, try again' },
      { status: 500 },
    );
  }
}
