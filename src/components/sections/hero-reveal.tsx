import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { BrandLogo } from '@/components/brand/brand-logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { HomeHeroContent } from '@/types/home';

function revealDelay(delay: string): CSSProperties {
  return { '--hero-delay': delay } as CSSProperties;
}

interface HeroRevealProps {
  content: HomeHeroContent;
  className?: string;
}

export function HeroReveal({ content, className }: HeroRevealProps) {
  return (
    <div data-hero-reveal className={cn('relative z-10', className)}>
      <div className="flex items-center gap-md">
        <span
          className="hero-reveal-scale inline-flex shrink-0 items-center justify-center border border-ivory/15 bg-ivory/95 p-3 shadow-editorial"
          style={revealDelay('80ms')}
        >
          <BrandLogo variant="emblem" width={54} alt="" priority />
        </span>
        <div className="hero-reveal-up" style={revealDelay('180ms')}>
          <p className="font-display text-xl uppercase tracking-[0.22em] text-ivory sm:text-2xl">Sky Birds</p>
          <p className="mt-1 text-[10px] uppercase tracking-editorial text-ivory/65">Fashion BD</p>
        </div>
      </div>

      <p className="hero-reveal-up eyebrow mt-xl text-rose-soft" style={revealDelay('200ms')}>
        {content.eyebrow}
      </p>

      <h1
        id="home-hero-heading"
        className="mt-md font-display text-[clamp(2.75rem,11vw,5rem)] font-normal leading-[0.95] tracking-tight text-ivory sm:text-display"
      >
        {content.headlineLines.map((line, index) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <span
              className="hero-reveal-line block"
              style={revealDelay(index === 0 ? '300ms' : '390ms')}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p className="hero-reveal-up lede mt-lg max-w-xl text-ivory/75" style={revealDelay('520ms')}>
        {content.description}
      </p>

      <div className="mt-xl flex flex-col gap-md sm:flex-row sm:items-center">
        <div className="hero-reveal-up" style={revealDelay('640ms')}>
          <Button
            asChild
            size="lg"
            className="w-full bg-ivory text-charcoal hover:bg-ivory/90 sm:w-auto"
          >
            <Link href={content.primaryCta.href} className="group relative">
              {content.primaryCta.label}
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-fast group-hover:translate-x-1 group-focus-visible:translate-x-1"
              />
              <span
                aria-hidden="true"
                className="hero-reveal-underline absolute bottom-2 left-8 right-8 h-px origin-left bg-rose-gold"
                style={revealDelay('820ms')}
              />
            </Link>
          </Button>
        </div>

        <div className="hero-reveal-up" style={revealDelay('720ms')}>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-ivory/50 text-ivory hover:border-rose-gold hover:text-ivory sm:w-auto"
          >
            <Link href={content.secondaryCta.href} className="group relative">
              {content.secondaryCta.label}
              <ArrowDown
                aria-hidden="true"
                className="transition-transform duration-fast group-hover:translate-y-1 group-focus-visible:translate-y-1"
              />
              <span
                aria-hidden="true"
                className="hero-reveal-underline absolute bottom-2 left-8 right-8 h-px origin-left bg-rose-gold"
                style={revealDelay('900ms')}
              />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
