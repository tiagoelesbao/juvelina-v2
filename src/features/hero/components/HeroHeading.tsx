// src/features/hero/components/HeroHeading.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Animações definidas fora do componente para evitar recriação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 }
};

// Configurações de transição otimizadas
const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20
};

const HeroHeading: React.FC = () => {
  return (
    <>
      {/* Badge de inovação */}
      <motion.div 
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 bg-gradient-to-r from-juvelina-mint/30 to-juvelina-mint/10 text-juvelina-gold font-medium"
        initial={fadeInLeft.initial}
        animate={fadeInLeft.animate}
        transition={{ delay: 0.2, duration: 0.5, ...springTransition }}
      >
        <span>🏆 #1 Suplemento Líquido do Brasil</span>
        <span className="text-xs opacity-80">• Inovação 2025</span>
      </motion.div>
      
      {/* Headline principal */}
      <motion.h1 
        className="text-4xl md:text-6xl font-display font-bold leading-tight mb-4"
        {...fadeInUp}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <span className="block">
          <span className="text-juvelina-gold">93% Mais Eficaz</span> que
        </span>
        
        <span className="block">
          Cápsulas Tradicionais em{' '}
          <motion.span 
            className="relative inline-block text-juvelina-gold"
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            15 Dias
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-1 bg-juvelina-gold/20"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.span>
        </span>
      </motion.h1>
      
      {/* Subtítulo com números específicos */}
      <motion.p 
        className="text-gray-700 text-lg md:text-xl font-medium mb-6"
        {...fadeInUp}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Desperte <span className="text-juvelina-gold font-bold">47% mais energia</span> desde a primeira semana
        com nossa fórmula líquida de <span className="underline decoration-juvelina-gold decoration-2">absorção instantânea</span> e 
        25 nutrientes premium clinicamente testados.
      </motion.p>
      
      {/* "Visto em" - Centralizado no mobile */}
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 mb-6 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <span className="text-sm text-gray-600">Visto em:</span>
        <div className="flex items-center gap-3 md:gap-4">
          <span className="font-bold text-gray-700 text-sm md:text-base">Globo</span>
          <span className="font-bold text-gray-700 text-sm md:text-base">Veja</span>
          <span className="font-bold text-gray-700 text-sm md:text-base">Forbes</span>
          <span className="font-bold text-gray-700 text-sm md:text-base">Exame</span>
        </div>
      </motion.div>
      
      {/* Chips de Benefícios - Com tamanhos iguais no desktop */}
      <motion.div 
        className="flex flex-col sm:flex-row flex-wrap md:flex-nowrap gap-3 mb-8 justify-center md:justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Container otimizado para os chips */}
        {[
          {
            bg: 'bg-yellow-100',
            text: 'text-yellow-700',
            border: 'border-yellow-300',
            accent: 'bg-yellow-400',
            icon: '⚡',
            label: '+8h de Energia',
            delay: 0.6
          },
          {
            bg: 'bg-green-100',
            text: 'text-green-700',
            border: 'border-green-300',
            accent: 'bg-green-400',
            icon: '🛡️',
            label: '65% Menos Gripes',
            delay: 0.7,
            animDelay: 1
          },
          {
            bg: 'bg-purple-100',
            text: 'text-purple-700',
            border: 'border-purple-300',
            accent: 'bg-purple-400',
            icon: '✨',
            label: 'Pele 3x Mais Firme',
            delay: 0.8,
            animDelay: 2
          }
        ].map((chip, index) => (
          <motion.div
            key={chip.label}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border ${chip.bg} ${chip.text} ${chip.border} w-full sm:w-auto md:flex-1 relative overflow-hidden`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: { duration: 0.2 }
            }}
            initial={fadeInLeft.initial}
            animate={fadeInLeft.animate}
            transition={{ delay: chip.delay, duration: 0.5 }}
          >
            <span className="text-lg">{chip.icon}</span>
            <span className="font-medium whitespace-nowrap">{chip.label}</span>
            <motion.div 
              className={`absolute bottom-0 left-0 h-0.5 ${chip.accent}`}
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: chip.animDelay || 0,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default HeroHeading;