import { HeroVideoSequence } from '@/components/motion/hero-video-sequence';
import { WebGLGate } from '@/components/three/webgl-gate';
import { Container } from '@/components/ui/container';
import { ParticleField } from '@/components/motion/particle-field';
import { HeroReveal } from '@/components/sections/hero-reveal';
import type { HomeHeroContent } from '@/types/home';

interface HomeHeroProps {
  content: HomeHeroContent;
  lookbookImages?: string[];
}

export function HomeHero({ content, lookbookImages = [] }: HomeHeroProps) {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate flex min-h-[calc(100svh-72px)] max-h-screen overflow-hidden bg-charcoal text-ivory"
    >
      <HeroVideoSequence />
      <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/25" />
        <div className="hero-texture absolute inset-0" />
      </div>

      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <WebGLGate className="h-full w-full" images={lookbookImages} />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/10" />
        <ParticleField />
      </div>

      <Container className="flex w-full items-center py-3xl md:py-4xl">
        <HeroReveal content={content} className="max-w-3xl" />
      </Container>

      <div aria-hidden="true" className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-md lg:flex">
        <span className="text-[9px] uppercase tracking-editorial text-ivory/55 [writing-mode:vertical-rl]">
          Menswear / Manufacturing
        </span>
        <span className="hero-reveal-rule h-16 w-px bg-rose-gold/70" />
      </div>

      <a
        href="#brand-introduction"
        className="hero-scroll-cue absolute bottom-6 left-1/2 z-10 hidden min-h-11 -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-editorial text-ivory/75 transition-colors duration-fast hover:text-ivory md:inline-flex"
      >
        Scroll to discover
        <span aria-hidden="true" className="h-px w-8 bg-rose-gold" />
      </a>
    </section>
  );
}
