// src/components/sections/TestimonialsSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Instagram, ArrowLeft, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
  category: 'energy' | 'immunity' | 'beauty';
  tiktokId: string;
}

const TestimonialsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'energy' | 'immunity' | 'beauty'>('all');
  const [loadedVideos, setLoadedVideos] = useState<string[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Categorias de depoimentos
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'energy', label: 'Energia' },
    { id: 'immunity', label: 'Imunidade' },
    { id: 'beauty', label: 'Beleza' }
  ];

  // Dados de depoimentos
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Mariana Silva",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
      text: "Minha energia mudou completamente após 2 semanas com Juvelina. É incrível como um produto natural pode fazer tanta diferença!",
      rating: 5,
      category: "energy",
      tiktokId: "7320003074217688374",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1534&q=80",
      text: "Como atleta, posso afirmar que a Juvelina melhorou minha recuperação e foco. Agora é parte essencial da minha rotina diária.",
      rating: 5,
      category: "energy",
      tiktokId: "7320002791000568102",
    },
    {
      id: 3,
      name: "Patricia Alves",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      text: "Aos 42 anos, sinto mais disposição do que aos 30. Minha pele está radiante e minha imunidade melhorou significativamente. Juvelina mudou minha vida!",
      rating: 5,
      category: "beauty",
      tiktokId: "7320002498211115306",
    },
    // Adicione mais depoimentos conforme necessário
  ];

  // Filtrar depoimentos com base na categoria selecionada
  const filteredTestimonials = activeCategory === 'all'
    ? testimonials
    : testimonials.filter(t => t.category === activeCategory);

  // Componente de vídeo TikTok com lazy loading
  const TikTokVideo = ({ videoId }: { videoId: string }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    useEffect(() => {
      if (inView && !loadedVideos.includes(videoId)) {
        setLoadedVideos(prev => [...prev, videoId]);
      }
    }, [inView, videoId]);

    return (
      <div 
        ref={ref} 
        className="relative pb-[177.77%] h-0 bg-gray-100 rounded-t-xl overflow-hidden"
      >
        {loadedVideos.includes(videoId) ? (
          <iframe
            src={`https://www.tiktok.com/embed/${videoId}`}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2
              }}
              className="w-16 h-16 rounded-full bg-juvelina-emerald/30 flex items-center justify-center"
            >
              <Instagram size={24} className="text-juvelina-emerald" />
            </motion.div>
            <p className="mt-4 text-gray-500 text-sm">Carregando depoimento...</p>
          </div>
        )}
      </div>
    );
  };

  // Função para navegar no carrossel
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = direction === 'left' ? -350 : 350;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Atualizar o índice atual
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < filteredTestimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-b from-white to-juvelina-mint/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-juvelina-mint bg-opacity-30 px-4 py-1 rounded-full text-juvelina-emerald font-medium mb-4">
            Histórias Reais
          </span>
          <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-juvelina-emerald">
            Transformações com Juvelina
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veja o que nossos clientes estão dizendo sobre suas experiências e resultados com Juvelina.
          </p>
        </div>
        
        {/* Filtros de categoria */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-sm">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-juvelina-emerald text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id as any)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Controles do carrossel mobile/tablet */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <button 
            onClick={() => scrollCarousel('left')}
            className={`p-2 rounded-full bg-white shadow-md ${currentIndex === 0 ? 'text-gray-300' : 'text-juvelina-emerald'}`}
            disabled={currentIndex === 0}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex gap-1">
            {filteredTestimonials.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-juvelina-emerald' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <button 
            onClick={() => scrollCarousel('right')}
            className={`p-2 rounded-full bg-white shadow-md ${currentIndex === filteredTestimonials.length - 1 ? 'text-gray-300' : 'text-juvelina-emerald'}`}
            disabled={currentIndex === filteredTestimonials.length - 1}
          >
            <ArrowRight size={20} />
          </button>
        </div>
        
        {/* Carrossel de depoimentos (Mobile) */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto hide-scrollbar gap-6 pb-6 md:hidden"
        >
          {filteredTestimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="min-w-[300px] bg-white rounded-xl overflow-hidden shadow-lg flex-shrink-0"
            >
              <TikTokVideo videoId={testimonial.tiktokId} />
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-juvelina-mint flex items-center justify-center overflow-hidden">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < testimonial.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Grade de depoimentos (Desktop) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map(testimonial => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <TikTokVideo videoId={testimonial.tiktokId} />
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-juvelina-mint flex items-center justify-center overflow-hidden">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < testimonial.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  {testimonial.text}
                </p>
              </div>
              
              {/* Badge de categoria */}
              <div className="absolute top-3 right-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  testimonial.category === 'energy' ? 'bg-yellow-100 text-yellow-800' :
                  testimonial.category === 'immunity' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {testimonial.category === 'energy' ? 'Energia' :
                   testimonial.category === 'immunity' ? 'Imunidade' : 'Beleza'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA para mais depoimentos */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="text-juvelina-emerald hover:text-juvelina-gold transition-colors flex items-center gap-2 mx-auto">
            <span>Ver mais histórias de transformação</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;