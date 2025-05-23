import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '../hooks/useCountUp';

interface HeroStatsProps {
  stats: Array<{
    id: number;
    value: number;
    target: number;
    label: string;
    icon: string;
  }>;
  inView: boolean;
}

const HeroStats: React.FC<HeroStatsProps> = ({ stats, inView }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.id}
          className="bg-white/70 backdrop-blur-md p-4 rounded-xl border border-juvelina-gold/20 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ 
            y: -5, 
            boxShadow: "0 15px 30px rgba(169,104,61,0.15)" 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: inView ? 1 : 0, 
            y: inView ? 0 : 20,
            transition: { delay: 0.3 + index * 0.2, duration: 0.6 }
          }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl md:text-3xl font-bold mb-1 text-gradient-gold animate-shimmer">
              {stat.id === 1 ? formatNumber(stat.value) : `${stat.value}${stat.id === 3 ? '%' : ''}`}
            </div>
            <div className="text-sm text-gray-700">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroStats;