import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
  reveal?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  className,
  id,
  reveal = true
}: SectionHeadingProps) {
  const heading = (
    <div
      className={cn(
        'flex flex-col gap-md',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        className
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading id={id} className="section-title text-balance">
        {title}
      </Heading>
      {description ? <div className={cn('lede', align === 'center' && 'mx-auto')}>{description}</div> : null}
    </div>
  );

  return reveal ? <Reveal>{heading}</Reveal> : heading;
}
