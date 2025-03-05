/* eslint-disable no-console */
import { AnalyticsChart } from '@/components/data-display/AnalyticsChart';
import { LinkTable } from '@/components/data-display/LinkTable';
import { StatsCard } from '@/components/data-display/StatsCard';
import { URLShortenerForm } from '@/components/forms/URLShortenerForm';
import { requireUser } from '@/lib/requireUser';
import { BarChart2, Link2, Users } from 'lucide-react';

const statsData = {
  totalLinks: 42,
  totalClicks: 1248,
  activeLinks: 38,
};

const recentLinks = [
  {
    id: '1',
    originalUrl: 'https://example.com/very/long/url/that/needs/shortening/1',
    shortUrl: 'abc123',
    createdAt: new Date(2025, 2, 15),
    clicks: 423,
  },
  {
    id: '2',
    originalUrl: 'https://example.com/another/long/url/for/demonstration/2',
    shortUrl: 'def456',
    createdAt: new Date(2025, 2, 14),
    clicks: 189,
  },
  {
    id: '3',
    originalUrl: 'https://example.com/yet/another/long/url/for/testing/3',
    shortUrl: 'ghi789',
    createdAt: new Date(2025, 2, 13),
    clicks: 57,
  },
  {
    id: '4',
    originalUrl: 'https://example.com/one/more/long/url/for/good/measure/4',
    shortUrl: 'jkl012',
    createdAt: new Date(2025, 2, 12),
    clicks: 112,
  },
];

const chartData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 150 },
  { name: 'Wed', value: 180 },
  { name: 'Thu', value: 220 },
  { name: 'Fri', value: 300 },
  { name: 'Sat', value: 250 },
  { name: 'Sun', value: 280 },
];

export default async function DashboardPage() {
  const user = await requireUser();

  console.log('user: ', user);
  return (
    <div className="p-4 md:p-6">
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <URLShortenerForm />
          <div className="grid gap-6 md:col-span-1 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <StatsCard
                title="Total Links"
                value={statsData.totalLinks}
                icon={<Link2 />}
                trend={{ value: 12, isPositive: true }}
                description="from last month"
              />
              <StatsCard
                title="Total Clicks"
                value={statsData.totalClicks}
                icon={<BarChart2 />}
                trend={{ value: 8, isPositive: true }}
                description="from last month"
              />
              <StatsCard
                title="Active Links"
                value={statsData.activeLinks}
                icon={<Users />}
                trend={{ value: 3, isPositive: false }}
                description="from last month"
              />
            </div>
            <AnalyticsChart
              data={chartData}
              title="Click Activity"
              description="Link clicks over the past 7 days"
            />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent Links</h2>
          <LinkTable data={recentLinks} />
        </div>
      </div>
    </div>
  );
}
