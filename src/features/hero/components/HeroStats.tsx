// src/features/hero/components/HeroStats.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface HeroStatsProps {
  showTitle?: boolean;
}

const HeroStats: React.FC<HeroStatsProps> = ({ showTitle = false }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    clients: 0,
    nutrients: 0,
    satisfaction: 0,
    growth: 0
  });
  
  // Usar useInView do react-intersection-observer
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    rootMargin: '-50px',
  });
  
  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 1000).toFixed(0)}mil`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}mil`.replace('.', ',');
    }
    return num.toString();
  };
  
  useEffect(() => {
    // Só animar quando estiver em view E não tiver animado ainda
    if (!inView || hasAnimated) return;
    
    console.log('Stats animation starting...'); // Debug
    setHasAnimated(true);
    
    const targets = {
      clients: 13000,
      nutrients: 25,
      satisfaction: 98,
      growth: 47
    };
    
    // Animação dos valores
    const animateValue = (key: keyof typeof targets, duration: number) => {
      const start = 0;
      const end = targets[key];
      const startTime = Date.now();
      
      const updateValue = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.floor(start + (end - start) * progress);
        
        setAnimatedValues(prev => ({ ...prev, [key]: currentValue }));
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };
      
      requestAnimationFrame(updateValue);
    };
    
    // Iniciar todas as animações
    animateValue('clients', 2000);
    animateValue('nutrients', 1500);
    animateValue('satisfaction', 1800);
    animateValue('growth', 2200);
    
  }, [inView, hasAnimated]);
  
  const displayStats = [
    {
      id: 1,
      icon: <Users className="w-6 h-6" />,
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
      icon: <Award className="w-6 h-6" />,
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
      icon: <TrendingUp className="w-6 h-6" />,
      value: `${animatedValues.satisfaction}%`,
      label: 'Taxa de',
      sublabel: 'Recompra',
      description: 'clientes fiéis',
      color: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      accentColor: 'bg-purple-200'
    },
    {
      id: 4,
      icon: <Zap className="w-6 h-6" />,
      value: `+${animatedValues.growth}%`,
      label: 'Mais',
      sublabel: 'Energia',
      description: 'desde a 1ª semana',
      color: 'from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      accentColor: 'bg-orange-200'
    }
  ];
  
  return (
    <div className="w-full px-4" ref={ref}>
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          {displayStats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              className={`relative bg-gradient-to-br ${stat.color} rounded-xl p-3 text-center group`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { 
                opacity: 1,
                y: 0
              } : { 
                opacity: 0, 
                y: 20 
              }}
              transition={{ 
                delay: 0.1 + index * 0.1, 
                duration: 0.6, 
                ease: "easeOut" 
              }}
            >
              <div className={`${stat.iconColor} mb-2 flex justify-center`}>
                {stat.icon}
              </div>
              
              <div className="text-xl font-bold text-gray-800">
                {stat.value}
              </div>
              
              <div className="space-y-0">
                <div className="text-xs font-medium text-gray-700">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="text-xs font-medium text-gray-700">
                    {stat.sublabel}
                  </div>
                )}
              </div>
              
              <div className="text-[9px] text-gray-500 mt-1">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroStats;