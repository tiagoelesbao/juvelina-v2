// src/features/testimonials/VideoTestimonialsSection/components/VideoModal.tsx
/**
 * VideoModal Component
 * 
 * Este componente usa React Portal para garantir que o modal seja renderizado
 * diretamente no body do documento, fora da hierarquia da VideoTestimonialsSection.
 * Isso garante que:
 * 1. O modal cubra toda a página
 * 2. Tenha o z-index mais alto (99999)
 * 3. Não seja afetado pelos estilos da seção pai
 * 4. Apareça sobre todos os outros elementos, incluindo outros modais
 */
import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star, Shield, Truck, Volume2, VolumeX, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { VideoTestimonial } from '../types';
import { useScrollLock } from '../../../../hooks/ui/useScrollLock';
import { PerformanceContext } from '../../../../App';

interface VideoModalProps {
  video: VideoTestimonial | null;
  onClose: () => void;
  onCtaClick?: (e?: React.MouseEvent) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, onCtaClick }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOfferExpanded, setIsOfferExpanded] = useState(true);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile } = useContext(PerformanceContext);
  
  useScrollLock(!!video);
  
  // Criar ou encontrar o container do portal
  useEffect(() => {
    let container = document.getElementById('video-modal-portal');
    if (!container) {
      container = document.createElement('div');
      container.id = 'video-modal-portal';
      document.body.appendChild(container);
    }
    setPortalContainer(container);
    
    return () => {
      // Limpar apenas se não houver outros modais usando
      const portalDiv = document.getElementById('video-modal-portal');
      if (portalDiv && portalDiv.childNodes.length === 0) {
        portalDiv.remove();
      }
    };
  }, []);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (video) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [video, onClose]);
  
  if (!video || !portalContainer) return null;
  
  const videoPath = `/videos/v${video.id}.mp4`;
  
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
  
  const modalContent = (
    <AnimatePresence>
      {isMobile ? (
        // VERSÃO MOBILE - Centralizada com blur
        <motion.div
          className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm bg-black rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            style={{
              maxHeight: 'calc(100vh - 2rem)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative aspect-[9/16]"
              onClick={() => {
                if (videoRef.current) {
                  if (isPlaying) {
                    videoRef.current.pause();
                  } else {
                    videoRef.current.play();
                  }
                  setIsPlaying(!isPlaying);
                }
              }}
            >
              <video
                ref={videoRef}
                src={videoPath}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Play/Pause overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play size={28} className="text-white ml-1" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Top controls */}
              <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-juvelina-gold to-juvelina-mint flex items-center justify-center font-bold text-white text-xs">
                    {video.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{video.name}</h4>
                    <p className="text-white/70 text-[10px]">{video.username}</p>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <button
                    className="bg-black/30 backdrop-blur-sm text-white p-1.5 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  
                  <button
                    className="bg-black/30 backdrop-blur-sm text-white p-1.5 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              {/* Bottom offer - collapsible */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                animate={{
                  height: isOfferExpanded ? 'auto' : '50px'
                }}
              >
                <button
                  className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full p-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOfferExpanded(!isOfferExpanded);
                  }}
                >
                  {isOfferExpanded ? 
                    <ChevronDown size={16} className="text-white" /> : 
                    <ChevronUp size={16} className="text-white" />
                  }
                </button>
                
                <AnimatePresence>
                  {isOfferExpanded && (
                    <motion.div
                      className="p-3 pt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <blockquote className="text-white text-xs mb-2 italic line-clamp-2">
                        "{video.caption}"
                      </blockquote>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-white text-xs">Juvelina Organics</h5>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-white/60 line-through text-[10px]">R$ 179,90</span>
                          <span className="text-white text-sm font-bold ml-1">R$ 129,90</span>
                        </div>
                      </div>
                      
                      <button
                        className="w-full bg-juvelina-gold text-white py-2 rounded-full text-xs font-medium flex items-center justify-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          onCtaClick?.(e);
                        }}
                      >
                        <ShoppingCart size={14} />
                        Experimente a Transformação
                      </button>
                      
                      <div className="flex justify-center gap-3 text-white/60 text-[9px] mt-1">
                        <div className="flex items-center gap-0.5">
                          <Shield size={10} />
                          <span>Garantia 30 dias</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Truck size={10} />
                          <span>Frete Grátis</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        // VERSÃO DESKTOP - Layout otimizado para vídeo vertical
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Lado esquerdo - Vídeo otimizado para formato vertical */}
            <div className="flex-shrink-0 bg-black relative flex items-center justify-center" style={{ width: '400px' }}>
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
                    className="relative cursor-pointer group w-full h-full flex items-center justify-center"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Vídeo em aspect ratio 9:16 */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="relative" style={{ width: '100%', maxHeight: '100%', aspectRatio: '9/16' }}>
                        <video 
                          src={videoPath}
                          className="w-full h-full object-cover rounded-lg"
                          muted
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors rounded-lg" />
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
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative" style={{ width: '100%', maxHeight: '100%', aspectRatio: '9/16' }}>
                      <video 
                        ref={videoRef}
                        src={videoPath}
                        controls
                        autoPlay
                        className="w-full h-full object-cover rounded-lg"
                        onEnded={() => setIsPlaying(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Lado direito - Informações do produto */}
            <div className="flex-1 bg-gradient-to-b from-white to-juvelina-mint/5 overflow-y-auto">
              {/* Header com informações do criador */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-juvelina-gold to-juvelina-mint flex items-center justify-center font-bold text-white">
                      {video.name.charAt(0)}
                    </div>
                    {video.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
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
  
  // Renderizar no portal
  return ReactDOM.createPortal(modalContent, portalContainer);
};

export default VideoModal;