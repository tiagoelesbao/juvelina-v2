// src/features/testimonials/VideoTestimonialsSection/components/VideoModal.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, Shield, Truck } from 'lucide-react';
import { VideoTestimonial } from '../types';

interface VideoModalProps {
  video: VideoTestimonial | null;
  onClose: () => void;
  onCtaClick?: (e?: React.MouseEvent) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, onCtaClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (video) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [video, onClose]);
  
  if (!video) return null;
  
  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
  
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Lado esquerdo - Vídeo */}
            <div className="flex-1 bg-black relative h-[50vh] md:h-auto">
              <button
                className="absolute top-4 right-4 text-white bg-black/50 backdrop-blur-sm rounded-full p-2 z-10 hover:bg-black/70 transition-colors"
                onClick={onClose}
                aria-label="Fechar modal"
              >
                <X size={24} />
              </button>
              
              {/* Player de vídeo */}
              <div className="w-full h-full flex items-center justify-center relative">
                {!isPlaying ? (
                  <div 
                    className="relative cursor-pointer group w-full h-full"
                    onClick={() => setIsPlaying(true)}
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={`Thumbnail do vídeo de ${video.name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                        <svg className="w-8 h-8 text-juvelina-gold ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <video 
                    src={video.videoUrl || '#'}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    onEnded={() => setIsPlaying(false)}
                  />
                )}
              </div>
            </div>
            
            {/* Lado direito - Informações do produto */}
            <div className="w-full md:w-[400px] bg-gradient-to-b from-white to-juvelina-mint/5 max-h-[40vh] md:max-h-none overflow-y-auto">
              {/* Header com informações do criador */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-juvelina-gold to-juvelina-mint flex items-center justify-center font-bold text-white">
                      {video.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{video.name}</h3>
                    <p className="text-sm text-gray-600">{video.username}</p>
                  </div>
                  {renderStars(video.rating)}
                </div>
                
                <blockquote className="mt-4 text-gray-700 italic">
                  "{video.caption}"
                </blockquote>
              </div>
              
              {/* Seção do produto */}
              <div className="p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  Experimente a Transformação
                </h4>
                
                {/* Card do produto */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                  <div className="flex gap-4">
                    <img 
                      src="https://images.unsplash.com/photo-1607006333439-505849ef4f76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                      alt="Juvelina Multivitamínico"
                      className="w-24 h-24 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h5 className="font-bold text-juvelina-gold">Juvelina Organics</h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Suplemento líquido premium com 25 nutrientes essenciais
                      </p>
                      <div className="flex items-center gap-2">
                        {renderStars(5)}
                        <span className="text-xs text-gray-500">(12.5k avaliações)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Oferta especial */}
                <div className="bg-gradient-to-r from-juvelina-gold/10 to-juvelina-mint/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 line-through text-sm">R$ 179,90</span>
                        <span className="text-2xl font-bold text-juvelina-gold">R$ 129,90</span>
                      </div>
                      <span className="text-green-600 text-sm font-medium">Economize 28%</span>
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      OFERTA LIMITADA
                    </div>
                  </div>
                </div>
                
                {/* Benefícios */}
                <div className="space-y-2 mb-6">
                  {[
                    { icon: <Shield size={16} />, text: "Garantia de 30 dias" },
                    { icon: <Truck size={16} />, text: "Frete Grátis para todo Brasil" },
                    { icon: <Star size={16} />, text: "Avaliação 5 estrelas" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-juvelina-gold">{benefit.icon}</span>
                      {benefit.text}
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <motion.button 
                  className="w-full bg-juvelina-gold text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    onClose();
                    onCtaClick?.(e);
                  }}
                >
                  <ShoppingCart size={20} />
                  Quero Transformar Minha Vida
                </motion.button>
                
                {/* Trust badges */}
                <div className="flex justify-center gap-4 mt-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" className="h-6 w-auto opacity-60" alt="Visa" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" className="h-6 w-auto opacity-60" alt="Mastercard" />
                  <img src="https://cdn-icons-png.flaticon.com/512/888/888870.png" className="h-6 w-auto opacity-60" alt="Pix" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;