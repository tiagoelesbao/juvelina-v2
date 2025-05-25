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
  
  // Duplicar vídeos para loop infinito (desktop apenas)
  const extendedVideos = isMobile ? videos : [...videos, ...videos, ...videos];
  const totalWidth = videos.length * itemWithGap;
  
  // Versão Mobile com efeito de borda
  if (isMobile) {
    return (
      <div className="relative mt-8">
        {/* Gradientes laterais mobile */}
        <div 
          className="absolute left-0 top-0 w-16 h-full z-10 pointer-events-none"
          style={{
            background: `linear-gradient(
              to right,
              rgba(194, 247, 188, 1) 0%,
              rgba(194, 247, 188, 0.8) 40%,
              rgba(194, 247, 188, 0.3) 70%,
              transparent 100%
            )`
          }}
        />
        <div 
          className="absolute right-0 top-0 w-16 h-full z-10 pointer-events-none"
          style={{
            background: `linear-gradient(
              to left,
              rgba(194, 247, 188, 1) 0%,
              rgba(194, 247, 188, 0.8) 40%,
              rgba(194, 247, 188, 0.3) 70%,
              transparent 100%
            )`
          }}
        />
        
        {/* Container com scroll nativo otimizado */}
        <div 
          ref={carouselRef}
          className="overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            willChange: 'scroll-position',
            transform: 'translateZ(0)', // GPU acceleration
          }}
        >
          <div className="flex gap-4 pb-4" style={{ padding: '0 20px' }}>
            {videos.map((video) => (
              <div
                key={video.id}
                className="min-w-[280px] snap-center flex-shrink-0"
                style={{ transform: 'translateZ(0)' }}
              >
                <VideoCarouselItem
                  video={video}
                  onClick={() => onVideoClick(video)}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicadores mobile */}
        <div className="flex justify-center gap-1.5 mt-4">
          {videos.slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-juvelina-gold w-4' 
                  : 'bg-gray-300'
              }`}
              onClick={() => {
                if (carouselRef.current) {
                  const scrollPosition = index * (itemWidth + gap) + 20;
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
        </div>
      </div>
    );
  }
  
  // Auto-scroll otimizado para desktop
  useEffect(() => {
    if (!isPaused && !reduceMotion && !isMobile && !isLowEnd) {
      const animation = animate(x, -totalWidth, {
        duration: videos.length * 5, // Ajustado para movimento mais suave
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        onUpdate: (latest) => {
          if (Math.abs(latest) >= totalWidth) {
            x.jump(0);
          }
        }
      });
      
      return () => animation.stop();
    }
  }, [isPaused, x, totalWidth, videos.length, reduceMotion, isMobile, isLowEnd]);
  
  // Navegação manual otimizada
  const scrollToIndex = (index: number) => {
    onPauseChange(true);
    const newPosition = -index * itemWithGap;
    
    if (reduceMotion) {
      x.set(newPosition);
      setCurrentIndex(index);
    } else {
      animate(x, newPosition, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onComplete: () => setCurrentIndex(index)
      });
    }
  };
  
  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    scrollToIndex(newIndex);
  };
  
  const handleNext = () => {
    const newIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };
  
  // Versão Desktop com efeito de borda aprimorado
  return (
    <div className="relative mt-12">
      {/* Container com largura total da viewport */}
      <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
        {/* Gradientes laterais melhorados */}
        <div 
          className="absolute left-0 top-0 w-[25%] h-full z-20 pointer-events-none"
          style={{
            background: `linear-gradient(
              to right,
              rgba(194, 247, 188, 1) 0%,
              rgba(194, 247, 188, 0.98) 10%,
              rgba(194, 247, 188, 0.9) 25%,
              rgba(194, 247, 188, 0.7) 40%,
              rgba(194, 247, 188, 0.4) 60%,
              rgba(194, 247, 188, 0.15) 80%,
              transparent 100%
            )`,
            maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)'
          }}
        />
        
        <div 
          className="absolute right-0 top-0 w-[25%] h-full z-20 pointer-events-none"
          style={{
            background: `linear-gradient(
              to left,
              rgba(194, 247, 188, 1) 0%,
              rgba(194, 247, 188, 0.98) 10%,
              rgba(194, 247, 188, 0.9) 25%,
              rgba(194, 247, 188, 0.7) 40%,
              rgba(194, 247, 188, 0.4) 60%,
              rgba(194, 247, 188, 0.15) 80%,
              transparent 100%
            )`,
            maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)'
          }}
        />
        
        {/* Container do carrossel */}
        <div 
          ref={carouselRef}
          className="overflow-hidden"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)', // GPU acceleration
          }}
          onMouseEnter={() => !isLowEnd && onPauseChange(true)}
          onMouseLeave={() => !isLowEnd && onPauseChange(false)}
        >
          <motion.div 
            className="flex gap-6"
            style={{ 
              x,
              paddingLeft: 'calc(50vw - 640px)',
              paddingRight: 'calc(50vw - 640px)',
              willChange: 'transform',
            }}
            animate={controls}
            drag={!reduceMotion && !isLowEnd ? "x" : false}
            dragConstraints={{ 
              left: -(extendedVideos.length * itemWithGap), 
              right: 0 
            }}
            dragElastic={0.1}
            dragTransition={{ 
              bounceStiffness: 600, 
              bounceDamping: 30 
            }}
            onDragEnd={(e, { offset, velocity }) => {
              if (!isLowEnd) {
                onPauseChange(true);
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) {
                  handleNext();
                } else if (swipe > 10000) {
                  handlePrevious();
                }
              }
            }}
          >
            {extendedVideos.map((video, index) => (
              <motion.div
                key={`${video.id}-${index}`}
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)'
                }}
              >
                <VideoCarouselItem
                  video={video}
                  onClick={() => {
                    onPauseChange(true);
                    onVideoClick(video);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
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