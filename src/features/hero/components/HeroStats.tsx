import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  id: number;
  value: number;
  target: number;
  label: string;
  icon: string;
}

interface HeroStatsProps {
  stats: Stat[];
  inView: boolean;
}

const HeroStats: React.FC<HeroStatsProps> = ({ stats: initialStats, inView }) => {
  const [animatedValues, setAnimatedValues] = useState({
    clients: 0,
    nutrients: 0,
    satisfaction: 0
  });
  
  // Função para formatar números
  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `+${(num / 1000).toFixed(0)}mil`;
    } else if (num >= 1000) {
      return `+${(num / 1000).toFixed(1)}mil`.replace('.', ',');
    }
    return num.toString();
  };
  
  // Animação quando componente entra em view
  useEffect(() => {
    if (!inView) return;
    
    // Targets
    const targets = {
      clients: 12500,
      nutrients: 25,
      satisfaction: 98
    };
    
    // Animar clientes
    let clientValue = 0;
    const clientInterval = setInterval(() => {
      clientValue += 250;
      if (clientValue >= targets.clients) {
        clientValue = targets.clients;
        clearInterval(clientInterval);
      }
      setAnimatedValues(prev => ({ ...prev, clients: clientValue }));
    }, 20);
    
    // Animar nutrientes
    let nutrientValue = 0;
    const nutrientInterval = setInterval(() => {
      nutrientValue += 1;
      if (nutrientValue >= targets.nutrients) {
        nutrientValue = targets.nutrients;
        clearInterval(nutrientInterval);
      }
      setAnimatedValues(prev => ({ ...prev, nutrients: nutrientValue }));
    }, 60);
    
    // Animar satisfação
    let satisfactionValue = 0;
    const satisfactionInterval = setInterval(() => {
      satisfactionValue += 2;
      if (satisfactionValue >= targets.satisfaction) {
        satisfactionValue = targets.satisfaction;
        clearInterval(satisfactionInterval);
      }
      setAnimatedValues(prev => ({ ...prev, satisfaction: satisfactionValue }));
    }, 25);
    
    return () => {
      clearInterval(clientInterval);
      clearInterval(nutrientInterval);
      clearInterval(satisfactionInterval);
    };
  }, [inView]);
  
  // Stats com valores animados
  const displayStats = [
    {
      id: 1,
      icon: '✨',
      value: formatNumber(animatedValues.clients),
      label: 'Clientes Satisfeitos'
    },
    {
      id: 2,
      icon: '🌿',
      value: animatedValues.nutrients.toString(),
      label: 'Nutrientes Premium'
    },
    {
      id: 3,
      icon: '💚',
      value: `${animatedValues.satisfaction}%`,
      label: 'Taxa de Satisfação'
    }
  ];
  
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 mt-8 max-w-xl mx-auto md:mx-0">
      {displayStats.map((stat, index) => (
        <motion.div 
          key={stat.id}
          className="bg-gradient-to-br from-white/50 to-juvelina-mint/10 backdrop-blur-sm p-3 md:p-4 rounded-2xl border border-juvelina-mint/30 shadow-sm hover:shadow-md transition-all group"
          whileHover={{ 
            y: -3, 
            scale: 1.02,
            boxShadow: "0 10px 20px rgba(194,247,188,0.2)" 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1,
            y: 0,
            transition: { delay: 0.5 + index * 0.1, duration: 0.6, ease: "easeOut" }
          }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div 
              className="text-2xl md:text-3xl mb-2 filter drop-shadow-sm"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.3
              }}
            >
              {stat.icon}
            </motion.div>
            <div className="text-xl md:text-2xl font-bold mb-1">
              <span className="bg-gradient-to-r from-juvelina-gold to-juvelina-emerald bg-clip-text text-transparent">
                {stat.value}
              </span>
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-medium leading-tight px-1">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroStats;