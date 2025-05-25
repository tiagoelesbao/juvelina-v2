// src/features/testimonials/VideoTestimonialsSection/index.tsx
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoTestimonial } from './types';
import { videoTestimonials } from './data';
import VideoSectionHeader from './components/VideoSectionHeader';
import VideoCarousel from './components/VideoCarousel';
import VideoModal from './components/VideoModal';
import LiveViewersIndicator from './components/LiveViewersIndicator';

interface VideoTestimonialsSectionProps {
  onCtaClick?: (e?: React.MouseEvent) => void;
}

const VideoTestimonialsSection: React.FC<VideoTestimonialsSectionProps> = ({ onCtaClick }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section 
      ref={sectionRef}
      id="video-depoimentos" 
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(
          rgb(194, 247, 188) 0%, 
          rgba(194, 247, 188, 0.85) 10%, 
          rgba(194, 247, 188, 0.6) 25%, 
          rgba(194, 247, 188, 0.3) 40%, 
          rgba(194, 247, 188, 0.15) 60%, 
          rgba(255, 255, 255, 0.98) 85%, 
          rgb(255, 255, 255) 100%
        )`,
        marginTop: '0px',
        paddingTop: '90px',
        paddingBottom: '80px'
      }}
    >
      {/* Background animado principal */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Base sólida */}
        <div 
          className="absolute inset-0"
          style={{ background: 'rgb(194, 247, 188)' }}
        />
        
        {/* Camada de luz ambiente */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(at 50% 0%, rgba(194, 247, 188, 0.12) 0%, transparent 55%)`
          }}
        />
      </motion.div>

      {/* Background com partículas e blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Base verde mint */}
        <div 
          className="absolute inset-0"
          style={{ background: 'rgb(194, 247, 188)' }}
        />
        
        {/* Blob esverdeado superior esquerdo */}
        <motion.div
          className="absolute top-10 -left-32 w-[560px] h-[560px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(194, 247, 188, 0.55) 0%, rgba(194, 247, 188, 0.2) 60%, transparent 80%)",
            filter: "blur(40px)",
          }}
          animate={{
            x: [-80, 80, -80],
            y: [-30, 90, -30],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Blob dourado inferior direito */}
        <motion.div
          className="absolute bottom-20 right-10 w-[420px] h-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(169, 104, 61, 0.13) 0%, rgba(169, 104, 61, 0.06) 45%, transparent 80%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [40, -40, 40],
            y: [20, -40, 20],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Blob central translúcido */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[480px] h-[320px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(194, 247, 188, 0.33) 0%, transparent 70%)",
            filter: "blur(70px)",
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
        
        {/* Partículas flutuantes animadas */}
        {[...Array(12)].map((_, i) => {
          const particleColors = [
            'rgba(169, 104, 61, 0.31)',  // Dourado
            'rgba(194, 247, 188, 0.5)',   // Verde mint
            'rgba(155, 208, 210, 0.41)'   // Aqua
          ];
          
          const sizes = ['16px', '12px', '9px'];
          const positions = [
            { left: '10%', top: '12%' },
            { left: '17%', top: '30%' },
            { left: '24%', top: '48%' },
            { left: '31%', top: '66%' },
            { left: '38%', top: '84%' },
            { left: '45%', top: '12%' },
            { left: '52%', top: '30%' },
            { left: '59%', top: '48%' },
            { left: '66%', top: '66%' },
            { left: '73%', top: '84%' },
            { left: '80%', top: '12%' },
            { left: '87%', top: '30%' }
          ];
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: sizes[i % 3],
                height: sizes[i % 3],
                background: particleColors[i % 3],
                left: positions[i].left,
                top: positions[i].top,
                boxShadow: 'rgba(194, 247, 188, 0.35) 0px 0px 20px',
                zIndex: 0
              }}
              animate={{
                x: [-18, 18, -18],
                y: [-5 * (i + 1), -10 * (i + 1), -5 * (i + 1)],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
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
        
        {/* Faixa de luz suave inferior */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/4"
          style={{
            background: "linear-gradient(to top, rgba(194, 247, 188, 0.16) 0%, transparent 100%)",
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
      </div>

      {/* Conteúdo da seção */}
      <div className="container mx-auto px-4 relative z-10">
        <VideoSectionHeader />
        
        <VideoCarousel
          videos={videoTestimonials}
          onVideoClick={setSelectedVideo}
          isPaused={isPaused}
          onPauseChange={setIsPaused}
        />
        
        <LiveViewersIndicator />
      </div>
      
      {/* Modal de vídeo */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onCtaClick={onCtaClick}
      />
    </section>
  );
};

export default VideoTestimonialsSection;