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
    async signIn({ user }) {
      // Check if the user exists in the database
      if (!user.id) {
        return false;
      }
      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      // If the user exists, update lastLogin
      if (existingUser) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLogin: new Date(),
          },
        });
      }

      // Return true regardless of whether the user was found or not
      return true;
    },

    async session({ session, token }) {
      if (token) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
});
