// src/App.tsx
import React, { useState, useEffect, lazy, Suspense, createContext, useMemo } from 'react';
import { useScrollPosition } from './hooks/ui/useScrollPosition';
import { useModalState } from './hooks/ui/useModalState';

// Componentes principais (não fazer lazy load)
import AnnouncementBar from './components/common/AnnouncementBar';
import Header from './components/common/Header';
import PurchaseModal from './components/common/PurchaseModal';
import HeroSection from './features/hero';
import LoadingSection from './components/ui/LoadingSection';
import ScrollToTop from './components/ui/ScrollToTop';
import CreatorBadge from './components/ui/CreatorBadge';

// Lazy loading otimizado com prefetch
const VideoTestimonialsSection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/testimonials/VideoTestimonialsSection')
);
const BenefitsSection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/benefits/BenefitsSection')
);
const IngredientsSection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/ingredients/IngredientsSection')
);
const AbsorptionSection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/benefits/AbsorptionSection')
);
const UGCGallerySection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/testimonials/UGCGallerySection')
);
const GuaranteeSection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/testimonials/GuaranteeSection')
);
const ViralOfferSection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/product/ViralOfferSection')
);
const PricingSection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/product/PricingSection')
);
const FaqSection = lazy(() => 
  import(/* webpackPrefetch: true */ './features/testimonials/FaqSection')
);
const Footer = lazy(() => 
  import(/* webpackPrefetch: true */ './components/product/Footer')
);

// Context para performance
export const PerformanceContext = createContext({
  isMobile: false,
  isTablet: false,
  reduceMotion: false,
  isLowEnd: false
});

function App() {
  const { showScrollTop } = useScrollPosition();
  const { showModal, modalVariant, openModal, closeModal } = useModalState();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [loadedSections, setLoadedSections] = useState(new Set(['hero']));

  // Detectar capacidades do dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Detectar dispositivo low-end
      const isLowEndDevice = 
        navigator.hardwareConcurrency <= 4 || // Poucos cores
        navigator.deviceMemory <= 4 || // Pouca RAM
        /Android.*(Mobile|Tablet)|iPhone|iPad|iPod/.test(navigator.userAgent);
      
      setIsLowEnd(isLowEndDevice);
      
      // Reduzir animações em mobile ou dispositivos fracos
      if (mobile || isLowEndDevice) {
        setReduceMotion(true);
        document.body.classList.add('reduce-motion');
      }
      
      // Respeitar preferência do usuário
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setReduceMotion(true);
        document.body.classList.add('reduce-motion');
      }
    };
    
    checkDevice();
    
    // Debounce resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkDevice, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Pré-carregar seções próximas
  useEffect(() => {
    const observerOptions = {
      rootMargin: isMobile ? '100px' : '200px',
      threshold: 0.01
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && !loadedSections.has(sectionId)) {
            setLoadedSections(prev => new Set([...prev, sectionId]));
          }
        }
      });
    }, observerOptions);

    // Observar todas as seções
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => sectionObserver.observe(section));

    return () => sectionObserver.disconnect();
  }, [loadedSections, isMobile]);

  const handleCtaClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    openModal('default');
  };

  // Memorizar contexto
  const performanceValue = useMemo(() => ({
    isMobile,
    isTablet,
    reduceMotion,
    isLowEnd
  }), [isMobile, isTablet, reduceMotion, isLowEnd]);

  return (
    <PerformanceContext.Provider value={performanceValue}>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <AnnouncementBar />
        <Header onCtaClick={handleCtaClick} />
        
        {/* Hero Section - Sempre visível */}
        <HeroSection onCtaClick={handleCtaClick} />
        
        {/* Seções com lazy loading inteligente */}
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('video-depoimentos') || !isMobile) && (
            <VideoTestimonialsSection onCtaClick={handleCtaClick} />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('beneficios') || !isMobile) && (
            <BenefitsSection />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('ingredientes') || !isMobile) && (
            <IngredientsSection />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('absorpcao') || !isMobile) && (
            <AbsorptionSection />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('ugc-gallery') || !isMobile) && (
            <UGCGallerySection />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('garantia') || !isMobile) && (
            <GuaranteeSection />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('oferta') || !isMobile) && (
            <ViralOfferSection onCtaClick={handleCtaClick} />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('planos') || !isMobile) && (
            <PricingSection onCtaClick={handleCtaClick} />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          {(loadedSections.has('faq') || !isMobile) && (
            <FaqSection />
          )}
        </Suspense>
        
        <Suspense fallback={<LoadingSection />}>
          <Footer />
        </Suspense>
        
        {/* Componentes flutuantes */}
        {!isMobile && <CreatorBadge />}
        <PurchaseModal 
          isOpen={showModal} 
          onClose={closeModal} 
          variant={modalVariant}
        />
        {showScrollTop && <ScrollToTop />}
      </div>
    </PerformanceContext.Provider>
  );
}

export default App;