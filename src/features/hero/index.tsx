// src/features/hero/index.tsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { PerformanceContext } from '../../App';
import HeroHeading from './components/HeroHeading';
import HeroButtons from './components/HeroButtons';
import HeroStats from './components/HeroStats';
import HeroImage from './components/HeroImage';
import ScrollIndicator from './components/ScrollIndicator';
import { useCountUp, StatItem } from './hooks/useCountUp';
import WaveTransition from '../../components/ui/WaveTransition';

interface HeroSectionProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { isMobile, isTablet, reduceMotion, isLowEnd } = useContext(PerformanceContext);
  
  const initialStats: StatItem[] = [
    { id: 1, value: 0, target: 13000, label: 'Vidas Transformadas', icon: '✨' },
    { id: 2, value: 0, target: 25, label: 'Nutrientes Premium', icon: '🌿' },
    { id: 3, value: 0, target: 98, label: 'Taxa de Recompra', icon: '💚' },
    { id: 4, value: 0, target: 47, label: 'Mais Energia', icon: '⚡' },
  ];
  
  const { stats } = useCountUp(initialStats, inView);
  
  useEffect(() => {
    if (isLowEnd) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isLowEnd]);

  return (
    <section 
      ref={sectionRef}
      className="hero-section bg-white"
    >
      {/* Container principal */}
      <div className="hero-content">
        {/* Background decorativo */}
        {!isMobile && !isLowEnd && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute rounded-full opacity-10"
              style={{
                width: '600px',
                height: '600px',
                background: "radial-gradient(circle, rgba(169,104,61,0.15) 0%, transparent 70%)",
                top: '-200px',
                right: '-200px',
                filter: 'blur(60px)'
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute rounded-full opacity-10"
              style={{
                width: '500px',
                height: '500px',
                background: "radial-gradient(circle, rgba(194,247,188,0.2) 0%, transparent 70%)",
                bottom: '-150px',
                left: '-150px',
                filter: 'blur(60px)'
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        )}
        
        {/* Conteúdo centralizado */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Texto */}
            <motion.div 
              className="order-2 md:order-1 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroHeading />
              <HeroButtons onCtaClick={onCtaClick} />
              
              {/* Stats mobile */}
              {isMobile && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <HeroStats stats={stats} inView={inView} showTitle={false} />
                </motion.div>
              )}
            </motion.div>
            
            {/* Imagem */}
            <motion.div 
              className="order-1 md:order-2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeroImage />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        {!isMobile && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <ScrollIndicator />
          </motion.div>
        )}
      </div>

      <div className="h-12 md:h-0" />
      
      {/* Wave transition */}
      <WaveTransition 
        color="#C2F7BC" 
        height={120}
        variant="dramatic"
      />
    </section>
  );
};

export default HeroSection;