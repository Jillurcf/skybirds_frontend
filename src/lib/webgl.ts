export type HeroQuality = 'poster' | 'low' | 'high';

export interface HeroPointer {
  x: number;
  y: number;
  inside: boolean;
}

export function getHeroPointer(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): HeroPointer {
  if (rect.width <= 0 || rect.height <= 0) {
    return { x: 0, y: 0, inside: false };
  }

  const inside =
    clientX >= rect.left &&
    clientX <= rect.left + rect.width &&
    clientY >= rect.top &&
    clientY <= rect.top + rect.height;

  const x = Math.min(1, Math.max(-1, ((clientX - rect.left) / rect.width) * 2 - 1));
  const y = Math.min(1, Math.max(-1, 1 - ((clientY - rect.top) / rect.height) * 2));

  return { x, y, inside };
}

export function hasWebGL(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl');

    return Boolean(window.WebGLRenderingContext && context);
  } catch {
    return false;
  }
}

export function getHeroQuality(width: number): HeroQuality {
  if (width < 1024) return 'low';
  return 'high';
}

export function getRecommendedDpr(): number {
  if (typeof window === 'undefined') return 1;
  return window.innerWidth < 768 ? 1.5 : 2;
}

export function onIdle(callback: () => void, timeout = 2000): () => void {
  if (typeof window === 'undefined') {
    callback();
    return () => undefined;
  }

  const idleWindow = window as typeof window & {
    requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

  if (typeof idleWindow.requestIdleCallback === 'function') {
    const handle = idleWindow.requestIdleCallback(() => callback(), { timeout });
    return () => idleWindow.cancelIdleCallback?.(handle);
  }

  const handle = window.setTimeout(callback, Math.max(timeout, 1200));
  return () => window.clearTimeout(handle);
}

export function reduceMotionEnabled(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
