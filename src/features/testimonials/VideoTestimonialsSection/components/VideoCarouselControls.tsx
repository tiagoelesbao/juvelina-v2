// src/features/testimonials/VideoTestimonialsSection/components/VideoCarouselControls.tsx
import React, { useContext, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { PerformanceContext } from '../../../../App';

interface VideoCarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  isPaused: boolean;
  currentIndex: number;
  totalItems: number;
  onDotClick: (index: number) => void;
}

const VideoCarouselControls: React.FC<VideoCarouselControlsProps> = memo(({
  onPrevious,
  onNext,
  onPlayPause,
  isPaused,
  currentIndex,
  totalItems,
  onDotClick
}) => {
  const { reduceMotion, isMobile } = useContext(PerformanceContext);
  
  // Não mostrar controles laterais em mobile
  if (isMobile) {
    return null;
  }
  
  return (
    <>
      {/* Botões de navegação lateral - otimizados */}
      <motion.button 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-juvelina-gold hover:bg-white transition-all group"
        onClick={onPrevious}
        whileHover={!reduceMotion ? { scale: 1.05 } : {}}
        whileTap={!reduceMotion ? { scale: 0.95 } : {}}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Vídeo anterior"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <ChevronLeft 
          size={24} 
          className={`${!reduceMotion ? 'group-hover:-translate-x-0.5' : ''} transition-transform`} 
        />
      </motion.button>
      
      <motion.button 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-juvelina-gold hover:bg-white transition-all group"
        onClick={onNext}
        whileHover={!reduceMotion ? { scale: 1.05 } : {}}
        whileTap={!reduceMotion ? { scale: 0.95 } : {}}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Próximo vídeo"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <ChevronRight 
          size={24} 
          className={`${!reduceMotion ? 'group-hover:translate-x-0.5' : ''} transition-transform`} 
        />
      </motion.button>
      
      {/* Controles centrais - simplificados */}
      <div className="flex justify-center items-center gap-6 mt-8">
        {/* Botão play/pause */}
        <motion.button 
          onClick={onPlayPause}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all border border-gray-100"
          whileHover={!reduceMotion ? { scale: 1.05 } : {}}
          whileTap={!reduceMotion ? { scale: 0.95 } : {}}
          aria-label={isPaused ? "Continuar reprodução" : "Pausar reprodução"}
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          {isPaused ? (
            <Play size={20} className="text-juvelina-gold ml-0.5" />
          ) : (
            <Pause size={20} className="text-juvelina-gold" />
          )}
        </motion.button>
        
        {/* Indicadores de progresso otimizados */}
        <div className="flex items-center gap-1.5">
          {[...Array(Math.min(totalItems, 5))].map((_, index) => (
            <motion.button
              key={index}
              onClick={() => onDotClick(index)}
              className={`rounded-full transition-all duration-200 ${
                currentIndex === index 
                  ? 'bg-juvelina-gold w-8 h-2' 
                  : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
              }`}
              whileHover={!reduceMotion ? { scale: 1.2 } : {}}
              whileTap={!reduceMotion ? { scale: 0.9 } : {}}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index, duration: 0.2 }}
              aria-label={`Ir para vídeo ${index + 1}`}
              style={{
                willChange: 'auto',
              }}
            />
          ))}
          {totalItems > 5 && (
            <span className="text-xs text-gray-500 ml-1">+{totalItems - 5}</span>
          )}
        </div>
      </div>
    </>
  );
}, (prevProps, nextProps) => {
  // Otimização: só re-renderizar se props importantes mudarem
  return (
    prevProps.isPaused === nextProps.isPaused &&
    prevProps.currentIndex === nextProps.currentIndex &&
    prevProps.totalItems === nextProps.totalItems
  );
});

VideoCarouselControls.displayName = 'VideoCarouselControls';

export default VideoCarouselControls;