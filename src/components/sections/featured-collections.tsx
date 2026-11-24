import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeContent } from '@/types/home';

export function FeaturedCollections({ content }: { content: HomeContent['collections'] }) {
  return (
    <Section id="collections" className="border-b border-champagne">
      <div className="flex flex-col gap-xl lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          className="max-w-2xl"
        />
        <Button asChild variant="outline" className="shrink-0 self-start">
          <Link href={content.allCta.href}>
            {content.allCta.label}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <ul className="mt-2xl grid gap-xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {content.items.map((item, index) => (
          <li key={item.category} className="h-full">
            <Reveal delay={index * 0.08} className="h-full">
              <ProductCard
                href={item.href}
                name={item.name}
                category={item.category}
                description={item.description}
                imageSrc={item.image?.src}
                imageAlt={item.image?.alt}
                placeholderColor={item.image?.placeholderColor}
                className="h-full"
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
