'use client';

import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <Reveal className={cn(className)} delay={delay}>
      {children}
    </Reveal>
  );
}
