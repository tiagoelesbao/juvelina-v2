// src/features/benefits/BenefitsSection.tsx
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Droplets, Shield, Heart, Zap, CheckCircle, X, ArrowRight, ArrowDown } from 'lucide-react';
import { PerformanceContext } from '../../App';
import './BenefitsSection.css';

interface BenefitsSectionProps {
  onBenefitChange?: (benefit: string) => void;
}

// Hook para bloquear scroll
const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Salvar posição atual do scroll
      const scrollY = window.scrollY;
      
      // Aplicar estilos para travar o scroll mantendo a posição visual
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      return () => {
        // Remover estilos primeiro
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';
        
        // Restaurar posição do scroll instantaneamente
        window.scrollTo({
          top: scrollY,
          left: 0,
          behavior: 'instant'
        });
      };
    }
  }, [isLocked]);
};

// Dados estáticos movidos para fora do componente
const BENEFITS_DATA = {
  energia: {
    icon: <Zap className="h-10 w-10 text-juvelina-gold" />,
    title: "Energia Sustentada",
    description: "Nosso complexo exclusivo de BCAAs e vitaminas do complexo B proporciona energia constante ao longo do dia, sem os picos e quedas de cafeína e açúcar.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80&fm=webp",
    challenge: "Falta de energia constante durante o dia, especialmente à tarde",
    solution: "BCAAs e vitaminas B em forma líquida para absorção imediata",
    statistic: "97% relatam mais energia",
    detailedInfo: {
      ingredients: ['L-Leucina (410mg)', 'L-Isoleucina (250mg)', 'L-Valina (275mg)', 'Complexo B completo'],
      scientificEvidence: 'Estudos mostram que BCAAs podem aumentar a síntese proteica em até 22% e reduzir a fadiga mental em 15%',
      testimonials: [
        { name: 'Maria Silva', text: 'Acabou o cansaço das 15h! Energia o dia todo.' },
        { name: 'João Santos', text: 'Treino melhor e rendo mais no trabalho.' }
      ]
    }
  },
  imunidade: {
    icon: <Shield className="h-10 w-10 text-juvelina-gold" />,
    title: "Imunidade Reforçada",
    description: "A combinação sinérgica de Vitamina C, Zinco e Glutamina fortalece suas defesas naturais, deixando seu corpo preparado para enfrentar qualquer desafio.",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80&fm=webp",
    challenge: "Sistema imunológico comprometido por estresse e má alimentação",
    solution: "Glutamina, Zinco e Vitamina C em proporção ideal para defesa celular",
    statistic: "89% menos doenças",
    detailedInfo: {
      ingredients: ['Vitamina C (100mg)', 'Zinco (11mg)', 'Selênio (100mcg)', 'Glutamina (310mg)'],
      scientificEvidence: 'A suplementação com zinco pode reduzir a duração de resfriados em 33% quando tomada nas primeiras 24 horas',
      testimonials: [
        { name: 'Ana Costa', text: 'Não fico mais doente como antes!' },
        { name: 'Pedro Lima', text: 'Atravessei o inverno sem gripes.' }
      ]
    }
  },
  beleza: {
    icon: <Heart className="h-10 w-10 text-juvelina-gold" />,
    title: "Beleza Radiante",
    description: "Colágeno peptídico, Biotina e Vitamina E trabalham juntos para promover pele firme, cabelos fortes e unhas saudáveis, revelando sua beleza natural.",
    image: "https://images.unsplash.com/photo-1614194248104-73b258197987?auto=format&fit=crop&w=800&q=80&fm=webp",
    challenge: "Pele, cabelos e unhas sem vida e fragilizados",
    solution: "Colágeno peptídico e Biotina de alta absorção para nutrição interna",
    statistic: "92% pele mais bonita",
    detailedInfo: {
      ingredients: ['Colágeno Bioativo (2,5g)', 'Biotina (45mcg)', 'Silício Orgânico (5mg)', 'Vitamina E (30mg)'],
      scientificEvidence: 'Peptídeos de colágeno aumentam a hidratação da pele em 28% e reduzem rugas em 13% após 8 semanas',
      testimonials: [
        { name: 'Carla Mendes', text: 'Minha pele nunca esteve tão bonita!' },
        { name: 'Fernanda Dias', text: 'Cabelos e unhas super fortalecidos.' }
      ]
    }
  },
  absorcao: {
    icon: <Droplets className="h-10 w-10 text-juvelina-gold" />,
    title: "Absorção Superior",
    description: "Nossa fórmula líquida permite absorção até 5x maior que cápsulas tradicionais, garantindo que cada nutriente seja aproveitado ao máximo pelo seu organismo.",
    image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=80&fm=webp",
    challenge: "Baixa absorção de suplementos tradicionais em cápsulas",
    solution: "Tecnologia de absorção líquida que ultrapassa barreiras digestivas",
    statistic: "5x mais absorção",
    detailedInfo: {
      ingredients: ['Forma líquida pré-digerida', 'Nanoemulsão avançada', 'pH otimizado'],
      scientificEvidence: 'Nutrientes líquidos apresentam biodisponibilidade até 98% maior comparado a formas sólidas',
      testimonials: [
        { name: 'Roberto Alves', text: 'Senti diferença já na primeira semana!' },
        { name: 'Lucia Ferreira', text: 'Finalmente um suplemento que funciona.' }
      ]
    }
  }
};

const BENEFIT_NAMES: Record<string, string> = {
  energia: 'Energia Sustentada',
  imunidade: 'Imunidade Reforçada',
  beleza: 'Beleza Radiante',
  absorcao: 'Absorção Superior'
};

// Partículas flutuantes que conectam as seções
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-juvelina-gold/30 rounded-full"
        initial={{ 
          x: Math.random() * window.innerWidth,
          y: -20 
        }}
        animate={{
          y: window.innerHeight + 20,
          x: Math.random() * window.innerWidth,
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          delay: i * 2,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

// Componente Tooltip melhorado (removido amount)
const IngredientTooltip: React.FC<{ children: React.ReactNode; content: string }> = ({ 
  children, 
  content
}) => (
  <div className="group relative inline-block">
    {children}
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                    opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
      <div className="bg-gray-900 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-xl">
        <div className="text-gray-300">{content}</div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                        w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  </div>
);

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onBenefitChange }) => {
  const [activeTab, setActiveTab] = useState('energia');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isMobile, reduceMotion } = useContext(PerformanceContext);
  
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  // Usar scroll lock quando modal estiver aberto
  useScrollLock(showDetailModal);
  
  // Memoizar os dados dos benefícios
  const benefits = useMemo(() => BENEFITS_DATA, []);
  
  // Otimizar imagens com parâmetros para diferentes dispositivos
  const getOptimizedImageUrl = useCallback((url: string) => {
    const width = isMobile ? 400 : 800;
    const quality = isMobile ? 70 : 80;
    return `${url}&w=${width}&q=${quality}&fm=webp&fit=crop`;
  }, [isMobile]);
  
  // Notificar mudança de benefício
  useEffect(() => {
    if (onBenefitChange) {
      onBenefitChange(activeTab);
    }
  }, [activeTab, onBenefitChange]);
  
  // Handler para mudança de tab com loading state e haptic feedback
  const handleTabChange = useCallback((newTab: string) => {
    if (newTab === activeTab) return;
    
    // Adicionar haptic feedback em mobile
    if ('vibrate' in navigator && isMobile) {
      navigator.vibrate(10);
    }
    
    setIsTransitioning(true);
    
    // Scroll suave para o topo da seção
    const section = document.getElementById('beneficios');
    if (section) {
      const headerOffset = 120;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 150);
  }, [activeTab, isMobile]);
  
  // Handler para navegação por teclado
  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    const tabs = Object.keys(benefits);
    
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      handleTabChange(tabs[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      handleTabChange(tabs[prevIndex]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleTabChange(tabs[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      handleTabChange(tabs[tabs.length - 1]);
    }
  }, [benefits, handleTabChange]);
  
  // Handler para abrir modal de detalhes
  const handleOpenDetails = useCallback((benefitKey: string) => {
    setSelectedBenefit(benefitKey);
    setShowDetailModal(true);
  }, []);

  // Handler para fechar modal
  const handleCloseModal = useCallback(() => {
    // Primeiro define o modal como fechando para permitir animação de saída
    setShowDetailModal(false);
    // Limpa o benefício selecionado após a animação
    setTimeout(() => {
      setSelectedBenefit(null);
    }, 300);
  }, []);
  
  // Modal de Detalhes do Benefício
  const BenefitDetailModal = () => {
    if (!selectedBenefit || !showDetailModal) return null;
    
    const benefit = benefits[selectedBenefit as keyof typeof benefits];
    
    return (
      <AnimatePresence>
        {showDetailModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className={`bg-white rounded-2xl ${isMobile ? 'max-w-lg w-full max-h-[90vh] overflow-y-auto' : 'max-w-4xl w-full'}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={getOptimizedImageUrl(benefit.image)}
                  alt={benefit.title}
                  className="w-full h-48 sm:h-64 object-cover rounded-t-2xl"
                  loading="lazy"
                />
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 hover:bg-white transition shadow-lg"
                  aria-label="Fechar modal"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  {benefit.icon}
                  <h2 className="text-2xl sm:text-3xl font-bold text-juvelina-gold">{benefit.title}</h2>
                </div>
                
                <p className="text-base sm:text-lg text-gray-700 mb-6">{benefit.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl mb-3 text-juvelina-emerald">Ingredientes Principais</h3>
                    <ul className="space-y-2">
                      {benefit.detailedInfo.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-juvelina-gold flex-shrink-0" />
                          <span className="text-sm sm:text-base">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl mb-3 text-juvelina-emerald">Evidência Científica</h3>
                    <p className="text-sm sm:text-base text-gray-700 italic bg-juvelina-mint/20 p-4 rounded-lg">
                      "{benefit.detailedInfo.scientificEvidence}"
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-3 text-juvelina-emerald">O que nossos clientes dizem</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefit.detailedInfo.testimonials.map((testimonial, idx) => (
                      <motion.div 
                        key={idx} 
                        className="bg-gray-50 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <p className="text-sm sm:text-base text-gray-700 mb-2">"{testimonial.text}"</p>
                        <p className="text-xs sm:text-sm text-juvelina-gold font-medium">- {testimonial.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <section 
        id="beneficios" 
        className="benefits-section"
        ref={sectionRef}
      >
        {/* Background orgânico animado */}
        <motion.div 
          className="benefits-organic-bg"
          style={{ y: backgroundY }}
        />
        
        {/* Partículas flutuantes */}
        {!reduceMotion && <FloatingParticles />}
        
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            {/* Badge com efeito glassmorphism */}
            <motion.div 
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              aria-label="Badge de benefícios"
            >
              <div className="benefits-glassmorphism-badge">
                <span>Benefícios Transformadores</span>
              </div>
            </motion.div>
            
            <h2 className="heading-secondary text-juvelina-emerald">
              Transformando Desafios em Bem-Estar
            </h2>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              Entendemos os obstáculos do dia a dia que dificultam sua jornada de saúde. Juvelina foi criada para superar esses desafios.
            </p>
          </div>
          
          {/* Tabs de navegação com suporte a teclado */}
          <div className="flex flex-col items-center mb-12">
            {isMobile && (
              <div className="mb-4 flex items-center gap-2 text-juvelina-gold">
                <div className="flex items-center animate-pulse">
                  <span className="text-sm">Deslize</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            )}
            
            <div 
              className="inline-flex bg-white shadow-md rounded-full p-1 overflow-x-auto hide-scrollbar max-w-full" 
              role="tablist" 
              aria-label="Navegação de benefícios"
            >
              {Object.entries(benefits).map(([key, benefit], index) => (
                <button
                  key={key}
                  className={`benefits-tab ${activeTab === key ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                  onClick={() => handleTabChange(key)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  role="tab"
                  aria-selected={activeTab === key}
                  aria-controls={`benefit-panel-${key}`}
                  id={`benefit-tab-${key}`}
                  tabIndex={activeTab === key ? 0 : -1}
                >
                  <div className="flex items-center gap-2">
                    {React.cloneElement(benefit.icon, {
                      className: `h-4 w-4 ${activeTab === key ? 'text-white' : 'text-juvelina-gold'}`
                    })}
                    <span>{benefit.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Anúncio ARIA para mudanças de estado */}
          <div 
            role="status" 
            aria-live="polite" 
            aria-atomic="true" 
            className="sr-only"
          >
            {isTransitioning 
              ? `Carregando informações sobre ${benefits[activeTab as keyof typeof benefits].title}` 
              : `Mostrando benefícios de ${benefits[activeTab as keyof typeof benefits].title}`}
          </div>
          
          {/* Conteúdo do benefício ativo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              role="tabpanel"
              id={`benefit-panel-${activeTab}`}
              aria-labelledby={`benefit-tab-${activeTab}`}
              className={isTransitioning ? 'opacity-50' : ''}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Coluna de texto */}
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-4 mb-6">
                    {benefits[activeTab as keyof typeof benefits].icon}
                    <h3 className="text-2xl font-bold">{benefits[activeTab as keyof typeof benefits].title}</h3>
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-8">
                    {benefits[activeTab as keyof typeof benefits].description}
                  </p>
                  
                  {/* Comparação Desafio vs. Solução com microinterações */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <motion.div 
                      className="benefits-challenge-card group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      whileHover={!reduceMotion ? { x: -5 } : {}}
                    >
                      <h4 className="font-bold text-lg mb-3 text-red-500 flex items-center gap-2">
                        <X size={18} />
                        O Desafio
                      </h4>
                      <p className="text-gray-700">
                        {benefits[activeTab as keyof typeof benefits].challenge}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="benefits-solution-card group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.15,
                        ease: "easeOut"
                      }}
                      whileHover={!reduceMotion ? { x: 5 } : {}}
                    >
                      <h4 className="font-bold text-lg mb-3 text-juvelina-emerald flex items-center gap-2">
                        <CheckCircle size={18} />
                        Nossa Solução
                      </h4>
                      <p className="text-gray-700">
                        {benefits[activeTab as keyof typeof benefits].solution}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Botão para ver mais detalhes */}
                  <motion.button
                    className="benefits-cta-button group"
                    onClick={() => handleOpenDetails(activeTab)}
                    whileHover={!reduceMotion ? { scale: 1.05 } : {}}
                    whileTap={!reduceMotion ? { scale: 0.95 } : {}}
                  >
                    <span>Ver Detalhes Científicos</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
                
                {/* Imagem do benefício */}
                <div className="order-1 md:order-2 relative mb-8 md:mb-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={getOptimizedImageUrl(benefits[activeTab as keyof typeof benefits].image)}
                      alt={benefits[activeTab as keyof typeof benefits].title}
                      className="rounded-lg shadow-xl w-full h-auto object-cover"
                      style={{ maxHeight: '500px' }}
                      loading="lazy"
                    />
                    
                    {/* Badge flutuante */}
                    <motion.div 
                      className="absolute -bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg hidden sm:flex"
                      animate={!reduceMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-2 text-juvelina-emerald">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="font-bold">Cientificamente Comprovado</span>
                      </div>
                    </motion.div>
                    
                    {/* Badge com estatística */}
                    <motion.div 
                      className="absolute top-5 left-5 bg-juvelina-gold text-white px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="font-bold">{benefits[activeTab as keyof typeof benefits].statistic}</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Indicador de continuação com margem adequada */}
          <motion.div 
            className="mt-20 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-600 mb-4">Descubra os ingredientes que tornam esses benefícios possíveis</p>
            <motion.div
              animate={!reduceMotion ? { y: [0, 10, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              <ArrowDown className="w-8 h-8 text-juvelina-gold" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Transição orgânica melhorada */}
      <div className="benefits-to-ingredients-transition">
        <svg viewBox="0 0 1440 240" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" height="100%">
          <defs>
            <filter id="benefits-wave">
              <feTurbulence baseFrequency="0.015" numOctaves="2" result="turbulence" />
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" />
            </filter>
          </defs>
          <path d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80 C1300,60 1400,70 1440,80 L1440,240 L0,240 Z" fill="#A9683D" filter="url(#benefits-wave)" opacity="0.3"/>
          <path d="M0,120 C300,80 600,160 900,120 C1100,90 1300,130 1440,120 L1440,240 L0,240 Z" fill="#A9683D" filter="url(#benefits-wave)" opacity="0.5"/>
          <path d="M0,160 C400,140 800,180 1200,160 C1320,155 1400,158 1440,160 L1440,240 L0,240 Z" fill="#A9683D" filter="url(#benefits-wave)"/>
        </svg>
      </div>
      
      {/* Modal de Detalhes */}
      <BenefitDetailModal />
    </>
  );
};

export default BenefitsSection;