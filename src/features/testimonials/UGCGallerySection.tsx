// src/components/sections/UGCGallerySection.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Share2, Heart, MessageCircle, Camera, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import TikTokIcon from '../../components/ui/TikTokIcon';

const UGCGallerySection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState<number | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Lista de posts de UGC
  const ugcPosts = [
    {
      id: 1,
      username: "@mariafitness",
      platform: "instagram",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1020&q=80",
      caption: "Dia 30 com Juvelina! 🌟 Estou chocada com a diferença na minha energia e cabelos! #JuvelinaOrganics #AntesDespois",
      likes: 873,
      comments: 124,
      date: "2 dias atrás"
    },
    {
      id: 2,
      username: "@paulotrainer",
      platform: "instagram",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVuZXJneXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      caption: "Suplementação adequada faz TODA diferença. Estou sugerindo Juvelina para todos meus alunos. Resultados impressionantes em menos de 1 mês! 💪 #JuvelinaOrganics #EnergiaNatural",
      likes: 1240,
      comments: 89,
      date: "3 dias atrás"
    },
    {
      id: 3,
      username: "@carolnutri",
      platform: "tiktok",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      caption: "NUTRI APROVA! ✅ Analisei a composição da Juvelina e precisamos falar sobre esse multivitamínico! Ingredientes premium e alta biodisponibilidade! #JuvelinaOrganics #NutriAprova",
      likes: 5423,
      comments: 412,
      date: "1 semana atrás"
    },
    {
      id: 4,
      username: "@luanasaude",
      platform: "instagram",
      image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      caption: "2 meses de Juvelina todos os dias. Resultado: Imunidade MUITO melhor, gripe zero e pele mais bonita! Vale cada centavo! 💚 #JuvelinaOrganics",
      likes: 783,
      comments: 95,
      date: "5 dias atrás"
    },
    {
      id: 5,
      username: "@marciofit",
      platform: "tiktok",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1450&q=80",
      caption: "COMPARATIVO: Absorção da Juvelina vs cápsulas tradicionais! O teste com corante mostra a diferença ABSURDA! 🧪 #JuvelinaOrganics #CiênciaDaAbsorção",
      likes: 9812,
      comments: 743,
      date: "4 dias atrás"
    },
    {
      id: 6,
      username: "@anaclara",
      platform: "instagram",
      image: "https://images.unsplash.com/photo-1609252507134-1e576575af28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      caption: "Depois que comecei a tomar Juvelina, minhas unhas pararam de quebrar! Olha como estão fortes depois de apenas 1 mês! 💅 #JuvelinaResults #UnhasFortes",
      likes: 526,
      comments: 73,
      date: "1 semana atrás"
    },
    {
      id: 7,
      username: "@rodrigofitness",
      platform: "tiktok",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      caption: "Desafio de 30 dias com Juvelina: Fui de cansado o tempo todo para DISPOSIÇÃO MÁXIMA! 📈 Vale muito a pena, galera! #JuvelinaChallenge #Resultados",
      likes: 8521,
      comments: 634,
      date: "2 dias atrás"
    },
    {
      id: 8,
      username: "@belavida",
      platform: "instagram",
      image: "https://images.unsplash.com/photo-1498671546682-94a232c26d17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      caption: "Acordei com MUITO mais disposição hoje! Já é a terceira semana tomando Juvelina e a diferença é nítida. Recomendo demais! ☀️ #JuvelinaOrganics #MaisSaúde",
      likes: 612,
      comments: 84,
      date: "3 dias atrás"
    },
    {
      id: 9,
      username: "@fernandasaude",
      platform: "tiktok",
      image: "https://images.unsplash.com/photo-1541971297127-c4e6f5726568?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      caption: "1 MÊS DEPOIS 😱 O antes e depois do meu cabelo com Juvelina! Está muito mais brilhante e caindo menos! #JuvelinaCabelos #AntesDespois",
      likes: 12445,
      comments: 856,
      date: "5 dias atrás"
    },
    {
      id: 10,
      username: "@drmarcelo",
      platform: "instagram",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      caption: "Como médico, costumo ser cético com suplementos, mas a Juvelina tem me surpreendido. A forma líquida realmente otimiza a absorção, e os resultados nos meus pacientes são notáveis. #MedicinaPreventivaComCiência",
      likes: 3250,
      comments: 324,
      date: "6 dias atrás"
    },
    {
      id: 11,
      username: "@juliafitlife",
      platform: "instagram",
      image: "https://images.unsplash.com/photo-1607606116242-357a0d503b6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      caption: "AMEI meu kit Juvelina que chegou hoje! A embalagem é linda e o produto tem um sabor super agradável! Vou compartilhar os resultados nas próximas semanas! 🌿 #JuvelinaOrganics #UnboxingJuvelina",
      likes: 842,
      comments: 107,
      date: "1 dia atrás"
    },
    {
      id: 12,
      username: "@marcelowellness",
      platform: "tiktok",
      image: "https://images.unsplash.com/photo-1579529547132-0c2c484ecc8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      caption: "COMPARATIVO DE ENERGIA: Usando Juvelina vs sem usar nada. Filmei durante 7 dias e a diferença é clara! Muito mais produtivo e alerta! #JuvelinaResults #EnergiaNatural",
      likes: 7645,
      comments: 513,
      date: "4 dias atrás"
    }
  ];

  // Categorias para filtrar
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'tiktok', label: 'TikTok' },
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filtrar posts baseado na categoria selecionada
  const filteredPosts = activeCategory === 'all' 
    ? ugcPosts 
    : activeCategory === 'instagram' || activeCategory === 'tiktok'
      ? ugcPosts.filter(post => post.platform === activeCategory)
      : ugcPosts.filter(post => {
          // Filtrar por tema (baseado no conteúdo da legenda)
          if (activeCategory === 'energy') {
            return post.caption.toLowerCase().includes('energia') || 
                   post.caption.toLowerCase().includes('disposição') ||
                   post.caption.toLowerCase().includes('cansado');
          } else if (activeCategory === 'beauty') {
            return post.caption.toLowerCase().includes('cabelo') || 
                   post.caption.toLowerCase().includes('pele') ||
                   post.caption.toLowerCase().includes('unha');
          } else if (activeCategory === 'immunity') {
            return post.caption.toLowerCase().includes('imunidade') || 
                   post.caption.toLowerCase().includes('gripe') ||
                   post.caption.toLowerCase().includes('doença');
          }
          return false;
        });
  
  // Posts visíveis após filtragem e paginação
  const currentPosts = filteredPosts.slice(0, visiblePosts);
  
  // Efeito para fechar o modal com tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePostModal();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  // Carregar mais posts com efeito de loading
  const loadMorePosts = () => {
    setIsLoading(true);
    
    // Simular carregamento
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 4, filteredPosts.length));
      setIsLoading(false);
    }, 800);
  };
  
  // Abrir modal de post
  const openPostModal = (postId: number) => {
    setSelectedPost(postId);
    document.body.style.overflow = 'hidden';
  };
  
  // Fechar modal de post
  const closePostModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };
  
  // Navegação entre posts no modal
  const navigatePost = (direction: 'next' | 'prev') => {
    if (selectedPost === null) return;
    
    const currentIndex = filteredPosts.findIndex(post => post.id === selectedPost);
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredPosts.length;
      setSelectedPost(filteredPosts[nextIndex].id);
    } else {
      const prevIndex = (currentIndex - 1 + filteredPosts.length) % filteredPosts.length;
      setSelectedPost(filteredPosts[prevIndex].id);
    }
  };
  
  // Função para simular "curtida" em um post
  const toggleLike = (postId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setLikedPosts(prev => [...prev, postId]);
      
      // Mostrar animação de coração
      const heartAnimation = document.createElement('div');
      heartAnimation.innerHTML = '❤️';
      heartAnimation.className = 'fixed text-4xl animate-heart';
      heartAnimation.style.zIndex = '9999';
      
      if (e) {
        heartAnimation.style.left = `${e.clientX - 15}px`;
        heartAnimation.style.top = `${e.clientY - 15}px`;
      } else {
        const post = document.getElementById(`post-${postId}`);
        if (post) {
          const rect = post.getBoundingClientRect();
          heartAnimation.style.left = `${rect.left + rect.width/2 - 15}px`;
          heartAnimation.style.top = `${rect.top + rect.height/2 - 15}px`;
        }
      }
      
      document.body.appendChild(heartAnimation);
      
      setTimeout(() => {
        document.body.removeChild(heartAnimation);
      }, 1000);
    }
  };
  
  // Função para formatar números grandes
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  return (
    <section id="ugc-gallery" className="py-20 bg-gradient-to-b from-white to-juvelina-mint/5 relative overflow-hidden" ref={ref}>
      {/* Padrão de fundo sutil */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.66 22.17v26.66L30 60l21.34-11.17V22.17L30 10.39z' fill='%23A9683D' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-juvelina-gold/20 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4">
            Nossa Comunidade
          </span>
          <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black">
            Transformações <span className="text-juvelina-gold">Reais</span> nas Redes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veja o que nossos clientes estão compartilhando sobre seus resultados com Juvelina Organics.
          </p>
        </div>
        
        {/* Filtros de categoria */}
        <div className="flex justify-center mb-10 overflow-x-auto hide-scrollbar">
          <div className="inline-flex bg-white rounded-full shadow-md p-1.5">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-juvelina-gold text-white'
                    : 'bg-transparent text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setVisiblePosts(8); // Resetar paginação ao trocar categoria
                }}
              >
                {category.id === 'instagram' && <Instagram size={16} className="inline mr-1" />}
                {category.id === 'tiktok' && <TikTokIcon size={16} className="inline mr-1" />}
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Grid de posts */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
          ref={galleryRef}
        >
          <AnimatePresence>
            {currentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                id={`post-${post.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => openPostModal(post.id)}
                whileHover={{ y: -5 }}
              >
                {/* Imagem */}
                <div className="relative pb-[100%] overflow-hidden bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={`Post de ${post.username}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay com informações */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                    {/* Informações do autor */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full py-1 px-2">
                        {post.platform === 'instagram' ? (
                          <Instagram size={14} className="text-white" />
                        ) : (
                          <TikTokIcon size={14} className="text-white" />
                        )}
                        <span className="text-white text-xs font-medium truncate max-w-[100px]">
                          {post.username}
                        </span>
                      </div>
                      
                      <div className="text-xs text-white bg-black/30 backdrop-blur-sm rounded-full py-1 px-2">
                        {post.date}
                      </div>
                    </div>
                    
                    {/* Interações */}
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button 
                          className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full py-1 px-2 hover:bg-black/50 transition-colors"
                          onClick={(e) => toggleLike(post.id, e)}
                        >
                          <Heart 
                            size={14} 
                            className={`${likedPosts.includes(post.id) ? 'text-red-500 fill-red-500' : 'text-white'}`}
                          />
                          <span className="text-white text-xs">
                            {formatNumber(post.likes + (likedPosts.includes(post.id) ? 1 : 0))}
                          </span>
                        </button>
                        
                        <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full py-1 px-2">
                          <MessageCircle size={14} className="text-white" />
                          <span className="text-white text-xs">
                            {formatNumber(post.comments)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <button 
                          className="bg-black/30 backdrop-blur-sm rounded-full p-1.5 hover:bg-black/50 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowShareTooltip(showShareTooltip === post.id ? null : post.id);
                          }}
                        >
                          <Share2 size={14} className="text-white" />
                        </button>
                        
                        {/* Tooltip de compartilhamento */}
                        {showShareTooltip === post.id && (
                          <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-lg p-2 w-40 z-10">
                            <div className="flex flex-col gap-2 text-sm">
                              <button className="flex items-center gap-2 hover:text-juvelina-gold">
                                <Instagram size={14} />
                                <span>Instagram</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-juvelina-gold">
                                <TikTokIcon size={14} />
                                <span>TikTok</span>
                              </button>
                              <button className="flex items-center gap-2 hover:text-juvelina-gold" onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(`Veja os resultados incríveis com Juvelina Organics! #JuvelinaOrganics ${window.location.href}`);
                                setShowShareTooltip(null);
                                // Mostrar notificação de copiado
                                alert('Link copiado para a área de transferência!');
                              }}>
                                <ExternalLink size={14} />
                                <span>Copiar Link</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge da plataforma */}
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md">
                    {post.platform === 'instagram' ? (
                      <Instagram size={16} className="text-pink-600" />
                    ) : (
                      <TikTokIcon size={16} className="text-black" />
                    )}
                  </div>
                </div>
                
                {/* Legenda resumida */}
                <div className="p-3">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Botão para carregar mais */}
        {visiblePosts < filteredPosts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMorePosts}
              disabled={isLoading}
              className={`bg-white border border-juvelina-gold text-juvelina-gold hover:bg-juvelina-gold hover:text-white transition-colors px-6 py-3 rounded-full font-medium flex items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-juvelina-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Carregando...
                </>
              ) : (
                <>
                  <Camera size={18} />
                  Ver mais posts
                </>
              )}
            </button>
          </div>
        )}
        
        {/* CTA para compartilhar */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-juvelina-gold to-juvelina-gold/80 rounded-xl p-8 text-white text-center max-w-3xl mx-auto shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold mb-2">Faça Parte da Nossa Comunidade</h3>
          <p className="mb-6">
            Compartilhe sua transformação com Juvelina usando a hashtag <span className="font-bold">#JuvelinaOrganics</span> e apareça em nossa galeria!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="https://www.instagram.com/juvelinaorganics" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-juvelina-gold px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors font-medium flex items-center gap-2"
            >
              <Instagram size={18} />
              Instagram
            </a>
            <a 
              href="https://www.tiktok.com/@juvelinaorganics" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-juvelina-gold px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors font-medium flex items-center gap-2"
            >
              <TikTokIcon size={18} />
              TikTok
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Modal para visualização de posts */}
      <AnimatePresence>
        {selectedPost !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePostModal}
          >
            <motion.div 
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full h-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              ref={modalRef}
            >
              {selectedPost && (
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Imagem do post */}
                  <div className="relative bg-black h-[50vh] md:h-auto">
                    <img 
                      src={filteredPosts.find(p => p.id === selectedPost)?.image} 
                      alt="Post"
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Navegação entre posts */}
                    <button 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigatePost('prev');
                      }}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigatePost('next');
                      }}
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Badge da plataforma */}
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
                      {filteredPosts.find(p => p.id === selectedPost)?.platform === 'instagram' ? (
                        <Instagram size={20} className="text-pink-600" />
                      ) : (
                        <TikTokIcon size={20} className="text-black" />
                      )}
                    </div>
                  </div>
                  
                  {/* Conteúdo do post */}
                  <div className="flex flex-col h-full">
                    {/* Cabeçalho */}
                    <div className="flex items-center justify-between p-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-juvelina-gold/20 rounded-full flex items-center justify-center">
                          {filteredPosts.find(p => p.id === selectedPost)?.username.charAt(1).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold">{filteredPosts.find(p => p.id === selectedPost)?.username}</h4>
                          <p className="text-xs text-gray-500">{filteredPosts.find(p => p.id === selectedPost)?.date}</p>
                        </div>
                      </div>
                      
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={closePostModal}
                      >
                        <X size={24} />
                      </button>
                    </div>
                    
                    {/* Legenda completa */}
                    <div className="p-4 flex-grow overflow-y-auto">
                      <p className="text-gray-800">
                        {filteredPosts.find(p => p.id === selectedPost)?.caption}
                      </p>
                      
                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {filteredPosts.find(p => p.id === selectedPost)?.caption.split(' ').filter(word => word.startsWith('#')).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-juvelina-gold px-2 py-1 rounded-md text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Interações */}
                    <div className="border-t p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <button 
                            className="flex items-center gap-1.5"
                            onClick={() => {
                              const postId = selectedPost;
                              toggleLike(postId);
                            }}
                          >
                            <Heart 
                              size={20} 
                              className={`${likedPosts.includes(selectedPost) ? 'text-red-500 fill-red-500' : 'text-gray-700'} transition-colors`}
                            />
                            <span className="text-gray-700">
                              {formatNumber((filteredPosts.find(p => p.id === selectedPost)?.likes || 0) + (likedPosts.includes(selectedPost) ? 1 : 0))}
                            </span>
                          </button>
                          
                          <div className="flex items-center gap-1.5 text-gray-700">
                            <MessageCircle size={20} />
                            <span>{formatNumber(filteredPosts.find(p => p.id === selectedPost)?.comments || 0)}</span>
                          </div>
                        </div>
                        
                        <button 
                          className="flex items-center gap-2 text-juvelina-gold hover:underline"
                          onClick={() => {
                            // Copiar link do post
                            navigator.clipboard.writeText(`Veja os resultados incríveis com Juvelina Organics! #JuvelinaOrganics ${window.location.href}`);
                            alert('Link copiado para a área de transferência!');
                          }}
                        >
                          <Share2 size={18} />
                          <span className="font-medium">Compartilhar</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="p-4 border-t bg-juvelina-mint/10">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-700 text-sm">
                          <span className="font-medium">Inspirado?</span> Experimente Juvelina Organics e compartilhe sua transformação!
                        </p>
                        <a
                          href="#oferta"
                          className="bg-juvelina-gold text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-juvelina-gold/90 transition-colors"
                          onClick={closePostModal}
                        >
                          Experimentar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UGCGallerySection;