// src/utils/performance.ts

// Critical Resource Prefetching
export const prefetchCriticalResources = () => {
  // Prefetch importantes recursos do Unsplash
  const criticalImages = [
    'https://images.unsplash.com/photo-1594381898411-846e7d193883',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d'
  ];

  criticalImages.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `${url}?w=800&q=80&fm=webp&fit=crop`;
    link.as = 'image';
    document.head.appendChild(link);
  });

  // Prefetch Google Fonts
  const fontPreconnect = document.createElement('link');
  fontPreconnect.rel = 'preconnect';
  fontPreconnect.href = 'https://fonts.gstatic.com';
  fontPreconnect.crossOrigin = 'anonymous';
  document.head.appendChild(fontPreconnect);
};

// Performance metrics
export const measureWebVitals = () => {
  // Verificar se performance API está disponível
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('Performance metric:', entry.entryType, entry.startTime);
      });
    });

    try {
      observer.observe({ entryTypes: ['paint', 'navigation'] });
    } catch (e) {
      console.log('Performance metrics não suportados');
    }
  }
};

// Debounce for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Request idle callback polyfill
export const requestIdleCallback = (
  callback: (deadline: { timeRemaining: () => number }) => void
) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback);
  }
  // Fallback
  return setTimeout(() => {
    callback({ timeRemaining: () => 16.67 }); // ~60fps
  }, 1);
};

// Optimize animations for low-end devices
export const shouldReduceMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
         navigator.hardwareConcurrency <= 2 ||
         (navigator as any).deviceMemory <= 2;
};

// GPU layer optimization
export const enableGPUAcceleration = (element: HTMLElement) => {
  element.style.transform = 'translateZ(0)';
  element.style.backfaceVisibility = 'hidden';
  element.style.perspective = '1000px';
};

// Cleanup animations
export const cleanupAnimation = (element: HTMLElement) => {
  element.style.willChange = 'auto';
  element.style.transform = '';
};

// Image lazy loading with intersection observer
export const createImageObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Critical CSS inlining
export const inlineCriticalCSS = (css: string) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.insertBefore(style, document.head.firstChild);
};

// Preload component chunks
export const preloadComponent = async (importFunction: () => Promise<any>) => {
  try {
    await importFunction();
  } catch (error) {
    console.warn('Failed to preload component:', error);
  }
};

// Resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'preconnect', href: 'https://images.unsplash.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'dns-prefetch', href: 'https://api.unsplash.com' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if ('crossOrigin' in hint && hint.crossOrigin) {
      link.crossOrigin = hint.crossOrigin;
    }
    document.head.appendChild(link);
  });
};

// Performance budget monitoring
export const monitorPerformanceBudget = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Log performance metrics
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
          if (entry.startTime > 2500) {
            console.warn('LCP is above 2.5s threshold');
          }
        }
        
        if (entry.entryType === 'first-input') {
          const fid = (entry as PerformanceEventTiming).processingStart - entry.startTime;
          console.log('FID:', fid);
          if (fid > 100) {
            console.warn('FID is above 100ms threshold');
          }
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
    } catch (e) {
      console.warn('Performance monitoring not supported');
    }
  }
};

// Service worker registration with performance considerations
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Register during idle time
      requestIdleCallback(async () => {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registered:', registration);
      });
    } catch (error) {
      console.log('SW registration failed:', error);
    }
  }
};

export default {
  prefetchCriticalResources,
  measureWebVitals,
  debounce,
  throttle,
  requestIdleCallback,
  shouldReduceMotion,
  enableGPUAcceleration,
  cleanupAnimation,
  createImageObserver,
  inlineCriticalCSS,
  preloadComponent,
  addResourceHints,
  monitorPerformanceBudget,
  registerServiceWorker
};