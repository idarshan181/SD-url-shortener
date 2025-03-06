'use client';

import { URL } from '@/lib/zodSchema';
import { useEffect, useState } from 'react';

export function useRecentLinks(limit = 5) {
  const [recentLinks, setRecentLinks] = useState<URL[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentLinks = async () => {
      try {
        const response = await fetch(`/api/v1/urls?limit=${limit}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch links');
        }

        setRecentLinks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecentLinks();
  }, [limit]);

  return { recentLinks, loading, error };
}
