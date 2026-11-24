import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ContactLinks } from '@/components/layout/contact-links';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ManufacturingPageContent } from '@/types/pages';

interface ManufacturingCtaProps {
  content: ManufacturingPageContent['cta'];
}

export function ManufacturingCta({ content }: ManufacturingCtaProps) {
  return (
    <Section id="manufacturing-enquiry">
      <Reveal>
        <div className="flex flex-col gap-xl border border-champagne bg-champagne/10 p-xl md:p-2xl lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            className="max-w-2xl"
            reveal={false}
          />
          <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
            <Link href={content.primaryCta.href}>
              {content.primaryCta.label}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="mt-lg border border-champagne bg-canvas p-lg">
          <p className="eyebrow">Direct channels</p>
          <div className="mt-md">
            <ContactLinks context="general" variant="inline" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
