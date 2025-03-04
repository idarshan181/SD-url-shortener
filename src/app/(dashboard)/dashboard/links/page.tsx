import { LinkTable } from '@/components/data-display/LinkTable';
import { Button } from '@/components/ui/button';
import { links } from '@/data/links';
import { Plus } from 'lucide-react';

export default function LinkPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Links</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Link
        </Button>
      </div>
      <LinkTable data={links} />
    </div>
  );
}
