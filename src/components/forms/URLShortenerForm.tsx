/* eslint-disable no-console */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { URLFormSchema } from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle, Copy, Loader2, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

type FormValues = z.infer<typeof URLFormSchema>;

export function URLShortenerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [slugStatus, setSlugStatus] = useState<
    'valid' | 'taken' | 'checking' | null
  >(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const { data: session } = useSession();

  const form = useForm<FormValues>({
    resolver: zodResolver(URLFormSchema),
    defaultValues: {
      longURL: '',
      shortURL: '',
    },
  });

  const debouncedSlug = useDebounce(form.watch('shortURL'), 500);

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

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(`https://linksnip.com/${shortUrl}`);
      toast.success(
        <div>
          <p>Copied to clipboard</p>
          <span>{`https://linksnip.com/${shortUrl}`}</span>
        </div>,
      );
    }
  };

  const handleReset = () => {
    form.reset();
    setShortUrl('');
  };

  async function onSubmit(data: any) {
    setIsLoading(true);
    if (slugStatus === 'taken') {
      toast.error('Slug already taken. Please choose a different one.');
      setIsLoading(false);
      return;
    }

    console.log(session?.user?.id);
    try {
      const response = await fetch('/api/v1/url/short', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId: session?.user?.id }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      const shortUrl = `https://linksnip.com/${result.shortURL}`;

      // Show toast with copy button
      toast.success(
        <div className="flex flex-col space-y-2">
          <p className="text-sm">URL successfully shortened!</p>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500 underline cursor-pointer">{shortUrl}</span>
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                toast.success('Copied to clipboard!');
              }}
            >
              Copy
            </Button>
          </div>
        </div>,
      );
      handleReset();
    } catch (error) {
      const errorMessage = (error as Error).message || 'Failed to shorten URL. Please try again.';
      toast.error(errorMessage); // Updated to use errorMessage
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="mt-0 mb-auto">
      <CardHeader>
        <CardTitle>Shorten URL</CardTitle>
        <CardDescription>
          Enter a long URL to create a shortened, shareable link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="longURL"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/very/long/url/that/needs/shortening"
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
                <FormItem className="">
                  <FormLabel>Custom Slug</FormLabel>
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
                        <span className="flex gap-x-2 text-green-500 flex-row items-center justify-center">
                          <CheckCircle className="" size={20} />
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Shortening...
                    </>
                  )
                : (
                    <>Shorten URL</>
                  )}
            </Button>
          </form>
        </Form>
      </CardContent>
      {shortUrl && (
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex w-full items-center space-x-2">
            <div className="flex-1 rounded-md border bg-muted p-2">
              <p className="text-sm font-medium">
                https://
                {shortUrl}
              </p>
            </div>
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="outline">
              View Analytics
              {' '}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
