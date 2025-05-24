// src/features/testimonials/VideoTestimonialsSection/components/VideoCarouselControls.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface VideoCarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  isPaused: boolean;
  currentIndex: number;
  totalItems: number;
  onDotClick: (index: number) => void;
}

const VideoCarouselControls: React.FC<VideoCarouselControlsProps> = ({
  onPrevious,
  onNext,
  onPlayPause,
  isPaused,
  currentIndex,
  totalItems,
  onDotClick
}) => {
  return (
    <>
      {/* Botões de navegação lateral */}
      <motion.button 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-juvelina-gold hover:bg-white transition-all group"
        onClick={onPrevious}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        aria-label="Vídeo anterior"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
      </motion.button>
      
      <motion.button 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-juvelina-gold hover:bg-white transition-all group"
        onClick={onNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        aria-label="Próximo vídeo"
      >
        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
      </motion.button>
      
      {/* Controles centrais */}
      <div className="flex justify-center items-center gap-6 mt-8">
        {/* Botão play/pause */}
        <motion.button 
          onClick={onPlayPause}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPaused ? "Continuar reprodução" : "Pausar reprodução"}
        >
          {isPaused ? (
            <Play size={20} className="text-juvelina-gold ml-0.5" />
          ) : (
            <Pause size={20} className="text-juvelina-gold" />
          )}
        </motion.button>
        
        {/* Indicadores de progresso (dots) */}
        <div className="flex items-center gap-1.5">
          {[...Array(Math.min(totalItems, 5))].map((_, index) => (
            <motion.button
              key={index}
              onClick={() => onDotClick(index)}
              className={`rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-juvelina-gold w-8 h-2' 
                  : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              aria-label={`Ir para vídeo ${index + 1}`}
            />
          ))}
          {totalItems > 5 && (
            <span className="text-xs text-gray-500 ml-1">+{totalItems - 5}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoCarouselControls;