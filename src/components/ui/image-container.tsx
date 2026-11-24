import Image from 'next/image';
import type { CSSProperties } from 'react';
import { isLightColor } from '@/lib/color';
import { cn } from '@/lib/utils';

interface ImageContainerProps {
  src?: string;
  alt?: string;
  aspect?: 'portrait' | 'square' | 'wide';
  placeholderColor?: string;
  placeholderLabel?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

const aspectClasses = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[16/10]'
};

export function ImageContainer({
  src,
  alt = '',
  aspect = 'portrait',
  placeholderColor = '#D9C6BB',
  placeholderLabel = 'Product photography coming soon',
  className,
  imageClassName,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: ImageContainerProps) {
  return (
    <div className={cn('relative overflow-hidden bg-champagne', aspectClasses[aspect], className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            'object-cover transition-transform duration-base ease-out-soft',
            imageClassName
          )}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center p-lg text-center"
          role="img"
          aria-label={placeholderLabel}
          style={{ backgroundColor: placeholderColor } as CSSProperties}
        >
          <span
            className={cn(
              'font-display text-lg',
              isLightColor(placeholderColor) ? 'text-charcoal/75' : 'text-ivory/80'
            )}
          >
            {placeholderLabel}
          </span>
        </div>
      )}
    </div>
  );
}
