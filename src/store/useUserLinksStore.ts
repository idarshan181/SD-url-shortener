import { URL, URLSchema } from '@/lib/zodSchema';
import { toast } from 'sonner';

import { create } from 'zustand';

interface UserLinksState {
  links: URL[];
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  addLink: (url: URL) => void;
  clearLinks: () => void;
  syncLinks: () => Promise<void>;
  fetchLinks: () => Promise<void>; // Fetches latest links after login
}

const useUserLinksStore = create<UserLinksState>((set, get) => ({
  links: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userLinks') || '[]') : [], // ✅ Prevent SSR error
  isLoggedIn: false,

  setLoggedIn: (loggedIn) => {
    set({ isLoggedIn: loggedIn });

    if (loggedIn) {
      get().syncLinks();
    }
  },

  addLink: (url) => {
    const parsed = URLSchema.safeParse(url);
    if (!parsed.success) {
      console.error('Invalid URL data:', parsed.error);
      return;
    }

    set((state) => {
      if (!state.isLoggedIn && state.links.length >= 10) {
        toast.error('You have reached the limit of 10 URLs. Please log in to create more.');
        return state;
      }

      const newLinks = [...state.links, parsed.data];
      if (typeof window !== 'undefined') {
        localStorage.setItem('userLinks', JSON.stringify(newLinks)); // Only access localStorage in the browser
      }
      return { links: newLinks };
    });
  },

  clearLinks: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userLinks'); // Only access localStorage in the browser
    }
    set({ links: [] });
  },

  syncLinks: async () => {
    if (typeof window === 'undefined') {
      return;
    } // Prevent execution on the server
    const storedLinks: URL[] = JSON.parse(localStorage.getItem('userLinks') || '[]');
    if (!get().isLoggedIn || storedLinks.length === 0) {
      return;
    }

    const syncedLinks: URL[] = [];

    for (const link of storedLinks) {
      const parsed = URLSchema.safeParse(link);
      if (!parsed.success) {
        console.error('Skipping invalid link:', parsed.error);
        continue;
      }

      try {
        const response = await fetch('/api/url/short', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            longURL: link.longURL,
            customSlug: link.shortURL,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to sync link');
        }

        const newLink = await response.json();
        syncedLinks.push(newLink);
      } catch (error) {
        console.error('Error syncing link:', error);
      }
    }

    if (syncedLinks.length > 0) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userLinks'); // ✅ Remove localStorage after syncing
      }
      set({ links: syncedLinks }); // ✅ Store in Zustand to prevent stale data
    }
  },

  fetchLinks: async () => {
    if (!get().isLoggedIn) {
      return;
    }

    try {
      const response = await fetch('/api/v1/url/all', { method: 'GET' });

      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }

      const links: URL[] = await response.json();
      set({ links });
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  },
}));

export default useUserLinksStore;
