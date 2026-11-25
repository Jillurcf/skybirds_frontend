'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { heroVideoSources } from '@/config/hero-videos';
import { cn } from '@/lib/utils';
import type { EditorialImage } from '@/types/content';

const CROSSFADE_LEAD_SECONDS = 1.2;

interface HeroVideoSequenceProps {
  fallbackImage: EditorialImage;
  className?: string;
}

export function HeroVideoSequence({ fallbackImage, className }: HeroVideoSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const transitioningRef = useRef(false);
  const reducedMotion = useReducedMotion() ?? false;
  const [playing, setPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const nextIndex = (activeIndex + 1) % heroVideoSources.length;

  const pauseVideos = useCallback(() => {
    videoRefs.current.forEach((video) => video?.pause());
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updatePageVisible = () => setPageVisible(document.visibilityState === 'visible');
    updatePageVisible();
    document.addEventListener('visibilitychange', updatePageVisible);

    if (typeof IntersectionObserver === 'undefined') {
      return () => document.removeEventListener('visibilitychange', updatePageVisible);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.01 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updatePageVisible);
    };
  }, []);

  useEffect(() => () => pauseVideos(), [pauseVideos]);

  useEffect(() => {
    transitioningRef.current = false;
  }, [activeIndex]);

  useEffect(() => {
    if (reducedMotion || !inView || !pageVisible) {
      pauseVideos();
      return;
    }

    const next = videoRefs.current[nextIndex];
    if (next && next.readyState < 2) {
      next.preload = 'auto';
      next.load();
    }
  }, [inView, nextIndex, pageVisible, pauseVideos, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !inView || !pageVisible) {
      pauseVideos();
      return;
    }

    const video = videoRefs.current[activeIndex];
    if (!video) return;

    if (video.ended) {
      video.currentTime = 0;
    }

    if (!video.paused) return;

    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [activeIndex, inView, pageVisible, pauseVideos, reducedMotion]);

  const handleTimeUpdate = useCallback(
    (index: number) => {
      if (index !== activeIndex || transitioningRef.current) return;

      const video = videoRefs.current[index];
      if (!video || !Number.isFinite(video.duration)) return;
      if (video.duration - video.currentTime > CROSSFADE_LEAD_SECONDS) return;

      transitioningRef.current = true;
      const upcomingIndex = (index + 1) % heroVideoSources.length;
      const upcoming = videoRefs.current[upcomingIndex];
      if (!upcoming) {
        transitioningRef.current = false;
        return;
      }

      if (upcoming.ended) {
        upcoming.currentTime = 0;
      }

      void upcoming
        .play()
        .then(() => setActiveIndex(upcomingIndex))
        .catch(() => {
          transitioningRef.current = false;
        });
    },
    [activeIndex]
  );

  const handleEnded = useCallback(
    (index: number) => {
      videoRefs.current[index]?.pause();
      if (index !== activeIndex) return;

      setActiveIndex((current) =>
        current === index ? (current + 1) % heroVideoSources.length : current
      );
    },
    [activeIndex]
  );

  const handleError = useCallback(
    (index: number) => {
      if (index === activeIndex) {
        setPlaying(false);
      }
    },
    [activeIndex]
  );

  const showVideo = !reducedMotion;
  const videoVisible = showVideo && playing;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn('absolute inset-0 -z-20 overflow-hidden bg-charcoal', className)}
    >
      <Image
        src={fallbackImage.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-image-drift object-cover object-center"
      />

      {showVideo && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out-soft',
            videoVisible ? 'opacity-100' : 'opacity-0'
          )}
        >
          {heroVideoSources.map((src, index) => (
            <video
              key={src}
              ref={(node) => {
                videoRefs.current[index] = node;
              }}
              src={src}
              poster={fallbackImage.src}
              muted
              playsInline
              preload={index === activeIndex || index === nextIndex ? 'auto' : 'metadata'}
              data-active={index === activeIndex}
              onTimeUpdate={() => handleTimeUpdate(index)}
              onPlaying={index === activeIndex ? () => setPlaying(true) : undefined}
              onEnded={() => handleEnded(index)}
              onError={() => handleError(index)}
              className={cn(
                'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-slow ease-out-soft',
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
