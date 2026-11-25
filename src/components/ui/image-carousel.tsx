'use client';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ImageContainer } from '@/components/ui/image-container';
import { cn } from '@/lib/utils';
import type { EditorialImage } from '@/types/content';

interface ImageCarouselProps {
  images: EditorialImage[];
  placeholderLabel: string;
  label: string;
  className?: string;
}

const AUTOPLAY_INTERVAL = 5000;

export function ImageCarousel({ images, placeholderLabel, label, className }: ImageCarouselProps) {
  const regionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isManualPlay, setIsManualPlay] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const reducedMotion = useReducedMotion() ?? false;

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || images.length === 0) return;

      const nextIndex = (index + images.length) % images.length;
      track.scrollTo({
        left: nextIndex * track.clientWidth,
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
      setActiveIndex(nextIndex);
    },
    [images.length, reducedMotion]
  );

  useEffect(() => {
    const region = regionRef.current;
    if (!region || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.25
    });
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setIsPageVisible(document.visibilityState === 'visible');
    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (
      reducedMotion ||
      isPaused ||
      (!isManualPlay && isInteracting) ||
      !isVisible ||
      !isPageVisible ||
      images.length < 2
    ) {
      return;
    }

    const timer = window.setTimeout(() => goTo(activeIndex + 1), AUTOPLAY_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [activeIndex, goTo, images.length, isPaused, isManualPlay, isInteracting, isVisible, isPageVisible, reducedMotion]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.min(Math.max(index, 0), images.length - 1));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => {
        setIsInteracting(false);
        setIsManualPlay(false);
      }}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsInteracting(false);
          setIsManualPlay(false);
        }
      }}
      className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className={cn('relative overflow-hidden bg-champagne', className)}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
              className="relative h-full min-w-full shrink-0 snap-start"
            >
              <ImageContainer
                src={image.src}
                alt={image.alt}
                placeholderLabel={placeholderLabel}
                placeholderColor={image.placeholderColor}
                className="h-full w-full !aspect-auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-md flex items-center justify-between gap-md">
        <div className="flex items-center gap-sm">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous photograph"
            className="flex h-11 w-11 items-center justify-center border border-champagne text-charcoal transition-colors duration-fast hover:border-rose-gold-deep hover:text-rose-gold-deep"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next photograph"
            className="flex h-11 w-11 items-center justify-center border border-champagne text-charcoal transition-colors duration-fast hover:border-rose-gold-deep hover:text-rose-gold-deep"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
          {!reducedMotion && images.length > 1 ? (
            <button
              type="button"
              onClick={() => {
                if (isPaused) {
                  setIsPaused(false);
                  setIsInteracting(false);
                  setIsManualPlay(true);
                } else {
                  setIsPaused(true);
                  setIsManualPlay(false);
                }
              }}
              aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
              aria-pressed={isPaused}
              className="flex h-11 w-11 items-center justify-center border border-champagne text-charcoal transition-colors duration-fast hover:border-rose-gold-deep hover:text-rose-gold-deep"
            >
              {isPaused ? (
                <Play aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Pause aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-sm">
          {images.map((image, index) => (
            <button
              key={`${image.src}-indicator`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show photograph ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'block h-px w-6 transition-colors duration-fast',
                  index === activeIndex ? 'bg-rose-gold-deep' : 'bg-champagne'
                )}
              />
            </button>
          ))}
          <p aria-live="polite" className="sr-only">
            Photograph {activeIndex + 1} of {images.length}
          </p>
          <span aria-hidden="true" className="ml-sm hidden font-display text-sm text-charcoal/70 sm:inline">
            {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
