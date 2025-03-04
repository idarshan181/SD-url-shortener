/* eslint-disable unused-imports/no-unused-vars */
import ClientSidebar from '@/components/general/ClientSidebar';
import Navbar from '@/components/general/Navbar';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { BarChart, Home, Target, Wallet } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', value: '/' },
  { icon: Wallet, label: 'Transactions', value: '/transactions' },
  { icon: BarChart, label: 'Reports & Insights', value: '/reports' },
  { icon: Target, label: 'Budgets', value: '/budgets' },
];

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider>
      <SidebarProvider className="">
        {session
          ? (
              <Sidebar collapsible="icon">
                <ClientSidebar />
              </Sidebar>
            )
          : null}
        <main className="w-full">
          <Navbar />
          <div className="p-4">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
