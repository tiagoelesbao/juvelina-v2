import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setShowScrollTop(position > 600);
    };

    // Adicionar throttle para melhor performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Verificação inicial

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return { showScrollTop };
}