// src/features/hero/components/HeroButtons.tsx - Versão otimizada para desktop
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface HeroButtonsProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const shimmerAnimation = {
  x: ["-200%", "200%"],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatDelay: 1
  }
};

const HeroButtons: React.FC<HeroButtonsProps> = ({ onCtaClick }) => {
  return (
    <>
      {/* Container dos botões - Desktop only */}
      <motion.div 
        className="flex gap-4 mb-6 items-start"
        {...fadeInUp}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        {/* Botão Principal com desconto */}
        <div className="relative">
          {/* Badge de desconto flutuante */}
          <motion.div 
            className="absolute -top-3 -right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold z-10"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            -30% HOJE
          </motion.div>
          
          <motion.button
            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg overflow-hidden whitespace-nowrap"
            style={{ 
              background: "linear-gradient(135deg, #A9683D 0%, #8a5430 100%)",
              boxShadow: "0 10px 30px rgba(169,104,61,0.3)"
            }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 15px 35px rgba(169,104,61,0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onCtaClick}
          >
            {/* Efeito de brilho animado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={shimmerAnimation}
            />
            
            <ShoppingCart size={20} />
            <span className="relative z-10">Quero Transformar Minha Saúde</span>
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Avaliações e Pagamento - Desktop */}
      <motion.div 
        className="flex items-center gap-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Avaliações */}
        <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">4.9/5</span>
            <span className="text-xs text-gray-500">(2.847 avaliações)</span>
          </div>
        </div>
        
        {/* Garantias */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Garantia 30 dias</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            <span>Frete Grátis</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HeroButtons;