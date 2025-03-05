import { z } from 'zod';

export const URLSchema = z.object({
  id: z.string(),
  longURL: z.string().url(),
  shortURL: z.string(),
  clicks: z.number().nonnegative(),
  userId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  expiresAt: z.date().optional(),
  createdFrom: z.string().optional(),
});

export type URL = z.infer<typeof URLSchema>;

export const URLFormSchema = z.object({
  longURL: z.string().url(),
  shortURL: z.string(),
});
