import { LinkIcon } from 'lucide-react'; // Adjust import based on your icon library
// src/components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'API', 'Integrations', 'Documentation'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Press', 'Contact'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Help Center', 'Community', 'Webinars', 'Status', 'Changelog'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Security', 'Cookies', 'Compliance'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <LinkIcon className="h-5 w-5 text-primary" />
            <span className="font-bold">LinkSnip</span>
          </div>
          <p className="text-sm text-muted-foreground">
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            LinkSnip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
