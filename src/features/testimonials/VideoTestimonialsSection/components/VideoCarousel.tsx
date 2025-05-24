// src/features/testimonials/VideoTestimonialsSection/components/VideoCarousel.tsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  const controls = useAnimation();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Limitar vídeos em mobile para performance
  const displayVideos = isMobile ? videos.slice(0, 6) : videos;
  
  // Versão Mobile Otimizada - Scroll nativo CSS
  if (isMobile || isLowEnd) {
    return (
      <div className="relative mt-8">
        {/* Container com scroll nativo */}
        <div 
          ref={carouselRef}
          className="overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="flex gap-4 px-4 pb-4">
            {displayVideos.map((video, index) => (
              <div
                key={video.id}
                className="min-w-[280px] snap-center"
                onClick={() => onVideoClick(video)}
              >
                {/* Versão simplificada do item */}
                <div className="relative bg-white rounded-xl shadow-md overflow-hidden h-[500px] cursor-pointer">
                  {/* Thumbnail com lazy loading nativo */}
                  <img 
                    src={video.thumbnail}
                    alt={`Depoimento de ${video.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay simplificado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-juvelina-gold ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Info básica */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-juvelina-gold rounded-full flex items-center justify-center font-bold">
                        {video.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{video.name}</p>
                        <p className="text-xs opacity-90">{video.views} views</p>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2">{video.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicadores simples */}
        <div className="flex justify-center gap-1.5 mt-4">
          {displayVideos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-juvelina-gold' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (carouselRef.current) {
                  const scrollPosition = index * 296; // 280px width + 16px gap
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
  
  // Versão Desktop com animações (mantém a original)
  const totalWidth = videos.length * 304; // largura do item + gap
  
  // Auto-scroll apenas em desktop
  useEffect(() => {
    if (!isPaused && !isMobile && !reduceMotion) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % videos.length;
        scrollToIndex(nextIndex);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, currentIndex, videos.length, isMobile, reduceMotion]);
  
  const scrollToIndex = (index: number) => {
    const newPosition = -index * 304;
    controls.start({
      x: newPosition,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    });
    setCurrentIndex(index);
  };
  
  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    scrollToIndex(newIndex);
  };
  
  const handleNext = () => {
    const newIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };
  
  return (
    <div className="relative mt-12">
      {/* Gradientes laterais */}
      <div className="absolute left-0 top-0 w-32 h-full z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute right-0 top-0 w-32 h-full z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      
      {/* Container do carrossel */}
      <div 
        ref={carouselRef}
        className="overflow-hidden px-8"
        onMouseEnter={() => onPauseChange(true)}
        onMouseLeave={() => onPauseChange(false)}
      >
        <motion.div 
          className="flex gap-6"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -totalWidth + window.innerWidth, right: 0 }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000) {
              handleNext();
            } else if (swipe > 10000) {
              handlePrevious();
            }
          }}
        >
          {videos.map((video) => (
            <VideoCarouselItem
              key={video.id}
              video={video}
              onClick={() => {
                onPauseChange(true);
                onVideoClick(video);
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Controles */}
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