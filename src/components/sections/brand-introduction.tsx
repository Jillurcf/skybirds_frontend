import Link from 'next/link';
import { BrandLogo } from '@/components/brand/brand-logo';
import { Reveal } from '@/components/motion/reveal';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeIntroContent } from '@/types/home';

export function BrandIntroduction({ content }: { content: HomeIntroContent }) {
  return (
    <Section id="brand-introduction" className="border-b border-champagne">
      <div className="grid gap-2xl lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="relative bg-champagne/30 p-xl md:p-2xl">
            <span aria-hidden="true" className="absolute inset-x-lg top-lg h-px bg-rose-gold/40" />
            <BrandLogo variant="full" width={260} responsive priority className="mx-auto max-w-[320px]" />
            <p className="mt-xl text-center text-[10px] uppercase tracking-editorial text-charcoal/50">
              SKY BIRDS · FASHION BD
            </p>
          </div>
        </Reveal>

        <ScrollReveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} reveal={false} />
          <ul className="mt-xl grid gap-md sm:grid-cols-3">
            {content.notes.map((note, index) => (
              <li key={note} className="border-t border-champagne pt-md">
                <p className="eyebrow">0{index + 1}</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{note}</p>
              </li>
            ))}
          </ul>
          <Button asChild variant="link" className="mt-lg px-0">
            <Link href="#company-story">Read our story</Link>
          </Button>
        </ScrollReveal>
      </div>
    </Section>
  );
}
