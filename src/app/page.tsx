import Footer from '@/components/general/Footer';
import { ThemeToggle } from '@/components/general/ThemeToggle';
import UserDropdown from '@/components/general/UserDropdown';
import CTASection from '@/components/landing/CTASection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import InputSection from '@/components/landing/InputSection';
import PricingSection from '@/components/landing/PricingSection';
import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Page() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <nav className="m-0 flex w-full items-center justify-between border-b border-gray-200 px-2 py-5">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <LinkIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LinkSnip</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition">Features</Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</Link>
          <Link href="#analytics" className="text-muted-foreground hover:text-foreground transition">Analytics</Link>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 md:flex">
          <ThemeToggle />
          {session?.user
            ? (
                <>
                  <UserDropdown
                    email={session.user.email as string}
                    name={session.user.name as string}
                    image={session.user.image as string}
                  />
                  <Link href="/dashboard/links" className={buttonVariants({ variant: 'default', size: 'lg' })}>
                    Browse Your Links
                  </Link>
                </>
              )
            : (
                <Link
                  href="/login"
                  className={buttonVariants({ variant: 'outline', size: 'lg' })}
                >
                  Login
                </Link>
              )}
        </div>
      </nav>
      <InputSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
