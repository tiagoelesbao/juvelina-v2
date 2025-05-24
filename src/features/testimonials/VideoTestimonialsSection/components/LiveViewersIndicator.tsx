// src/features/testimonials/VideoTestimonialsSection/components/LiveViewersIndicator.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, TrendingUp } from 'lucide-react';

const LiveViewersIndicator: React.FC = () => {
  const [viewersCount, setViewersCount] = useState(247);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('up');
  const [recentChange, setRecentChange] = useState(12);
  
  // Simular mudanças no número de espectadores
  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.floor(Math.random() * 21) - 10; // -10 a +10
        const newCount = prev + change;
        
        // Determinar tendência
        if (change > 5) {
          setTrend('up');
          setRecentChange(change);
        } else if (change < -5) {
          setTrend('down');
          setRecentChange(Math.abs(change));
        } else {
          setTrend('stable');
        }
        
        // Manter entre limites realistas
        return Math.max(180, Math.min(320, newCount));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Gerar avatares aleatórios
  const generateAvatars = () => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-yellow-400 to-yellow-600'
    ];
    
    return [...Array(5)].map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      letter: String.fromCharCode(65 + Math.floor(Math.random() * 26))
    }));
  };
  
  const [avatars] = useState(generateAvatars());
  
  return (
    <div className="text-center mt-8">
      <motion.div 
        className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Indicador pulsante */}
        <div className="relative">
          <motion.div
            className="w-3 h-3 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full"
            animate={{
              scale: [1, 2, 2],
              opacity: [0.7, 0, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
        
        {/* Avatares animados */}
        <div className="flex -space-x-2">
          <AnimatePresence mode="popLayout">
            {avatars.slice(0, 4).map((avatar, index) => (
              <motion.div
                key={avatar.id}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatar.color} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                initial={{ scale: 0, x: -10 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: 10 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 500,
                  damping: 25
                }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                {avatar.letter}
              </motion.div>
            ))}
            {viewersCount > 5 && (
              <motion.div
                className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-700 shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                +{viewersCount - 4}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Contador de visualizadores */}
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-gray-600" />
          <span className="text-sm text-gray-700">
            <AnimatePresence mode="wait">
              <motion.span 
                key={viewersCount}
                className="font-bold text-gray-900"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {viewersCount}
              </motion.span>
            </AnimatePresence>
            {' '}pessoas estão assistindo agora
          </span>
        </div>
        
        {/* Indicador de tendência */}
        <AnimatePresence>
          {trend === 'up' && (
            <motion.div
              className="flex items-center gap-1 text-green-600 text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <TrendingUp size={14} />
              +{recentChange}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Informação adicional */}
      <motion.p 
        className="text-xs text-gray-500 mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Junte-se a milhares de pessoas transformando suas vidas
      </motion.p>
    </div>
  );
};

export default LiveViewersIndicator;