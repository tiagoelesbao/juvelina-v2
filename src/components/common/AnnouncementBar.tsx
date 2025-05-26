// src/components/common/AnnouncementBar.tsx
import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Truck, 
  Shield, 
  Heart, 
  Leaf, 
  Star, 
  Clock,
  Zap,
  Award,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  textMobile?: string; // Versão mais curta para mobile
  icon: React.ReactNode;
  highlight?: string;
  type: 'offer' | 'benefit' | 'urgency' | 'trust';
}

interface AnnouncementBarProps {
  initialUnits?: number;
  discountPercentage?: number;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ 
  initialUnits = 54, 
  discountPercentage = 30 
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 35,
    seconds: 20
  });
  const [unitsLeft, setUnitsLeft] = useState(initialUnits);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mensagens com versões mobile mais curtas
  const messages: Message[] = [
    {
      id: 1,
      text: `🔥 HOJE: ${discountPercentage}% OFF + Frete Grátis em Todo Brasil`,
      textMobile: `🔥 ${discountPercentage}% OFF + Frete Grátis`,
      icon: <Truck size={14} />,
      highlight: `${discountPercentage}% OFF`,
      type: 'offer'
    },
    {
      id: 2,
      text: '✨ ZERO AÇÚCAR • 100% Natural • Vegano • Sem Glúten',
      textMobile: '✨ ZERO AÇÚCAR • 100% Natural',
      icon: <Leaf size={14} />,
      highlight: 'ZERO AÇÚCAR',
      type: 'benefit'
    },
    {
      id: 3,
      text: `⏰ Últimas ${unitsLeft} unidades com desconto!`,
      textMobile: `⏰ Últimas ${unitsLeft} unidades!`,
      icon: <Clock size={14} />,
      highlight: `${unitsLeft} unidades`,
      type: 'urgency'
    },
    {
      id: 4,
      text: '🐾 PET FRIENDLY: Seguro para toda família',
      textMobile: '🐾 PET FRIENDLY',
      icon: <Heart size={14} />,
      highlight: 'PET FRIENDLY',
      type: 'benefit'
    },
    {
      id: 5,
      text: '⚡ Absorção 5X MAIS RÁPIDA que cápsulas',
      textMobile: '⚡ Absorção 5X MAIS RÁPIDA',
      icon: <Zap size={14} />,
      highlight: '5X',
      type: 'benefit'
    },
    {
      id: 6,
      text: '🏆 +13.000 clientes com resultados comprovados',
      textMobile: '🏆 +13.000 clientes satisfeitos',
      icon: <Star size={14} />,
      highlight: '+13.000',
      type: 'trust'
    },
    {
      id: 7,
      text: '🛡️ Garantia de 30 dias ou seu dinheiro de volta',
      textMobile: '🛡️ Garantia de 30 dias',
      icon: <Shield size={14} />,
      highlight: '30 dias',
      type: 'trust'
    },
    {
      id: 8,
      text: `🎁 Compre 2 e GANHE 15% extra de desconto`,
      textMobile: `🎁 Compre 2 GANHE 15% extra`,
      icon: <Package size={14} />,
      highlight: '15%',
      type: 'offer'
    }
  ];

  // Rotação de mensagens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59, hours: prev.hours };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 5, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Atualizar unidades
  useEffect(() => {
    const unitTimer = setInterval(() => {
      setUnitsLeft(prev => {
        const decrease = Math.random() > 0.7 ? 1 : 0;
        const newValue = prev - decrease;
        return newValue > 10 ? newValue : 54;
      });
    }, 60000);

    return () => clearInterval(unitTimer);
  }, []);

  const currentMessage = messages[currentMessageIndex];
  const formatTime = (value: number) => String(value).padStart(2, '0');

  // Cores baseadas no tipo de mensagem
  const getBackgroundColor = (type: string) => {
    switch(type) {
      case 'urgency': return 'bg-red-600';
      case 'trust': return 'bg-juvelina-emerald';
      case 'benefit': return 'bg-juvelina-gold';
      default: return 'bg-juvelina-gold';
    }
  };

  // Pegar texto apropriado baseado no dispositivo
  const getMessageText = (message: Message) => {
    return isMobile && message.textMobile ? message.textMobile : message.text;
  };

  return (
    <div className={`${getBackgroundColor(currentMessage.type)} text-white py-1.5 md:py-2 sticky top-0 z-50 transition-colors duration-500`}>
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between gap-2">
          {/* Mensagem principal com animação */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-1 md:gap-2"
              >
                {/* Ícone pulsante - escondido em telas muito pequenas */}
                <motion.span
                  className="hidden xs:block"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentMessage.icon}
                </motion.span>
                
                {/* Texto da mensagem */}
                <p className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
                  {getMessageText(currentMessage)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Timer - só em desktop */}
          <div className="hidden lg:flex items-center gap-4 ml-4">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <Clock size={14} />
              <span className="text-sm font-mono">
                {formatTime(timeLeft.hours)}:
                {formatTime(timeLeft.minutes)}:
                {formatTime(timeLeft.seconds)}
              </span>
            </div>
          </div>

          {/* Timer compacto para tablet */}
          <div className="hidden md:flex lg:hidden items-center ml-2">
            <div className="bg-white/10 px-2 py-0.5 rounded text-xs font-mono">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progresso sutil */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-white/30"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 4, ease: 'linear' }}
        key={currentMessageIndex}
      />
    </div>
  );
};

export default AnnouncementBar;