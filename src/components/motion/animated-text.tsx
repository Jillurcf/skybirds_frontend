'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ElementType } from 'react';
import { MOTION_DURATION, MOTION_EASE, MOTION_STAGGER } from '@/lib/animation';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, as: Tag = 'span', className, delay = 0 }: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn('inline-block', className)} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: MOTION_DURATION.slow,
              ease: MOTION_EASE.outSoft,
              delay: delay + index * MOTION_STAGGER
            }}
            aria-hidden="true"
          >
            {word}
            {index < words.length - 1 ? '\u00a0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
