import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';

interface Activity {
  id: number;
  name: string;
  location: string;
  action: 'comprou' | 'assinou';
  product?: string;
  time: string;
}

const RecentActivityNotification: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Pool de dados para simulação
  const namePool = [
    'Ana Silva', 'Carlos Santos', 'Maria Oliveira', 'João Pereira', 'Fernanda Costa',
    'Ricardo Lima', 'Patricia Souza', 'Bruno Alves', 'Juliana Martins', 'Pedro Rodrigues',
    'Camila Ferreira', 'Lucas Gomes', 'Amanda Ribeiro', 'Gabriel Mendes', 'Beatriz Campos'
  ];

  const locationPool = [
    'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Porto Alegre, RS',
    'Curitiba, PR', 'Salvador, BA', 'Brasília, DF', 'Fortaleza, CE', 'Recife, PE',
    'Florianópolis, SC', 'Campinas, SP', 'Goiânia, GO', 'Manaus, AM', 'Vitória, ES'
  ];

  const productVariants = [
    'Kit 3 Meses', 'Assinatura Mensal', '1 Frasco', 'Kit Família'
  ];

  // Gerar atividade aleatória
  const generateActivity = (): Activity => {
    const isSubscription = Math.random() > 0.6;
    return {
      id: Date.now() + Math.random(),
      name: namePool[Math.floor(Math.random() * namePool.length)],
      location: locationPool[Math.floor(Math.random() * locationPool.length)],
      action: isSubscription ? 'assinou' : 'comprou',
      product: isSubscription ? 'Assinatura Mensal' : productVariants[Math.floor(Math.random() * productVariants.length)],
      time: 'agora mesmo'
    };
  };

  // Inicializar e gerenciar atividades
  useEffect(() => {
    // Gerar atividades iniciais
    const initialActivities = Array.from({ length: 5 }, () => generateActivity());
    setActivities(initialActivities);

    // Mostrar primeira notificação após 5 segundos
    const initialTimer = setTimeout(() => {
      if (!isPaused) {
        setCurrentActivity(initialActivities[0]);
        setIsVisible(true);
      }
    }, 5000);

    // Ciclo de notificações
    const interval = setInterval(() => {
      if (!isPaused) {
        const newActivity = generateActivity();
        setActivities(prev => [...prev, newActivity].slice(-10)); // Manter últimas 10
        setCurrentActivity(newActivity);
        setIsVisible(true);

        // Auto-hide após 5 segundos
        setTimeout(() => {
          if (!isPaused) {
            setIsVisible(false);
          }
        }, 5000);
      }
    }, 30000); // Nova notificação a cada 30 segundos

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isPaused]);

  // Pausar quando o usuário interage
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Fechar notificação
  const handleClose = () => {
    setIsVisible(false);
    setIsPaused(true);
    
    // Retomar após 60 segundos
    setTimeout(() => setIsPaused(false), 60000);
  };

  return (
    <AnimatePresence>
      {isVisible && currentActivity && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed bottom-5 left-5 right-5 md:left-auto md:right-5 md:max-w-[360px] z-40 pointer-events-auto"
        >
          <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-3 sm:p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-juvelina-gold/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-juvelina-gold" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-900">
                  Nova {currentActivity.action === 'comprou' ? 'Compra' : 'Assinatura'}!
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-juvelina-gold to-juvelina-mint rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                {currentActivity.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-gray-900 font-medium truncate">
                  {currentActivity.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {currentActivity.action} {currentActivity.product}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {currentActivity.location} • {currentActivity.time}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-juvelina-gold/20 rounded-b-lg"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecentActivityNotification;