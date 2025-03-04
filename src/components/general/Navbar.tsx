import { auth } from '@/lib/auth';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';
import TitleBar from './TitleBar';
import UserDropdown from './UserDropdown';

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="m-0 flex w-full items-center justify-between border-b border-gray-200 px-3 py-5">
      {!session
        ? (
            <>
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
            </>

          )
        : (
            <TitleBar />
          )}
      {/* Desktop Navigation */}
      <div className="hidden items-center gap-5 md:flex">
        <ThemeToggle />
        {session?.user
          ? (
              <UserDropdown
                email={session.user.email as string}
                name={session.user.name as string}
                image={session.user.image as string}
              />
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
  );
}
