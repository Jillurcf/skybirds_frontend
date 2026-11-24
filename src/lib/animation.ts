import { animationConfig } from '@/config/animations';

export const MOTION_DURATION = animationConfig.duration;
export const MOTION_EASE = animationConfig.ease;
export const MOTION_GSAP_EASE = animationConfig.gsapEase;
export const MOTION_STAGGER = animationConfig.stagger;
export const MOTION_HERO_STAGGER = animationConfig.heroStagger;
export const MOTION_DISTANCE = animationConfig.distance;

export function staggerDelay(index: number, step = MOTION_STAGGER): number {
  return index * step;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
