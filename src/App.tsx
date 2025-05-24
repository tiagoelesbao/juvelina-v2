// src/App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/index.css';

// Componentes essenciais (não lazy)
import { AnnouncementBar, Header, PurchaseModal } from './components/common';
import HeroSection from './features/hero';
import LoadingSection from './components/ui/LoadingSection';
import ScrollToTop from './components/ui/ScrollToTop';
import CreatorBadge from './components/ui/CreatorBadge';
import { useScrollPosition } from './hooks/ui/useScrollPosition';
import { useModalState } from './hooks/ui/useModalState';

// Lazy loading de seções não críticas
const VideoTestimonialsSection = lazy(() => import('./features/testimonials/VideoTestimonialsSection'));
const BenefitsSection = lazy(() => import('./features/benefits/BenefitsSection'));
const IngredientsSection = lazy(() => import('./features/ingredients/IngredientsSection'));
const AbsorptionSection = lazy(() => import('./features/benefits/AbsorptionSection'));
const UGCGallerySection = lazy(() => import('./features/testimonials/UGCGallerySection'));
const GuaranteeSection = lazy(() => import('./features/testimonials/GuaranteeSection'));
const PricingSection = lazy(() => import('./features/product/PricingSection'));
const ViralOfferSection = lazy(() => import('./features/product/ViralOfferSection'));
const FaqSection = lazy(() => import('./features/testimonials/FaqSection'));
const Footer = lazy(() => import('./components/product/Footer'));

// Tipo estendido para Navigator com deviceMemory
interface NavigatorExtended extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
}

// Context para otimizações de performance
interface PerformanceContextType {
  isMobile: boolean;
  isTablet: boolean;
  isLowEnd: boolean;
  reduceMotion: boolean;
}

export const PerformanceContext = createContext<PerformanceContextType>({
  isMobile: false,
  isTablet: false,
  isLowEnd: false,
  reduceMotion: false,
});

function App() {
  const { showScrollTop } = useScrollPosition();
  const { showModal, modalVariant, openModal, closeModal } = useModalState();
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);
  const [performanceSettings, setPerformanceSettings] = useState<PerformanceContextType>({
    isMobile: false,
    isTablet: false,
    isLowEnd: false,
    reduceMotion: false,
  });

  // Detectar capacidades do dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      
      // Verificar se é dispositivo low-end
      const nav = navigator as NavigatorExtended;
      const isLowEnd = 
        (nav.deviceMemory !== undefined && nav.deviceMemory < 4) ||
        (nav.connection?.effectiveType === '2g' || nav.connection?.effectiveType === 'slow-2g') ||
        (nav.connection?.saveData === true) ||
        (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4);
      
      // Verificar preferência de reduced motion
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setPerformanceSettings({
        isMobile,
        isTablet,
        isLowEnd: Boolean(isLowEnd),
        reduceMotion,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handler para CTA
  const handleCtaClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    openModal('default');
  };

  // Exit Intent Detection (apenas desktop)
  useEffect(() => {
    if (performanceSettings.isMobile || performanceSettings.isTablet) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered && !showModal) {
        setExitIntentTriggered(true);
        openModal('exit-intent');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitIntentTriggered, showModal, openModal, performanceSettings.isMobile, performanceSettings.isTablet]);

  // Time-based modal (30 segundos) - apenas desktop
  useEffect(() => {
    if (performanceSettings.isMobile || performanceSettings.isLowEnd) return;

    const timer = setTimeout(() => {
      if (!showModal && !exitIntentTriggered) {
        openModal('time-based');
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [showModal, exitIntentTriggered, openModal, performanceSettings.isMobile, performanceSettings.isLowEnd]);

  return (
    <PerformanceContext.Provider value={performanceSettings}>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <AnnouncementBar />
        <Header onCtaClick={handleCtaClick} />
        
        {/* Seções principais */}
        <main>
          <HeroSection onCtaClick={handleCtaClick} />
          
          {/* Lazy loaded sections com fallback */}
          <Suspense fallback={<LoadingSection />}>
            <VideoTestimonialsSection onCtaClick={handleCtaClick} />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <BenefitsSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <IngredientsSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <AbsorptionSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <UGCGallerySection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <GuaranteeSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <PricingSection onCtaClick={handleCtaClick} />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <ViralOfferSection onCtaClick={handleCtaClick} />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <FaqSection />
          </Suspense>
          
          <Suspense fallback={<LoadingSection />}>
            <Footer />
          </Suspense>
        </main>
        
        {/* Modais e componentes flutuantes */}
        <AnimatePresence>
          {showModal && (
            <PurchaseModal
              isOpen={showModal}
              onClose={closeModal}
              variant={modalVariant}
            />
          )}
        </AnimatePresence>
        
        {/* Scroll to top button - CORRIGIDO */}
        <ScrollToTop show={showScrollTop} />
        
        {/* Creator Badge - apenas desktop */}
        {!performanceSettings.isMobile && !performanceSettings.isLowEnd && <CreatorBadge />}
      </div>
    </PerformanceContext.Provider>
  );
}

export default App;