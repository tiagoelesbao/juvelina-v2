import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Eye, TrendingUp } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const [visitors, setVisitors] = useState(1247);
  const [showDetails, setShowDetails] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('up');
  const [recentChange, setRecentChange] = useState(0);

  // Simular mudanças no número de visitantes
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => {
        // Variação realista baseada no horário
        const hour = new Date().getHours();
        const isPeakTime = hour >= 9 && hour <= 22;
        
        // Chance de mudança baseada no horário
        const changeChance = isPeakTime ? 0.7 : 0.3;
        
        if (Math.random() < changeChance) {
          // Mudança entre -3 e +5 visitantes
          const change = Math.floor(Math.random() * 9) - 3;
          const newValue = Math.max(10, prev + change);
          
          // Atualizar tendência
          if (change > 0) {
            setTrend('up');
            setRecentChange(change);
          } else if (change < 0) {
            setTrend('down');
            setRecentChange(change);
          } else {
            setTrend('stable');
          }
          
          return newValue;
        }
        return prev;
      });
    }, 8000); // Atualizar a cada 8 segundos

    return () => clearInterval(interval);
  }, []);

  // Auto-minimizar em mobile após 10 segundos
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsMinimized(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Formatar número com animação
  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR');
  };

  return (
    <>
      {/* Versão Mobile - Botão flutuante compacto */}
      <motion.div
        className="fixed bottom-20 right-5 md:hidden z-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            <motion.button
              key="minimized"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsMinimized(false)}
              className="bg-white shadow-lg rounded-full p-3 border border-gray-100 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-5 h-5 text-juvelina-gold" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {visitors > 999 ? '999+' : visitors}
              </span>
              {trend === 'up' && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <TrendingUp className="w-3 h-3 text-green-500" />
                </motion.div>
              )}
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Visitantes Online</h3>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-juvelina-gold to-juvelina-mint border-2 border-white"
                    />
                  ))}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-juvelina-gold">
                    {formatNumber(visitors)}
                  </span>
                  <span className="text-xs text-gray-500">pessoas</span>
                </div>
              </div>
              
              {recentChange > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-600 mt-1"
                >
                  +{recentChange} nos últimos minutos
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Versão Desktop - Widget completo */}
      <motion.div
        className="hidden md:block fixed bottom-5 right-5 z-30"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header sempre visível */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-juvelina-gold/10 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-juvelina-gold" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              <div>
                <p className="text-xs text-gray-600">Visitantes agora</p>
                <div className="flex items-center gap-2">
                  <motion.span
                    key={visitors}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {formatNumber(visitors)}
                  </motion.span>
                  
                  {trend === 'up' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-green-500"
                    >
                      <TrendingUp className="w-4 h-4" />
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Detalhes expandidos no hover */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-gray-100"
              >
                <div className="p-4 space-y-3">
                  {/* Mini avatares */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-juvelina-gold to-juvelina-mint border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                        >
                          {String.fromCharCode(65 + i)}
                        </motion.div>
                      ))}
                      {visitors > 5 && (
                        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +{visitors - 5}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Estatísticas */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Pico de hoje:</span>
                      <span className="font-medium text-gray-900">{formatNumber(visitors + 523)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Média diária:</span>
                      <span className="font-medium text-gray-900">{formatNumber(1852)}</span>
                    </div>
                  </div>
                  
                  {/* Indicador de interesse */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-600 mb-1">Interesse no produto</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-juvelina-gold to-juvelina-mint"
                        initial={{ width: '0%' }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <p className="text-xs text-juvelina-gold font-medium mt-1">Alto (78%)</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default VisitorCounter;