import { HorizontalEditorial } from '@/components/motion/horizontal-editorial';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeSignatureContent } from '@/types/home';

export function SignatureMenswear({ content }: { content: HomeSignatureContent }) {
  return (
    <Section id="signature" className="border-b border-champagne">
      <div className="flex flex-col gap-md lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          className="max-w-2xl"
        />
        <p className="hidden text-[10px] uppercase tracking-editorial text-charcoal/75 lg:block">
          Scroll to explore the line
        </p>
      </div>
      <HorizontalEditorial panels={content.panels} className="mt-2xl" />
    </Section>
  );
}
