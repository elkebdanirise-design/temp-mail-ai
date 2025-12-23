import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, []);

  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const elementId = href.slice(1);
      scrollToElement(elementId);
      
      // Update URL without triggering scroll
      window.history.pushState(null, '', href);
    }
  }, [scrollToElement]);

  return { scrollToElement, handleAnchorClick };
};