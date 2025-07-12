// src/features/testimonials/VideoTestimonialsSection/components/VideoModal.tsx
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
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOfferExpanded, setIsOfferExpanded] = useState(true);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
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
      const portalDiv = document.getElementById('video-modal-portal');
      if (portalDiv && portalDiv.childNodes.length === 0) {
        portalDiv.remove();
      }
    };
  }, []);
  
  // Preload do vídeo quando o modal abrir e autoplay
  useEffect(() => {
    if (video && videoRef.current) {
      setIsVideoLoading(true);
      setVideoError(false);
      
      const videoElement = videoRef.current;
      videoElement.preload = 'auto';
      
      const handleCanPlay = async () => {
        setIsVideoLoading(false);
        try {
          await videoElement.play();
          setIsPlaying(true);
          setTimeout(() => {
            if (videoElement.paused === false) {
              setIsMuted(false);
              videoElement.muted = false;
            }
          }, 500);
        } catch (err) {
          console.log('Autoplay bloqueado');
        }
      };
      
      const handleError = () => {
        setVideoError(true);
        setIsVideoLoading(false);
      };
      
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [video]);
  
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
  
  const videoPath = video.videoUrl || `/videos/v${video.id}.mp4`;
  
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
        // VERSÃO MOBILE
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
                if (videoRef.current && !isVideoLoading) {
                  if (isPlaying) {
                    videoRef.current.pause();
                  } else {
                    videoRef.current.play();
                  }
                  setIsPlaying(!isPlaying);
                }
              }}
            >
              {/* Loading state */}
              {isVideoLoading && !videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
                </div>
              )}
              
              {/* Error state */}
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <p className="text-white mb-2">Erro ao carregar vídeo</p>
                    <button 
                      className="text-juvelina-gold underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoError(false);
                        setIsVideoLoading(true);
                        if (videoRef.current) {
                          videoRef.current.load();
                        }
                      }}
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              )}
              
              <video
                ref={videoRef}
                src={videoPath}
                className="w-full h-full object-cover"
                loop
                playsInline
                autoPlay
                muted={isMuted}
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setVideoError(true)}
                onLoadedData={() => setIsVideoLoading(false)}
                {...{ 'webkit-playsinline': 'true' } as any}
              />
              
              {/* Play/Pause overlay */}
              <AnimatePresence>
                {!isPlaying && !isVideoLoading && !videoError && (
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
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                      }
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
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full p-0.5"
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
                      className="p-3 pt-6 pb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Imagem do produto MOVIDA PARA DENTRO DO COLLAPSIBLE */}
                      <motion.div 
                        className="absolute bottom-[80px] left-5 w-14 h-20 z-30 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <img 
                          src="/images/juvelina-bottle-2.png" 
                          alt="Juvelina Organics" 
                          className="w-full h-full object-contain"
                          style={{
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
                            maxHeight: '75px',
                            width: 'auto'
                          }}
                        />
                      </motion.div>
                      
                      <div className="pl-16">
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
        // VERSÃO DESKTOP - CORRIGIDA PARA ALTURA FIXA
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden flex"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={e => e.stopPropagation()}
            style={{ 
              maxHeight: '85vh',
              height: 'auto'
            }}
          >
            {/* Lado esquerdo - Vídeo */}
            <div 
              className="flex-shrink-0 bg-black relative"
              style={{ 
                width: '400px',
                aspectRatio: '9/16',
                maxHeight: '85vh'
              }}
            >
              <button
                className="absolute top-4 right-4 text-white bg-black/50 backdrop-blur-sm rounded-full p-2 z-10 hover:bg-black/70 transition-colors"
                onClick={onClose}
                aria-label="Fechar modal"
              >
                <X size={24} />
              </button>
              
              {/* Loading state */}
              {isVideoLoading && !videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
                </div>
              )}
              
              {/* Error state */}
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                  <div className="text-center">
                    <p className="text-white mb-2">Erro ao carregar vídeo</p>
                    <button 
                      className="text-juvelina-gold underline"
                      onClick={() => {
                        setVideoError(false);
                        setIsVideoLoading(true);
                        if (videoRef.current) {
                          videoRef.current.load();
                        }
                      }}
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              )}
              
              {/* Player de vídeo */}
              {!isPlaying && !isVideoLoading && !videoError ? (
                <div 
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                >
                  <video 
                    ref={videoRef}
                    src={videoPath}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    preload="auto"
                    onError={() => setVideoError(true)}
                    onLoadedData={() => setIsVideoLoading(false)}
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
                  ref={videoRef}
                  src={videoPath}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls={!isVideoLoading}
                  autoPlay
                  onEnded={() => setIsPlaying(false)}
                  onError={() => setVideoError(true)}
                  onLoadedData={() => setIsVideoLoading(false)}
                  preload="auto"
                />
              )}
            </div>
            
            {/* Lado direito - Informações do produto SEM SCROLL */}
            <div 
              className="flex-1 bg-gradient-to-b from-white to-juvelina-mint/5 flex flex-col"
              style={{ 
                width: '400px',
                maxHeight: '85vh'
              }}
            >
              {/* Header com informações do criador */}
              <div className="p-5 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-juvelina-gold to-juvelina-mint flex items-center justify-center font-bold text-white text-sm">
                      {video.name.charAt(0)}
                    </div>
                    {video.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{video.name}</h3>
                    <p className="text-xs text-gray-600">{video.username}</p>
                  </div>
                  <div className="scale-90">
                    {renderStars(video.rating)}
                  </div>
                </div>
                
                <blockquote className="mt-3 text-gray-700 italic text-sm">
                  "{video.caption}"
                </blockquote>
              </div>
              
              {/* Seção do produto com imagem - conteúdo compactado */}
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-base mb-3 flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  Experimente a Transformação
                </h4>
                
                {/* Card do produto com imagem - compactado */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <motion.img 
                        src="/images/juvelina-bottle-3.png" 
                        alt="Juvelina Organics"
                        className="w-20 h-28 object-contain"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                        }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h5 className="font-bold text-juvelina-gold text-sm">Juvelina Organics</h5>
                      <p className="text-xs text-gray-600 mb-1">
                        Suplemento líquido premium com 25 nutrientes essenciais
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="scale-90">{renderStars(5)}</div>
                        <span className="text-xs text-gray-500">(2.8k avaliações)</span>
                      </div>
                      
                      <div className="mt-1 space-y-0.5">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <span className="text-juvelina-gold">✓</span> Absorção 5x superior
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <span className="text-juvelina-gold">✓</span> 100% Natural e Vegano
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <span className="text-juvelina-gold">✓</span> Sabor delicioso de laranja
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Oferta especial - compactada */}
                <div className="bg-gradient-to-r from-juvelina-gold/10 to-juvelina-mint/10 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 line-through text-sm">R$ 179,90</span>
                        <span className="text-xl font-bold text-juvelina-gold">R$ 129,90</span>
                      </div>
                      <span className="text-green-600 text-xs font-medium">Economize 28%</span>
                    </div>
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      OFERTA LIMITADA
                    </div>
                  </div>
                </div>
                
                {/* Benefícios - compactados */}
                <div className="space-y-1.5 mb-4">
                  {[
                    { icon: <Shield size={14} />, text: "Garantia de 30 dias" },
                    { icon: <Truck size={14} />, text: "Frete Grátis para todo Brasil" },
                    { icon: <Star size={14} />, text: "Avaliação 5 estrelas" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-juvelina-gold">{benefit.icon}</span>
                      {benefit.text}
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <motion.button 
                  className="w-full bg-juvelina-gold text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform transition-all text-sm mt-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    onClose();
                    onCtaClick?.(e);
                  }}
                >
                  <ShoppingCart size={18} />
                  Quero Transformar Minha Vida
                </motion.button>
                
                {/* Trust badges - mais compactos */}
                <div className="flex justify-center gap-3 mt-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" className="h-5 w-auto opacity-60" alt="Visa" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" className="h-5 w-auto opacity-60" alt="Mastercard" />
                  <img src="https://cdn-icons-png.flaticon.com/512/888/888870.png" className="h-5 w-auto opacity-60" alt="Pix" />
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