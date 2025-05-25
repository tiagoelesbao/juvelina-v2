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
    { id: 1, value: 0, target: 12500, label: 'Clientes Satisfeitos', icon: '✨' },
    { id: 2, value: 0, target: 25, label: 'Nutrientes Premium', icon: '🌿' },
    { id: 3, value: 0, target: 98, label: 'Taxa de Satisfação', icon: '💚' },
  ];
  
  const { stats } = useCountUp(initialStats, inView);
  
  // Observer otimizado
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

  // Background style baseado no dispositivo
  const getBackgroundStyle = () => {
    const baseBackground = '#ffffff';
    
    if (isMobile || isLowEnd) {
      return {
        backgroundColor: baseBackground,
        backgroundImage: `linear-gradient(180deg, 
          #ffffff 0%, 
          #fffdf8 30%,
          #fafdf9 60%, 
          #f2fcf1 100%)`
      };
    }
    
    return {
      backgroundColor: baseBackground,
      backgroundImage: `linear-gradient(135deg, 
        #fffdf8 0%, 
        #ffffff 25%,
        #fafdf9 50%,
        #f2fcf1 75%,
        #e8fbe5 100%)`
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative hero-section"
      style={getBackgroundStyle()}
    >
      {/* PRIMEIRA VISTA - Container separado com altura total */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background decorativo - Desktop only */}
        {!isMobile && !isTablet && !isLowEnd && !reduceMotion && (
          <>
            {/* Blob 1 - Superior direito */}
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
            
            {/* Blob 2 - Inferior esquerdo */}
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
          </>
        )}
        
        {/* Background simplificado para Mobile */}
        {(isMobile || isLowEnd) && (
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  ellipse at top right,
                  rgba(169,104,61,0.05) 0%,
                  transparent 50%
                ),
                radial-gradient(
                  ellipse at bottom left,
                  rgba(194,247,188,0.08) 0%,
                  transparent 50%
                )
              `,
              pointerEvents: 'none'
            }}
          />
        )}
        
        {/* Container do conteúdo principal */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-12 lg:py-16 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-12 items-center">
            {/* Conteúdo textual */}
            <motion.div 
              className="order-2 md:order-1 text-center md:text-left"
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? {} : { duration: 0.5 }}
            >
              <HeroHeading />
              <HeroButtons onCtaClick={onCtaClick} />
              
              {/* Stats APENAS NO MOBILE */}
              <motion.div
                className="mt-8 md:hidden"
                initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduceMotion ? {} : { delay: 0.6, duration: 0.5 }}
              >
                <HeroStats stats={stats} inView={inView} showTitle={false} />
              </motion.div>
            </motion.div>
            
            {/* Imagem do Hero */}
            <motion.div 
              className="order-1 md:order-2 relative md:-mt-20 lg:-mt-24"
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? {} : { duration: 0.5 }}
            >
              <div className="relative mx-auto max-w-md md:max-w-lg lg:max-w-xl">
                <HeroImage />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Indicador de scroll - na primeira vista */}
        {!isMobile && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <ScrollIndicator />
          </div>
        )}
      </div>

      {/* STATS SECTION - SEGUNDA VISTA, APENAS DESKTOP */}
      {!isMobile && (
        <div className="relative z-10 py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <HeroStats stats={stats} inView={inView} showTitle={true} />
            </motion.div>
          </div>
        </div>
      )}

      {/* Transição de onda - SEMPRE O ÚLTIMO ELEMENTO */}
      <WaveTransition 
        color="#C2F7BC" 
        height={120}
        variant="dramatic"
      />
    </section>
  );
};

export default HeroSection;