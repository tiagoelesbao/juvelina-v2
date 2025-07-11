// src/components/ui/PerformanceOptimizedSection.tsx
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface PerformanceOptimizedSectionProps {
  children: React.ReactNode;
  className?: string;
  enableGPUAcceleration?: boolean;
  enableWillChange?: boolean;
  threshold?: number;
  rootMargin?: string;
  reducedMotion?: boolean;
}

const PerformanceOptimizedSection: React.FC<PerformanceOptimizedSectionProps> = ({
  children,
  className = '',
  enableGPUAcceleration = true,
  enableWillChange = true,
  threshold = 0.1,
  rootMargin = '50px 0px',
  reducedMotion = false
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Configurar GPU acceleration
  const sectionStyle: React.CSSProperties = {
    ...(enableGPUAcceleration && {
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'
    }),
    ...(enableWillChange && !hasAnimated && {
      willChange: 'opacity, transform'
    }),
    ...(hasAnimated && {
      willChange: 'auto'
    })
  };

  // Callback otimizado para intersection
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsInView(true);
        setHasAnimated(true);
        
        // Limpar will-change após animação
        setTimeout(() => {
          if (sectionRef.current) {
            sectionRef.current.style.willChange = 'auto';
          }
        }, 1000);
        
        // Desconectar observer após primeira animação
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    });
  }, [hasAnimated]);

  // Setup intersection observer
  useEffect(() => {
    if (reducedMotion) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold, rootMargin, reducedMotion]);

  // Variantes de animação otimizadas
  const variants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 30,
      scale: reducedMotion ? 1 : 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.6,
        ease: "easeOut",
        staggerChildren: reducedMotion ? 0 : 0.1
      }
    }
  };

  if (reducedMotion) {
    return (
      <div
        ref={sectionRef}
        className={className}
        style={sectionStyle}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={sectionRef}
      className={className}
      style={sectionStyle}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      viewport={{ once: true, amount: threshold }}
    >
      {children}
    </motion.div>
  );
};

export default PerformanceOptimizedSection;