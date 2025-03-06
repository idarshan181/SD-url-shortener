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
  longURL: z.string().url({ message: 'Invalid URL format, Please enter a valid URL' }).trim(),
  shortURL: z.string()
    .optional()
    .refine(val => !val || /^[\w-]{3,20}$/.test(val), {
      message: 'Slug must be alphanumeric (a-z, 0-9, -, _), 3-20 chars',
    }),
});

export const urlRouteSchema = z.object({
  longURL: z.string().url({ message: 'Invalid URL format' }),
  shortURL: z
    .string()
    .optional()
    .refine(val => !val || /^[\w-]{3,20}$/.test(val), {
      message: 'Short URL must be alphanumeric (a-z, 0-9, -, _), 3-20 characters',
    }),
  userId: z.string().optional(),
});

export const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export const notificationsFormSchema = z.object({
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  securityAlerts: z.boolean(),
});
