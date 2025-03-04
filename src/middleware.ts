import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { getIp } from './lib/getIp';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Initialize rate limiter (5 requests per 10 seconds)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
});

// Utility function to apply rate limiting
export async function rateLimitMiddleware(req: NextRequest) {
  const ip = getIp(req); // Get the user's IP address

  // Apply rate limiting
  const { limit, reset, remaining } = await ratelimit.limit(ip);
  if (remaining === 0) {
    return NextResponse.json(
      { message: 'Rate limit exceeded. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Limit': limit.toString(), 'X-RateLimit-Reset': reset.toString() } },
    );
  }

  return NextResponse.next(); // Proceed to the next middleware or route handler
}

// Main Middleware
export default async function middleware(req: NextRequest) {
  return rateLimitMiddleware(req);
}

// Matcher: Only apply to specific API routes
export const config = {
  matcher: [
    '/api/hello', // Explicit single API route
    '/api/v1/:path*', // All API routes under /api/v1/
  ],
};
