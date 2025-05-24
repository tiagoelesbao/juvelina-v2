// src/hooks/ui/useScrollPosition.ts
import { useState, useEffect, useCallback, useRef } from 'react';

// Função throttle otimizada
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastCallTime = 0;
  let lastArgs: Parameters<T> | null = null;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    
    if (timeSinceLastCall >= wait) {
      // Executar imediatamente se passou tempo suficiente
      func(...args);
      lastCallTime = now;
    } else {
      // Armazenar os argumentos e agendar execução
      lastArgs = args;
      
      if (!timeout) {
        const remainingTime = wait - timeSinceLastCall;
        timeout = setTimeout(() => {
          if (lastArgs) {
            func(...lastArgs);
            lastCallTime = Date.now();
          }
          timeout = null;
          lastArgs = null;
        }, remainingTime);
      }
    }
  };
}

export function useScrollPosition() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Função otimizada para lidar com scroll
  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determinar direção do scroll
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection('down');
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection('up');
    }
    
    // Atualizar estados
    setScrollY(currentScrollY);
    setShowScrollTop(currentScrollY > 600);
    
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  // Request Animation Frame para melhor performance
  const requestTick = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(updateScrollState);
      ticking.current = true;
    }
  }, [updateScrollState]);

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      requestTick();
    }, 100), // Throttle para 100ms
    [requestTick]
  );

  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window === 'undefined') return;

    // Configuração inicial
    updateScrollState();

    // Adicionar listener com passive para melhor performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, updateScrollState]);

  return { 
    showScrollTop, 
    scrollY, 
    scrollDirection,
    isNearTop: scrollY < 100,
    isNearBottom: scrollY > (document.documentElement.scrollHeight - window.innerHeight - 100)
  };
}