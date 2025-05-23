// src/components/ui/OnlineUsersCounter.tsx
import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnlineUsersCounterProps {
  initialCount?: number;
}

// Componente memoizado para evitar re-renders desnecessários
const OnlineUsersCounter: React.FC<OnlineUsersCounterProps> = memo(({ initialCount = 25 }) => {
  const [count, setCount] = useState(initialCount);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Simular mudanças no número de usuários
  useEffect(() => {
    const interval = setInterval(() => {
      // Gera uma mudança aleatória entre -2 e +3
      const change = Math.floor(Math.random() * 6) - 2;
      
      // Garantir que o número não fique abaixo de 18 ou acima de 40
      setCount(prev => Math.max(18, Math.min(40, prev + change)));
    }, 10000); // Atualiza a cada 10 segundos
    
    return () => clearInterval(interval);
  }, []);
  
  // Versão Mobile - Bolinha compacta
  if (isMobile) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 right-5 z-40 bg-white rounded-full shadow-md p-2 flex items-center"
        >
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          <span className="text-xs font-medium">{count}</span>
        </motion.div>
      </AnimatePresence>
    );
  }
  
  // Versão Desktop - Mais detalhada
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-5 right-5 z-40 bg-white rounded-full py-1 px-3 shadow-md border border-gray-100 flex items-center gap-2"
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
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
          <span className="text-sm text-gray-700 font-medium">
            {count} pessoas vendo agora
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

export default OnlineUsersCounter;