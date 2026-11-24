import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LookbookPosterProps {
  images: string[];
  className?: string;
}

const CARD_CLASSES = [
  'right-[6%] top-[10%] h-[48%] w-[20%] -rotate-3 max-md:right-[4%] max-md:top-[16%] max-md:h-[32%] max-md:w-[28%]',
  'right-[22%] top-[32%] h-[42%] w-[18%] rotate-6 max-md:right-[26%] max-md:top-[48%] max-md:h-[28%] max-md:w-[24%]',
  'right-[2%] top-[50%] h-[34%] w-[16%] -rotate-6 max-md:hidden'
];

export function LookbookPoster({ images, className }: LookbookPosterProps) {
  return (
    <div aria-hidden="true" className={cn('relative overflow-hidden', className)}>
      {images.slice(0, CARD_CLASSES.length).map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={cn(
            'absolute overflow-hidden border border-champagne/70 bg-champagne/20 shadow-editorial',
            CARD_CLASSES[index]
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 28vw, 20vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 via-transparent to-transparent" />
    </div>
  );
}
