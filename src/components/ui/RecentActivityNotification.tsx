// src/components/ui/RecentActivityNotification.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';

interface NotificationProps {
  // Controla se as notificações são exibidas
  enabled: boolean;
  // Seção atual para exibir notificações apenas em seções relevantes
  currentSection: string;
  // Controla a posição (desktop vs mobile)
  isMobile: boolean;
}

type NotificationType = 'purchase' | 'review';

interface NotificationItem {
  id: string;
  type: NotificationType;
  name: string;
  message: string;
  timeAgo: string;
  location?: string;
}

export const RecentActivityNotification: React.FC<NotificationProps> = ({ enabled, currentSection, isMobile }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [currentNotification, setCurrentNotification] = useState<NotificationItem | null>(null);
  
  // Lista de seções onde as notificações são relevantes
  const relevantSections = ['oferta', 'planos', 'beneficios'];
  
  // Definir se deve mostrar notificações com base na seção atual
  const shouldShowNotifications = 
    enabled && 
    !isMobile && // Apenas desktop 
    relevantSections.includes(currentSection);
  
  // Gerar notificações
  useEffect(() => {
    if (!shouldShowNotifications) return;
    
    const firstNames = ["Ana", "João", "Maria", "Pedro", "Lúcia", "Rafael", "Carla"];
    const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Pereira"];
    const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre"];
    const states = ["SP", "RJ", "MG", "PR", "RS"];
    
    // Gerar uma nova notificação a cada 45-90 segundos (menos frequente)
    const interval = setInterval(() => {
      // 40% de chance de mostrar uma notificação
      if (Math.random() > 0.6) return;
      
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName.charAt(0)}.`;
      
      const city = cities[Math.floor(Math.random() * cities.length)];
      const state = states[Math.floor(Math.random() * states.length)];
      const location = `${city}, ${state}`;
      
      // Tipos de notificações com pesos (70% compras, 30% avaliações)
      const notificationType: NotificationType = Math.random() < 0.7 ? 'purchase' : 'review';
      
      const newNotification: NotificationItem = {
        id: Date.now().toString(),
        type: notificationType,
        name,
        message: notificationType === 'purchase' 
          ? 'comprou Juvelina Organics' 
          : 'avaliou com 5 estrelas',
        timeAgo: 'agora',
        location
      };
      
      setNotifications(prev => [...prev, newNotification]);
      
      // Exibir a notificação atual
      setCurrentNotification(newNotification);
      
      // Ocultar a notificação após 5 segundos
      setTimeout(() => {
        setCurrentNotification(null);
      }, 5000);
      
    }, Math.random() * 45000 + 45000); // Entre 45 e 90 segundos
    
    return () => clearInterval(interval);
  }, [shouldShowNotifications, currentSection]);
  
  // Se não deve mostrar ou está em mobile, não renderize nada
  if (!shouldShowNotifications) return null;
  
  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          key={currentNotification.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed bottom-20 right-5 z-30 max-w-xs" // Posição ajustada
        >
          <div className="bg-white rounded-lg shadow-md p-3 border border-gray-100">
            <div className="flex items-center gap-2">
              {currentNotification.type === 'purchase' ? (
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <ShoppingCart size={16} />
                </div>
              ) : (
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 flex-shrink-0">
                  <Star size={16} />
                </div>
              )}
              <div>
                <div className="text-sm font-medium">
                  {currentNotification.name} {currentNotification.message}
                </div>
                <div className="text-xs text-gray-500 flex justify-between items-center">
                  <span>{currentNotification.timeAgo}</span>
                  {currentNotification.location && (
                    <span className="text-xs text-gray-400">{currentNotification.location}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecentActivityNotification;