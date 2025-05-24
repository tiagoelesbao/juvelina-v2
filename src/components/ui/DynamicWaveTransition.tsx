// src/components/ui/DynamicWaveTransition.tsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DynamicWaveTransitionProps {
  fromColor: string;
  toColor: string;
  className?: string;
  height?: number;
}

const DynamicWaveTransition: React.FC<DynamicWaveTransitionProps> = ({
  fromColor,
  toColor,
  className = '',
  height = 160
}) => {
  const { scrollYProgress } = useScroll();
  
  // Transformações dinâmicas baseadas no scroll
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], [0, -10]);
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.5]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.8]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.5], [1, 1]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: `${height}px`, marginTop: '-2px' }}>
      <svg 
        viewBox={`0 0 1440 ${height}`}
        className="absolute bottom-0 w-full h-full" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradiente principal com transição suave */}
          <linearGradient id="dynamicWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0.2" />
            <stop offset="20%" stopColor={fromColor} stopOpacity="0.5" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={toColor} stopOpacity="1" />
          </linearGradient>
          
          {/* Gradiente para efeito de profundidade */}
          <linearGradient id="depthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0.1" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.1" />
          </linearGradient>
          
          {/* Filtro para suavidade */}
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        
        {/* Camada 1 - Onda de fundo com movimento */}
        <motion.path 
          d={`M0,${height * 0.5} C480,${height * 0.2} 960,${height * 0.8} 1440,${height * 0.5} L1440,${height} L0,${height} Z`}
          fill="url(#dynamicWaveGradient)"
          style={{
            y: wave1Y,
            opacity: opacity1
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Camada 2 - Onda intermediária */}
        <motion.path 
          d={`M0,${height * 0.4} C320,${height * 0.15} 640,${height * 0.65} 960,${height * 0.4} C1280,${height * 0.15} 1360,${height * 0.25} 1440,${height * 0.4} L1440,${height} L0,${height} Z`}
          fill="url(#dynamicWaveGradient)"
          style={{
            y: wave2Y,
            opacity: opacity2
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
        />
        
        {/* Camada 3 - Onda frontal com mais definição */}
        <motion.path 
          d={`M0,${height * 0.3} C240,${height * 0.45} 480,${height * 0.1} 720,${height * 0.3} C960,${height * 0.45} 1200,${height * 0.2} 1440,${height * 0.3} L1440,${height} L0,${height} Z`}
          fill="url(#dynamicWaveGradient)"
          style={{
            y: wave3Y,
            opacity: opacity3
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
        />
        
        {/* Camada de profundidade adicional */}
        <motion.path 
          d={`M0,${height * 0.35} C360,${height * 0.5} 720,${height * 0.2} 1080,${height * 0.35} C1260,${height * 0.45} 1350,${height * 0.4} 1440,${height * 0.35} L1440,${height} L0,${height} Z`}
          fill="url(#depthGradient)"
          filter="url(#blur)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.6 }}
        />
        
        {/* Partículas animadas flutuantes */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={200 + i * 200}
            cy={height * 0.4 + Math.sin(i) * 20}
            r="4"
            fill={toColor}
            opacity="0.4"
            filter="url(#blur)"
            animate={{
              y: [-10, 10, -10],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      {/* Efeito de brilho adicional */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${toColor} 100%)`,
          filter: 'blur(40px)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </div>
  );
};

export default DynamicWaveTransition;