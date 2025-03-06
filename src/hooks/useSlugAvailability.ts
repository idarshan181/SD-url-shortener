'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export function useSlugAvailability(slug: string) {
  const [status, setStatus] = useState<'valid' | 'taken' | 'checking' | null>(null);
  const debouncedSlug = useDebounce(slug, 500); // Debounce to avoid unnecessary API calls

  useEffect(() => {
    if (!debouncedSlug) {
      setStatus(null);
      return;
    }

    const checkSlugAvailability = async () => {
      setStatus('checking');

      try {
        const response = await fetch(`/api/v1/urls/available?customslug=${debouncedSlug}`);
        const data = await response.json();
        setStatus(data.available ? 'valid' : 'taken');
      } catch (error) {
        console.error('Error checking slug:', error);
        setStatus('taken'); // Assume taken if API fails
      }
    };

    const timer = setTimeout(checkSlugAvailability, 500); // API debounce
    return () => clearTimeout(timer);
  }, [debouncedSlug]);

  return status;
}
