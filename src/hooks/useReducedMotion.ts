import { useState, useEffect } from 'react';

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

// Detect low-end devices via hardware concurrency and device memory
export const useIsLowEndDevice = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    setIsLowEnd(cores <= 2 || memory <= 2);
  }, []);

  return isLowEnd;
};
