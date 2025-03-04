'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Copy, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const urlSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL' }),
  customSlug: z.string().optional(),
});

type FormValues = z.infer<typeof urlSchema>;

export function URLShortenerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate a random short URL for demo purposes
      const randomSlug = data.customSlug || Math.random().toString(36).substring(2, 8);
      setShortUrl(`linksnip.com/${randomSlug}`);

      toast.success(`Your shortened URL is: linksnip.com/${randomSlug}`);
    } catch (error) {
      toast.error('Failed to shorten URL. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(`https://${shortUrl}`);
      toast.success(
        <div>
          <p>Copied to clipboard</p>
          <span>{`https://linksnip.com/${shortUrl}`}</span>
        </div>,
      );
    }
  };

  const handleReset = () => {
    reset();
    setShortUrl(null);
  };

  return (
    <Card className="mt-0 mb-auto">
      <CardHeader>
        <CardTitle>Shorten URL</CardTitle>
        <CardDescription>
          Enter a long URL to create a shortened, shareable link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              {...register('url')}
            />
            {errors.url && (
              <p className="text-sm text-destructive">{errors.url.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="customSlug">
              Custom slug (optional)
            </Label>
            <Input
              id="customSlug"
              placeholder="my-custom-url"
              {...register('customSlug')}
            />
          </div>
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
