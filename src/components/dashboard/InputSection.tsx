/* eslint-disable no-console */
'use client';

import useUserLinksStore from '@/store/useUserLinksStore';
// Adjust import based on your icon library
import { useEffect } from 'react';
import URLForm from '../forms/URLForm';

const InputSection = () => {
  const links = useUserLinksStore(state => state.links);

  useEffect(() => {
    console.log('links', links);

    return () => {

    };
  }, [links]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!isLoggedIn && links.length >= 10) {
  //     toast.error('You have reached the limit of 10 URLs. Please log in to create more.');
  //   }

  //   try {
  //     const response = await fetch('/api/url/short', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ longURL: url }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to shorten the URL');
  //     }

  //     const newLink = await response.json();
  //     addLink(newLink); // Update Zustand store

  //     toast.success('URL shortened successfully!');
  //     setUrl(''); // Clear input field after success
  //   } catch (error) {
  //     console.error('Error:', error);
  //     toast.error('Something went wrong. Please try again.');
  //   }
  // };

  return (
    <section className="container mx-auto py-20 text-center">

      <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-6xl text-3xl lg:text-9xl font-bold text-center text-primary dark:text-white relative z-20">
          LinkSnip
        </h1>
        <div className="w-[40rem] h-10 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Elevate Your Links: Turn Complex URLs into Click-Worthy Connections!
      </p>

      <URLForm />
    </section>
  );
};

export default InputSection;
