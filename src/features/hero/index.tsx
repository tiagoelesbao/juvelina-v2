// src/features/hero/index.tsx
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PerformanceContext } from '../../App';
import HeroHeading from './components/HeroHeading';
import HeroButtons from './components/HeroButtons';
import HeroStats from './components/HeroStats';
import HeroImage from './components/HeroImage';
import ScrollIndicator from './components/ScrollIndicator';
import WaveTransition from '../../components/ui/WaveTransition';

interface HeroSectionProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const { isMobile, isLowEnd } = useContext(PerformanceContext);

  return (
    <section className="hero-section bg-white">
      {/* Container principal com classes específicas para mobile */}
      <div className="hero-content relative">
        {/* Espaçador mobile no topo */}
        <div className="hero-top-spacer md:hidden"></div>
        
        {/* Background decorativo - apenas desktop e dispositivos com boa performance */}
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
        
        {/* Container interno para o conteúdo */}
        <div className="hero-inner">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Conteúdo de texto */}
              <motion.div 
                className="order-2 md:order-1 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroHeading />
                <HeroButtons onCtaClick={onCtaClick} />
                
                {/* Stats - apenas mobile com lazy loading via intersection observer interno */}
                {isMobile && (
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <HeroStats />
                  </motion.div>
                )}
              </motion.div>
              
              {/* Imagem do produto */}
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
          
          {/* Indicador de scroll - apenas desktop */}
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
        
        {/* Espaçador mobile no bottom */}
        <div className="hero-bottom-spacer md:hidden"></div>
      </div>

      {/* Transição wave para próxima seção */}
      <WaveTransition 
        color="#C2F7BC" 
        height={120}
        variant="dramatic"
      />
    </section>
  );
};

export default HeroSection;