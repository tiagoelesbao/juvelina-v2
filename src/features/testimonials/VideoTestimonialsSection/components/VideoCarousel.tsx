// src/features/testimonials/VideoTestimonialsSection/components/VideoCarousel.tsx
import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
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
  const { isMobile, isTablet, isLowEnd, reduceMotion } = useContext(PerformanceContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  // Configurações do carrossel
  const itemWidth = 280;
  const gap = 24;
  const itemWithGap = itemWidth + gap;
  
  // Para loop infinito, triplicar vídeos
  const extendedVideos = [...videos, ...videos, ...videos];
  const totalWidth = videos.length * itemWithGap;
  
  // Versão Mobile/Tablet
  if (isMobile || isTablet) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const isUserScrolling = useRef(false);
    
    // Para loop infinito no mobile
    const infiniteVideos = [...videos, ...videos, ...videos];
    const middleStart = videos.length; // Começar no meio para permitir scroll infinito
    
    // Detectar índice atual baseado no scroll
    const handleScroll = useCallback(() => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const itemWidth = 280;
      const gap = 16;
      const itemTotalWidth = itemWidth + gap;
      
      // Calcular índice baseado na posição do scroll
      const rawIndex = Math.round(scrollLeft / itemTotalWidth);
      const actualIndex = rawIndex % videos.length;
      
      setMobileCurrentIndex(actualIndex);
      
      // Clear timeout anterior
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Implementar loop infinito
      scrollTimeout.current = setTimeout(() => {
        if (!scrollContainerRef.current || isUserScrolling.current) return;
        
        const maxScroll = itemTotalWidth * videos.length * 2;
        const minScroll = itemTotalWidth * videos.length;
        
        if (scrollLeft >= maxScroll) {
          // Voltar para o meio sem animação
          scrollContainerRef.current.scrollLeft = scrollLeft - (videos.length * itemTotalWidth);
        } else if (scrollLeft <= 0) {
          // Ir para o meio sem animação
          scrollContainerRef.current.scrollLeft = scrollLeft + (videos.length * itemTotalWidth);
        }
      }, 50);
    }, [videos.length]);
    
    // Scrollar para índice específico
    const scrollToIndex = useCallback((index: number) => {
      if (!scrollContainerRef.current) return;
      
      const itemWidth = 280;
      const gap = 16;
      const itemTotalWidth = itemWidth + gap;
      
      // Calcular posição considerando o offset do meio
      const targetPosition = (middleStart + index) * itemTotalWidth;
      
      scrollContainerRef.current.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
    }, [middleStart]);
    
    // Setup inicial e listeners
    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      // Posicionar no meio inicialmente
      const itemTotalWidth = 296; // 280 + 16
      container.scrollLeft = middleStart * itemTotalWidth;
      
      const handleScrollStart = () => {
        isUserScrolling.current = true;
      };
      
      const handleScrollEnd = () => {
        isUserScrolling.current = false;
        handleScroll();
      };
      
      container.addEventListener('scroll', handleScroll, { passive: true });
      container.addEventListener('touchstart', handleScrollStart, { passive: true });
      container.addEventListener('touchend', handleScrollEnd, { passive: true });
      container.addEventListener('mousedown', handleScrollStart);
      container.addEventListener('mouseup', handleScrollEnd);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('touchstart', handleScrollStart);
        container.removeEventListener('touchend', handleScrollEnd);
        container.removeEventListener('mousedown', handleScrollStart);
        container.removeEventListener('mouseup', handleScrollEnd);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }, [handleScroll, middleStart]);
    
    return (
      <div className="relative mt-8">
        {/* Gradientes laterais */}
        <div 
          className="absolute left-0 top-0 w-8 h-full z-10 pointer-events-none md:w-12"
          style={{
            background: `linear-gradient(to right, #C2F7BC 0%, transparent 100%)`
          }}
        />
        <div 
          className="absolute right-0 top-0 w-8 h-full z-10 pointer-events-none md:w-12"
          style={{
            background: `linear-gradient(to left, #C2F7BC 0%, transparent 100%)`
          }}
        />
        
        {/* Container do carrossel */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden hide-scrollbar"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <div className="flex gap-4 pb-4 px-4">
            {infiniteVideos.map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                className="flex-shrink-0"
                style={{ 
                  width: '280px',
                  scrollSnapAlign: 'center'
                }}
              >
                <VideoCarouselItem
                  video={video}
                  onClick={() => onVideoClick(video)}
                  isMobile={true}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicadores (dots) */}
        <div className="flex justify-center gap-1.5 mt-4">
          {videos.slice(0, Math.min(videos.length, 7)).map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ${
                index === mobileCurrentIndex 
                  ? 'bg-juvelina-gold w-6 h-2.5 rounded-full' 
                  : 'bg-gray-300 w-2 h-2 rounded-full hover:bg-gray-400'
              }`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Ir para vídeo ${index + 1}`}
            />
          ))}
          {videos.length > 7 && (
            <span className="text-xs text-gray-400 self-center">...</span>
          )}
        </div>
      </div>
    );
  }
  
  // VERSÃO DESKTOP
  const [desktopIndex, setDesktopIndex] = useState(Math.floor(extendedVideos.length / 3));
  
  // Começar do centro
  useEffect(() => {
    const centerPosition = -totalWidth;
    x.set(centerPosition);
  }, [x, totalWidth]);
  
  // Auto-scroll com loop infinito real
  useEffect(() => {
    if (!isPaused && !reduceMotion && !isMobile && !isTablet && !isLowEnd) {
      let animationFrame: number;
      
      const animateCarousel = () => {
        const currentX = x.get();
        let newX = currentX - 1; // Velocidade do scroll
        
        // Loop infinito: quando chega ao fim, volta ao início sem pular
        if (Math.abs(newX) >= totalWidth * 2) {
          newX = newX + totalWidth;
          x.set(newX);
        }
        
        x.set(newX);
        
        // Atualizar índice atual
        const progress = Math.abs(newX % totalWidth) / totalWidth;
        const index = Math.floor(progress * videos.length) % videos.length;
        setCurrentIndex(index);
        
        animationFrame = requestAnimationFrame(animateCarousel);
      };
      
      animationFrame = requestAnimationFrame(animateCarousel);
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isPaused, x, totalWidth, videos.length, reduceMotion, isMobile, isTablet, isLowEnd]);
  
  // Navegação manual
  const scrollToIndex = (index: number) => {
    onPauseChange(true);
    const currentX = x.get();
    const currentProgress = Math.abs(currentX) / totalWidth;
    const currentSet = Math.floor(currentProgress);
    const targetPosition = -(currentSet * totalWidth + index * itemWithGap);
    
    animate(x, targetPosition, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      onComplete: () => setCurrentIndex(index)
    });
  };
  
  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    scrollToIndex(newIndex);
  };
  
  const handleNext = () => {
    const newIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };
  
  // Desktop render
  return (
    <div className="relative mt-12">
      <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
        {/* Gradientes laterais */}
        <div 
          className="absolute left-0 top-0 w-[20%] h-full z-20 pointer-events-none"
          style={{
            background: `linear-gradient(to right, #C2F7BC 0%, #C2F7BCCC 25%, #C2F7BC66 50%, transparent 100%)`
          }}
        />
        <div 
          className="absolute right-0 top-0 w-[20%] h-full z-20 pointer-events-none"
          style={{
            background: `linear-gradient(to left, #C2F7BC 0%, #C2F7BCCC 25%, #C2F7BC66 50%, transparent 100%)`
          }}
        />
        
        {/* Container do carrossel */}
        <div 
          ref={carouselRef}
          className="overflow-hidden"
          onMouseEnter={() => onPauseChange(true)}
          onMouseLeave={() => onPauseChange(false)}
        >
          <motion.div 
            className="flex gap-6"
            style={{ 
              x,
              paddingLeft: 'calc(50vw - 640px)',
              paddingRight: 'calc(50vw - 640px)',
            }}
          >
            {extendedVideos.map((video, index) => (
              <motion.div
                key={`${video.id}-${index}`}
                className="flex-shrink-0"
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