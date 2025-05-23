// src/components/ui/VisitorCounter.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VisitorCounterProps {
  initialCount?: number;
  className?: string;
  compact?: boolean; // Para versão mobile reduzida
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ 
  initialCount = 25, 
  className = "",
  compact = false 
}) => {
  const [visitorCount, setVisitorCount] = useState(initialCount);
  
  // Simular flutuações no número de visitantes
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        // Gera mudança aleatória entre -2 e +3
        const change = Math.floor(Math.random() * 6) - 2;
        
        // Manter entre 15 e 45 visitantes
        return Math.max(15, Math.min(45, prev + change));
      });
    }, 15000); // Atualiza a cada 15 segundos (reduzido para não distrair)
    
    return () => clearInterval(interval);
  }, []);
  
  // Versão compacta para mobile
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className={`bg-white rounded-full py-1 px-2 shadow-sm border border-gray-100 flex items-center text-xs ${className}`}
      >
        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
        <span className="text-gray-700 font-medium">{visitorCount}</span>
      </motion.div>
    );
  }
  
  // Versão normal para desktop
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
        className={`bg-white rounded-full py-1 px-3 shadow-md border border-gray-100 flex items-center gap-2 ${className}`}
      >
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs font-bold text-gray-600"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <span className="text-sm text-gray-700 font-medium">
          {visitorCount} pessoas vendo agora
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default VisitorCounter;