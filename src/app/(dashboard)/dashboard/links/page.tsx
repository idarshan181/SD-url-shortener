import Links from '@/components/data-display/Links';
import { Button } from '@/components/ui/button';
import { requireUser } from '@/lib/requireUser';
import { Plus } from 'lucide-react';

export default async function LinkPage() {
  await requireUser();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Links</h1>
        <Button className="text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create New Link
        </Button>
      </div>
      <Links />
    </div>
  );
}
