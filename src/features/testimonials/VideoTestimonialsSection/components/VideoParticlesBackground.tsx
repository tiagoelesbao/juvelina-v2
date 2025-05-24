// src/features/testimonials/VideoParticlesBackground.tsx
import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface VideoParticlesBackgroundProps {
  scrollYProgress: MotionValue<number>;
}

const VideoParticlesBackground: React.FC<VideoParticlesBackgroundProps> = ({ scrollYProgress }) => {
  // Efeitos condicionados ao scroll
  const blob1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const blob2X = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const blobCentralOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.8]);

  return (
    <motion.div className="absolute inset-0 pointer-events-none z-0">
      {/* Fundo sólido para garantir transição */}
      <div className="absolute inset-0" style={{ background: "#C2F7BC" }} />

      {/* Blob esverdeado topo/esquerda */}
      <motion.div
        className="absolute top-10 -left-32 w-[560px] h-[560px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(194,247,188,0.55) 0%, rgba(194,247,188,0.2) 60%, transparent 80%)",
          filter: "blur(40px)",
          scale: blob1Scale,
        }}
        animate={{
          x: [-80, 80, -80],
          y: [-30, 90, -30],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* Blob dourado direita/baixo */}
      <motion.div
        className="absolute bottom-20 right-10 w-[420px] h-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(169,104,61,0.13) 0%, rgba(169,104,61,0.06) 45%, transparent 80%)",
          filter: "blur(60px)",
          x: blob2X
        }}
        animate={{
          y: [40, -80, 40],
          scale: [1.1, 1.3, 1.1],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* Blob central (translúcido) */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[480px] h-[320px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(194,247,188,0.33) 0%, transparent 70%)",
          filter: "blur(70px)",
          opacity: blobCentralOpacity
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* Partículas flutuantes, visíveis e animadas */}
      {[...Array(12)].map((_, i) => {
        // Cada partícula animada em eixo Y, diferente velocidade e cor
        const particleY = useTransform(scrollYProgress, [0, 1], [0, -(50 + i * 8)]);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? '16px' : i % 2 === 0 ? '9px' : '12px',
              height: i % 3 === 0 ? '16px' : i % 2 === 0 ? '9px' : '12px',
              background: i % 4 === 0
                ? 'rgba(169,104,61,0.31)'
                : i % 3 === 1
                  ? 'rgba(194,247,188,0.5)'
                  : 'rgba(155,208,210,0.41)',
              left: `${10 + i * 7}%`,
              top: `${12 + (i % 5) * 18}%`,
              boxShadow: '0 0 20px rgba(194,247,188,0.35)',
              y: particleY,
              zIndex: 0
            }}
            animate={{
              x: [-18, 18, -18],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.23, 1]
            }}
            transition={{
              duration: 8 + i * 1.3,
              repeat: Infinity,
              delay: i * 0.33,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Faixa de luz suave embaixo */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/4"
        style={{
          background: "linear-gradient(to top, rgba(194,247,188,0.16) 0%, transparent 100%)",
        }}
        animate={{
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
};

export default VideoParticlesBackground;
