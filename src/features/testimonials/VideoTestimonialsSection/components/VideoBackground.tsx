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
      {/* BASE SÓLIDA */}
      <div 
        className="absolute inset-0"
        style={{
          background: `#C2F7BC`,  // Fundo sólido!
        }}
      />
      
      {/* Camada de luz ambiente suave (opcional, bem sutil) */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 0%,
              rgba(194, 247, 188, 0.12) 0%,
              transparent 55%
            )
          `
        }}
      />

      {/* ...restante dos blobs, partículas e textura igual ao original... */}
    </motion.div>
  );
};

export default VideoBackground;
