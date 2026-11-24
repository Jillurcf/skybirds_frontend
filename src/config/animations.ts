export const animationConfig = {
  duration: {
    fast: 0.18,
    base: 0.32,
    route: 0.24,
    slow: 0.7,
    emblem: 0.9,
    headline: 1,
    hero: 1.4
  },
  ease: {
    outSoft: [0.22, 1, 0.36, 1],
    inOutSoft: [0.65, 0, 0.35, 1]
  },
  easeCss: {
    outSoft: 'cubic-bezier(0.22, 1, 0.36, 1)',
    inOutSoft: 'cubic-bezier(0.65, 0, 0.35, 1)'
  },
  gsapEase: {
    outSoft: 'power2.out',
    none: 'none'
  },
  stagger: 0.1,
  heroStagger: 0.09,
  distance: {
    small: 16,
    medium: 24,
    large: 40
  }
} as const;
