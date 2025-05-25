// src/features/hero/components/HeroStats.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';

interface Stat {
  id: number;
  value: number;
  target: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  description?: string;
}

interface HeroStatsProps {
  stats: Stat[];
  inView: boolean;
}

const HeroStats: React.FC<HeroStatsProps> = ({ stats: initialStats, inView }) => {
  const [animatedValues, setAnimatedValues] = useState({
    clients: 0,
    nutrients: 0,
    satisfaction: 0,
    growth: 0
  });
  
  // Função para formatar números
  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 1000).toFixed(0)}mil`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}mil`.replace('.', ',');
    }
    return num.toString();
  };
  
  // Animação quando componente entra em view
  useEffect(() => {
    if (!inView) return;
    
    // Targets atualizados
    const targets = {
      clients: 13000,
      nutrients: 25,
      satisfaction: 98,
      growth: 47
    };
    
    // Animar cada valor
    const animateValue = (key: keyof typeof targets, duration: number) => {
      const start = 0;
      const end = targets[key];
      const increment = end / (duration / 16); // 60 FPS
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
      
      return timer;
    };
    
    // Iniciar animações com delays diferentes
    const timers = [
      animateValue('clients', 2000),
      animateValue('nutrients', 1500),
      animateValue('satisfaction', 1800),
      animateValue('growth', 2200)
    ];
    
    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [inView]);
  
  // Stats com valores animados e ícones
  const displayStats = [
    {
      id: 1,
      icon: <Users className="w-8 h-8" />,
      value: formatNumber(animatedValues.clients),
      label: 'Vidas',
      sublabel: 'Transformadas',
      description: 'em apenas 6 meses',
      color: 'from-yellow-50 to-yellow-100',
      iconColor: 'text-yellow-600',
      accentColor: 'bg-yellow-200'
    },
    {
      id: 2,
      icon: <Award className="w-8 h-8" />,
      value: `${animatedValues.nutrients}`,
      label: 'Nutrientes',
      sublabel: 'Premium',
      description: 'clinicamente testados',
      color: 'from-green-50 to-green-100',
      iconColor: 'text-green-600',
      accentColor: 'bg-green-200'
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8" />,
      value: `${animatedValues.satisfaction}%`,
      label: 'Taxa de Recompra',
      sublabel: '',
      description: 'clientes fiéis',
      color: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      accentColor: 'bg-purple-200'
    },
    {
      id: 4,
      icon: <Zap className="w-8 h-8" />,
      value: `+${animatedValues.growth}%`,
      label: 'Mais Energia',
      sublabel: '',
      description: 'desde a 1ª semana',
      color: 'from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      accentColor: 'bg-orange-200'
    }
  ];
  
  return (
    <div className="w-full mt-8 px-4 md:px-0">
      {/* Container com background sutil */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayStats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              className={`relative bg-gradient-to-br ${stat.color} rounded-2xl p-4 md:p-5 text-center group hover:shadow-md transition-all duration-300`}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1,
                y: 0,
                transition: { 
                  delay: 0.5 + index * 0.1, 
                  duration: 0.6, 
                  ease: "easeOut" 
                }
              }}
            >
              {/* Ícone no topo */}
              <div className={`${stat.iconColor} mb-3 flex justify-center`}>
                <motion.div
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.5
                  }}
                >
                  {stat.icon}
                </motion.div>
              </div>
              
              {/* Valor principal */}
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              
              {/* Labels */}
              <div className="space-y-0">
                <div className="text-xs md:text-sm font-medium text-gray-700">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="text-xs md:text-sm font-medium text-gray-700">
                    {stat.sublabel}
                  </div>
                )}
              </div>
              
              {/* Descrição */}
              <div className="text-[10px] md:text-xs text-gray-500 mt-1">
                {stat.description}
              </div>
              
              {/* Accent line no bottom */}
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-1 ${stat.accentColor} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroStats;