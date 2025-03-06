import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { prisma } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Github,
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email && !token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, lastLogin: true },
        });

        if (dbUser?.id) {
          token.id = dbUser.id; // Store user ID in JWT token
          token.lastLogin = dbUser.lastLogin;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = String(token.id);
        session.user.lastLogin = token.lastLogin as Date || null; // Attach lastLogin to session
        // Update lastLogin only when session is renewed
        await prisma.user.update({
          where: { id: String(token.id) },
          data: { lastLogin: new Date() },
        });
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
});
