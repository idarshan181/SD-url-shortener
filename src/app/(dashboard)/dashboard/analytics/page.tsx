'use client';

import { AnalyticsChart } from '@/components/data-display/AnalyticsChart';
import { StatsCard } from '@/components/data-display/StatsCard';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { browserData, clicksByDay, deviceData, referrerData } from '@/data/analytics';
import { format } from 'date-fns';
import { BarChart2, Calendar as CalendarIcon, Globe, Laptop, Smartphone, Users } from 'lucide-react';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Clicks"
          value="1,248"
          icon={<BarChart2 />}
          trend={{ value: 12, isPositive: true }}
          description="from last month"
        />
        <StatsCard
          title="Unique Visitors"
          value="854"
          icon={<Users />}
          trend={{ value: 8, isPositive: true }}
          description="from last month"
        />
        <StatsCard
          title="Mobile Users"
          value="45%"
          icon={<Smartphone />}
          trend={{ value: 3, isPositive: true }}
          description="from last month"
        />
        <StatsCard
          title="Desktop Users"
          value="55%"
          icon={<Laptop />}
          trend={{ value: 2, isPositive: false }}
          description="from last month"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <AnalyticsChart
          data={clicksByDay}
          title="Clicks by Day"
          description="Link clicks over the past 7 days"
        />
        <AnalyticsChart
          data={deviceData}
          title="Device Breakdown"
          description="Clicks by device type"
        />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full rounded-md border bg-muted p-4">
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Globe className="h-12 w-12 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Geographic map visualization would appear here
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="browsers">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browsers">Browsers</TabsTrigger>
            <TabsTrigger value="referrers">Referrers</TabsTrigger>
          </TabsList>
          <TabsContent value="browsers">
            <Card>
              <CardHeader>
                <CardTitle>Browser Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <AnalyticsChart
                    data={browserData}
                    title=""
                    description=""
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="referrers">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <AnalyticsChart
                    data={referrerData}
                    title=""
                    description=""
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
