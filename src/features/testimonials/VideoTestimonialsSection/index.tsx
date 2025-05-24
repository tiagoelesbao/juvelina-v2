// src/features/testimonials/VideoTestimonialsSection/index.tsx
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoTestimonial } from './types';
import { videoTestimonials } from './data';
import VideoSectionHeader from './components/VideoSectionHeader';
import VideoCarousel from './components/VideoCarousel';
import VideoModal from './components/VideoModal';
import LiveViewersIndicator from './components/LiveViewersIndicator';
import VideoBackground from './components/VideoBackground';
import SmoothGradientTransition from './components/SmoothGradientTransition';

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
  
  // Transformações baseadas no scroll para o fundo
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="relative">
      {/* Transição suave e harmônica */}
      <SmoothGradientTransition 
        fromColor="#ffffff"
        toColor="#C2F7BC"
        height={200}
        variant="organic"
      />

      <section 
        ref={sectionRef}
        id="video-depoimentos" 
        className="relative overflow-hidden"
        style={{
          // Gradiente mais suave e harmônico
          background: `
            linear-gradient(
              180deg, 
              #C2F7BC 0%, 
              rgba(194, 247, 188, 0.85) 10%,
              rgba(194, 247, 188, 0.6) 25%,
              rgba(194, 247, 188, 0.3) 40%,
              rgba(194, 247, 188, 0.15) 60%,
              rgba(255, 255, 255, 0.98) 85%,
              #ffffff 100%
            )
          `,
          marginTop: '-200px',
          paddingTop: '180px',
          paddingBottom: '80px'
        }}
      >
        {/* Background animado */}
        <VideoBackground 
          scrollYProgress={scrollYProgress}
          backgroundY={backgroundY}
        />
        
        {/* Header da seção */}
        <VideoSectionHeader />
        
        {/* Carrossel de vídeos */}
        <VideoCarousel
          videos={videoTestimonials}
          onVideoClick={setSelectedVideo}
          isPaused={isPaused}
          onPauseChange={setIsPaused}
        />
        
        {/* Indicador de visualizadores ao vivo */}
        <LiveViewersIndicator />
      </section>
      
      {/* Modal de vídeo */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onCtaClick={onCtaClick}
      />
    </div>
  );
};

export default VideoTestimonialsSection;