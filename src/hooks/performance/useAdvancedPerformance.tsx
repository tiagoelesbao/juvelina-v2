// src/hooks/performance/useAdvancedPerformance.tsx
import React, { useEffect, useCallback, useMemo, useRef } from 'react';

interface PerformanceConfig {
  enableGPUAcceleration: boolean;
  enablePreconnect: boolean;
  enablePrefetch: boolean;
  enableWillChange: boolean;
  enableIntersectionOptimization: boolean;
}

export const useAdvancedPerformance = (config: Partial<PerformanceConfig> = {}) => {
  const performanceObserverRef = useRef<PerformanceObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  
  const defaultConfig: PerformanceConfig = {
    enableGPUAcceleration: true,
    enablePreconnect: true,
    enablePrefetch: true,
    enableWillChange: true,
    enableIntersectionOptimization: true,
    ...config
  };

  // GPU Acceleration para elementos críticos
  const enableGPUAcceleration = useCallback((element: HTMLElement) => {
    if (!defaultConfig.enableGPUAcceleration) return;
    
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
  }, [defaultConfig.enableGPUAcceleration]);

  // Will-change otimizado
  const setWillChange = useCallback((element: HTMLElement, properties: string[]) => {
    if (!defaultConfig.enableWillChange) return;
    
    element.style.willChange = properties.join(', ');
    
    // Remove will-change após animação para economizar recursos
    const removeWillChange = () => {
      element.style.willChange = 'auto';
    };
    
    element.addEventListener('animationend', removeWillChange, { once: true });
    element.addEventListener('transitionend', removeWillChange, { once: true });
    
    return removeWillChange;
  }, [defaultConfig.enableWillChange]);

  // Preconnect para recursos externos
  const setupPreconnect = useCallback(() => {
    if (!defaultConfig.enablePreconnect) return;

    const preconnectDomains = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, [defaultConfig.enablePreconnect]);

  // Prefetch inteligente
  const prefetchResource = useCallback((url: string, type: 'image' | 'script' | 'style' = 'image') => {
    if (!defaultConfig.enablePrefetch) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    
    if (type === 'image') {
      link.as = 'image';
    } else if (type === 'script') {
      link.as = 'script';
    } else if (type === 'style') {
      link.as = 'style';
    }
    
    document.head.appendChild(link);
  }, [defaultConfig.enablePrefetch]);

  // Intersection Observer otimizado
  const createOptimizedIntersectionObserver = useCallback((
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) => {
    if (!defaultConfig.enableIntersectionOptimization) return null;

    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '50px 0px',
      threshold: 0.1,
      ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
  }, [defaultConfig.enableIntersectionOptimization]);

  // Performance metrics
  const measurePerformance = useCallback(() => {
    if ('PerformanceObserver' in window) {
      performanceObserverRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEventTiming;
            console.log('FID:', fidEntry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as any;
            console.log('CLS:', clsEntry.value);
          }
        });
      });

      try {
        performanceObserverRef.current.observe({ 
          entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
        });
      } catch (e) {
        console.warn('Performance Observer not supported:', e);
      }
    }
  }, []);

  // Debounced scroll handler para performance
  const createDebouncedScrollHandler = useCallback((
    handler: (event: Event) => void,
    delay: number = 16
  ) => {
    let timeoutId: NodeJS.Timeout;
    let isScheduled = false;

    return (event: Event) => {
      if (!isScheduled) {
        isScheduled = true;
        requestAnimationFrame(() => {
          handler(event);
          isScheduled = false;
        });
      }
    };
  }, []);

  // Otimização de imagens responsivas
  const createResponsiveImageSrc = useCallback((
    baseUrl: string,
    width: number,
    quality: number = 80
  ) => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const optimizedWidth = Math.ceil(width * devicePixelRatio);
    
    return `${baseUrl}&w=${optimizedWidth}&q=${quality}&fm=webp&fit=crop`;
  }, []);

  // Memoização avançada para componentes pesados
  const createMemoizedComponent = useCallback(<T extends object>(
    component: React.ComponentType<T>,
    propsAreEqual?: (prevProps: T, nextProps: T) => boolean
  ) => {
    return React.memo(component, propsAreEqual);
  }, []);

  useEffect(() => {
    setupPreconnect();
    measurePerformance();

    return () => {
      if (performanceObserverRef.current) {
        performanceObserverRef.current.disconnect();
      }
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [setupPreconnect, measurePerformance]);

  return useMemo(() => ({
    enableGPUAcceleration,
    setWillChange,
    prefetchResource,
    createOptimizedIntersectionObserver,
    createDebouncedScrollHandler,
    createResponsiveImageSrc,
    createMemoizedComponent,
    measurePerformance
  }), [
    enableGPUAcceleration,
    setWillChange,
    prefetchResource,
    createOptimizedIntersectionObserver,
    createDebouncedScrollHandler,
    createResponsiveImageSrc,
    createMemoizedComponent,
    measurePerformance
  ]);
};

export default useAdvancedPerformance;