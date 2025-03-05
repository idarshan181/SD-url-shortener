'use client';

/* eslint-disable no-console */

import { useDebounce } from '@/hooks/useDebounce';
import { URLFormSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
// src/components/dashboard/URLForm.tsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export default function URLForm() {
  const [pending, setPending] = useState(false);
  const [slugStatus, setSlugStatus] = useState<
    'valid' | 'taken' | 'checking' | null
  >(null);

  const form = useForm<z.infer<typeof URLFormSchema>>({
    resolver: zodResolver(URLFormSchema),
    defaultValues: {
      longURL: '',
      shortURL: '',
    },
  });

  const debouncedSlug = useDebounce(form.watch('shortURL'), 500);

  // Check availability when debouncedSlug changes
  useEffect(() => {
    if (!debouncedSlug) {
      setSlugStatus(null);
      return;
    }

    const checkSlugAvailability = async () => {
      setSlugStatus('checking');

      try {
        const response = await fetch(
          `/api/v1/shorturl?customslug=${debouncedSlug}`,
        );
        const data = await response.json();

        if (response.ok && data.available) {
          setSlugStatus('valid');
        } else {
          setSlugStatus('taken');
        }
      } catch (error) {
        console.error('Error checking slug:', error);
        setSlugStatus('taken'); // Assume taken if API fails
      }
    };

    checkSlugAvailability();
  }, [debouncedSlug]);

  async function onSubmit(data: z.infer<typeof URLFormSchema>) {
    setPending(true);
    console.log(data);

    if (slugStatus === 'taken') {
      console.error('Slug already taken.');
      setPending(false);
      return;
    }

    setTimeout(() => {
      setPending(false);
    }, 500);
  }

  return (
    <Form {...form}>
      <form
        className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-16"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="longURL"
          render={({ field }) => (
            <FormItem className="w-full md:w-2/3">
              <FormControl>
                <Input
                  placeholder="Paste your long URL here..."
                  className="h-12 text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortURL"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/3">
              <FormControl>
                <Input
                  className="h-12 text-sm"
                  placeholder="Custom Slug (optional)"
                  {...field}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/[^\w-]/g, ''); // Allow only alphanumeric, dash, underscore
                    field.onChange(sanitizedValue);
                  }}
                  value={field.value} // Ensure value is properly updated
                />
              </FormControl>
              <FormMessage />
              {slugStatus && (
                <div className="flex items-center mt-1">
                  {slugStatus === 'checking' && <span className="text-yellow-500">Checking...</span>}
                  {slugStatus === 'valid' && (
                    <span className="flex gap-x-2 flex-row items-center justify-center">
                      <CheckCircle className="text-green-500" size={20} />
                      Available
                    </span>
                  )}
                  {slugStatus === 'taken' && (
                    <span className="flex gap-x-2 flex-row items-center justify-center">
                      <XCircle className="text-red-500" size={20} />
                      Try a different slug
                    </span>
                  )}
                </div>
              )}
            </FormItem>
          )}
        />
        <Button className="h-12 px-6" disabled={pending || slugStatus !== 'valid'} type="submit">
          Shorten URL
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
