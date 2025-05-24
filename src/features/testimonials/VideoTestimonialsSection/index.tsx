import React, { useState, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { VideoTestimonial } from './types';
import { videoTestimonials } from './data';
import VideoSectionHeader from './components/VideoSectionHeader';
import VideoCarousel from './components/VideoCarousel';
import VideoModal from './components/VideoModal';
import LiveViewersIndicator from './components/LiveViewersIndicator';
import VideoBackground from './components/VideoBackground';
import VideoParticlesBackground from './components/VideoParticlesBackground';
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="relative">
      {/* Transição suave topo da dobra */}
      <SmoothGradientTransition 
        fromColor="#ffffff"
        toColor="#C2F7BC"
        height={200}
      />

      <section 
        ref={sectionRef}
        id="video-depoimentos" 
        className="relative overflow-hidden"
        style={{
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
          paddingTop: '90px',
          paddingBottom: '80px'
        }}
      >
        {/* BASE SÓLIDA + CAMADA DE LUZ (sempre o primeiro!) */}
        <VideoBackground 
          scrollYProgress={scrollYProgress}
          backgroundY={backgroundY}
        />

        {/* ANIMAÇÕES DE PARTÍCULAS/BLOBS (sempre acima do fundo) */}
        <VideoParticlesBackground 
          scrollYProgress={scrollYProgress}
        />

        {/* Conteúdo do bloco */}
        <VideoSectionHeader />
        <VideoCarousel
          videos={videoTestimonials}
          onVideoClick={setSelectedVideo}
          isPaused={isPaused}
          onPauseChange={setIsPaused}
        />
        <LiveViewersIndicator />
      </section>
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onCtaClick={onCtaClick}
      />
    </div>
  );
};

export default VideoTestimonialsSection;
