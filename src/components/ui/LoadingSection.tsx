// src/components/ui/LoadingSection.tsx
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PerformanceContext } from '../../App';

interface LoadingSectionProps {
  height?: string;
  message?: string;
}

const LoadingSection: React.FC<LoadingSectionProps> = ({ 
  height = 'py-20', 
  message = 'Carregando...' 
}) => {
  const { reduceMotion } = useContext(PerformanceContext);

  return (
    <div className={`${height} flex flex-col justify-center items-center`}>
      <motion.div
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-juvelina-gold mb-4"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={reduceMotion ? {} : {
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {message && (
        <p className="text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
};

export default LoadingSection;