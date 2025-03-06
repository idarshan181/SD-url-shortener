// src/components/AnalyticsSection.tsx
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const AnalyticsSection = () => {
  return (
    <section id="analytics" className="container mx-auto py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Make data-driven decisions</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our comprehensive analytics dashboard gives you real-time insights into how your links are performing.
          </p>
          <ul className="space-y-4">
            {[
              'Track clicks and conversion rates',
              'Analyze geographic distribution',
              'Monitor device and browser statistics',
              'Identify peak traffic times',
              'Export reports for team sharing',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl border border-border/50">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Analytics dashboard"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
