import type { Metadata } from 'next';
import Providers from '@/components/general/Providers';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LinkSnip: Your Smart URL Shortener',
  description:
    'LinkSnip is a powerful URL shortener that transforms long, unwieldy links into short, shareable URLs. Track clicks, analyze performance, and enhance your online presence effortlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster richColors closeButton />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
