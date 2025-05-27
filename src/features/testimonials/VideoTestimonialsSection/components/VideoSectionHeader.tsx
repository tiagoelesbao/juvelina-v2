// src/features/testimonials/VideoTestimonialsSection/components/VideoSectionHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';

const VideoSectionHeader: React.FC = () => {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.span 
          className="inline-block bg-juvelina-gold/20 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Histórias Reais
        </motion.span>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Veja as Transformações em{' '}
          <motion.span 
            className="text-juvelina-gold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vídeo
          </motion.span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Assista aos depoimentos autênticos de pessoas que transformaram suas vidas com Juvelina Organics.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default VideoSectionHeader;