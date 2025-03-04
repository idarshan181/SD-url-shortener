// src/components/CTASection.tsx

import { Button } from '../ui/button';

const CTASection = () => {
  return (
    <section className="container mx-auto py-20">
      <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start shortening?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of marketers, content creators, and businesses who trust LinkSnip for their URL shortening needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8">
            Sign up for free
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            See a demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
