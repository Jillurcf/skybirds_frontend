'use client';

import { useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { ImageContainer } from '@/components/ui/image-container';
import { MOTION_GSAP_EASE } from '@/lib/animation';
import { observeScrollTriggerRefresh, registerScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/use-isomorphic-layout-effect';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  placeholderLabel: string;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  sizes?: string;
}

export function ParallaxImage({
  placeholderLabel,
  className,
  imageSrc,
  imageAlt,
  sizes = '(max-width: 1024px) 100vw, 50vw'
}: ParallaxImageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !rootRef.current || !targetRef.current) return;

    const root = rootRef.current;
    const target = targetRef.current;
    let cancelled = false;
    let revert: () => void = () => undefined;

    void registerScrollTrigger().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const context = gsap.context(() => {
        gsap.fromTo(
          target,
          { yPercent: -6, scale: 1.1 },
          {
            yPercent: 6,
            scale: 1.08,
            ease: MOTION_GSAP_EASE.none,
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );
      }, root);

      revert = () => context.revert();
      const stopRefresh = observeScrollTriggerRefresh(root, ScrollTrigger);
      revert = () => {
        stopRefresh();
        context.revert();
      };
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className={cn('relative overflow-hidden bg-champagne', className)}>
      <div ref={targetRef} className="absolute inset-x-0 -inset-y-[8%]">
        <ImageContainer
          src={imageSrc}
          alt={imageAlt ?? ''}
          placeholderLabel={placeholderLabel}
          className="h-full w-full !aspect-auto"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
