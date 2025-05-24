// src/features/testimonials/VideoTestimonialsSection/components/VideoBackground.tsx
import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface VideoBackgroundProps {
  scrollYProgress: MotionValue<number>;
  backgroundY: MotionValue<string>;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ scrollYProgress, backgroundY }) => {
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none"
      style={{ y: backgroundY }}
    >
      {/* Camada de luz ambiente suave */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 0%,
              rgba(194, 247, 188, 0.15) 0%,
              transparent 50%
            )
          `
        }}
      />
      
      {/* Blob orgânico 1 - Movimento mais sutil */}
      <motion.div 
        className="absolute top-10 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(194, 247, 188, 0.4) 0%,
              rgba(194, 247, 188, 0.2) 30%,
              transparent 70%
            )
          `,
          filter: "blur(60px)"
        }}
        animate={{
          x: [-50, 100, -50],
          y: [-30, 50, -30],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Blob orgânico 2 - Cor dourada sutil */}
      <motion.div 
        className="absolute bottom-20 right-0 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: `
            radial-gradient(
              circle at 70% 70%,
              rgba(169, 104, 61, 0.08) 0%,
              rgba(169, 104, 61, 0.04) 40%,
              transparent 70%
            )
          `,
          filter: "blur(80px)"
        }}
        animate={{
          x: [0, -80, 0],
          y: [30, -50, 30],
          scale: [1.1, 1.3, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Blob central - Muito sutil */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[300px] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              rgba(194, 247, 188, 0.3) 0%,
              transparent 50%
            )
          `,
          filter: "blur(100px)"
        }}
        animate={{
          scale: [0.9, 1.1, 0.9],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Partículas flutuantes melhoradas */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? '6px' : '4px',
              height: i % 2 === 0 ? '6px' : '4px',
              background: i % 3 === 0 
                ? 'rgba(169, 104, 61, 0.3)' 
                : 'rgba(194, 247, 188, 0.4)',
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i % 3) * 25}%`,
              boxShadow: '0 0 10px rgba(194, 247, 188, 0.3)'
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Padrão de textura muito sutil */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A9683D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
    </motion.div>
  );
};

export default VideoBackground;