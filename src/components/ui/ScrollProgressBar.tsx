import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  showPercentage?: boolean;
  position?: 'top' | 'bottom';
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  color = '#A9683D',
  height = 4,
  showPercentage = false,
  position = 'top'
}) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Usar spring para suavizar o progresso da barra
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Calcular a porcentagem do scroll para exibição
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      setScrollPercentage(Math.round(value * 100));
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  // Determinar a posição da barra
  const positionStyles = position === 'top'
    ? { top: 0 }
    : { bottom: 0 };
  
  return (
    <>
      <motion.div 
        className="fixed left-0 z-50 w-full"
        style={{
          ...positionStyles,
          height: `${height}px`,
          background: 'rgba(0, 0, 0, 0.05)',
        }}
      >
        <motion.div 
          className="h-full origin-left"
          style={{ 
            scaleX,
            background: color,
          }}
        />
      </motion.div>
      
      {showPercentage && (
        <motion.div
          className={`fixed ${position === 'top' ? 'top-1' : 'bottom-1'} right-2 bg-white px-2 py-1 rounded shadow-md text-xs font-medium z-50`}
          animate={{
            opacity: scrollPercentage > 0 ? 1 : 0,
            y: scrollPercentage > 0 ? 0 : (position === 'top' ? -10 : 10)
          }}
          transition={{ duration: 0.3 }}
          style={{ color }}
        >
          {scrollPercentage}%
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgressBar;