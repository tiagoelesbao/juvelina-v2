// src/components/ui/TikTokViralBadge.tsx
import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PerformanceContext } from '../../App';

interface TikTokViralBadgeProps {
  views?: string;
  position?: 'top-left' | 'top-right' | 'custom';
  positionClass?: string; // Para posicionamento customizado
  className?: string;
}

const TikTokViralBadge: React.FC<TikTokViralBadgeProps> = ({
  views = '+2M de visualizações',
  position = 'top-right',
  positionClass = '',
  className = ''
}) => {
  const { isMobile, isLowEnd, reduceMotion } = useContext(PerformanceContext);
  
  // Determinar a classe de posição
  const getPositionClass = () => {
    if (positionClass) return positionClass;
    
    switch (position) {
      case 'top-left':
        return 'absolute -top-16 left-0';
      case 'top-right':
        return 'absolute -top-16 right-0';
      default:
        return '';
    }
  };

  // Animações simplificadas para low-end devices
  const getAnimationVariants = () => {
    if (isLowEnd || reduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
      };
    }

    // Variantes para as animações de pulsar
    const pulseVariants = {
      pulse: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        boxShadow: [
          "0px 4px 10px rgba(0, 0, 0, 0.1)",
          "0px 6px 15px rgba(0, 0, 0, 0.2)",
          "0px 4px 10px rgba(0, 0, 0, 0.1)"
        ],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse" as const
        }
      }
    };

    // Variantes para o efeito de brilho
    const glowVariants = {
      glow: {
        opacity: [0.7, 1, 0.7],
        filter: [
          "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.2))",
          "drop-shadow(0px 0px 5px rgba(238, 29, 82, 0.5))",
          "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.2))"
        ],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse" as const
        }
      }
    };

    // Efeito de piscar para "Viral"
    const blinkTextVariants = {
      blink: {
        color: ["#000000", "#EE1D52", "#000000"],
        textShadow: [
          "0px 0px 0px rgba(238, 29, 82, 0)",
          "0px 0px 5px rgba(238, 29, 82, 0.7)",
          "0px 0px 0px rgba(238, 29, 82, 0)"
        ],
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse" as const
        }
      }
    };

    return { pulseVariants, glowVariants, blinkTextVariants };
  };

  const animations = getAnimationVariants();

  return (
    <motion.div
      className={`z-10 ${getPositionClass()} ${className}`}
      initial={{ opacity: 0, y: -30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: reduceMotion ? "tween" : "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5,
        duration: reduceMotion ? 0.3 : undefined
      }}
    >
      <motion.div
        className="bg-white rounded-full shadow-xl flex items-center p-3 gap-2"
        variants={!isLowEnd && !reduceMotion && 'pulseVariants' in animations ? animations.pulseVariants : undefined}
        animate={!isLowEnd && !reduceMotion ? "pulse" : undefined}
        whileHover={!reduceMotion ? { scale: 1.1, transition: { duration: 0.3 } } : undefined}
      >
        <motion.div 
          className="w-10 h-10 bg-black rounded-full flex items-center justify-center"
          variants={!isLowEnd && !reduceMotion && 'glowVariants' in animations ? animations.glowVariants : undefined}
          animate={!isLowEnd && !reduceMotion ? "glow" : undefined}
        >
          {/* TikTok Icon */}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" 
            fill="currentColor"/>
          </svg>
        </motion.div>
        <div className="flex flex-col">
          <motion.span 
            className="font-bold text-sm"
            variants={!isLowEnd && !reduceMotion && 'blinkTextVariants' in animations ? animations.blinkTextVariants : undefined}
            animate={!isLowEnd && !reduceMotion ? "blink" : undefined}
          >
            Viral no TikTok
          </motion.span>
          <span className="text-xs text-gray-500">{views}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TikTokViralBadge;