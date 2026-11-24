'use client';

import { createContext, useContext } from 'react';
import { useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

const MotionPreferenceContext = createContext<boolean>(false);

export function MotionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion() ?? false;

  return <MotionPreferenceContext.Provider value={reducedMotion}>{children}</MotionPreferenceContext.Provider>;
}

export function useMotionPreference() {
  return useContext(MotionPreferenceContext);
}
