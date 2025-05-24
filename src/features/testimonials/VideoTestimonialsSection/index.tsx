// src/features/testimonials/VideoTestimonialsSection/index.tsx
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoTestimonial } from './types';
import { videoTestimonials } from './data';
import VideoSectionHeader from './components/VideoSectionHeader';
import VideoCarousel from './components/VideoCarousel';
import VideoModal from './components/VideoModal';
import LiveViewersIndicator from './components/LiveViewersIndicator';
import WaveTransition from '../../../components/ui/WaveTransition';

interface VideoTestimonialsSectionProps {
  onCtaClick?: (e?: React.MouseEvent) => void;
}

const VideoTestimonialsSection: React.FC<VideoTestimonialsSectionProps> = ({ onCtaClick }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Hook para animação baseada em scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <>
      {/* Transição de onda estilizada do branco para mint */}
      <WaveTransition 
        color="#C2F7BC" 
        className="relative z-10" 
        height={120}
      />
      
      <section 
        ref={sectionRef}
        id="video-depoimentos" 
        className="relative overflow-hidden bg-juvelina-mint/20 py-20 -mt-1"
        style={{
          background: `linear-gradient(180deg, 
            #C2F7BC 0%, 
            rgba(194, 247, 188, 0.8) 20%,
            rgba(194, 247, 188, 0.4) 60%,
            rgba(255, 255, 255, 0.95) 90%,
            #ffffff 100%
          )`
        }}
      >
        {/* Background animado com partículas */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: backgroundY }}
        >
          {/* Padrão de fundo hexagonal */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.66 22.17v26.66L30 60l21.34-11.17V22.17L30 10.39z' fill='%23A9683D' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
          
          {/* Blobs decorativos */}
          <motion.div
            className="absolute top-20 -left-40 w-96 h-96 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(194,247,188,0.4) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [-40, 40, -40],
              y: [-20, 60, -20],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-20 -right-40 w-80 h-80 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(169,104,61,0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [40, -40, 40],
              y: [20, -40, 20],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Partículas flutuantes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 2 === 0 ? '12px' : '8px',
                height: i % 2 === 0 ? '12px' : '8px',
                background: i % 3 === 0 
                  ? 'rgba(169,104,61,0.3)' 
                  : 'rgba(194,247,188,0.4)',
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </motion.div>

        {/* Conteúdo da seção */}
        <div className="relative z-10">
          <VideoSectionHeader />
          
          <VideoCarousel
            videos={videoTestimonials}
            onVideoClick={setSelectedVideo}
            isPaused={isPaused}
            onPauseChange={setIsPaused}
          />
          
          <LiveViewersIndicator />
        </div>
      </section>
      
      {/* Modal de vídeo */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onCtaClick={onCtaClick}
      />
    </>
  );
};

export default VideoTestimonialsSection;