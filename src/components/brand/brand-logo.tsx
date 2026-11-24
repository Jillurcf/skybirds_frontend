import Image from 'next/image';
import { cn } from '@/lib/utils';

export type BrandLogoVariant = 'full' | 'emblem' | 'icon';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  responsive?: boolean;
  sizes?: string;
}

const assets: Record<
  BrandLogoVariant,
  { src: string; ratio: number; defaultWidth: number; label: string }
> = {
  full: {
    src: '/images/brand/sky-birds-logo.png',
    ratio: 585 / 640,
    defaultWidth: 180,
    label: 'SKY BIRDS FASHION BD logo'
  },
  emblem: {
    src: '/images/brand/sky-birds-emblem.png',
    ratio: 353 / 303,
    defaultWidth: 44,
    label: 'SKY BIRDS bird emblem'
  },
  icon: {
    src: '/images/brand/sky-birds-emblem.png',
    ratio: 1,
    defaultWidth: 44,
    label: 'SKY BIRDS icon'
  }
};

export function BrandLogo({
  variant = 'full',
  width,
  height,
  className,
  alt,
  priority = false,
  responsive = false,
  sizes
}: BrandLogoProps) {
  const asset = assets[variant];
  const computedWidth = width ?? asset.defaultWidth;
  const computedHeight = height ?? Math.round(computedWidth * asset.ratio);

  return (
    <Image
      src={asset.src}
      alt={alt ?? asset.label}
      width={computedWidth}
      height={computedHeight}
      priority={priority}
      sizes={sizes}
      className={cn(
        'object-contain',
        responsive && 'h-auto w-full max-w-full',
        className
      )}
    />
  );
}
