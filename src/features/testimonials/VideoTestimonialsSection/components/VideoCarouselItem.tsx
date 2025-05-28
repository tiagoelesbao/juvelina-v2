// src/features/testimonials/VideoTestimonialsSection/components/VideoCarouselItem.tsx
import React, { useState, useContext, memo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { VideoTestimonial } from '../types';
import { PerformanceContext } from '../../../../App';

// Config para desenvolvimento vs produção
const IS_DEVELOPMENT = import.meta.env.DEV;
const USE_CDN = !IS_DEVELOPMENT; // Usar CDN apenas em produção

interface VideoCarouselItemProps {
  video: VideoTestimonial;
  onClick: () => void;
  isMobile?: boolean;
}

const VideoCarouselItem: React.FC<VideoCarouselItemProps> = memo(({ video, onClick, isMobile: isMobileProp }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLowEnd, reduceMotion, isMobile: contextIsMobile } = useContext(PerformanceContext);
  
  const isMobile = isMobileProp !== undefined ? isMobileProp : contextIsMobile;
  
  // Desenvolvimento: usa local | Produção: usa CDN
  const videoUrl = USE_CDN && video.videoUrl 
    ? video.videoUrl 
    : `/videos/v${video.id}.mp4`;
  
  // Lazy loading - carregar vídeo apenas quando próximo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: isMobile ? '50px' : '200px',
        threshold: 0.1 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isMobile]);
  
  // Autoplay quando visível
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current || isLowEnd) return;
    
    const playVideo = async () => {
      try {
        if (videoRef.current && isVideoLoaded) {
          videoRef.current.muted = true;
          await videoRef.current.play();
        }
      } catch (error) {
        console.log('Autoplay prevented for video', video.id);
      }
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isVideoLoaded) {
            playVideo();
          } else if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [video.id, isLowEnd, shouldLoadVideo, isVideoLoaded]);
  
  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={12} 
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
  
  return (
    <motion.div
      ref={containerRef}
      className="relative w-[280px] h-[500px] flex-shrink-0 cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={!reduceMotion ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!reduceMotion ? { scale: 0.98 } : {}}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg bg-gray-900">
        {/* Placeholder enquanto carrega */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}
        
        {/* Video - só carrega quando shouldLoadVideo é true */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            {...{ 'webkit-playsinline': 'true' } as any}
          />
        )}
        
        {/* Loading indicator */}
        {shouldLoadVideo && !isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white/50" />
          </div>
        )}
        
        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Botão de play */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isMobile || isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-7 h-7 text-juvelina-gold ml-1" />
          </div>
        </div>
        
        {/* Badge de visualizações */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-xs font-medium">{video.views}</span>
        </div>
        
        {/* Informações do vídeo */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-juvelina-gold to-juvelina-mint flex items-center justify-center font-bold text-white shadow-lg">
                  {video.name.charAt(0)}
                </div>
                {video.verified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm">{video.name}</p>
                <p className="text-xs opacity-90">{video.username}</p>
              </div>
            </div>
            
            <p className="text-sm line-clamp-2 leading-relaxed">{video.caption}</p>
            
            <div className="flex items-center justify-between pt-1">
              {renderStars(video.rating)}
              <div className="flex items-center gap-3 text-xs opacity-90">
                <span>{video.likes || '10K'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.video.id === nextProps.video.id;
});

VideoCarouselItem.displayName = 'VideoCarouselItem';

export default VideoCarouselItem;