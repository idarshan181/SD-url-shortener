import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // 🔹 Get authenticated user session
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 🔹 Parse query params (`size` defaults to 10)
    const { searchParams } = new URL(req.url);
    const limit = Number.parseInt(searchParams.get('limit') || '10', 10);

    if (Number.isNaN(limit) || limit < 0) {
      return NextResponse.json({ error: 'Invalid size parameter' }, { status: 400 });
    }

    // 🔹 Fetch URLs for the logged-in user
    const urls = await prisma.uRL.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: limit === 0 ? undefined : limit, // Return all if size = 0
    });

    return NextResponse.json(urls, { status: 200 });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
