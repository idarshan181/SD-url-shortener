/* eslint-disable no-console */
'use client';
import { Button } from '@/components/ui/button';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { sidebarItems } from '@/data/sidebar';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientSidebar() {
  const { state, toggleSidebar } = useSidebar();

  const pathname = usePathname();

  console.log('pathname:', pathname);

  return (
    <>
      <SidebarContent>
        <div id="sidebar" className="flex h-full flex-col">
          <div className="p-4">
            <h1 className={cn(
              'font-bold transition-all duration-300',
              state === 'collapsed' ? 'text-xl text-center' : 'text-2xl',
            )}
            >
              {state === 'collapsed' ? 'LS' : 'LinkSnip'}
            </h1>

          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => {
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        data-active={pathname === item.value}
                        className="data-[active=true]:bg-foreground data-[active=true]:text-background"
                      >
                        <Link
                          href={item.value}
                          className={cn(
                            'w-full flex text-lg justify-start px-4 py-3',
                          // isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:bg-gray-100', // Change styles based on isActive
                          )}
                        >
                          <item.icon className="size-10" />
                          {state === 'expanded' && (
                            <span className="ml-3">{item.label}</span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </div>
        <Button
          variant="link"
          onClick={() => toggleSidebar()}
          className="flex items-center justify-center p-4"
        >
          {state === 'collapsed'
            ? (
                <ChevronRight className="size-5" />
              )
            : (
                <ChevronLeft className="size-5" />
              )}
        </Button>
      </SidebarContent>
    </>
  );
}
