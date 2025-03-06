import { prisma } from '@/lib/db';
import { getIp } from '@/lib/getIp';
// Adjust the import path as necessary
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const runtime = 'edge';

export async function GET(req: NextRequest, { params }: { params: Promise<{ shortURL: string }> }) {
  const { shortURL } = await params;
  const ip = getIp(req); // Get the user's IP address

  try {
    if (!shortURL || shortURL.length < 8) {
      return NextResponse.json(
        { message: 'Invalid shortURL' },
        { status: 400 },
      );
    }

    // Fetch the URL from the database
    const url = await prisma.uRL.findUnique({
      where: { shortURL },
    });

    if (!url) {
      return NextResponse.json(
        { message: 'LONG URL DOES NOT EXIST FOR GIVEN SHORT URL' },
        { status: 404 },
      );
    }

    // Increment the click count
    await prisma.uRL.update({
      where: { shortURL },
      data: { clicks: { increment: 1 } },
    });

    // Log analytics (if needed)
    await prisma.analytics.create({
      data: {
        urlId: url.id,
        userAgent: req.headers.get('user-agent') || null,
        ipAddress: ip,
      },
    });

    // Redirect to the long URL
    return NextResponse.redirect(url.longURL);
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Unable to get your long URL', error: error.message },
      { status: 500 },
    );
  }
}
