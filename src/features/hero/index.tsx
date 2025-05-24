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
      setInView(true); // Pular animação em dispositivos fracos
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

  // Variantes de animação baseadas no dispositivo
  const getBackgroundStyle = () => {
    // IMPORTANTE: Garantir que sempre tenha um fundo sólido
    const baseBackground = '#ffffff'; // Fundo branco sólido como base
    
    if (isMobile || isLowEnd) {
      // Mobile: gradiente simples e sólido
      return {
        backgroundColor: baseBackground,
        backgroundImage: `linear-gradient(180deg, 
          #ffffff 0%, 
          #fffdf4 40%, 
          #f5fdf3 80%, 
          #e8fbe5 100%)`
      };
    }
    
    // Desktop: gradiente mais complexo mas ainda sólido
    return {
      backgroundColor: baseBackground,
      backgroundImage: `linear-gradient(135deg, 
        #fffdf4 0%, 
        #ffffff 30%, 
        #f8fef6 60%, 
        #e8fbe5 100%)`
    };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pb-20 md:pb-0 hero-section"
      style={getBackgroundStyle()}
    >
      {/* Elementos de fundo - Apenas Desktop e não low-end */}
      {!isMobile && !isTablet && !isLowEnd && !reduceMotion && (
        <>
          {/* Blob 1 - Superior direito (sem animação se reduceMotion) */}
          <div 
            className="absolute rounded-full opacity-10"
            style={{
              width: '500px',
              height: '500px',
              background: "radial-gradient(circle, rgba(169,104,61,0.15) 0%, transparent 70%)",
              top: '-100px',
              right: '-150px',
              filter: 'blur(40px)'
            }}
          />
          
          {/* Blob 2 - Inferior esquerdo */}
          <div 
            className="absolute rounded-full opacity-10"
            style={{
              width: '400px',
              height: '400px',
              background: "radial-gradient(circle, rgba(194,247,188,0.2) 0%, transparent 70%)",
              bottom: '-100px',
              left: '-100px',
              filter: 'blur(40px)'
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
                transparent 40%
              ),
              radial-gradient(
                ellipse at bottom left,
                rgba(194,247,188,0.08) 0%,
                transparent 40%
              )
            `,
            pointerEvents: 'none'
          }}
        />
      )}
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Conteúdo com animações condicionais */}
          <motion.div 
            className="order-2 md:order-1"
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduceMotion ? {} : { duration: 0.5 }}
          >
            <HeroHeading />
            <HeroButtons onCtaClick={onCtaClick} />
            
            {/* Stats com animação reduzida em mobile */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduceMotion ? {} : { delay: 0.6, duration: 0.5 }}
            >
              <HeroStats stats={stats} inView={inView} />
            </motion.div>
          </motion.div>
          
          {/* Imagem do Hero */}
          <motion.div 
            className="md:col-span-1 order-1 md:order-2 relative hero-image-container"
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduceMotion ? {} : { duration: 0.5 }}
          >
            <HeroImage />
          </motion.div>
        </div>
      </div>
      
      {/* Indicador de scroll - ocultar em mobile se motion reduzido */}
      {(!isMobile || !reduceMotion) && (
        <div className="mb-16 md:mb-0">
          <ScrollIndicator />
        </div>
      )}
    </section>
  );
};

export default HeroSection;