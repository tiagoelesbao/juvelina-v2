// src/components/ui/NotificationSystem.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Bell, CheckCircle, Star, Instagram } from 'lucide-react';
import { useNotifications, Notification } from '../../hooks/ui/useNotifications';
import TikTokIcon from './TikTokIcon';

const NotificationSystem: React.FC = () => {
  const { activeNotification, hideNotification } = useNotifications();
  
  if (!activeNotification) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        key={activeNotification.id}
        initial={{ opacity: 0, x: -100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-5 top-24 z-40 max-w-xs"
      >
        <div className="bg-white rounded-lg shadow-xl p-3 border-l-4 border-juvelina-gold">
          <div className="flex justify-between items-start">
            <NotificationContent notification={activeNotification} />
            
            <button 
              className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
              onClick={hideNotification}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const NotificationContent: React.FC<{ notification: Notification }> = ({ notification }) => {
  switch (notification.type) {
    case 'purchase':
      return (
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <img 
              src={notification.avatar} 
              alt={notification.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm"><span className="font-medium">{notification.name}</span> {notification.message}</div>
            <div className="text-xs text-gray-500">{notification.location} • {notification.time}</div>
          </div>
        </div>
      );
    
    case 'creator':
      return (
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <img 
              src={notification.avatar} 
              alt={notification.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-juvelina-gold"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm">{notification.name}</span>
              <CheckCircle size={12} className="text-blue-500 fill-blue-500" />
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {notification.platform === 'instagram' ? (
                <Instagram size={10} />
              ) : (
                <TikTokIcon size={10} />
              )}
              <span className="text-juvelina-gold">• {Math.floor(Math.random() * 500) + 100}K</span>
            </div>
            <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
      );
    
    case 'stock':
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 flex-shrink-0">
            <Bell size={16} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{notification.message}</div>
            <div className="text-xs text-gray-500">Aja rápido para garantir o seu!</div>
          </div>
        </div>
      );
    
    case 'discount':
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-juvelina-gold/20 rounded-full flex items-center justify-center text-juvelina-gold flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{notification.message}</div>
            <div className="text-xs text-gray-500">Economize 30% por tempo limitado!</div>
          </div>
        </div>
      );
    
    case 'review':
      return (
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <img 
              src={notification.avatar} 
              alt={notification.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm"><span className="font-medium">{notification.name}</span> {notification.message}</div>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
      );
    
    default:
      return null;
  }
};

export default NotificationSystem;