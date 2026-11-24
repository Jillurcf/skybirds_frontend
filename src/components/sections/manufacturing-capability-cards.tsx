import { Reveal } from '@/components/motion/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ManufacturingPageContent } from '@/types/pages';

interface ManufacturingCapabilityCardsProps {
  content: ManufacturingPageContent['capabilities'];
}

export function ManufacturingCapabilityCards({ content }: ManufacturingCapabilityCardsProps) {
  return (
    <Section
      id="capabilities"
      tone="dark"
      className="[&_.eyebrow]:text-rose-soft [&_.lede]:text-ivory/70 [&_.section-title]:text-ivory"
    >
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <div className="mt-2xl grid gap-lg md:grid-cols-2">
        {content.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className="h-full">
            <article className="flex h-full flex-col border border-ivory/15 p-xl">
              <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
              <p className="mt-md text-sm leading-relaxed text-ivory/68">{item.description}</p>
              {item.metric ? (
                <p className="mt-lg border-t border-ivory/15 pt-md text-xs uppercase tracking-editorial text-rose-soft/90">
                  {item.metricLabel ? `${item.metricLabel}: ` : ''}
                  {item.metric}
                </p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
