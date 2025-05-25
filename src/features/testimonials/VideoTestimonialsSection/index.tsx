// src/features/testimonials/VideoTestimonialsSection/index.tsx
import React, { useState, useRef, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PerformanceContext } from '../../../App';
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
  const { isLowEnd, reduceMotion } = useContext(PerformanceContext);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Simplificar transformações para melhor performance
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section 
      ref={sectionRef}
      id="video-depoimentos" 
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#C2F7BC',
        marginTop: '0px',
        paddingTop: '90px',
        paddingBottom: '80px',
        contain: 'layout style paint',
        willChange: 'auto'
      }}
    >
      {/* Background simplificado para melhor performance */}
      {!isLowEnd && !reduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Blob principal - menos complexo */}
          <motion.div
            className="absolute top-10 -left-32 w-96 h-96 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(194, 247, 188, 0.8) 0%, transparent 70%)",
              filter: "blur(40px)",
              willChange: 'transform'
            }}
            animate={{
              x: [-50, 50, -50],
              y: [-20, 40, -20],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Blob secundário */}
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(169, 104, 61, 0.3) 0%, transparent 70%)",
              filter: "blur(50px)",
              willChange: 'transform'
            }}
            animate={{
              x: [30, -30, 30],
              y: [20, -20, 20],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Reduzir número de partículas para 6 */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 2 === 0 ? '12px' : '8px',
                height: i % 2 === 0 ? '12px' : '8px',
                background: i % 3 === 0 ? 'rgba(169, 104, 61, 0.3)' : 'rgba(194, 247, 188, 0.5)',
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                willChange: 'transform'
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

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