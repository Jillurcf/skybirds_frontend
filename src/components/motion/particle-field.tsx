'use client';

import type { CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

const particles = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 37 + 11) % 92}%`,
  top: `${(index * 23 + 17) % 78}%`,
  size: index % 3 === 0 ? 3 : 2,
  delay: `${(index % 7) * 1.6}s`,
  duration: `${10 + (index % 5) * 2}s`
}));

export function ParticleField({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion() ?? false;

  if (reducedMotion) {
    return null;
  }

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {particles.map((particle, index) => (
        <span
          key={index}
          className={cn(
            'absolute rounded-full bg-rose-soft/30 particle-drift',
            index >= 12 && 'hidden md:block'
          )}
          style={
            {
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
