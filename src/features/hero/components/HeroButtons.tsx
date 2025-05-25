// src/features/hero/components/HeroButtons.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Zap } from 'lucide-react';

interface HeroButtonsProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

// Animações definidas fora do componente para performance
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
      {/* Container dos botões - Centralizado no mobile, alinhado à esquerda no desktop */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 mb-6 items-center sm:items-start justify-center sm:justify-start"
        {...fadeInUp}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        {/* Botão Principal com desconto */}
        <div className="relative w-full sm:w-auto">
          {/* Badge de desconto flutuante */}
          <motion.div 
            className="absolute -top-3 right-2 sm:-right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold z-10"
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
            className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-4 rounded-full font-bold text-white shadow-lg overflow-hidden whitespace-nowrap"
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
        
        {/* Botão Secundário - Visível apenas no mobile */}
        <motion.button
          className="group w-full sm:w-auto flex sm:hidden items-center justify-center px-6 md:px-8 py-4 rounded-full font-medium border-2 border-juvelina-gold text-juvelina-gold bg-white/80 backdrop-blur-sm relative overflow-hidden whitespace-nowrap"
          whileHover={{ 
            backgroundColor: "rgba(169,104,61,0.05)",
            scale: 1.02
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Zap size={18} className="mr-2" />
          <span>Ver Resultados Reais</span>
          <motion.span 
            className="absolute bottom-0 left-0 h-0.5 bg-juvelina-gold"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
      
      {/* MOBILE: Garantias em linha única */}
      <motion.div 
        className="flex sm:hidden items-center justify-center gap-3 text-xs text-gray-600 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Garantia 30 dias</span>
        </div>
        
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
          </svg>
          <span>Frete Grátis</span>
        </div>
        
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>100% Segura</span>
        </div>
      </motion.div>

      {/* Container para Avaliações e Pagamento */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-3 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Formas de pagamento - Apenas mobile */}
        <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100 w-auto sm:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Pagamento seguro:</span>
            <div className="flex items-center gap-1.5">
              {/* Visa */}
              <div className="w-8 h-5 flex items-center justify-center">
                <svg viewBox="0 0 48 32" className="h-4">
                  <rect fill="#0E4595" width="48" height="32" rx="4"/>
                  <path fill="white" d="M19.2 11.2L16.9 20.8h-2.7l2.3-9.6h2.7zm11.1 6.2l1.5-4 .8 4h-2.3zm3.1 3.4h2.5l-2.2-9.6h-2.3c-.5 0-.9.3-1.1.7l-3.9 8.9h2.7l.5-1.5h3.3l.3 1.5h.2zm-7.9-3.1c0-2.6-3.7-2.8-3.6-4 0-.4.3-.7 1.1-.8.4 0 1.4-.1 2.6.4l.5-2.2c-.6-.2-1.5-.5-2.5-.5-2.7 0-4.5 1.4-4.5 3.4 0 1.5 1.3 2.3 2.3 2.8 1 .5 1.4.8 1.4 1.3 0 .7-.8 1-1.6 1-.7 0-1.6-.2-2.3-.5l-.5 2.2c.5.2 1.5.4 2.5.4 2.7.1 4.6-1.3 4.6-3.5zm-13.7-6.5l-4.2 9.6H9.8L7.6 13c-.1-.5-.3-.6-.6-.8-.5-.3-1.4-.6-2.1-.8l.1-.3h3.7c.5 0 .9.3 1 .8l.9 4.9 2.3-5.7h2.8z"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="w-8 h-5 flex items-center justify-center">
                <svg viewBox="0 0 48 32" className="h-4">
                  <rect fill="#1A1F71" width="48" height="32" rx="4"/>
                  <circle cx="19" cy="16" r="7" fill="#EB001B"/>
                  <circle cx="29" cy="16" r="7" fill="#F79E1B"/>
                  <path fill="#FF5F00" d="M24 11.5c1.4 1.2 2.2 3 2.2 4.5s-.9 3.3-2.2 4.5c-1.4-1.2-2.2-3-2.2-4.5s.9-3.3 2.2-4.5z"/>
                </svg>
              </div>
              {/* Pix */}
              <div className="w-8 h-5 flex items-center justify-center bg-[#00BFA5] rounded">
                <svg viewBox="0 0 24 24" className="h-3.5 text-white" fill="currentColor">
                  <path d="M14.4 8.8c-.7-.7-1.6-1.1-2.6-1.1H9.2l-2.9 2.9c-1.2 1.2-1.2 3.1 0 4.2L9.2 18h2.6c1 0 1.9-.4 2.6-1.1l1.7-1.7c.7-.7 1.1-1.6 1.1-2.6 0-1-.4-1.9-1.1-2.6l-1.7-1.7zm-1.1 5.5l-1.7 1.7c-.4.4-.9.6-1.4.6h-1l1.7-1.7c.7-.7.7-1.8 0-2.5L9.2 10.8h1c.5 0 1 .2 1.4.6l1.7 1.7c.4.4.6.9.6 1.4 0 .5-.2 1-.6 1.4z"/>
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">+3</span>
            </div>
          </div>
        </div>
        
        {/* Avaliações - Visível em todos os dispositivos */}
        <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100 w-auto">
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
      </motion.div> 
    </>
  );
};

export default HeroButtons;