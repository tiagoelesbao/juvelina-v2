// src/features/testimonials/VideoTestimonialsSection/components/VideoCarouselItem.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { VideoTestimonial } from '../types';

interface VideoCarouselItemProps {
  video: VideoTestimonial;
  onClick: () => void;
}

const VideoCarouselItem: React.FC<VideoCarouselItemProps> = ({ video, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
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
      className="relative w-[280px] h-[500px] flex-shrink-0 cursor-pointer group"
      onClick={onClick}
      whileHover={{ 
        scale: 1.03,
        y: -10
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Container da thumbnail */}
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg bg-gray-100">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div className="space-y-1">
                  <div className="h-4 bg-gray-300 rounded w-20" />
                  <div className="h-3 bg-gray-300 rounded w-16" />
                </div>
              </div>
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
            </div>
          </div>
        )}
        
        {/* Imagem com lazy loading */}
        <img 
          src={video.thumbnail}
          alt={`Depoimento de ${video.name}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay com gradiente aprimorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        {/* Botão de play animado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="relative w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-7 h-7 text-juvelina-gold ml-1" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Badge de visualizações */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-xs font-medium">{video.views}</span>
        </div>
        
        {/* Informações do vídeo */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Avatar e nome */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-juvelina-gold to-juvelina-mint flex items-center justify-center font-bold text-white shadow-lg">
                  {video.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="font-bold text-sm">{video.name}</p>
                <p className="text-xs opacity-90">{video.username}</p>
              </div>
            </div>
            
            {/* Caption */}
            <p className="text-sm line-clamp-2 leading-relaxed">{video.caption}</p>
            
            {/* Rating e engajamento */}
            <div className="flex items-center justify-between pt-1">
              {renderStars(video.rating)}
              <div className="flex items-center gap-3 text-xs opacity-90">
                <span>{video.likes || '10K'} likes</span>
                <span>{video.comments || '523'} comentários</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCarouselItem;