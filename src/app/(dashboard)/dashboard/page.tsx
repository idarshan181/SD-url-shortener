import { AnalyticsChart } from '@/components/data-display/AnalyticsChart';
import Links from '@/components/data-display/Links';
import { StatsCard } from '@/components/data-display/StatsCard';
import { URLShortenerForm } from '@/components/forms/URLShortenerForm';
import { requireUser } from '@/lib/requireUser';
import { BarChart2, Link2, Users } from 'lucide-react';

const statsData = {
  totalLinks: 42,
  totalClicks: 1248,
  activeLinks: 38,
};

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
  await requireUser();
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
          <Links limit={5} />
        </div>
      </div>
    </div>
  );
}
