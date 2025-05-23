// src/App.tsx - VERSÃO ATUALIZADA COM HEADERS
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, ShoppingCart, Package } from 'lucide-react';

// Imports diretos (não lazy) para componentes críticos
import HeroSection from './features/hero';
import AnnouncementBar from './components/common/AnnouncementBar';
import Header from './components/common/Header';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import LoadingSection from './components/ui/LoadingSection';

// Lazy loading dos componentes secundários
const VideoTestimonialsSection = lazy(() => import('./features/testimonials/VideoTestimonialsSection'));
const BenefitsSection = lazy(() => import('./features/benefits/BenefitsSection'));
const AbsorptionSection = lazy(() => import('./features/benefits/AbsorptionSection'));
const UGCGallerySection = lazy(() => import('./features/testimonials/UGCGallerySection'));
const GuaranteeSection = lazy(() => import('./features/testimonials/GuaranteeSection'));
const ViralOfferSection = lazy(() => import('./features/product/ViralOfferSection'));
const PricingSection = lazy(() => import('./features/product/PricingSection'));
const FaqSection = lazy(() => import('./features/testimonials/FaqSection'));
const Footer = lazy(() => import('./components/product/Footer'));

// Modais e componentes auxiliares
const PurchaseModal = lazy(() => import('./components/common/PurchaseModal'));
const IngredientsList = lazy(() => import('./components/ui/IngredientsList'));
const CreatorBadge = lazy(() => import('./components/ui/CreatorBadge'));
const RecentActivityNotification = lazy(() => import('./components/ui/RecentActivityNotification'));
const VisitorCounter = lazy(() => import('./components/ui/VisitorCounter'));
const OnlineUsersCounter = lazy(() => import('./components/ui/OnlineUsersCounter'));

// Custom hooks
import { useScrollPosition } from './hooks/ui/useScrollPosition';
import { useModalState } from './hooks/ui/useModalState';

function App() {
  const { showScrollTop } = useScrollPosition();
  const { showModal, modalVariant, openModal, closeModal } = useModalState();
  const [showIngredients, setShowIngredients] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [isInPricingSection, setIsInPricingSection] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNotifications, setShowNotifications] = useState({
    creator: false,
    activity: false,
    visitors: false,
    onlineUsers: false
  });

  // Detectar quando o usuário está na seção de preços
  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.getElementById('planos');
      const offerSection = document.getElementById('oferta');
      
      if (pricingSection || offerSection) {
        const rect = pricingSection?.getBoundingClientRect() || offerSection?.getBoundingClientRect();
        if (rect) {
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          setIsInPricingSection(isVisible);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar posição inicial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gerenciamento de notificações baseado na seção
  useEffect(() => {
    if (isInPricingSection) {
      // Mostrar notificações quando estiver na seção de preços
      const timers = [
        setTimeout(() => setShowNotifications(prev => ({ ...prev, creator: true })), 2000),
        setTimeout(() => setShowNotifications(prev => ({ ...prev, activity: true })), 5000),
        setTimeout(() => setShowNotifications(prev => ({ ...prev, visitors: true })), 1000)
      ];

      return () => timers.forEach(timer => clearTimeout(timer));
    } else {
      // Esconder notificações quando sair da seção (exceto onlineUsers)
      setShowNotifications(prev => ({
        creator: false,
        activity: false,
        visitors: false,
        onlineUsers: prev.onlineUsers // Manter online users sempre visível
      }));
    }
  }, [isInPricingSection]);

  // Mostrar contador de usuários online após 10 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotifications(prev => ({ ...prev, onlineUsers: true }));
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Exit intent detection
  useEffect(() => {
    let timeBasedTimer: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown && !showModal && !hasInteracted) {
        setExitIntentShown(true);
        openModal('exit-intent');
      }
    };

    // Time-based popup (apenas se o usuário não interagiu)
    timeBasedTimer = setTimeout(() => {
      if (!hasInteracted && !showModal && !exitIntentShown) {
        openModal('time-based');
      }
    }, 45000); // 45 segundos

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeBasedTimer);
    };
  }, [exitIntentShown, showModal, openModal, hasInteracted]);

  // Handler para abrir o modal de compra
  const handleCtaClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setHasInteracted(true);
    openModal('default');
  };

  // Handler para scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de Anúncio - Sticky no topo */}
      <AnnouncementBar initialUnits={54} discountPercentage={30} />
      
      {/* Header Principal - Sticky abaixo do announcement */}
      <Header onCtaClick={handleCtaClick} />
      
      {/* Barra de Progresso */}
      <ScrollProgressBar color="#A9683D" height={3} />
      
      {/* Conteúdo Principal */}
      <main>
        {/* Hero Section - Sempre carregada */}
        <HeroSection onCtaClick={handleCtaClick} />
        
        {/* Seções com Lazy Loading */}
        <Suspense fallback={<LoadingSection />}>
          <VideoTestimonialsSection />
          
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Barra de benefícios */}
              <div className="bg-juvelina-mint/5 py-4">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2">
                      <Package className="text-juvelina-gold" size={20} />
                      <span className="text-sm font-medium">Frete Grátis em Todo Brasil</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-300" />
                    <span className="text-sm">🔒 Pagamento 100% Seguro</span>
                    <div className="hidden sm:block w-px h-4 bg-gray-300" />
                    <span className="text-sm">✨ Garantia de 30 dias</span>
                  </div>
                </div>
              </div>
              
              <BenefitsSection />
              
              {/* Seção de ingredientes */}
              <section id="ingredientes" className="py-12 bg-gradient-to-b from-white to-juvelina-mint/10">
                <div className="container mx-auto px-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">Descubra Nossa Fórmula Exclusiva</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      25 nutrientes essenciais cuidadosamente selecionados para máxima eficácia e absorção superior.
                    </p>
                    <button
                      onClick={() => setShowIngredients(true)}
                      className="bg-white border-2 border-juvelina-gold text-juvelina-gold px-6 py-3 rounded-full hover:bg-juvelina-gold hover:text-white transition-colors font-medium"
                    >
                      Ver Todos os Ingredientes
                    </button>
                  </motion.div>
                </div>
              </section>
              
              <AbsorptionSection />
              <UGCGallerySection />
              
              {/* CTA intermediário */}
              <div className="py-16 bg-gradient-to-r from-juvelina-gold to-juvelina-gold/80">
                <div className="container mx-auto px-4 text-center text-white">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-3xl font-bold mb-4">
                      Junte-se a Mais de 12.500 Pessoas Transformadas
                    </h3>
                    <p className="text-xl mb-8 opacity-90">
                      Comece sua jornada de bem-estar hoje mesmo!
                    </p>
                    <button
                      onClick={handleCtaClick}
                      className="bg-white text-juvelina-gold px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-lg"
                    >
                      <ShoppingCart size={24} />
                      Quero Transformar Minha Saúde
                    </button>
                  </motion.div>
                </div>
              </div>
              
              <GuaranteeSection />
              <ViralOfferSection onCtaClick={handleCtaClick} />
              <PricingSection onCtaClick={handleCtaClick} />
              <FaqSection />
            </motion.div>
          </AnimatePresence>
          
          {/* Footer */}
          <Footer />
        </Suspense>
      </main>
      
      {/* Modais */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {showModal && (
            <PurchaseModal
              isOpen={showModal}
              onClose={closeModal}
              variant={modalVariant}
            />
          )}
          
          {showIngredients && (
            <IngredientsList onClose={() => setShowIngredients(false)} />
          )}
        </AnimatePresence>
      </Suspense>
      
      {/* Botão Voltar ao Topo */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-juvelina-gold text-white p-3 rounded-full shadow-lg hover:bg-juvelina-gold/90 transition-colors z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Componentes de Notificação - Aparecem apenas na seção de preços */}
      <Suspense fallback={null}>
        {showNotifications.creator && <CreatorBadge />}
        {showNotifications.activity && <RecentActivityNotification />}
        {showNotifications.visitors && <VisitorCounter />}
        {showNotifications.onlineUsers && <OnlineUsersCounter />}
      </Suspense>
    </div>
  );
}

export default App;