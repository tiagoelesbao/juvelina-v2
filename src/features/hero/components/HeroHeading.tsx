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
      {/* Headline principal - SIMPLIFICADA NO DESKTOP */}
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4"
        {...fadeInUp}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <span className="block">
          <span className="text-juvelina-gold">93% Mais Eficaz</span> que
        </span>
        
        <span className="block">
          Cápsulas Tradicionais
          <span className="sm:hidden">
            {' '}em{' '}
            <motion.span 
              className="relative inline-block text-juvelina-gold"
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
        </span>
      </motion.h1>
      
      {/* Subtítulo - VERSÃO MAIS CONCISA NO DESKTOP */}
      <motion.p 
        className="text-gray-700 text-lg md:text-xl font-medium mb-6"
        {...fadeInUp}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        {/* Mobile: versão completa */}
        <span className="sm:hidden">
          Desperte <span className="text-juvelina-gold font-bold">sua juventude</span> desde a primeira semana
          com nossa fórmula líquida de <span className="underline decoration-juvelina-gold decoration-2">absorção instantânea</span> e 
          25 nutrientes premium clinicamente testados.
        </span>
        
        {/* Desktop: versão simplificada */}
        <span className="hidden sm:inline">
          Desperte <span className="text-juvelina-gold font-bold">sua juventude</span> com nossa fórmula líquida de{' '}
          <span className="underline decoration-juvelina-gold decoration-2">absorção instantânea</span>.
        </span>
      </motion.p>
      
      {/* "Visto em" - APENAS MOBILE */}
      <motion.div 
        className="flex sm:hidden flex-col items-center justify-center gap-2 mb-6 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <span className="text-sm text-gray-600">Visto em:</span>
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-700 text-sm">Globo</span>
          <span className="font-bold text-gray-700 text-sm">Veja</span>
          <span className="font-bold text-gray-700 text-sm">Forbes</span>
          <span className="font-bold text-gray-700 text-sm">Exame</span>
        </div>
      </motion.div>
      
      {/* Chips de Benefícios - APENAS 2 NO DESKTOP */}
      <motion.div 
        className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 justify-center sm:justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Mobile: mostrar todos os 3 chips */}
        <div className="flex sm:hidden flex-col gap-3 w-full">
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
          ].map((chip) => (
            <motion.div
              key={chip.label}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border ${chip.bg} ${chip.text} ${chip.border} w-full relative overflow-hidden`}
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
              <span className="font-medium">{chip.label}</span>
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
        </div>
        
        {/* Desktop: 65% Menos Gripes e Pele 3x Mais Firme com mesmo tamanho */}
        <div className="hidden sm:flex gap-4">
          <motion.div
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-100 text-green-700 border border-green-300 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            initial={fadeInLeft.initial}
            animate={fadeInLeft.animate}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="text-lg">🛡️</span>
            <span className="font-medium whitespace-nowrap">65% Menos Gripes</span>
         

        
          </motion.div>
          
          <motion.div
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-purple-100 text-purple-700 border border-purple-300 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            initial={fadeInLeft.initial}
            animate={fadeInLeft.animate}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <span className="text-lg">✨</span>
            <span className="font-medium whitespace-nowrap">Pele 3x Mais Firme</span>
 
       
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default HeroHeading;