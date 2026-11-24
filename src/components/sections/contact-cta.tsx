import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ContactLinks } from '@/components/layout/contact-links';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContactCtaContent } from '@/types/home';

export function ContactCta({ content }: { content: HomeContactCtaContent }) {
  return (
    <Section
      id="contact-cta"
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
          <Button asChild size="lg" className="w-full bg-ivory text-charcoal hover:bg-ivory/90 sm:w-auto">
            <Link href={content.primaryCta.href}>
              {content.primaryCta.label}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-xl max-w-xl bg-ivory p-lg text-charcoal">
          <p className="eyebrow">Direct channels</p>
          <div className="mt-md">
            <ContactLinks context="general" variant="inline" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
