// src/components/general/LogoutButton.tsx
'use client'; // This component is a client component
import { signOut } from '@/lib/auth';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={async () => await signOut({ redirectTo: '/' })}
      className="flex h-4 justify-center gap-x-3"
    >
      <LogOut className="size-4" />
      <span>Log out</span>
    </button>
  );
}
