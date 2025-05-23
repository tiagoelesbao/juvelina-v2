import React from 'react';
import { motion } from 'framer-motion';

const HeroHeading: React.FC = () => {
  return (
    <>
      {/* Badge de inovação */}
      <motion.div 
        className="inline-block rounded-full px-4 py-1.5 mb-6 bg-gradient-to-r from-juvelina-mint/30 to-juvelina-mint/10 text-juvelina-gold font-medium"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Inovação Natural para 2025
      </motion.div>
      
      {/* Headline principal */}
      <motion.h1 
        className="text-4xl md:text-6xl font-['Ws_Paradose'] font-bold leading-tight mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <span className="block">Absorção <span className="text-juvelina-gold">5x Superior</span> em</span>
        
        <motion.span 
          className="block text-juvelina-gold"
          animate={{ 
            y: [0, -5, 0],
            textShadow: [
              "0px 0px 0px rgba(169,104,61,0.3)",
              "0px 5px 15px rgba(169,104,61,0.5)",
              "0px 0px 0px rgba(169,104,61,0.3)"
            ]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Cada Gota
        </motion.span>
      </motion.h1>
      
      {/* Subtítulo com copy focada em benefícios */}
      <motion.p 
        className="text-gray-700 text-lg md:text-xl font-medium mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Desperte seu bem-estar com Juvelina: o suplemento líquido de alta absorção 
        com 25 nutrientes premium que revoluciona:
      </motion.p>
      
      {/* Chips de Benefícios */}
      <motion.div 
        className="flex flex-wrap gap-3 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {[
          { 
            id: 'energy', 
            icon: '⚡', 
            text: 'Energia Sustentada', 
            color: 'bg-yellow-100 text-yellow-700 border-yellow-300' 
          },
          { 
            id: 'immunity', 
            icon: '🛡️', 
            text: 'Imunidade Reforçada', 
            color: 'bg-green-100 text-green-700 border-green-300'
          },
          { 
            id: 'beauty', 
            icon: '✨', 
            text: 'Beleza Radiante', 
            color: 'bg-purple-100 text-purple-700 border-purple-300'
          }
        ].map((benefit, index) => (
          <motion.div
            key={benefit.id}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border ${benefit.color}`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.6 + (index * 0.1), duration: 0.5 }
            }}
          >
            <span className="text-lg">{benefit.icon}</span>
            <span className="font-medium">{benefit.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default HeroHeading;