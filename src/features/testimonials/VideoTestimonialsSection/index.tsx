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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <>
      {/* Container wrapper para a transição */}
      <div className="relative">
        {/* Transição de onda dramática posicionada corretamente */}
        <WaveTransition 
          color="#C2F7BC" 
          className="relative z-10" 
          height={120}
          variant="dramatic"
        />
      </div>
      
      <section 
        ref={sectionRef}
        id="video-depoimentos" 
        className="relative overflow-hidden py-20"
        style={{
          backgroundColor: '#C2F7BC',
          marginTop: '-120px'
        }}
      >
        {/* Background com padrão hexagonal */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.66 22.17v26.66L30 60l21.34-11.17V22.17L30 10.39z' fill='%23A9683D' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
          
          {/* Blobs decorativos */}
          <motion.div
            className="absolute top-20 -left-40 w-96 h-96 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
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
        
        {/* Gradiente inferior para transição suave */}
        <div 
          className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 80%, #ffffff 100%)'
          }}
        />
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