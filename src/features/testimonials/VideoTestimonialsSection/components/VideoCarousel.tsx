// src/features/testimonials/VideoTestimonialsSection/components/VideoCarousel.tsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion';
import { PerformanceContext } from '../../../../App';
import VideoCarouselItem from './VideoCarouselItem';
import VideoCarouselControls from './VideoCarouselControls';
import { VideoTestimonial } from '../types';

interface VideoCarouselProps {
  videos: VideoTestimonial[];
  onVideoClick: (video: VideoTestimonial) => void;
  isPaused: boolean;
  onPauseChange: (paused: boolean) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  onVideoClick,
  isPaused,
  onPauseChange
}) => {
  const { isMobile, isLowEnd, reduceMotion } = useContext(PerformanceContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  // Configurações do carrossel
  const itemWidth = 280;
  const gap = 24;
  const itemWithGap = itemWidth + gap;
  
  // Duplicar vídeos para loop infinito (apenas se não for mobile)
  const extendedVideos = isMobile ? videos : [...videos, ...videos, ...videos];
  const totalWidth = videos.length * itemWithGap;
  
  // Versão Mobile - Scroll nativo CSS
  if (isMobile || isLowEnd) {
    return (
      <div className="relative mt-8">
        {/* Container com scroll nativo e padding nas laterais */}
        <div 
          ref={carouselRef}
          className="overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="flex gap-4 pb-4">
            {/* Espaçador inicial */}
            <div className="w-4 flex-shrink-0" />
            
            {videos.map((video) => (
              <div
                key={video.id}
                className="min-w-[280px] snap-center flex-shrink-0"
                onClick={() => onVideoClick(video)}
              >
                <VideoCarouselItem
                  video={video}
                  onClick={() => onVideoClick(video)}
                />
              </div>
            ))}
            
            {/* Espaçador final */}
            <div className="w-4 flex-shrink-0" />
          </div>
        </div>
        
        {/* Indicadores simples para mobile */}
        <div className="flex justify-center gap-1.5 mt-4">
          {videos.slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-juvelina-gold' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (carouselRef.current) {
                  const scrollPosition = index * 296 + 20; // incluindo padding
                  carouselRef.current.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                  });
                  setCurrentIndex(index);
                }
              }}
              aria-label={`Ir para vídeo ${index + 1}`}
            />
          ))}
          {videos.length > 5 && (
            <span className="text-xs text-gray-500">...</span>
          )}
        </div>
      </div>
    );
  }
  
  // Auto-scroll otimizado para desktop
  useEffect(() => {
    if (!isPaused && !reduceMotion && !isMobile) {
      const animation = animate(x, -totalWidth, {
        duration: 40, // Aumentado para movimento mais suave
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onUpdate: (latest) => {
          // Reset instantâneo quando chegar ao fim
          if (Math.abs(latest) >= totalWidth) {
            x.jump(0);
          }
        }
      });
      
      return () => animation.stop();
    }
  }, [isPaused, x, totalWidth, reduceMotion, isMobile]);
  
  // Navegação manual
  const scrollToIndex = (index: number) => {
    const newPosition = -index * itemWithGap;
    animate(x, newPosition, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onComplete: () => setCurrentIndex(index)
    });
  };
  
  const handlePrevious = () => {
    onPauseChange(true);
    const newIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    scrollToIndex(newIndex);
  };
  
  const handleNext = () => {
    onPauseChange(true);
    const newIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };
  
  // Versão Desktop com animações e gradientes
  return (
    <div className="relative mt-12 mx-auto" style={{ maxWidth: '1600px' }}>
      {/* Gradiente lateral esquerdo - mais largo e suave */}
      <div 
        className="absolute left-0 top-0 w-32 md:w-48 lg:w-64 xl:w-80 h-full z-10 pointer-events-none"
        style={{
          background: `linear-gradient(
            to right,
            rgba(194, 247, 188, 1) 0%,
            rgba(194, 247, 188, 0.95) 15%,
            rgba(194, 247, 188, 0.8) 30%,
            rgba(194, 247, 188, 0.5) 50%,
            rgba(194, 247, 188, 0.2) 70%,
            rgba(194, 247, 188, 0.05) 85%,
            transparent 100%
          )`
        }}
      />
      
      {/* Gradiente lateral direito - mais largo e suave */}
      <div 
        className="absolute right-0 top-0 w-32 md:w-48 lg:w-64 xl:w-80 h-full z-10 pointer-events-none"
        style={{
          background: `linear-gradient(
            to left,
            rgba(194, 247, 188, 1) 0%,
            rgba(194, 247, 188, 0.95) 15%,
            rgba(194, 247, 188, 0.8) 30%,
            rgba(194, 247, 188, 0.5) 50%,
            rgba(194, 247, 188, 0.2) 70%,
            rgba(194, 247, 188, 0.05) 85%,
            transparent 100%
          )`
        }}
      />
      
      {/* Container do carrossel com padding extra */}
      <div 
        ref={carouselRef}
        className="overflow-hidden"
        style={{
          paddingLeft: '280px',
          paddingRight: '280px',
          marginLeft: '-280px',
          marginRight: '-280px'
        }}
        onMouseEnter={() => onPauseChange(true)}
        onMouseLeave={() => onPauseChange(false)}
      >
        <motion.div 
          className="flex gap-6"
          style={{ x }}
          animate={controls}
          drag={!reduceMotion ? "x" : false}
          dragConstraints={{ 
            left: -(extendedVideos.length * itemWithGap), 
            right: 0 
          }}
          dragElastic={0.1}
          onDragEnd={(e, { offset, velocity }) => {
            onPauseChange(true);
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000) {
              handleNext();
            } else if (swipe > 10000) {
              handlePrevious();
            }
          }}
        >
          {extendedVideos.map((video, index) => (
            <VideoCarouselItem
              key={`${video.id}-${index}`}
              video={video}
              onClick={() => {
                onPauseChange(true);
                onVideoClick(video);
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Controles de navegação */}
      <VideoCarouselControls
        onPrevious={handlePrevious}
        onNext={handleNext}
        onPlayPause={() => onPauseChange(!isPaused)}
        isPaused={isPaused}
        currentIndex={currentIndex}
        totalItems={videos.length}
        onDotClick={scrollToIndex}
      />
    </div>
  );
};

export default VideoCarousel;