import { ChartNoAxesColumnIncreasing, LayoutDashboard, LinkIcon, Settings } from 'lucide-react';

export const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', value: '/dashboard' },
  { icon: LinkIcon, label: 'My Links', value: '/dashboard/links' },
  { icon: ChartNoAxesColumnIncreasing, label: 'Analytics', value: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', value: '/dashboard/settings' },
];
