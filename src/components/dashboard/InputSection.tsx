'use client';

import { ArrowRight } from 'lucide-react'; // Adjust import based on your icon library
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const InputSection = () => {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Make a POST request to /api/url/short
    // const response = await fetch('/api/url/short', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ url }),
    // });
    // Handle response
  };

  return (
    <section className="container mx-auto py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Shorten URLs,
        {' '}
        <span className="text-primary">Expand Reach</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Transform long, unwieldy links into clean, memorable URLs that drive more clicks and improve user experience.
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-16">
        <Input
          placeholder="Paste your long URL here..."
          className="h-12 text-base"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Button className="h-12 px-6" type="submit">
          Shorten URL
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </section>
  );
};

export default InputSection;
