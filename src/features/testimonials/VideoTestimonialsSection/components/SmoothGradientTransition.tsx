// src/features/testimonials/VideoTestimonialsSection/components/SmoothGradientTransition.tsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SmoothGradientTransitionProps {
  fromColor: string;
  toColor: string;
  height?: number;
  variant?: 'smooth' | 'organic' | 'elegant';
  className?: string;
}

const SmoothGradientTransition: React.FC<SmoothGradientTransitionProps> = ({
  fromColor = '#ffffff',
  toColor = '#C2F7BC',
  height = 200,
  variant = 'organic',
  className = ''
}) => {
  const { scrollYProgress } = useScroll();
  
  // Animações mais suaves para as ondas
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], [0, -3]);
  
  // Opacidades dinâmicas para transição mais suave
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [0.15, 0.25]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5], [0.25, 0.35]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.5]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: `${height}px` }}>
      <svg 
        viewBox={`0 0 1440 ${height}`}
        className="absolute bottom-0 w-full h-full" 
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradiente principal com transição ultra suave */}
          <linearGradient id="smoothTransitionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0" />
            <stop offset="15%" stopColor={fromColor} stopOpacity="0.05" />
            <stop offset="30%" stopColor={toColor} stopOpacity="0.1" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.2" />
            <stop offset="70%" stopColor={toColor} stopOpacity="0.4" />
            <stop offset="85%" stopColor={toColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={toColor} stopOpacity="1" />
          </linearGradient>
          
          {/* Gradiente secundário para camadas adicionais */}
          <linearGradient id="layerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.08" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.15" />
          </linearGradient>
          
          {/* Gradiente horizontal para profundidade */}
          <linearGradient id="horizontalDepth" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0.02" />
            <stop offset="20%" stopColor={toColor} stopOpacity="0.05" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.08" />
            <stop offset="80%" stopColor={toColor} stopOpacity="0.05" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.02" />
          </linearGradient>
          
          {/* Filtros para suavidade */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="softBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        
        {/* Camada base - gradiente sólido suave */}
        <rect 
          x="0" 
          y="0" 
          width="1440" 
          height={height}
          fill="url(#smoothTransitionGradient)"
        />
        
        {/* Camada 1 - Onda muito suave e orgânica */}
        <motion.path 
          d={`
            M0,${height * 0.7} 
            Q180,${height * 0.6} 360,${height * 0.65}
            T720,${height * 0.68}
            Q900,${height * 0.72} 1080,${height * 0.7}
            T1440,${height * 0.7}
            L1440,${height} L0,${height} Z
          `}
          fill="url(#layerGradient)"
          style={{
            y: wave1Y,
            opacity: opacity1
          }}
          filter="url(#softBlur)"
        />
        
        {/* Camada 2 - Onda intermediária */}
        <motion.path 
          d={`
            M0,${height * 0.75}
            Q240,${height * 0.68} 480,${height * 0.73}
            T960,${height * 0.75}
            Q1200,${height * 0.78} 1440,${height * 0.75}
            L1440,${height} L0,${height} Z
          `}
          fill="url(#layerGradient)"
          style={{
            y: wave2Y,
            opacity: opacity2
          }}
        />
        
        {/* Camada 3 - Onda frontal muito sutil */}
        <motion.path 
          d={`
            M0,${height * 0.8}
            C120,${height * 0.78} 240,${height * 0.82} 360,${height * 0.8}
            S600,${height * 0.78} 720,${height * 0.8}
            S960,${height * 0.82} 1080,${height * 0.8}
            S1320,${height * 0.78} 1440,${height * 0.8}
            L1440,${height} L0,${height} Z
          `}
          fill="url(#horizontalDepth)"
          style={{
            y: wave3Y,
            opacity: opacity3
          }}
        />
        
        {/* Efeito de luz suave */}
        <motion.ellipse
          cx="720"
          cy={height * 0.5}
          rx="600"
          ry="150"
          fill={toColor}
          opacity="0.05"
          filter="url(#glow)"
          animate={{
            opacity: [0.05, 0.08, 0.05],
            ry: [150, 180, 150]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Partículas orgânicas muito sutis */}
        {variant === 'organic' && [...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={400 + i * 300}
            cy={height * 0.6 + Math.sin(i * 1.5) * 20}
            r="2"
            fill={toColor}
            opacity="0.15"
            filter="url(#softBlur)"
            animate={{
              y: [-3, 3, -3],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
      
      {/* Overlay de gradiente adicional para suavizar ainda mais */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 40%,
              ${toColor}08 70%,
              ${toColor}15 100%
            )
          `
        }}
      />
    </div>
  );
};

export default SmoothGradientTransition;