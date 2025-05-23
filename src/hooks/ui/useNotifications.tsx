// src/hooks/useNotifications.tsx
import { useState, useEffect } from 'react';

// Tipos de notificações
export type NotificationType = 'purchase' | 'review' | 'creator' | 'stock' | 'discount';

export interface Notification {
  id: number;
  type: NotificationType;
  name?: string;
  avatar?: string;
  message: string;
  time: string;
  location?: string;
  action?: string;
  platform?: 'instagram' | 'tiktok';
  rating?: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [notificationQueue, setNotificationQueue] = useState<Notification[]>([]);
  const [notificationHistory, setNotificationHistory] = useState<Set<number>>(new Set());
  
  // Nomes e locais para simular notificações
  const namesPool = [
    "Mariana S.", "Carlos E.", "Juliana", "Ricardo", "Amanda", 
    "Paulo", "Fernanda", "João", "Luciana", "Gabriel",
    "Camila", "Rafael", "Patrícia", "Bruno", "Ana Clara"
  ];
  
  const locationsPool = [
    "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
    "Curitiba, PR", "Porto Alegre, RS", "Salvador, BA",
    "Recife, PE", "Fortaleza, CE", "Brasília, DF", "Florianópolis, SC"
  ];
  
  // Inicializar com notificações de exemplo
  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: 1,
        type: 'purchase',
        name: "Julia Ribeiro",
        avatar: "https://images.unsplash.com/photo-1619785292559-a15caa28bde6?ixlib=rb-4.0.3",
        message: "acabou de comprar Juvelina",
        time: "agora mesmo",
        location: "São Paulo, SP"
      },
      {
        id: 2,
        type: 'creator',
        name: "Amanda Costa",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3",
        message: "Juvelina mudou minha rotina! Recomendo para todas as minhas seguidoras.",
        time: "2 horas atrás",
        platform: "instagram",
        rating: 5
      }
    ];
    
    setNotificationQueue(initialNotifications);
    
    // Programar notificações aleatórias
    const timer = setInterval(() => {
      generateRandomNotification();
    }, 45000); // Uma nova notificação a cada 45 segundos
    
    return () => clearInterval(timer);
  }, []);
  
  // Mostrar próxima notificação da fila
  useEffect(() => {
    if (notificationQueue.length > 0 && !activeNotification) {
      const nextNotification = notificationQueue[0];
      // Só mostra se não foi mostrada recentemente
      if (!notificationHistory.has(nextNotification.id)) {
        setActiveNotification(nextNotification);
        setNotificationQueue(queue => queue.slice(1));
        
        // Adiciona ao histórico
        setNotificationHistory(prev => new Set([...prev, nextNotification.id]));
        
        // Remove após alguns segundos
        const timeout = setTimeout(() => {
          setActiveNotification(null);
        }, 7000);
        
        return () => clearTimeout(timeout);
      } else {
        // Se já foi mostrada, remove da fila
        setNotificationQueue(queue => queue.slice(1));
      }
    }
  }, [notificationQueue, activeNotification, notificationHistory]);
  
  // Gerar notificação aleatória
  const generateRandomNotification = () => {
    const types: NotificationType[] = ['purchase', 'review', 'creator', 'stock', 'discount'];
    const type = types[Math.floor(Math.random() * types.length)];
    const name = namesPool[Math.floor(Math.random() * namesPool.length)];
    const location = locationsPool[Math.floor(Math.random() * locationsPool.length)];
    
    const newNotification: Notification = {
      id: Date.now(),
      type,
      name,
      location,
      time: "agora mesmo",
      message: "",
      avatar: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`
    };
    
    // Personalizar com base no tipo
    switch (type) {
      case 'purchase':
        newNotification.message = "acabou de comprar Juvelina";
        break;
      case 'review':
        newNotification.message = "avaliou Juvelina com 5 estrelas";
        newNotification.rating = 5;
        break;
      case 'creator':
        newNotification.message = ["Juvelina é incrível! Recomendo!", "Minha energia mudou completamente!", "O melhor suplemento que já testei!"][Math.floor(Math.random() * 3)];
        newNotification.platform = Math.random() > 0.5 ? 'instagram' : 'tiktok';
        newNotification.rating = 5;
        break;
      case 'stock':
        newNotification.message = "Restam apenas poucas unidades em estoque!";
        break;
      case 'discount':
        newNotification.message = "Oferta especial por tempo limitado!";
        break;
    }
    
    setNotificationQueue(prev => [...prev, newNotification]);
  };
  
  // Mostrar uma notificação específica
  const showNotification = (notification: Notification) => {
    setActiveNotification(notification);
    
    // Remove após alguns segundos
    setTimeout(() => {
      setActiveNotification(null);
    }, 7000);
  };
  
  // Esconder notificação atual
  const hideNotification = () => {
    setActiveNotification(null);
  };
  
  return {
    activeNotification,
    showNotification,
    hideNotification,
    generateRandomNotification
  };
}