'use client';

import { sidebarItems } from '@/data/sidebar';
import { usePathname } from 'next/navigation';

export default function TitleBar() {
  const pathname = usePathname();
  const currentItem = sidebarItems.find(item => item.value === pathname);

  return (
    <div className="flex items-center gap-5">
      <h1 className="text-2xl font-bold">
        {currentItem && currentItem.label}
      </h1>
    </div>
  );
}
