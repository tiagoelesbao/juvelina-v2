import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, ShoppingCart, Package } from 'lucide-react';

// Imports corrigidos - subindo um nível (..)
import HeroSection from '../features/hero';
import VideoTestimonialsSection from '../features/testimonials/VideoTestimonialsSection';
import Footer from '../components/product/Footer';
import ScrollProgressBar from '../components/ui/ScrollProgressBar';
import LoadingSection from '../components/ui/LoadingSection';

// Lazy loading dos componentes
const BenefitsSection = lazy(() => import('../features/benefits/BenefitsSection'));
const AbsorptionSection = lazy(() => import('../features/benefits/AbsorptionSection'));
const UGCGallerySection = lazy(() => import('../features/testimonials/UGCGallerySection'));
const GuaranteeSection = lazy(() => import('../features/testimonials/GuaranteeSection'));
const ViralOfferSection = lazy(() => import('../features/product/ViralOfferSection'));
const PricingSection = lazy(() => import('../features/product/PricingSection'));
const FaqSection = lazy(() => import('../features/testimonials/FaqSection'));
const PurchaseModal = lazy(() => import('../components/common/PurchaseModal'));
const IngredientsList = lazy(() => import('../components/ui/IngredientsList'));

// Componentes de notificação
const CreatorBadge = lazy(() => import('../components/ui/CreatorBadge'));
const RecentActivityNotification = lazy(() => import('../components/ui/RecentActivityNotification'));
const VisitorCounter = lazy(() => import('../components/ui/VisitorCounter'));
const OnlineUsersCounter = lazy(() => import('../components/ui/OnlineUsersCounter'));

// Custom hooks
import { useScrollPosition } from '../hooks/ui/useScrollPosition';
import { useModalState } from '../hooks/ui/useModalState';

// Componente principal
function App() {
  const { showScrollTop } = useScrollPosition();
  const { showModal, modalVariant, openModal, closeModal } = useModalState();
  const [showIngredients, setShowIngredients] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [showNotifications, setShowNotifications] = useState({
    creator: false,
    activity: false,
    visitors: false,
    users: false
  });

  // Gerenciamento de notificações
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowNotifications(prev => ({ ...prev, creator: true })), 15000),
      setTimeout(() => setShowNotifications(prev => ({ ...prev, activity: true })), 8000),
      setTimeout(() => setShowNotifications(prev => ({ ...prev, visitors: true })), 3000),
      setTimeout(() => setShowNotifications(prev => ({ ...prev, users: true })), 12000)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown && !showModal) {
        setExitIntentShown(true);
        openModal('exit-intent');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentShown, showModal, openModal]);

  // Handler para abrir o modal de compra
  const handleCtaClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    openModal('default');
  };

  // Handler para scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
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
              
              <div className="py-12 bg-gradient-to-b from-white to-juvelina-mint/10">
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
              </div>
              
              <AbsorptionSection />
              <UGCGallerySection />
              
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
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer />
      
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
      
      {/* Componentes de Notificação */}
      <Suspense fallback={null}>
        {showNotifications.creator && <CreatorBadge />}
        {showNotifications.activity && <RecentActivityNotification />}
        {showNotifications.visitors && <VisitorCounter />}
        {showNotifications.users && <OnlineUsersCounter />}
      </Suspense>
    </div>
  );
}

export default App;