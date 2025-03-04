'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type GeneralSubmitButtonProps = {
  text?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | undefined
    | null;
  className?: string;
  children?: React.ReactNode;
};

export function GeneralSubmitButton({
  variant = 'default',
  className = '',
  children,
}: GeneralSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button variant={variant} className={`${className} cursor-pointer`} disabled={pending}>
      {pending
        ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Submitting...</span>
            </>
          )
        : (
            <>{children}</>
          )}
    </Button>
  );
}
