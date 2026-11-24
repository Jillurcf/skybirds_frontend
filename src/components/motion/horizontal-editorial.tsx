'use client';

import { useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { ImageContainer } from '@/components/ui/image-container';
import { MOTION_GSAP_EASE } from '@/lib/animation';
import { observeScrollTriggerRefresh, registerScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/lib/use-isomorphic-layout-effect';
import { cn } from '@/lib/utils';
import type { HomeEditorialPanel } from '@/types/home';

interface HorizontalEditorialProps {
  panels: HomeEditorialPanel[];
  className?: string;
}

export function HorizontalEditorial({ panels, className }: HorizontalEditorialProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !rootRef.current || !trackRef.current) return;

    const root = rootRef.current;
    const track = trackRef.current;
    let cancelled = false;
    let cleanup: () => void = () => undefined;

    void registerScrollTrigger().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const matchMedia = gsap.matchMedia();
      const distance = () => Math.max(0, track.scrollWidth - root.clientWidth);

      matchMedia.add('(min-width: 1024px)', () => {
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: MOTION_GSAP_EASE.none,
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        ScrollTrigger.refresh();

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: 'transform' });
        };
      });

      const stopRefresh = observeScrollTriggerRefresh(root, ScrollTrigger);
      cleanup = () => {
        stopRefresh();
        matchMedia.revert();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className={cn('relative lg:overflow-hidden', className)}>
      <div
        ref={trackRef}
        className="flex flex-col gap-xl lg:w-max lg:flex-row lg:items-center lg:gap-2xl lg:py-xl"
      >
        {panels.map((panel) => (
          <article key={panel.kicker} className="w-full lg:w-[62vw] lg:shrink-0">
            <div className="grid gap-lg lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <ImageContainer
                src={panel.image}
                alt={panel.imageAlt}
                aspect="portrait"
                placeholderLabel={panel.placeholderLabel}
                className="w-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div>
                <p className="eyebrow">{panel.kicker}</p>
                <h3 className="mt-md font-display text-3xl leading-tight text-charcoal md:text-4xl">{panel.title}</h3>
                <p className="mt-md max-w-md text-base leading-relaxed text-charcoal/70">{panel.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
