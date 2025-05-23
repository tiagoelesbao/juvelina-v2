import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroHeading from './components/HeroHeading';
import HeroButtons from './components/HeroButtons';
import HeroStats from './components/HeroStats';
import HeroImage from './components/HeroImage';
import ScrollIndicator from './components/ScrollIndicator';
import { useCountUp, StatItem } from './hooks/useCountUp';

// Definindo a interface para as props
interface HeroSectionProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  // Estado para controlar a visibilidade de elementos com base na visualização
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  
  // Dados iniciais das estatísticas
  const initialStats: StatItem[] = [
    { id: 1, value: 0, target: 12500, label: 'Clientes Satisfeitos', icon: '👥' },
    { id: 2, value: 0, target: 25, label: 'Nutrientes Premium', icon: '🌿' },
    { id: 3, value: 0, target: 100, label: 'Garantia de Satisfação', icon: '✓' },
  ];
  
  // Hook customizado para animação de contagem
  const { stats } = useCountUp(initialStats, inView);
  
  // Rastreamento de scroll para animações
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Hero section in view - activating animations");
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

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,253,244,0.8) 0%, rgba(255,255,255,0.9) 50%, rgba(194,247,188,0.2) 100%)",
      }}
    >
      {/* ===== ELEMENTOS DE FUNDO ===== */}
      <motion.div 
        className="absolute rounded-full opacity-20"
        style={{
          width: '60vw',
          height: '60vw',
          background: "radial-gradient(circle, rgba(169,104,61,0.1) 0%, transparent 70%)",
          top: '20%',
          right: '-20vw',
          filter: 'blur(60px)'
        }}
      />
      
      <motion.div 
        className="absolute rounded-full opacity-20"
        style={{
          width: '40vw',
          height: '40vw',
          background: "radial-gradient(circle, rgba(194,247,188,0.15) 0%, transparent 70%)",
          bottom: '10%',
          left: '-10vw',
          filter: 'blur(50px)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Efeito de luz central */}
      <div 
        className="absolute rounded-full opacity-30"
        style={{
          width: '30vw',
          height: '30vw',
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)'
        }}
      />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* ===== COLUNA DE TEXTO - ESQUERDA ===== */}
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <HeroHeading />
            <HeroButtons onCtaClick={onCtaClick} />
            <HeroStats stats={stats} inView={inView} />
          </motion.div>
          
          {/* ===== COLUNA DA IMAGEM - DIREITA ===== */}
          <motion.div 
            className="md:col-span-1 order-1 md:order-2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <HeroImage />
          </motion.div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;