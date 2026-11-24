'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { MOTION_DURATION, MOTION_DISTANCE, MOTION_EASE } from '@/lib/animation';

export function RouteTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0.85, y: MOTION_DISTANCE.small }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MOTION_DURATION.route, ease: MOTION_EASE.outSoft }}
    >
      {children}
    </motion.div>
  );
}
