'use client';

import dynamic from 'next/dynamic';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { LookbookPoster } from '@/components/three/lookbook-poster';
import { WebGLBoundary } from '@/components/three/webgl-boundary';
import { getHeroQuality, hasWebGL, onIdle, type HeroQuality } from '@/lib/webgl';
import { cn } from '@/lib/utils';

const LookbookCanvas = dynamic(() => import('@/components/three/lookbook-canvas'), {
  ssr: false,
  loading: () => <LookbookPoster images={[]} className="absolute inset-0 h-full w-full" />
});

export function WebGLGate({ className, images = [] }: { className?: string; images?: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [quality, setQuality] = useState<HeroQuality>('poster');
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  const handleContextLost = useCallback(() => setFailed(true), []);
  const handleLoadError = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const updateQuality = () => setQuality(getHeroQuality(window.innerWidth));

    updateQuality();
    window.addEventListener('resize', updateQuality, { passive: true });
    return () => window.removeEventListener('resize', updateQuality);
  }, []);

  useEffect(() => {
    const reset = () => {
      setFailed(false);
      setReady(false);
    };
    reset();
  }, [quality]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const markVisible = () => setVisible(true);
    if (typeof IntersectionObserver === 'undefined') {
      markVisible();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (quality === 'poster' || !visible || !hasWebGL()) return;
    return onIdle(() => setReady(true), 800);
  }, [quality, visible]);

  const canRender = ready && quality !== 'poster' && !failed;

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {canRender ? (
        <WebGLBoundary
          key={quality}
          fallback={<LookbookPoster images={images} className="h-full w-full" />}
        >
          <Suspense fallback={<LookbookPoster images={images} className="h-full w-full" />}>
            <LookbookCanvas
              images={images}
              quality={quality}
              reducedMotion={reducedMotion}
              onContextLost={handleContextLost}
              onLoadError={handleLoadError}
            />
          </Suspense>
        </WebGLBoundary>
      ) : (
        <LookbookPoster images={images} className="h-full w-full" />
      )}
    </div>
  );
}
