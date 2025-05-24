// src/features/testimonials/VideoTestimonialsSection.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, ShoppingCart, X, Star } from 'lucide-react';
import DynamicWaveTransition from '../../components/ui/DynamicWaveTransition';

// Imagem do produto
const juvelinaBottle = "https://images.unsplash.com/photo-1607006333439-505849ef4f76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";

// Dados dos vídeos
const videoTestimonials = [
  {
    id: 1,
    name: "Amanda Silva",
    username: "@amandasilva_fit",
    thumbnail: "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    caption: "3 semanas com Juvelina e minha energia mudou completamente!",
    views: "2.3M",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Mendes",
    username: "@carlosmendes",
    thumbnail: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1450&q=80",
    caption: "Como treinador, recomendo Juvelina para todos meus alunos!",
    views: "1.8M",
    rating: 5
  },
  {
    id: 3,
    name: "Patrícia Alves",
    username: "@patriciaalves",
    thumbnail: "https://images.unsplash.com/photo-1607606116242-357a0d503b6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    caption: "Aos 42 anos, minha pele e cabelos nunca estiveram tão bonitos!",
    views: "3.1M",
    rating: 5
  },
  {
    id: 4,
    name: "Rodrigo Costa",
    username: "@rodrigocosta",
    thumbnail: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    caption: "Minha imunidade está no topo! 3 meses sem ficar doente.",
    views: "985K",
    rating: 5
  },
  {
    id: 5,
    name: "Ana Paula",
    username: "@anapaulamont",
    thumbnail: "https://images.unsplash.com/photo-1498671546682-94a232c26d17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    caption: "Minhas unhas pararam de quebrar e meu cabelo está incrível!",
    views: "1.5M",
    rating: 5
  },
  {
    id: 6,
    name: "Fernando Gomes",
    username: "@fernandogfit",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    caption: "Energia durante todo o dia! Performance nos treinos melhorou muito.",
    views: "2.7M",
    rating: 5
  },
  {
    id: 7,
    name: "Camila Duarte",
    username: "@camiladuarte",
    thumbnail: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    caption: "Juvelina transformou minha rotina de bem-estar!",
    views: "892K",
    rating: 5
  }
];

interface VideoTestimonialsSectionProps {
  onCtaClick?: (e?: React.MouseEvent) => void;
}

const VideoTestimonialsSection: React.FC<VideoTestimonialsSectionProps> = ({ onCtaClick }) => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videoTestimonials[0] | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [viewersCount, setViewersCount] = useState(247);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Hook para animação baseada em scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transformações baseadas no scroll
  const waveY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const blob1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1.2]);
  const blob2X = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  
  // Duplicar vídeos para criar loop infinito
  const duplicatedVideos = [...videoTestimonials, ...videoTestimonials, ...videoTestimonials];
  
  // Simular mudanças no número de espectadores
  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.floor(Math.random() * 11) - 5; // -5 a +5
        const newCount = prev + change;
        return Math.max(180, Math.min(320, newCount)); // Entre 180 e 320
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Auto-scroll contínuo
  useEffect(() => {
    if (isPaused || selectedVideo) return;
    
    const track = trackRef.current;
    if (!track) return;
    
    let animationId: number;
    let scrollPosition = 0;
    
    const animate = () => {
      scrollPosition += 1; // Velocidade do scroll aumentada para fluidez
      
      // Reset quando chegar ao fim do primeiro conjunto
      const itemWidth = 304; // largura do item (280px) + gap (24px)
      const totalWidth = videoTestimonials.length * itemWidth;
      
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      if (track) {
        track.style.transform = `translateX(-${scrollPosition}px)`;
        track.style.transition = 'none'; // Remove transição para movimento contínuo
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused, selectedVideo]);
  
  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={12} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
      ))}
    </div>
  );

  return (
    <div className="relative" style={{ marginTop: '-4px' }}>
      {/* Dynamic Wave Transition com animação baseada em scroll */}
      <DynamicWaveTransition 
        fromColor="rgba(194,247,188,0.2)"
        toColor="#C2F7BC"
        className="relative z-10"
        height={180}
      />

      <section 
        ref={sectionRef}
        id="video-depoimentos" 
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #C2F7BC 0%, rgba(194,247,188,0.7) 15%, rgba(194,247,188,0.5) 35%, rgba(194,247,188,0.2) 60%, rgba(255,255,255,0.98) 100%)",
          marginTop: '-177px',
          paddingTop: '140px',
          paddingBottom: '80px'
        }}
      >
        {/* Background decorativo fluido com animações mais visíveis e responsivas ao scroll */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: backgroundY }}
        >
          {/* Blob orgânico animado 1 - COM SCROLL TRANSFORM */}
          <motion.div 
            className="absolute top-20 -left-20 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(194,247,188,0.6) 0%, rgba(194,247,188,0.3) 40%, transparent 70%)",
              filter: "blur(40px)",
              scale: blob1Scale
            }}
            animate={{
              x: [-100, 200, -100],
              y: [-50, 100, -50],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          {/* Blob orgânico animado 2 - COM SCROLL TRANSFORM */}
          <motion.div 
            className="absolute bottom-40 right-10 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(169,104,61,0.15) 0%, rgba(169,104,61,0.08) 40%, transparent 70%)",
              filter: "blur(60px)",
              x: blob2X
            }}
            animate={{
              y: [50, -80, 50],
              scale: [1.2, 1.5, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          {/* Novo blob central para mais movimento */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(circle, rgba(194,247,188,0.4) 0%, transparent 60%)",
              filter: "blur(80px)"
            }}
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          {/* Partículas flutuantes MAIORES e mais visíveis */}
          {[...Array(8)].map((_, i) => {
            const particleY = useTransform(scrollYProgress, [0, 1], [0, -(50 + i * 10)]);
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 2 === 0 ? '12px' : '8px',
                  height: i % 2 === 0 ? '12px' : '8px',
                  background: i % 3 === 0 
                    ? 'rgba(169,104,61,0.4)' 
                    : i % 3 === 1 
                      ? 'rgba(194,247,188,0.6)' 
                      : 'rgba(155,208,210,0.5)',
                  left: `${10 + i * 12}%`,
                  top: `${15 + (i % 4) * 20}%`,
                  boxShadow: '0 0 20px rgba(194,247,188,0.5)',
                  y: particleY
                }}
                animate={{
                  x: [-20, 20, -20],
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {/* Ondas de movimento no fundo */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/3"
            style={{
              background: "linear-gradient(to top, rgba(194,247,188,0.2) 0%, transparent 100%)",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-juvelina-gold/20 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4">
              Histórias Reais
            </span>
            <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black">
              Veja as Transformações em <span className="text-juvelina-gold">Vídeo</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Assista aos depoimentos autênticos de pessoas que transformaram suas vidas com Juvelina Organics.
            </p>
          </div>
        </div>
        
        {/* Carrossel infinito */}
        <div 
          className="relative mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradientes de dissolução nas bordas - mais sutis no mobile */}
          <div className="absolute left-0 top-0 w-16 md:w-32 lg:w-48 h-full z-10 pointer-events-none"
            style={{
              background: window.innerWidth < 768 
                ? "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)"
                : "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 100%)"
            }}
          />
          <div className="absolute right-0 top-0 w-16 md:w-32 lg:w-48 h-full z-10 pointer-events-none"
            style={{
              background: window.innerWidth < 768
                ? "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)"
                : "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 100%)"
            }}
          />
          
          {/* Track do carrossel */}
          <div className="overflow-hidden px-4">
            <div 
              ref={trackRef}
              className="flex gap-6"
              style={{ 
                width: 'max-content',
                willChange: 'transform'
              }}
            >
              {duplicatedVideos.map((video, index) => (
                <motion.div
                  key={`${video.id}-${index}`}
                  className="relative w-[280px] h-[500px] flex-shrink-0 cursor-pointer group"
                  onClick={() => setSelectedVideo(video)}
                  whileHover={{ 
                    scale: 1.03,
                    y: -10
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={video.thumbnail}
                      alt={video.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay com gradiente melhorado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20" />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div 
                        className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Play className="w-7 h-7 text-juvelina-gold ml-1" />
                      </motion.div>
                    </div>
                    
                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
                          {video.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{video.name}</p>
                          <p className="text-xs opacity-80">{video.username}</p>
                        </div>
                      </div>
                      <p className="text-sm line-clamp-2 mb-2">{video.caption}</p>
                      <div className="flex items-center justify-between">
                        {renderStars(video.rating)}
                        <span className="text-xs">{video.views} views</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Indicador de pessoas assistindo */}
        <div className="text-center mt-8">
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-700">
              <motion.span 
                className="font-medium"
                key={viewersCount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {viewersCount} pessoas
              </motion.span> estão assistindo agora
            </span>
          </motion.div>
        </div>
      </section>
      
      {/* Modal de vídeo com produto */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Lado esquerdo - Vídeo */}
              <div className="flex-1 bg-black relative aspect-[9/16] md:aspect-video">
                <button
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X size={24} />
                </button>
                
                {/* Placeholder do vídeo */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <Play size={60} className="mx-auto mb-4" />
                    <p>Vídeo de {selectedVideo.name}</p>
                  </div>
                </div>
              </div>
              
              {/* Lado direito - Informações do produto */}
              <div className="w-full md:w-[400px] p-6 bg-gradient-to-b from-white to-juvelina-mint/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-juvelina-gold/20 flex items-center justify-center font-bold text-juvelina-gold">
                    {selectedVideo.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{selectedVideo.name}</h3>
                    <p className="text-sm text-gray-600">{selectedVideo.username}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{selectedVideo.caption}"</p>
                
                {/* Produto */}
                <div className="border-t pt-6">
                  <h4 className="font-bold text-lg mb-4">Experimente Juvelina</h4>
                  
                  <div className="flex gap-4 mb-4">
                    <img 
                      src={juvelinaBottle}
                      alt="Juvelina"
                      className="w-24 h-24 object-contain"
                    />
                    <div className="flex-1">
                      <h5 className="font-bold text-juvelina-gold">Juvelina Organics</h5>
                      <p className="text-sm text-gray-600 mb-2">
                        Suplemento líquido com 25 nutrientes essenciais e absorção 5x superior.
                      </p>
                      {renderStars(5)}
                    </div>
                  </div>
                  
                  {/* Preço e CTA */}
                  <div className="bg-juvelina-gold/10 rounded-lg p-4 mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-gray-400 line-through text-sm">R$ 179,90</span>
                      <span className="text-2xl font-bold text-juvelina-gold">R$ 129,90</span>
                      <span className="text-green-600 text-sm font-medium">28% OFF</span>
                    </div>
                    <p className="text-xs text-gray-600">Oferta exclusiva + Frete Grátis</p>
                  </div>
                  
                  <button 
                    className="w-full bg-juvelina-gold text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    onClick={(e) => {
                      setSelectedVideo(null);
                      onCtaClick?.(e);
                    }}
                  >
                    <ShoppingCart size={20} />
                    Aproveitar Oferta
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      Garantia de 30 dias
                    </span>
                    <span>•</span>
                    <span>Frete Grátis</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoTestimonialsSection;