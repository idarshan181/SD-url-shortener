import type { NextRequest } from 'next/server';

export const getIp = (req: NextRequest): string => {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return xForwardedFor.split(',')[0].trim();
  }
  // Fallback to the remote address
  return req.headers.get('ip') || req.headers.get('x-real-ip') || '127.0.0.1';
};
