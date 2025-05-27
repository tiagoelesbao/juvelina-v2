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

/**
 * VideoCarousel Component
 * 
 * Exibe um carrossel de vídeos com comportamentos diferentes para mobile/desktop:
 * - Mobile/Tablet: Scroll nativo com snap, indicadores sincronizados
 * - Desktop: Auto-scroll infinito com controles de navegação
 * 
 * Funcionalidades:
 * - Autoplay de vídeos quando visíveis (muted para funcionar em todos os browsers)
 * - Indicadores (dots) que acompanham o scroll no mobile
 * - Efeito de borda gradiente para melhor UX
 * - Otimizações de performance com GPU acceleration
 */
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
  
  // Duplicar vídeos para loop infinito (desktop apenas)
  const extendedVideos = isMobile ? videos : [...videos, ...videos, ...videos];
  const totalWidth = videos.length * itemWithGap;
  
  // Versão Mobile/Tablet com efeito de borda
  if (isMobile || isTablet) {
    // Timer para debounce
    const scrollDebounce = useRef<NodeJS.Timeout | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    
    // Callback otimizado para detectar scroll com debounce
    const handleScroll = useCallback(() => {
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      if (scrollDebounce.current) {
        clearTimeout(scrollDebounce.current);
      }
      
      // Atualização rápida durante o scroll
      if (carouselRef.current) {
        // Atualização rápida durante o scroll
        const container = carouselRef.current;
        const scrollLeft = container.scrollLeft;
        const itemTotalWidth = itemWidth + gap;
        
        // Cálculo simples baseado no snap-center
        // Adiciona metade da largura do container para considerar o centro
        const containerWidth = container.offsetWidth;
        const adjustedScroll = scrollLeft + (containerWidth / 2) - (itemWidth / 2) - 20;
        const estimatedIndex = Math.round(adjustedScroll / itemTotalWidth);
        const newIndex = Math.max(0, Math.min(estimatedIndex, videos.length - 1));
        
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
      
      // Atualização precisa quando o scroll termina
      scrollDebounce.current = setTimeout(() => {
        setIsScrolling(false);
        
        if (carouselRef.current) {
          const container = carouselRef.current;
          const scrollLeft = container.scrollLeft;
          const containerWidth = container.offsetWidth;
          
          // Encontrar o item mais próximo do centro da viewport
          const items = container.querySelectorAll('[data-index]');
          let closestIndex = 0;
          let closestDistance = Infinity;
          
          items.forEach((item) => {
            const element = item as HTMLElement;
            const index = parseInt(element.getAttribute('data-index') || '0', 10);
            const itemRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const itemCenter = itemRect.left + (itemRect.width / 2) - containerRect.left;
            const viewportCenter = containerWidth / 2;
            const distance = Math.abs(itemCenter - viewportCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });
          
          if (closestIndex !== currentIndex) {
            setCurrentIndex(closestIndex);
          }
        }
      }, 100); // Debounce de 100ms para detectar fim do scroll
    }, [currentIndex, itemWidth, gap, videos.length, isScrolling]);
    
    // Detectar scroll e atualizar currentIndex
    useEffect(() => {
      const scrollElement = carouselRef.current;
      if (scrollElement) {
        // Resetar posição ao montar ou mudar vídeos
        scrollElement.scrollLeft = 0;
        setCurrentIndex(0);
        
        scrollElement.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
          scrollElement.removeEventListener('scroll', handleScroll);
          // Limpar timeout pendente
          if (scrollDebounce.current) {
            clearTimeout(scrollDebounce.current);
          }
        };
      }
    }, [handleScroll, videos]);
    
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
          className="overflow-x-auto hide-scrollbar snap-x snap-mandatory video-carousel-mobile"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            willChange: 'scroll-position',
            transform: 'translateZ(0)', // GPU acceleration
          }}
          onScroll={handleScroll} // Adicionar handler direto também
        >
          <div className="flex gap-4 pb-4" style={{ padding: '0 20px' }}>
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="min-w-[280px] snap-center flex-shrink-0"
                style={{ 
                  transform: 'translateZ(0)',
                  scrollSnapAlign: 'center'
                }}
                data-index={index}
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
        
        {/* Indicadores mobile */}
        <div className="flex justify-center gap-1.5 mt-4">
          {videos.map((_, index) => {
            // Mostrar apenas 5 dots no máximo
            if (index < 5 || (index === currentIndex && index >= 5)) {
              return (
                <button
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-juvelina-gold w-6 h-2.5' 
                      : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                  }`}
                  onClick={() => {
                    if (carouselRef.current) {
                      // Calcular a posição exata do item
                      const targetElement = carouselRef.current.querySelector(`[data-index="${index}"]`) as HTMLElement;
                      if (targetElement) {
                        const containerRect = carouselRef.current.getBoundingClientRect();
                        const targetRect = targetElement.getBoundingClientRect();
                        const targetCenter = targetRect.left + (targetRect.width / 2);
                        const containerCenter = containerRect.left + (containerRect.width / 2);
                        const scrollOffset = targetCenter - containerCenter;
                        
                        carouselRef.current.scrollBy({
                          left: scrollOffset,
                          behavior: 'smooth'
                        });
                        
                        setCurrentIndex(index);
                      }
                    }
                  }}
                  aria-label={`Ir para vídeo ${index + 1}`}
                />
              );
            }
            // Mostrar reticências se estiver além do 5º item e não for o atual
            if (index === 5 && currentIndex < 5) {
              return <span key="dots" className="text-xs text-gray-400">•••</span>;
            }
            return null;
          })}
        </div>
      </div>
    );
  }
  
  // Auto-scroll otimizado para desktop
  useEffect(() => {
    if (!isPaused && !reduceMotion && !isMobile && !isTablet && !isLowEnd) {
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
  }, [isPaused, x, totalWidth, videos.length, reduceMotion, isMobile, isTablet, isLowEnd]);
  
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
          onMouseEnter={() => !isLowEnd && !isMobile && !isTablet && onPauseChange(true)}
          onMouseLeave={() => !isLowEnd && !isMobile && !isTablet && onPauseChange(false)}
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
            drag={!reduceMotion && !isLowEnd && !isMobile && !isTablet ? "x" : false}
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
              if (!isLowEnd && !isMobile && !isTablet) {
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