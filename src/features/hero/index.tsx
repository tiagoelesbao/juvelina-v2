// src/features/hero/index.tsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { PerformanceContext } from '../../App'; // ou do contexto separado
import HeroHeading from './components/HeroHeading';
import HeroButtons from './components/HeroButtons';
import HeroStats from './components/HeroStats';
import HeroImage from './components/HeroImage';
import ScrollIndicator from './components/ScrollIndicator';
import WaveTransition from '../../components/ui/WaveTransition';
import { useCountUp, StatItem } from './hooks/useCountUp';

interface HeroSectionProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  
  // ===== USAR O PERFORMANCE CONTEXT =====
  const { isMobile, isTablet, reduceMotion } = useContext(PerformanceContext);
  
  const initialStats: StatItem[] = [
    { id: 1, value: 0, target: 12500, label: 'Clientes Satisfeitos', icon: '✨' },
    { id: 2, value: 0, target: 25, label: 'Nutrientes Premium', icon: '🌿' },
    { id: 3, value: 0, target: 98, label: 'Taxa de Satisfação', icon: '💚' },
  ];
  
  const { stats } = useCountUp(initialStats, inView);
  
  useEffect(() => {
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
  }, []);

  // ===== VARIANTES DE ANIMAÇÃO BASEADAS NO DISPOSITIVO =====
  const backgroundBlobVariants = !isMobile && !reduceMotion ? {
    animate: {
      scale: [1, 1.1, 1],
      x: [0, 20, 0],
      y: [0, -30, 0],
    }
  } : {};

  const fadeInVariants = reduceMotion ? {} : {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7 }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pb-20 md:pb-0"
      style={{
        background: isMobile 
          ? "linear-gradient(180deg, rgba(255,253,244,0.9) 0%, rgba(194,247,188,0.15) 100%)" // Gradiente simplificado para mobile
          : "linear-gradient(135deg, rgba(255,253,244,0.8) 0%, rgba(255,255,255,0.9) 40%, rgba(194,247,188,0.15) 70%, rgba(194,247,188,0.2) 100%)",
      }}
    >
      {/* ===== ELEMENTOS DE FUNDO - APENAS DESKTOP ===== */}
      {!isMobile && !isTablet && (
        <>
          {/* Blob 1 - Superior direito */}
          <motion.div 
            className="absolute rounded-full opacity-20"
            style={{
              width: '60vw',
              height: '60vw',
              background: "radial-gradient(circle, rgba(169,104,61,0.1) 0%, transparent 70%)",
              top: '20%',
              right: '-20vw',
              filter: reduceMotion ? 'none' : 'blur(60px)' // Remove blur se motion reduzido
            }}
          />
          
          {/* Blob 2 - Inferior esquerdo com animação condicional */}
          <motion.div 
            className="absolute rounded-full opacity-20"
            style={{
              width: '40vw',
              height: '40vw',
              background: "radial-gradient(circle, rgba(194,247,188,0.15) 0%, transparent 70%)",
              bottom: '10%',
              left: '-10vw',
              filter: reduceMotion ? 'none' : 'blur(50px)'
            }}
            {...backgroundBlobVariants}
            transition={!reduceMotion ? {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            } : {}}
          />
          
          {/* Blob 3 - Central */}
          <div 
            className="absolute rounded-full opacity-30"
            style={{
              width: '30vw',
              height: '30vw',
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: reduceMotion ? 'none' : 'blur(60px)'
            }}
          />
        </>
      )}
      
      {/* ===== VERSÃO MOBILE - BACKGROUND SIMPLIFICADO ===== */}
      {isMobile && (
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at top right,
                rgba(169,104,61,0.08) 0%,
                transparent 50%
              ),
              radial-gradient(
                ellipse at bottom left,
                rgba(194,247,188,0.12) 0%,
                transparent 50%
              )
            `
          }}
        />
      )}
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ===== CONTEÚDO COM ANIMAÇÕES CONDICIONAIS ===== */}
          <motion.div 
            className="order-2 md:order-1"
            {...fadeInVariants}
          >
            <HeroHeading />
            <HeroButtons onCtaClick={onCtaClick} />
            
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduceMotion ? {} : { delay: 0.8, duration: 0.7 }}
            >
              <HeroStats stats={stats} inView={inView} />
            </motion.div>
          </motion.div>
          
          {/* ===== IMAGEM DO HERO ===== */}
          <motion.div 
            className="md:col-span-1 order-1 md:order-2 relative"
            {...fadeInVariants}
          >
            <HeroImage />
          </motion.div>
        </div>
      </div>
      
      {/* ===== INDICADOR DE SCROLL - OCULTAR EM MOBILE SE MOTION REDUZIDO ===== */}
      {(!isMobile || !reduceMotion) && (
        <div className="mb-16 md:mb-0">
          <ScrollIndicator />
        </div>
      )}
      
      {/* ===== TRANSIÇÃO ONDULADA ===== */}
      <WaveTransition 
        color="#C2F7BC" 
        className="absolute bottom-0 left-0 w-full -mb-1"
      />
    </section>
  );
};

export default HeroSection;