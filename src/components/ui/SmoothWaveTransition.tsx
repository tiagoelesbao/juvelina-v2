// src/components/ui/SmoothWaveTransition.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface SmoothWaveTransitionProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
  variant?: 'smooth' | 'organic' | 'dramatic';
}

const SmoothWaveTransition: React.FC<SmoothWaveTransitionProps> = ({
  fromColor = '#ffffff',
  toColor = '#f0fdf4',
  height = 120,
  className = '',
  variant = 'smooth'
}) => {
  const getPath = () => {
    switch (variant) {
      case 'smooth':
        return "M0,60 C240,45 480,75 720,60 C960,45 1200,70 1440,60 L1440,120 L0,120 Z";
      case 'organic':
        return "M0,40 C180,80 420,20 600,60 C780,100 1020,40 1200,70 C1320,85 1380,75 1440,80 L1440,120 L0,120 Z";
      case 'dramatic':
        return "M0,20 C360,100 720,20 1080,80 C1260,110 1350,90 1440,100 L1440,120 L0,120 Z";
      default:
        return "M0,60 C240,45 480,75 720,60 C960,45 1200,70 1440,60 L1440,120 L0,120 Z";
    }
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: `${height}px`, marginTop: '-2px' }}>
      <svg 
        viewBox="0 0 1440 120" 
        className="absolute bottom-0 w-full h-full" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="1" />
            <stop offset="50%" stopColor={fromColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={toColor} stopOpacity="1" />
          </linearGradient>
          
          {/* Gradiente adicional para efeito de profundidade */}
          <linearGradient id="waveGradientOverlay" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0.3" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Camada principal */}
        <motion.path 
          d={getPath()}
          fill="url(#waveGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Camada de overlay para suavidade extra */}
        <motion.path 
          d={getPath()}
          fill="url(#waveGradientOverlay)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        
        {/* Partículas flutuantes opcionais */}
        {variant === 'organic' && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx={300 + i * 200}
                cy={60 + Math.sin(i) * 20}
                r="3"
                fill={toColor}
                opacity="0.3"
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </>
        )}
      </svg>
      
      {/* Efeito de brilho sutil */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${toColor}40 50%, transparent 100%)`,
          filter: 'blur(40px)'
        }}
      />
    </div>
  );
};

export default SmoothWaveTransition;