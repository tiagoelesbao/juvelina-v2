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
  
  // Transformações dinâmicas mais suaves baseadas no scroll
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], [0, -5]);
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.4]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.6]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.5], [0.8, 0.9]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: `${height}px`, marginTop: '-2px' }}>
      <svg 
        viewBox={`0 0 1440 ${height}`}
        className="absolute bottom-0 w-full h-full" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradiente principal com transição mais suave */}
          <linearGradient id="dynamicWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0.1" />
            <stop offset="30%" stopColor={fromColor} stopOpacity="0.3" />
            <stop offset="60%" stopColor={toColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={toColor} stopOpacity="1" />
          </linearGradient>
          
          {/* Gradiente para efeito de profundidade */}
          <linearGradient id="depthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0.05" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.05" />
          </linearGradient>
          
          {/* Filtro para suavidade */}
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
        
        {/* Camada 1 - Onda de fundo com movimento suave */}
        <motion.path 
          d={`M0,${height * 0.6} Q360,${height * 0.3} 720,${height * 0.6} T1440,${height * 0.6} L1440,${height} L0,${height} Z`}
          fill="url(#dynamicWaveGradient)"
          style={{
            y: wave1Y,
            opacity: opacity1
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Camada 2 - Onda intermediária */}
        <motion.path 
          d={`M0,${height * 0.5} Q240,${height * 0.25} 480,${height * 0.5} T960,${height * 0.5} Q1200,${height * 0.25} 1440,${height * 0.5} L1440,${height} L0,${height} Z`}
          fill="url(#dynamicWaveGradient)"
          style={{
            y: wave2Y,
            opacity: opacity2
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
        />
        
        {/* Camada 3 - Onda frontal com mais definição */}
        <motion.path 
          d={`M0,${height * 0.4} Q180,${height * 0.5} 360,${height * 0.4} T720,${height * 0.4} Q900,${height * 0.3} 1080,${height * 0.4} T1440,${height * 0.4} L1440,${height} L0,${height} Z`}
          fill="url(#dynamicWaveGradient)"
          style={{
            y: wave3Y,
            opacity: opacity3
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        
        {/* Camada de profundidade adicional mais sutil */}
        <motion.path 
          d={`M0,${height * 0.45} Q360,${height * 0.55} 720,${height * 0.45} T1440,${height * 0.45} L1440,${height} L0,${height} Z`}
          fill="url(#depthGradient)"
          filter="url(#blur)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        />
        
        {/* Partículas animadas flutuantes mais sutis */}
        {[...Array(4)].map((_, i) => (
          <motion.circle
            key={i}
            cx={300 + i * 300}
            cy={height * 0.5 + Math.sin(i) * 15}
            r="3"
            fill={toColor}
            opacity="0.3"
            filter="url(#blur)"
            animate={{
              y: [-5, 5, -5],
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      {/* Efeito de brilho adicional mais sutil */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${toColor} 100%)`,
          filter: 'blur(30px)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </div>
  );
};

export default DynamicWaveTransition;