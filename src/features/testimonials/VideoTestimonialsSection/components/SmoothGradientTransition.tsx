// src/features/testimonials/VideoTestimonialsSection/components/SmoothGradientTransition.tsx

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SmoothGradientTransitionProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
  className?: string;
}

const SmoothGradientTransition: React.FC<SmoothGradientTransitionProps> = ({
  fromColor = '#ffffff',
  toColor = '#C2F7BC',
  height = 250,
  className = ''
}) => {
  const { scrollYProgress } = useScroll();

  // Animações suaves das ondas
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const wave3Y = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const wave4Y = useTransform(scrollYProgress, [0, 1], [0, -2]);

  // Opacidades das camadas
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [0.08, 0.15]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5], [0.12, 0.2]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.5], [0.18, 0.28]);
  const opacity4 = useTransform(scrollYProgress, [0, 0.5], [0.25, 0.35]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradiente principal ultra smooth */}
          <linearGradient id="ultraSmoothGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0" />
            <stop offset="5%" stopColor={fromColor} stopOpacity="0.01" />
            <stop offset="10%" stopColor={fromColor} stopOpacity="0.02" />
            <stop offset="20%" stopColor={toColor} stopOpacity="0.05" />
            <stop offset="30%" stopColor={toColor} stopOpacity="0.08" />
            <stop offset="40%" stopColor={toColor} stopOpacity="0.12" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.18" />
            <stop offset="60%" stopColor={toColor} stopOpacity="0.26" />
            <stop offset="70%" stopColor={toColor} stopOpacity="0.36" />
            <stop offset="80%" stopColor={toColor} stopOpacity="0.5" />
            <stop offset="85%" stopColor={toColor} stopOpacity="0.7" />
            <stop offset="92%" stopColor={toColor} stopOpacity="0.8" />
            <stop offset="97%" stopColor={toColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={toColor} stopOpacity="1" />
          </linearGradient>

          {/* Camadas extras para profundidade */}
          <linearGradient id="layer1Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0" />
            <stop offset="30%" stopColor={toColor} stopOpacity="0.03" />
            <stop offset="60%" stopColor={toColor} stopOpacity="0.06" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="layer2Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0" />
            <stop offset="40%" stopColor={toColor} stopOpacity="0.04" />
            <stop offset="70%" stopColor={toColor} stopOpacity="0.08" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="layer3Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.05" />
            <stop offset="80%" stopColor={toColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.15" />
          </linearGradient>
          {/* Névoa */}
          <radialGradient id="mistGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={toColor} stopOpacity="0.08" />
            <stop offset="50%" stopColor={toColor} stopOpacity="0.04" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0" />
          </radialGradient>
          {/* Blur */}
          <filter id="ultraSoftBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
          <filter id="gentleGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Camada base - gradiente principal */}
        <rect
          x="0"
          y="0"
          width="1440"
          height={height}
          fill="url(#ultraSmoothGradient)"
        />

        {/* Camada 1 - Onda longa */}
        <motion.path
          d={`
            M0,${height * 0.55}
            C120,${height * 0.5} 240,${height * 0.52} 360,${height * 0.54}
            S600,${height * 0.51} 720,${height * 0.53}
            S960,${height * 0.52} 1080,${height * 0.54}
            S1320,${height * 0.51} 1440,${height * 0.55}
            L1440,${height} L0,${height} Z
          `}
          fill="url(#layer1Gradient)"
          style={{
            y: wave1Y,
            opacity: opacity1
          }}
          filter="url(#ultraSoftBlur)"
        />
        {/* Camada 2 */}
        <motion.path
          d={`
            M0,${height * 0.65}
            Q120,${height * 0.6} 240,${height * 0.63}
            T480,${height * 0.64}
            Q600,${height * 0.62} 720,${height * 0.64}
            T960,${height * 0.63}
            Q1080,${height * 0.61} 1200,${height * 0.64}
            T1440,${height * 0.65}
            L1440,${height} L0,${height} Z
          `}
          fill="url(#layer2Gradient)"
          style={{
            y: wave2Y,
            opacity: opacity2
          }}
          filter="url(#ultraSoftBlur)"
        />
        {/* Camada 3 */}
        <motion.path
          d={`
            M0,${height * 0.72}
            C180,${height * 0.69} 360,${height * 0.71} 540,${height * 0.7}
            S900,${height * 0.68} 1080,${height * 0.71}
            S1260,${height * 0.7} 1440,${height * 0.72}
            L1440,${height} L0,${height} Z
          `}
          fill="url(#layer3Gradient)"
          style={{
            y: wave3Y,
            opacity: opacity3
          }}
        />
        {/* Camada 4 */}
        <motion.path
          d={`
            M0,${height * 0.78}
            Q180,${height * 0.76} 360,${height * 0.77}
            T720,${height * 0.775}
            Q900,${height * 0.765} 1080,${height * 0.775}
            T1440,${height * 0.78}
            L1440,${height} L0,${height} Z
          `}
          fill={toColor}
          style={{
            y: wave4Y,
            opacity: opacity4
          }}
          filter="url(#ultraSoftBlur)"
        />

        {/* Névoa e brilho */}
        <motion.ellipse
          cx="720"
          cy={height * 0.4}
          rx="800"
          ry="200"
          fill="url(#mistGradient)"
          filter="url(#gentleGlow)"
          animate={{
            opacity: [0.05, 0.1, 0.05],
            ry: [200, 250, 200],
            rx: [800, 850, 800]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.ellipse
          cx="360"
          cy={height * 0.6}
          rx="400"
          ry="100"
          fill={toColor}
          opacity="0.03"
          filter="url(#gentleGlow)"
          animate={{
            opacity: [0.03, 0.06, 0.03],
            cx: [360, 1080, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Overlay extra para blend perfeito */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 60%,
              ${toColor}CC 85%,
              ${toColor}FF 100%
            )
          `
        }}
      />

      {/* Camada de névoa adicional */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 100%,
              ${toColor}15 0%,
              transparent 60%
            )
          `
        }}
      />
    </div>
  );
};

export default SmoothGradientTransition;
