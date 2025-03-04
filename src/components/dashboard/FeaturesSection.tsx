import { BarChart, Shield, Zap } from 'lucide-react'; // Adjust import based on your icon library

const FeaturesSection = () => {
  return (
    <section id="features" className="container mx-auto py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powerful features for powerful results</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Zap className="h-6 w-6 text-primary" />,
            title: 'Lightning Fast',
            description: 'Create short links in seconds with our intuitive interface and rapid processing.',
          },
          {
            icon: <Shield className="h-6 w-6 text-primary" />,
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security ensures your links are protected and always available.',
          },
          {
            icon: <BarChart className="h-6 w-6 text-primary" />,
            title: 'Detailed Analytics',
            description: 'Track clicks, geographic data, and referrers to optimize your marketing efforts.',
          },
        ].map((feature, i) => (
          <div key={i} className="bg-card p-8 rounded-xl border border-border/50">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
