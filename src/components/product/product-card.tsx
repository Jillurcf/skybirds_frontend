import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ImageContainer } from '@/components/ui/image-container';
import { formatCategoryLabel } from '@/lib/format';

interface ProductCardProps {
  href: string;
  name: string;
  category: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderColor?: string;
  priority?: boolean;
  className?: string;
}

export function ProductCard({
  href,
  name,
  category,
  description,
  imageSrc,
  imageAlt,
  placeholderColor,
  priority = false,
  className
}: ProductCardProps) {
  return (
    <article className={className}>
      <Link href={href} className="group block rounded-editorial focus-visible:outline-none">
        <div className="relative overflow-hidden">
          <ImageContainer
            src={imageSrc}
            alt={imageAlt ?? `${name} product photograph`}
            placeholderColor={placeholderColor}
            placeholderLabel={`${name} photography pending`}
            priority={priority}
            className="transition-transform duration-base ease-out-soft group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-champagne/0 transition-colors duration-base group-hover:bg-champagne/10 group-focus-visible:bg-champagne/10"
          />
        </div>

        <div className="flex items-start justify-between gap-md pt-md">
          <div>
            <p className="eyebrow">{formatCategoryLabel(category)}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-charcoal underline-offset-4 decoration-rose-gold group-hover:underline group-focus-visible:underline">
              {name}
            </h3>
            {description ? <p className="mt-2 text-sm text-charcoal/65">{description}</p> : null}
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 h-5 w-5 shrink-0 text-rose-gold-deep transition-transform duration-fast group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none"
          />
        </div>
      </Link>
    </article>
  );
}
