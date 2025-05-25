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
        {/* Botão Principal com desconto - CORRIGIDO PARA DESKTOP */}
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
        
        {/* Botão Secundário - Mesmo tamanho */}
        <motion.button
          className="group w-full sm:w-auto flex items-center justify-center px-6 md:px-8 py-4 rounded-full font-medium border-2 border-juvelina-gold text-juvelina-gold bg-white/80 backdrop-blur-sm relative overflow-hidden whitespace-nowrap"
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

      {/* DESKTOP: Container para Garantias - Alinhado à esquerda */}
      <motion.div 
        className="hidden sm:block bg-gray-50 rounded-2xl p-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        {/* Garantias em grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Garantia de 30 dias</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Frete Grátis Brasil</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Compra 100% Segura</span>
          </div>
        </div>
      </motion.div>

      {/* Container para Pagamento e Avaliações - Alinhado à esquerda no desktop */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Formas de pagamento - MOBILE: width fixo para mesmo tamanho */}
        <div className="bg-white rounded-xl px-40 py-3 shadow-sm border border-gray-100 w-64 sm:w-auto">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="text-xs text-gray-500 font-medium">Pagamento seguro:</span>
            <div className="flex items-center gap-2">
              <img src="https://cdn-icons-png.flaticon.com/24/349/349221.png" alt="Visa" className="h-5" />
              <img src="https://cdn-icons-png.flaticon.com/24/349/349228.png" alt="Mastercard" className="h-5" />
              <img src="https://cdn-icons-png.flaticon.com/24/5968/5968296.png" alt="Pix" className="h-5" />
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">+3</span>
            </div>
          </div>
        </div>
        
        {/* Avaliações - MOBILE: width fixo para mesmo tamanho */}
        <div className="bg-white rounded-xl px-40 py-3 shadow-sm border border-gray-100 w-64 sm:w-auto">
          <div className="flex items-center justify-center sm:justify-start gap-2">
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
      
      {/* Micro copy de escassez - Centralizado no mobile, à esquerda no desktop */}
      <motion.p 
        className="text-center sm:text-left text-sm text-gray-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        🔥 237 pessoas compraram nas últimas 24 horas
      </motion.p>
    </>
  );
};

export default HeroButtons;