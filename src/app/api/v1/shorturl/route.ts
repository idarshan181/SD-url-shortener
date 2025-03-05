import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const slugSchema = z.string().regex(/^[\w-]+$/).min(3).max(20);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const customSlug = searchParams.get('customslug');

  if (!customSlug) {
    return NextResponse.json({ error: 'Custom slug is required' }, { status: 400 });
  }

  const parsedSlug = slugSchema.safeParse(customSlug);

  if (!parsedSlug.success) {
    return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 });
  }

  try {
    const urlEntry = await prisma.uRL.findUnique({
      where: { shortURL: customSlug },
    });

    return NextResponse.json({ available: !urlEntry });
  } catch (error) {
    console.error('Error checking short URL:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
