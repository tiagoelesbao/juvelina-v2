// src/features/testimonials/VideoTestimonialsSection/components/VideoCarousel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  // Duplicar vídeos para loop infinito
  const extendedVideos = [...videos, ...videos, ...videos];
  const totalWidth = videos.length * 304; // largura do item + gap
  
  // Auto-scroll otimizado com Framer Motion
  useEffect(() => {
    if (!isPaused) {
      const animation = animate(x, -totalWidth, {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onUpdate: (latest) => {
          // Reset suave quando chegar ao fim
          if (Math.abs(latest) >= totalWidth) {
            x.set(0);
          }
        }
      });
      
      return () => animation.stop();
    }
  }, [isPaused, x, totalWidth]);
  
  // Navegação manual
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
      {/* Gradientes de fade mais suaves */}
      <div 
        className="absolute left-0 top-0 w-20 md:w-32 lg:w-48 h-full z-10 pointer-events-none"
        style={{
          background: `linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.9) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            transparent 100%
          )`
        }}
      />
      <div 
        className="absolute right-0 top-0 w-20 md:w-32 lg:w-48 h-full z-10 pointer-events-none"
        style={{
          background: `linear-gradient(
            to left,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.9) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            transparent 100%
          )`
        }}
      />
      
      {/* Container do carrossel */}
      <div 
        ref={carouselRef}
        className="overflow-hidden px-4 md:px-8"
        onMouseEnter={() => onPauseChange(true)}
        onMouseLeave={() => onPauseChange(false)}
      >
        <motion.div 
          className="flex gap-6"
          style={{ x }}
          animate={controls}
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
    </div>
  );
};

export default VideoCarousel;