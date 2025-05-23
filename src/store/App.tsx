// src/App.tsx
import { useState, useEffect, useRef, createContext, Suspense, lazy } from 'react';
import { ShoppingCart, Menu, X, ArrowUp, Globe } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Componentes de UI e hooks carregados imediatamente
import HeroSection from './features/hero/index';
import Footer from './components/layout/Footer';
import LoadingSection from './components/ui/LoadingSection';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import CreatorBadge from './components/ui/CreatorBadge';
import { useModalState } from './hooks/ui/useModalState';
import { useSocialProof } from './hooks/product/useSocialProof';

// Lazy loading de componentes de seção
const BenefitsSection = lazy(() => import('./features/benefits/BenefitsSection'));
const AbsorptionSection = lazy(() => import('./features/benefits/AbsorptionSection'));
const VideoTestimonialsSection = lazy(() => import('./features/testimonials/VideoTestimonialsSection'));
const UGCGallerySection = lazy(() => import('./features/testimonials/UGCGallerySection'));
const ViralTestimonialsSection = lazy(() => import('./features/testimonials/ViralTestimonialsSection'));
const GuaranteeSection = lazy(() => import('./features/testimonials/GuaranteeSection'));
const ViralOfferSection = lazy(() => import('./features/product/ViralOfferSection'));
const PricingSection = lazy(() => import('./features/product/PricingSection'));
const FaqSection = lazy(() => import('./features/testimonials/FaqSection'));
const PurchaseModal = lazy(() => import('./components/common/PurchaseModal'));
const IngredientsList = lazy(() => import('./components/common/IngredientsList'));

// Definir o contexto da aplicação
export const AppContext = createContext<{
  openPurchaseModal: () => void;
  lastActiveSection: string;
  userStats: {
    visitTime: number;
    pageViews: number;
    scrollDepth: number;
  }
}>({
  openPurchaseModal: () => {},
  lastActiveSection: '',
  userStats: {
    visitTime: 0,
    pageViews: 0,
    scrollDepth: 0
  }
});

function App() {
  // Estado de UI
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastActiveSection, setLastActiveSection] = useState<string>('hero');
  
  // Hooks personalizados para gerenciar estados complexos
  const { showModal, modalVariant, openModal, closeModal } = useModalState('default');
  const { activeSocialProof, socialProofs } = useSocialProof();
  
  // Estados de urgência e escassez
  const [discountTimer, setDiscountTimer] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59
  });
  const [stockCount] = useState(54);
  
  // Referências para elementos DOM
  const appRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress com Framer Motion
  const { scrollYProgress } = useScroll();
  useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Stats do usuário para personalização
  const [userStats, setUserStats] = useState({
    visitTime: 0,
    pageViews: 1,
    scrollDepth: 0,
    interests: [] as string[],
    deviceType: 'desktop'
  });
  
  // Determinar tipo de dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      setUserStats(prev => ({
        ...prev,
        deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
      }));
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  // Configuração do timer de desconto
  useEffect(() => {
    const timer = setInterval(() => {
      setDiscountTimer(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59, hours: prev.hours };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reiniciar o timer para manter a urgência
          return { hours: 4, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Monitorar tempo de visita do usuário
  useEffect(() => {
    const timer = setInterval(() => {
      setUserStats(prev => ({
        ...prev,
        visitTime: prev.visitTime + 1
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Monitorar posição de scroll e seção ativa
  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const currentPosition = window.scrollY;
        setScrollPosition(currentPosition);
        setShowScrollTop(currentPosition > 600);
        
        // Rastrear profundidade de scroll para personalização de experiência
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrolledPercentage = (currentPosition / (documentHeight - windowHeight)) * 100;
        
        setUserStats(prev => ({
          ...prev,
          scrollDepth: Math.max(prev.scrollDepth, Math.round(scrolledPercentage))
        }));
        
        // Detectar seção atual para analytics e personalização
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(current => {
          const sectionHeight = current.clientHeight;
          const sectionTop = (current as HTMLElement).offsetTop - 100;
          const sectionId = current.getAttribute('id') || '';
          
          if (currentPosition > sectionTop && currentPosition <= sectionTop + sectionHeight) {
            if (lastActiveSection !== sectionId) {
              setLastActiveSection(sectionId);
            }
          }
        });
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastActiveSection]);
  
  // Função para abrir o modal de compra
  const handleOpenPurchaseModal = () => {
    openModal('default');
    
    // Eventos para analytics
    console.log('[Analytics] CTA Clicado: Abrir Modal de Compra - Seção: ' + lastActiveSection);
  };
  
  // Função para rolar para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Navegação de seções para rastreamento de conversão
  const navigationItems = [
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'absorpcao', label: 'Como Funciona' },
    { id: 'video-depoimentos', label: 'Resultados em Vídeo' },
    { id: 'ugc-gallery', label: 'Comunidade' },
    { id: 'depoimentos', label: 'Depoimentos' },
    { id: 'garantia', label: 'Garantia' }
  ];
  
  // Função para navegar para seção
  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Fechar menu mobile se aberto
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };
  
  return (
    <AppContext.Provider value={{ 
      openPurchaseModal: handleOpenPurchaseModal, 
      lastActiveSection,
      userStats: {
        visitTime: userStats.visitTime,
        pageViews: userStats.pageViews,
        scrollDepth: userStats.scrollDepth
      }
    }}>
      <div 
        className="min-h-screen bg-white text-gray-800 font-['Zap'] overflow-x-hidden relative"
        ref={appRef}
      >
        {/* Barra de progresso de scroll */}
        <ScrollProgressBar color="#A9683D" height={3} showPercentage={false} position="top" />
        
        {/* Componente de notificações flutuantes */}
        <CreatorBadge />
        
        {/* Popup de social proof */}
        <AnimatePresence>
          {activeSocialProof !== null && (
            <motion.div
              key={`social-proof-${activeSocialProof}`}
              initial={{ opacity: 0, y: 50, x: -100 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-5 left-5 z-40 max-w-xs"
            >
              <div className="bg-white rounded-lg shadow-xl p-3 border border-juvelina-mint/30">
                <div className="flex items-center gap-3">
                  <img 
                    src={socialProofs[activeSocialProof].avatar} 
                    alt={socialProofs[activeSocialProof].name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{socialProofs[activeSocialProof].name}</div>
                    <div className="text-xs text-gray-600">
                      {socialProofs[activeSocialProof].action} <span className="text-green-500 font-medium">{socialProofs[activeSocialProof].time}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{socialProofs[activeSocialProof].location}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Announcement Bar - Gatilho de urgência e escassez */}
        <div className="bg-juvelina-gold text-white py-2 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center md:justify-between">
              <p className="text-center text-sm md:text-base flex items-center justify-center gap-2 flex-grow">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                🌿 OFERTA ESPECIAL: 30% OFF + Frete Grátis | Restam {discountTimer.hours}h:{discountTimer.minutes}m:{discountTimer.seconds}s | Apenas {stockCount} unidades! 🌿
              </p>
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Globe size={14} className="text-white" />
                  <select className="bg-transparent text-white text-sm border-none outline-none cursor-pointer">
                    <option value="pt-BR" className="text-gray-800">Português</option>
                    <option value="en-US" className="text-gray-800">English</option>
                    <option value="es-ES" className="text-gray-800">Español</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <header className={`bg-white sticky top-10 z-40 transition-all duration-300 ${scrollPosition > 50 ? 'shadow-md' : 'shadow-sm'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
                <div className="text-juvelina-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="font-['Ws_Paradose'] text-2xl text-juvelina-gold">Juvelina</span>
              </div>
              
              {/* Desktop Menu */}
              <nav className="hidden md:flex gap-6 items-center">
                {navigationItems.map((item) => (
                  <button 
                    key={item.id}
                    className={`text-gray-600 hover:text-juvelina-gold transition font-medium relative ${
                      lastActiveSection === item.id ? 'text-juvelina-gold' : ''
                    }`}
                    onClick={() => navigateToSection(item.id)}
                  >
                    {item.label}
                    {lastActiveSection === item.id && (
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-juvelina-gold"
                        layoutId="activeSection"
                      />
                    )}
                  </button>
                ))}
                <button 
                  onClick={() => {
                    setShowIngredients(true);
                    console.log('[Analytics] Visualização de Ingredientes');
                  }}
                  className="text-gray-600 hover:text-juvelina-gold transition font-medium"
                >
                  Ingredientes
                </button>
                <button 
                  onClick={handleOpenPurchaseModal}
                  className="bg-juvelina-gold text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingCart size={18} />
                  <span>Comprar</span>
                </button>
              </nav>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-juvelina-gold"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="md:hidden bg-white border-t border-gray-100 py-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="container mx-auto px-4 flex flex-col gap-4">
                  {navigationItems.map((item) => (
                    <button 
                      key={item.id}
                      className={`text-left text-gray-600 hover:text-juvelina-gold transition py-2 font-medium ${
                        lastActiveSection === item.id ? 'text-juvelina-gold' : ''
                      }`}
                      onClick={() => navigateToSection(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button 
                    className="text-left text-gray-600 hover:text-juvelina-gold transition py-2 font-medium"
                    onClick={() => {
                      setShowIngredients(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Ingredientes
                  </button>
                  <button 
                    onClick={() => {
                      handleOpenPurchaseModal();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-juvelina-gold text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition flex items-center justify-center gap-2 w-full mt-2 shadow-md"
                  >
                    <ShoppingCart size={18} />
                    <span>Comprar Agora</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Content */}
        <main>
          {/* Hero Section - carregada imediatamente */}
          <HeroSection onCtaClick={handleOpenPurchaseModal} />
          
          {/* Outras seções com lazy loading */}
          <Suspense fallback={<LoadingSection />}>
            <BenefitsSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <AbsorptionSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <VideoTestimonialsSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <UGCGallerySection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <ViralTestimonialsSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <GuaranteeSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <ViralOfferSection onCtaClick={handleOpenPurchaseModal} />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <PricingSection onCtaClick={handleOpenPurchaseModal} />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <FaqSection />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals e Overlays */}
        <Suspense fallback={null}>
          {showModal && (
            <PurchaseModal 
              isOpen={showModal} 
              onClose={closeModal} 
              variant={modalVariant}
              personalizedTitle={getPersonalizedCTA(userStats.interests)}
            />
          )}
        </Suspense>
        
        <Suspense fallback={null}>
          {showIngredients && (
            <IngredientsList onClose={() => setShowIngredients(false)} />
          )}
        </Suspense>
        
        {/* Botão de voltar ao topo */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-20 right-5 w-12 h-12 bg-juvelina-gold/80 backdrop-blur-sm text-white rounded-full shadow-lg flex items-center justify-center z-40"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

// Título personalizado com base em interesses do usuário
function getPersonalizedCTA(interests: string[]) {
  // Se o usuário mostrou interesse em beleza
  if (interests.includes('beleza')) {
    return "Transforme Sua Beleza com Juvelina";
  }
  // Se o usuário mostrou interesse em energia
  else if (interests.includes('energia')) {
    return "Potencialize Sua Energia com Juvelina";
  }
  // Se o usuário mostrou interesse em imunidade
  else if (interests.includes('imunidade')) {
    return "Fortaleça Sua Imunidade com Juvelina";
  }
  // Padrão
  return "Transforme Sua Saúde com Juvelina";
}

export default App;