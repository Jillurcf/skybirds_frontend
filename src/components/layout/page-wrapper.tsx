import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main id="main-content" className={cn('min-h-screen', className)}>
      {children}
    </main>
  );
}
