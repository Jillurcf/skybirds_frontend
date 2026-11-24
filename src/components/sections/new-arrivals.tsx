import { Reveal } from '@/components/motion/reveal';
import { ImageContainer } from '@/components/ui/image-container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeArrivalContent } from '@/types/home';

export function NewArrivals({ content }: { content: HomeArrivalContent }) {
  return (
    <Section id="new-arrivals" className="border-b border-champagne bg-champagne/20">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <div className="mt-2xl grid gap-xl md:grid-cols-3">
        {content.images.map((image, index) => (
          <Reveal key={image.src} delay={index * 0.1}>
            <figure className="group">
              <ImageContainer
                src={image.src}
                alt={image.alt}
                aspect={index === 1 ? 'square' : 'portrait'}
                placeholderLabel={content.placeholders[index] ?? 'Illustrative look'}
                placeholderColor={image.placeholderColor ?? '#D9C6BB'}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="transition-transform duration-base ease-out-soft group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
              />
              <figcaption className="mt-md flex items-center justify-between gap-md border-t border-champagne pt-md text-xs uppercase tracking-editorial text-charcoal/75">
                <span>{content.placeholders[index] ?? 'Illustrative look'}</span>
                <span>0{index + 1}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
