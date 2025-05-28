// src/components/ui/WaveTransition.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface WaveTransitionProps {
  color?: string;
  className?: string;
  height?: number;
  animated?: boolean;
  variant?: 'smooth' | 'dramatic';
}

const WaveTransition: React.FC<WaveTransitionProps> = ({ 
  color = '#C2F7BC', 
  className = '',
  height = 120,
  animated = true,
  variant = 'dramatic'
}) => {
  if (variant === 'smooth') {
    // Versão suave original
    return (
      <div className={`w-full overflow-hidden ${className}`} style={{ marginTop: '-2px', marginBottom: '-2px' }}>
        <svg 
          viewBox={`0 0 1440 ${height}`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          style={{ height: `${height}px` }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          
          <motion.path 
            d="M0,40 C240,80 480,20 720,40 C960,60 1200,30 1440,40 L1440,120 L0,120 Z" 
            fill={color}
            fillOpacity="0.1"
            initial={{ d: "M0,40 C240,80 480,20 720,40 C960,60 1200,30 1440,40 L1440,120 L0,120 Z" }}
            animate={animated ? {
              d: [
                "M0,40 C240,80 480,20 720,40 C960,60 1200,30 1440,40 L1440,120 L0,120 Z",
                "M0,50 C240,70 480,30 720,50 C960,70 1200,40 1440,50 L1440,120 L0,120 Z",
                "M0,40 C240,80 480,20 720,40 C960,60 1200,30 1440,40 L1440,120 L0,120 Z"
              ]
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.path 
            d="M0,60 C360,30 720,90 1080,60 C1260,45 1350,50 1440,60 L1440,120 L0,120 Z" 
            fill={color}
            fillOpacity="0.15"
            initial={{ d: "M0,60 C360,30 720,90 1080,60 C1260,45 1350,50 1440,60 L1440,120 L0,120 Z" }}
            animate={animated ? {
              d: [
                "M0,60 C360,30 720,90 1080,60 C1260,45 1350,50 1440,60 L1440,120 L0,120 Z",
                "M0,65 C360,35 720,85 1080,65 C1260,50 1350,55 1440,65 L1440,120 L0,120 Z",
                "M0,60 C360,30 720,90 1080,60 C1260,45 1350,50 1440,60 L1440,120 L0,120 Z"
              ]
            } : {}}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          <motion.path 
            d="M0,80 C180,60 360,100 540,80 C720,60 900,100 1080,80 C1260,60 1350,70 1440,80 L1440,120 L0,120 Z" 
            fill="url(#waveGradient)"
            initial={{ d: "M0,80 C180,60 360,100 540,80 C720,60 900,100 1080,80 C1260,60 1350,70 1440,80 L1440,120 L0,120 Z" }}
            animate={animated ? {
              d: [
                "M0,80 C180,60 360,100 540,80 C720,60 900,100 1080,80 C1260,60 1350,70 1440,80 L1440,120 L0,120 Z",
                "M0,85 C180,65 360,95 540,85 C720,65 900,95 1080,85 C1260,65 1350,75 1440,85 L1440,120 L0,120 Z",
                "M0,80 C180,60 360,100 540,80 C720,60 900,100 1080,80 C1260,60 1350,70 1440,80 L1440,120 L0,120 Z"
              ]
            } : {}}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <rect 
            x="0" 
            y={height - 20} 
            width="1440" 
            height="20" 
            fill={color}
            fillOpacity="1"
          />
        </svg>
      </div>
    );
  }

  // Versão dramática com dobras
  return (
    <div className={`w-full overflow-hidden absolute bottom-0 left-0 ${className}`} 
         style={{ marginTop: '-1px', marginBottom: '-1px' }}>
      <svg 
        viewBox="0 0 1440 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
        style={{ height: '120px' }}
      >
        {/* Camada 1 - Onda suave de fundo */}
        <motion.path
          d="M0,40 C240,80 480,20 720,40 C960,60 1200,30 1440,40 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity="0.1"
          animate={animated ? {
            d: [
              "M0,40 C240,80 480,20 720,40 C960,60 1200,30 1440,40 L1440,120 L0,120 Z",
              "M0,45 C240,75 480,25 720,45 C960,65 1200,35 1440,45 L1440,120 L0,120 Z",
              "M0,40 C240,80 480,20 720,40 C960,60 1200,30 1440,40 L1440,120 L0,120 Z"
            ]
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Camada 2 - Onda média */}
        <motion.path
          d="M0,60 C360,30 720,90 1080,60 C1260,45 1350,50 1440,60 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity="0.15"
          animate={animated ? {
            d: [
              "M0,60 C360,30 720,90 1080,60 C1260,45 1350,50 1440,60 L1440,120 L0,120 Z",
              "M0,55 C360,25 720,85 1080,55 C1260,40 1350,45 1440,55 L1440,120 L0,120 Z",
              "M0,60 C360,30 720,90 1080,60 C1260,45 1350,50 1440,60 L1440,120 L0,120 Z"
            ]
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Camada 3 - Linha final sólida (efeito de dobra) */}
        <motion.path
          d="M0,118 Q720,90 1440,118 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity="1"
          animate={animated ? {
            d: [
              "M0,118 Q720,90 1440,118 L1440,120 L0,120 Z",
              "M0,115 Q720,85 1440,115 L1440,120 L0,120 Z",
              "M0,118 Q720,90 1440,118 L1440,120 L0,120 Z"
            ]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </svg>
    </div>
  );
};

export default WaveTransition;