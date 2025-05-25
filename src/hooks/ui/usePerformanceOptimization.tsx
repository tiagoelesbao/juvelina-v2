// src/hooks/ui/usePerformanceOptimization.tsx
import { useEffect, useCallback, useRef } from 'react';

interface UsePerformanceOptimizationOptions {
  threshold?: number;
  onLowPerformance?: () => void;
  onHighPerformance?: () => void;
}

export const usePerformanceOptimization = ({
  threshold = 50, // FPS threshold
  onLowPerformance,
  onHighPerformance
}: UsePerformanceOptimizationOptions = {}) => {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fps = useRef(60);
  const isLowPerformance = useRef(false);
  
  // Detectar FPS
  const measureFPS = useCallback(() => {
    frameCount.current++;
    const currentTime = performance.now();
    
    // Calcular FPS a cada segundo
    if (currentTime >= lastTime.current + 1000) {
      fps.current = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
      
      // Verificar se está abaixo do threshold
      if (fps.current < threshold && !isLowPerformance.current) {
        isLowPerformance.current = true;
        onLowPerformance?.();
        
        // Desabilitar animações pesadas
        document.body.classList.add('reduce-animations');
      } else if (fps.current >= threshold && isLowPerformance.current) {
        isLowPerformance.current = false;
        onHighPerformance?.();
        
        // Reabilitar animações
        document.body.classList.remove('reduce-animations');
      }
      
      frameCount.current = 0;
      lastTime.current = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
  }, [threshold, onLowPerformance, onHighPerformance]);
  
  useEffect(() => {
    const animationFrame = requestAnimationFrame(measureFPS);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      document.body.classList.remove('reduce-animations');
    };
  }, [measureFPS]);
  
  // Função para pausar animações não essenciais
  const pauseNonEssentialAnimations = useCallback(() => {
    // Pausar animações de background
    const backgroundElements = document.querySelectorAll('[data-animation="background"]');
    backgroundElements.forEach(el => {
      (el as HTMLElement).style.animationPlayState = 'paused';
    });
    
    // Pausar partículas
    const particles = document.querySelectorAll('[data-animation="particle"]');
    particles.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
  }, []);
  
  // Função para retomar animações
  const resumeAnimations = useCallback(() => {
    const backgroundElements = document.querySelectorAll('[data-animation="background"]');
    backgroundElements.forEach(el => {
      (el as HTMLElement).style.animationPlayState = 'running';
    });
    
    const particles = document.querySelectorAll('[data-animation="particle"]');
    particles.forEach(el => {
      (el as HTMLElement).style.display = 'block';
    });
  }, []);
  
  // Intersection Observer para pausar animações fora da viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.style.animationPlayState = 'running';
          } else {
            element.style.animationPlayState = 'paused';
          }
        });
      },
      { 
        rootMargin: '50px',
        threshold: 0.1 
      }
    );
    
    // Observar elementos animados
    const animatedElements = document.querySelectorAll('[data-animated="true"]');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return {
    fps: fps.current,
    isLowPerformance: isLowPerformance.current,
    pauseNonEssentialAnimations,
    resumeAnimations
  };
};

// CSS para adicionar ao index.css
export const performanceStyles = `
/* Reduzir animações quando performance baixa */
.reduce-animations * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

.reduce-animations .video-carousel-item:hover {
  transform: none !important;
}

.reduce-animations [data-animation="background"],
.reduce-animations [data-animation="particle"] {
  animation: none !important;
}

/* Otimizações de scroll */
.optimized-scroll {
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

/* Desabilitar efeitos em scroll */
.scrolling * {
  pointer-events: none !important;
}

.scrolling .video-carousel-item {
  will-change: auto !important;
}
`;