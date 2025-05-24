// src/components/ui/ScrollToTop.tsx
import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { PerformanceContext } from '../../App';

interface ScrollToTopProps {
  show: boolean;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ show }) => {
  const { reduceMotion, isLowEnd } = useContext(PerformanceContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="fixed bottom-8 right-8 z-40 bg-juvelina-gold text-white p-3 rounded-full shadow-lg hover:bg-juvelina-gold/90 transition-colors group"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={!reduceMotion ? { scale: 1.1 } : {}}
          whileTap={!reduceMotion ? { scale: 0.95 } : {}}
          transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
          aria-label="Voltar ao topo"
        >
          <ChevronUp 
            size={24} 
            className={`${!reduceMotion ? 'group-hover:-translate-y-1' : ''} transition-transform duration-200`}
          />
          
          {/* Efeito de pulso - apenas se não for low-end ou reduceMotion */}
          {!isLowEnd && !reduceMotion && (
            <motion.div
              className="absolute inset-0 rounded-full bg-juvelina-gold"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;