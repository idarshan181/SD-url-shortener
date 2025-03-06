'use client';
import { useRecentLinks } from '@/hooks/useRecentLinks';
import { LinkTable } from './LinkTable';

export default function Links({ limit }: { limit?: number }) {
  const { recentLinks, loading, error } = useRecentLinks(limit ?? undefined); // Fetch latest 5 links

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }

  return (
    <LinkTable data={recentLinks} />
  );
}
