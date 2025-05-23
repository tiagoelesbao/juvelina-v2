import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface HeroButtonsProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onCtaClick }) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
    >
      <motion.button
        className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white shadow-lg bg-gradient-to-r from-juvelina-gold to-juvelina-gold/90"
        style={{ 
          boxShadow: "0 10px 20px rgba(169,104,61,0.3)"
        }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 10px 25px rgba(169,104,61,0.4)"
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onCtaClick}
      >
        <ShoppingCart size={20} />
        <span>Transforme sua Saúde Agora</span>
      </motion.button>
      
      <motion.button
        className="flex items-center justify-center px-6 py-3.5 rounded-full font-medium border-2 border-juvelina-gold text-juvelina-gold bg-white/80 backdrop-blur-sm"
        whileHover={{ 
          backgroundColor: "rgba(169,104,61,0.1)",
          scale: 1.02
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Descobrir Benefícios
      </motion.button>
    </motion.div>
  );
};

export default HeroButtons;