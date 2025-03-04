import { ArrowRight } from 'lucide-react'; // Adjust import based on your icon library
import { Button } from '../ui/button';
// src/components/PricingSection.tsx

const PricingSection = () => {
  return (
    <section id="pricing" className="container mx-auto py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Simple, transparent pricing</h2>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
        Choose the plan that fits your needs. All plans include our core features with different usage limits.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: 'Free',
            price: '$0',
            description: 'Perfect for personal use',
            features: [
              'Up to 50 links',
              'Basic analytics',
              'Standard support',
              '24-hour history',
            ],
          },
          {
            name: 'Pro',
            price: '$12',
            period: '/month',
            description: 'Ideal for creators & small businesses',
            features: [
              'Unlimited links',
              'Advanced analytics',
              'Custom domains',
              'Priority support',
              'QR code generation',
            ],
            highlighted: true,
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            description: 'For large organizations',
            features: [
              'Unlimited everything',
              'Team collaboration',
              'API access',
              'Dedicated account manager',
              'SLA guarantees',
              'Custom integration',
            ],
          },
        ].map((plan, i) => (
          <div
            key={i}
            className={`bg-card p-8 rounded-xl border ${plan.highlighted ? 'border-primary shadow-lg' : 'border-border/50'} relative`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
            </div>
            <p className="text-muted-foreground mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
              Get started
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
