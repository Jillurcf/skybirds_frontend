import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  contained?: boolean;
  tone?: 'light' | 'dark';
  spacing?: 'default' | 'compact' | 'none';
}

export function Section({
  contained = true,
  tone = 'light',
  spacing = 'default',
  className,
  children,
  ...props
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;

  return (
    <section
      className={cn(
        tone === 'dark' ? 'bg-charcoal text-ivory' : 'bg-background text-foreground',
        spacing === 'default' && 'py-2xl md:py-3xl',
        spacing === 'compact' && 'py-xl',
        className
      )}
      {...props}
    >
      {content}
    </section>
  );
}
