import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 🔹 Get the authenticated user session
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 🔹 Fetch URLs for the logged-in user
    const urls = await prisma.uRL.findMany({
      where: { userId: session.user.id }, // 🔹 Use `session.user.id`
      orderBy: { createdAt: 'desc' }, // Optional: Sort by latest created
    });

    return NextResponse.json(urls, { status: 200 });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
