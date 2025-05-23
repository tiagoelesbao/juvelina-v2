// src/components/ui/VideoCarousel.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Instagram } from 'lucide-react';
import TikTokIcon from './TikTokIcon';

interface VideoTestimonial {
  id: number;
  name: string;
  username: string;
  avatar: string;
  videoThumbnail: string;
  platform: 'tiktok' | 'instagram';
  category: 'energia' | 'imunidade' | 'beleza';
  caption: string;
  date: string;
}

interface VideoCarouselProps {
  testimonials: VideoTestimonial[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ 
  testimonials, 
  activeFilter, 
  onFilterChange 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<number[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Filtrar depoimentos
  const filteredTestimonials = activeFilter === 'todos'
    ? testimonials
    : activeFilter === 'instagram' || activeFilter === 'tiktok'
      ? testimonials.filter(t => t.platform === activeFilter)
      : testimonials.filter(t => t.category === activeFilter);

  // Reiniciar o índice atual quando mudar o filtro
  useEffect(() => {
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeFilter]);

  // Configurar scroll automático
  useEffect(() => {
    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [filteredTestimonials, currentIndex]);
  
  // Pausar auto-scroll quando o usuário interage
  useEffect(() => {
    if (isScrolling) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      
      // Reiniciar após um período de inatividade
      const timeout = setTimeout(() => {
        setIsScrolling(false);
        startAutoScroll();
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [isScrolling]);

  // Iniciar scroll automático
  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (!isScrolling && filteredTestimonials.length > 0) {
        const nextIndex = (currentIndex + 1) % filteredTestimonials.length;
        scrollToIndex(nextIndex);
      }
    }, 4000); // Rolar a cada 4 segundos
  };

  // Função para rolar até um índice específico
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current && !isScrolling) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const spacing = 16; // gap entre itens (4 * 4)
      const targetPosition = index * (itemWidth + spacing);
      
      setCurrentIndex(index);
      
      // Animação de scroll suave
      container.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Funções para navegação
  const scrollNext = () => {
    setIsScrolling(true);
    if (currentIndex < filteredTestimonials.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      scrollToIndex(0);
    }
  };

  const scrollPrev = () => {
    setIsScrolling(true);
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    } else {
      scrollToIndex(filteredTestimonials.length - 1);
    }
  };

  // Abrir modal de vídeo
  const openVideoModal = (testimonial: VideoTestimonial) => {
    setSelectedVideo(testimonial);
    setShowModal(true);
    
    // Carregar o vídeo quando o modal for aberto
    if (!loadedVideos.includes(testimonial.id)) {
      setLoadedVideos(prev => [...prev, testimonial.id]);
    }
    
    // Pausar auto-scroll enquanto o modal estiver aberto
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  // Fechar modal de vídeo
  const closeVideoModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
    
    // Reiniciar auto-scroll
    startAutoScroll();
  };

  // Componente de filtro
  const FilterButtons = () => (
    <div className="flex justify-center mb-8 overflow-x-auto pb-2 hide-scrollbar">
      <div className="inline-flex bg-white rounded-full shadow-md p-1">
        {[
          { id: 'todos', label: 'Todos' },
          { id: 'energia', label: 'Energia' },
          { id: 'imunidade', label: 'Imunidade' },
          { id: 'beleza', label: 'Beleza' },
          { id: 'instagram', label: 'Instagram', icon: <Instagram size={16} className="mr-1" /> },
          { id: 'tiktok', label: 'TikTok', icon: <TikTokIcon size={16} className="mr-1" /> }
        ].map((filter) => (
          <button
            key={filter.id}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap flex items-center ${
              activeFilter === filter.id
                ? 'bg-juvelina-gold text-white'
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.icon && filter.icon}
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );

  // Componente de thumbnail de vídeo com lazy loading
  const VideoThumbnail = ({ testimonial }: { testimonial: VideoTestimonial }) => {
    const isVideoLoaded = loadedVideos.includes(testimonial.id);
    
    return (
      <div className="relative pb-[177.77%] h-0 bg-gray-100">
        <img 
          src={testimonial.videoThumbnail} 
          alt={`Depoimento de ${testimonial.name}`} 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Overlay com botão de play */}
        <div 
          className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-all cursor-pointer"
          onClick={() => openVideoModal(testimonial)}
        >
          <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center">
            <Play size={26} className="text-juvelina-gold ml-1" />
          </div>
        </div>
        
        {/* Badge da plataforma */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-sm">
          {testimonial.platform === 'instagram' ? (
            <Instagram size={16} className="text-pink-600" />
          ) : (
            <TikTokIcon size={16} className="text-black" />
          )}
        </div>
        
        {/* Badge da categoria */}
        <div className="absolute top-3 left-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            testimonial.category === 'energia' ? 'bg-yellow-100 text-yellow-800' :
            testimonial.category === 'imunidade' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {testimonial.category === 'energia' ? 'Energia' :
             testimonial.category === 'imunidade' ? 'Imunidade' : 'Beleza'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <FilterButtons />
      
      {/* Carousel container */}
      <div className="relative overflow-hidden">
        {/* Controles de navegação */}
        {filteredTestimonials.length > 0 && (
          <>
            <button 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md text-juvelina-gold hover:bg-white transition-colors focus:outline-none"
              onClick={scrollPrev}
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md text-juvelina-gold hover:bg-white transition-colors focus:outline-none"
              onClick={scrollNext}
              aria-label="Próximo"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        
        {/* Vídeos */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-hidden gap-4 pb-4 hide-scrollbar"
          onMouseDown={() => setIsScrolling(true)}
          onTouchStart={() => setIsScrolling(true)}
        >
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="min-w-[320px] max-w-[320px] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Thumbnail do vídeo */}
                <VideoThumbnail testimonial={testimonial} />
                
                {/* Informações do usuário */}
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.username}</p>
                    </div>
                  </div>
                  
                  {/* Resumo da descrição */}
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {testimonial.caption}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="w-full py-6 text-center text-gray-500">
              Nenhum depoimento encontrado para este filtro.
            </div>
          )}
        </div>
        
        {/* Indicadores */}
        <div className="flex justify-center mt-4 gap-1.5">
          {filteredTestimonials.slice(0, 5).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex 
                  ? 'bg-juvelina-gold w-4' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => {
                setIsScrolling(true);
                scrollToIndex(i);
              }}
              aria-label={`Ir para depoimento ${i+1}`}
            />
          ))}
          {filteredTestimonials.length > 5 && (
            <span className="text-xs text-gray-500 self-center">...</span>
          )}
        </div>
      </div>
      
      {/* Modal de Vídeo */}
      {showModal && selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="bg-white rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img 
                  src={selectedVideo.avatar} 
                  alt={selectedVideo.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold">{selectedVideo.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    {selectedVideo.platform === 'instagram' ? (
                      <Instagram size={12} />
                    ) : (
                      <TikTokIcon size={12} />
                    )}
                    {selectedVideo.username}
                  </p>
                </div>
              </div>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={closeVideoModal}
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Conteúdo do vídeo */}
            <div className="aspect-[9/16] relative flex-1 bg-black">
              <iframe
                src={`https://www.tiktok.com/embed/video/dummy-id-${selectedVideo.id}`}
                className="w-full h-full"
                allowFullScreen
                title={`Depoimento de ${selectedVideo.name}`}
              />
            </div>
            
            {/* Informações adicionais */}
            <div className="p-4 border-t border-gray-100">
              <p className="text-gray-700 mb-2">{selectedVideo.caption}</p>
              <p className="text-xs text-gray-500">{selectedVideo.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;