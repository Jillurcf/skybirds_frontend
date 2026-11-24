import type { ReactNode } from 'react';
import { BrandLogo } from '@/components/brand/brand-logo';
import { cn } from '@/lib/utils';

interface BrandPanelProps {
  children?: ReactNode;
  className?: string;
}

export function BrandPanel({ children, className }: BrandPanelProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-lg border border-champagne bg-canvas p-xl md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <BrandLogo variant="full" width={260} responsive className="max-w-[260px]" priority />
      {children}
    </div>
  );
}
