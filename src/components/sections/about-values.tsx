import { Reveal } from '@/components/motion/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { AboutPageContent } from '@/types/pages';

interface AboutValuesProps {
  content: AboutPageContent['values'];
}

export function AboutValues({ content }: AboutValuesProps) {
  return (
    <Section id="brand-values">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <ul className="mt-2xl grid gap-lg sm:grid-cols-2 xl:grid-cols-4">
        {content.items.map((value, index) => (
          <li key={value.title} className="h-full">
            <Reveal delay={index * 0.08} className="h-full">
              <div className="flex h-full flex-col border-t border-champagne pt-lg">
                <span className="font-display text-3xl text-rose-gold-deep">0{index + 1}</span>
                <h3 className="mt-md font-display text-2xl text-charcoal">{value.title}</h3>
                <p className="mt-md text-sm leading-relaxed text-charcoal/68">{value.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
