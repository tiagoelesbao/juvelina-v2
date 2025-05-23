import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, ArrowUp } from 'lucide-react';

// Componentes principais (carregados imediatamente)
import HeroSection from './features/hero';
import VideoTestimonialsSection from './features/testimonials/VideoTestimonialsSection';
import Footer from './components/layout/Footer';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import LoadingSection from './components/ui/LoadingSection';

// Lazy loading para seções secundárias
const BenefitsSection = lazy(() => import('./features/benefits/BenefitsSection'));
const AbsorptionSection = lazy(() => import('./features/benefits/AbsorptionSection'));
const UGCGallerySection = lazy(() => import('./features/testimonials/UGCGallerySection'));
const GuaranteeSection = lazy(() => import('./features/testimonials/GuaranteeSection'));
const ViralOfferSection = lazy(() => import('./features/product/ViralOfferSection'));
const PricingSection = lazy(() => import('./features/product/PricingSection'));
const FaqSection = lazy(() => import('./features/testimonials/FaqSection'));
const PurchaseModal = lazy(() => import('./components/common/PurchaseModal'));
const IngredientsList = lazy(() => import('./components/ui/IngredientsList'));

// Hooks personalizados
import { useScrollPosition } from './hooks/ui/useScrollPosition';
import { useModalState } from './hooks/ui/useModalState';

function App() {
  // Estados principais
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const { scrollPosition, showScrollTop } = useScrollPosition();
  const { showModal, openModal, closeModal } = useModalState();

  // Timer de urgência
  const [timer, setTimer] = useState({ hours: 4, minutes: 59, seconds: 59 });

  // Navegação
  const navigationItems = [
    { id: 'video-depoimentos', label: 'Resultados' },
    { id: 'beneficios', label: 'Benefícios' },
    { id: 'garantia', label: 'Garantia' },
    { id: 'planos', label: 'Planos' },
    { id: 'faq', label: 'FAQ' }
  ];

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 59, seconds: 59 }; // Reinicia
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCtaClick = () => {
    openModal('default');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de Progresso */}
      <ScrollProgressBar />
      
      {/* Barra de Urgência */}
      <div className="bg-juvelina-gold text-white py-2 text-center sticky top-0 z-50">
        <p className="text-sm md:text-base px-4">
          🔥 OFERTA ESPECIAL: 30% OFF + Frete Grátis | 
          ⏰ {String(timer.hours).padStart(2, '0')}:
          {String(timer.minutes).padStart(2, '0')}:
          {String(timer.seconds).padStart(2, '0')} | 
          📦 Apenas 54 unidades!
        </p>
      </div>

      {/* Header */}
      <header className={`bg-white sticky top-10 z-40 transition-shadow ${
        scrollPosition > 50 ? 'shadow-md' : 'shadow-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="text-juvelina-gold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="font-['Ws_Paradose'] text-2xl text-juvelina-gold">Juvelina</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-6 items-center">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-600 hover:text-juvelina-gold transition font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setShowIngredients(true)}
                className="text-gray-600 hover:text-juvelina-gold transition font-medium"
              >
                Ingredientes
              </button>
              <button
                onClick={handleCtaClick}
                className="bg-juvelina-gold text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Comprar
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-2 text-gray-600 hover:text-juvelina-gold transition"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowIngredients(true)}
                  className="text-left py-2 text-gray-600 hover:text-juvelina-gold transition"
                >
                  Ingredientes
                </button>
                <button
                  onClick={handleCtaClick}
                  className="bg-juvelina-gold text-white px-6 py-3 rounded-full w-full mt-2"
                >
                  Comprar Agora
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection onCtaClick={handleCtaClick} />
        
        {/* Video Testimonials - Logo após Hero */}
        <VideoTestimonialsSection />
        
        {/* Benefits Section */}
        <Suspense fallback={<LoadingSection />}>
          <BenefitsSection />
        </Suspense>
        
        {/* Absorption Section */}
        <Suspense fallback={<LoadingSection />}>
          <AbsorptionSection />
        </Suspense>
        
        {/* UGC Gallery */}
        <Suspense fallback={<LoadingSection />}>
          <UGCGallerySection />
        </Suspense>
        
        {/* Guarantee Section */}
        <Suspense fallback={<LoadingSection />}>
          <GuaranteeSection />
        </Suspense>
        
        {/* Viral Offer */}
        <Suspense fallback={<LoadingSection />}>
          <ViralOfferSection onCtaClick={handleCtaClick} />
        </Suspense>
        
        {/* Pricing Section */}
        <Suspense fallback={<LoadingSection />}>
          <PricingSection onCtaClick={handleCtaClick} />
        </Suspense>
        
        {/* FAQ */}
        <Suspense fallback={<LoadingSection />}>
          <FaqSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <Suspense fallback={null}>
        {showModal && (
          <PurchaseModal 
            isOpen={showModal} 
            onClose={closeModal}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {showIngredients && (
          <IngredientsList onClose={() => setShowIngredients(false)} />
        )}
      </Suspense>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-5 w-12 h-12 bg-juvelina-gold text-white rounded-full shadow-lg flex items-center justify-center z-40"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;