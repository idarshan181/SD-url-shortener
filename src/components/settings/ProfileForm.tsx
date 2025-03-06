/* eslint-disable unused-imports/no-unused-vars */
'use client';

import { profileFormSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
    },
  });

  // Update form values when session is loaded
  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    }
  }, [form, session]); // Run effect when session updates

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      className="h-12 text-lg"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="yourname@domain.com"
                      className="h-12 text-lg"
                      type="email"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Last Login</FormLabel>
              <Input
                readOnly
                type="text"
                value={
                  session?.user?.lastLogin
                    ? (() => {
                        const lastLoginDate = new Date(session.user.lastLogin);
                        return `${lastLoginDate.getFullYear()}-${String(lastLoginDate.getMonth() + 1).padStart(2, '0')}-${String(lastLoginDate.getDate()).padStart(2, '0')} - ${String(lastLoginDate.getHours()).padStart(2, '0')}:${String(lastLoginDate.getMinutes()).padStart(2, '0')}:${String(lastLoginDate.getSeconds()).padStart(2, '0')}.${String(lastLoginDate.getMilliseconds()).padStart(3, '0')}`;
                      })()
                    : 'Never'
                }
              />
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={isLoading} className="text-white mt-4">
          {isLoading
            ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              )
            : (
                'Save changes'
              )}
        </Button>
      </CardFooter>
    </Card>
  );
}
