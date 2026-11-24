import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { AboutPageContent } from '@/types/pages';

interface AboutCtaProps {
  content: AboutPageContent['cta'];
}

export function AboutCta({ content }: AboutCtaProps) {
  return (
    <Section
      id="about-cta"
      tone="dark"
      className="[&_.eyebrow]:text-rose-soft [&_.lede]:text-ivory/70 [&_.section-title]:text-ivory"
    >
      <Reveal>
        <div className="flex flex-col gap-xl lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            className="max-w-2xl"
            reveal={false}
          />
          <div className="flex w-full flex-col gap-md sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="bg-ivory text-charcoal hover:bg-ivory/90">
              <Link href={content.primaryCta.href}>
                {content.primaryCta.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-ivory/30 text-ivory hover:bg-ivory/10 hover:text-ivory"
            >
              <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
