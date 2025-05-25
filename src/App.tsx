// src/App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/index.css';

// Componentes essenciais (não lazy) - Hero e Header devem carregar imediatamente
import { AnnouncementBar, Header, PurchaseModal } from './components/common';
import HeroSection from './features/hero';
import LoadingSection from './components/ui/LoadingSection';
import ScrollToTop from './components/ui/ScrollToTop';
import CreatorBadge from './components/ui/CreatorBadge';
import { useScrollPosition } from './hooks/ui/useScrollPosition';
import { useModalState } from './hooks/ui/useModalState';
import { usePerformanceOptimization } from './hooks/ui/usePerformanceOptimization';

// LAZY LOADING COM WEBPACKCHUNKNAME PARA NOMEAR OS CHUNKS
const VideoTestimonialsSection = lazy(() => 
  import(/* webpackChunkName: "video-testimonials" */ './features/testimonials/VideoTestimonialsSection')
);

const BenefitsSection = lazy(() => 
  import(/* webpackChunkName: "benefits" */ './features/benefits/BenefitsSection')
);

const IngredientsSection = lazy(() => 
  import(/* webpackChunkName: "ingredients" */ './features/ingredients/IngredientsSection')
);

const AbsorptionSection = lazy(() => 
  import(/* webpackChunkName: "absorption" */ './features/benefits/AbsorptionSection')
);

const UGCGallerySection = lazy(() => 
  import(/* webpackChunkName: "ugc-gallery" */ './features/testimonials/UGCGallerySection')
);

const GuaranteeSection = lazy(() => 
  import(/* webpackChunkName: "guarantee" */ './features/testimonials/GuaranteeSection')
);

const PricingSection = lazy(() => 
  import(/* webpackChunkName: "pricing" */ './features/product/PricingSection')
);

const ViralOfferSection = lazy(() => 
  import(/* webpackChunkName: "viral-offer" */ './features/product/ViralOfferSection')
);

const FaqSection = lazy(() => 
  import(/* webpackChunkName: "faq" */ './features/testimonials/FaqSection')
);

const Footer = lazy(() => 
  import(/* webpackChunkName: "footer" */ './components/product/Footer')
);

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
  isLowPerformance?: boolean;
}

export const PerformanceContext = createContext<PerformanceContextType>({
  isMobile: false,
  isTablet: false,
  isLowEnd: false,
  reduceMotion: false,
  isLowPerformance: false,
});

// Componente de fallback customizado
const SectionLoader: React.FC<{ section?: string }> = ({ section = "conteúdo" }) => (
  <div className="py-20 flex flex-col items-center justify-center bg-gradient-to-b from-white to-juvelina-mint/5">
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-juvelina-gold" />
      <div className="absolute inset-0 rounded-full h-12 w-12 border-t-2 border-b-2 border-juvelina-gold/20" />
    </div>
    <p className="mt-4 text-gray-600 text-sm">Carregando {section}...</p>
  </div>
);

function App() {
  const { showScrollTop } = useScrollPosition();
  const { showModal, modalVariant, openModal, closeModal } = useModalState();
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);
  const [performanceSettings, setPerformanceSettings] = useState<PerformanceContextType>({
    isMobile: false,
    isTablet: false,
    isLowEnd: false,
    reduceMotion: false,
    isLowPerformance: false,
  });

  // Hook de otimização de performance
  const { isLowPerformance, pauseNonEssentialAnimations, resumeAnimations } = usePerformanceOptimization({
    threshold: 45, // FPS mínimo aceitável
    onLowPerformance: () => {
      console.log('Performance baixa detectada, reduzindo animações');
    },
    onHighPerformance: () => {
      console.log('Performance normalizada');
    }
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
        isLowPerformance,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, [isLowPerformance]);

  // Otimizar scroll
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;
    let isScrolling = false;
    
    const handleScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('scrolling');
        
        // Pausar animações não essenciais durante scroll
        if (performanceSettings.isLowEnd || isLowPerformance) {
          pauseNonEssentialAnimations();
        }
      }
      
      // Reset timer
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('scrolling');
        
        // Retomar animações
        if (performanceSettings.isLowEnd || isLowPerformance) {
          resumeAnimations();
        }
      }, 150);
    };
    
    window.addEventListener('scroll', handleScrollStart, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollStart);
      clearTimeout(scrollTimer);
    };
  }, [performanceSettings.isLowEnd, isLowPerformance, pauseNonEssentialAnimations, resumeAnimations]);

  // Context value otimizado com useMemo
  const performanceContextValue = useMemo(() => ({
    ...performanceSettings,
    isLowPerformance
  }), [performanceSettings, isLowPerformance]);

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

  // Prefetch de componentes críticos quando idle
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(() => {
        // Prefetch dos componentes mais importantes
        import(/* webpackChunkName: "video-testimonials" */ './features/testimonials/VideoTestimonialsSection');
        import(/* webpackChunkName: "benefits" */ './features/benefits/BenefitsSection');
      });

      return () => {
        if ('cancelIdleCallback' in window) {
          cancelIdleCallback(idleCallbackId);
        }
      };
    }
  }, []);

  return (
    <PerformanceContext.Provider value={performanceContextValue}>
      <div className="min-h-screen bg-white overflow-x-hidden optimized-scroll">
        <AnnouncementBar />
        <Header onCtaClick={handleCtaClick} />
        
        {/* Seções principais */}
        <main>
          {/* Hero Section - Sempre carregada imediatamente */}
          <HeroSection onCtaClick={handleCtaClick} />
          
          {/* VideoTestimonialsSection - Segunda mais importante */}
          <Suspense fallback={<SectionLoader section="depoimentos em vídeo" />}>
            <VideoTestimonialsSection onCtaClick={handleCtaClick} />
          </Suspense>
          
          {/* Benefits Section */}
          <Suspense fallback={<SectionLoader section="benefícios" />}>
            <BenefitsSection />
          </Suspense>
          
          {/* Ingredients Section */}
          <Suspense fallback={<SectionLoader section="ingredientes" />}>
            <IngredientsSection />
          </Suspense>
          
          {/* Absorption Section */}
          <Suspense fallback={<SectionLoader section="tecnologia de absorção" />}>
            <AbsorptionSection />
          </Suspense>
          
          {/* UGC Gallery */}
          <Suspense fallback={<SectionLoader section="galeria de clientes" />}>
            <UGCGallerySection />
          </Suspense>
          
          {/* Guarantee Section */}
          <Suspense fallback={<SectionLoader section="garantia" />}>
            <GuaranteeSection />
          </Suspense>
          
          {/* Pricing Section */}
          <Suspense fallback={<SectionLoader section="planos e preços" />}>
            <PricingSection onCtaClick={handleCtaClick} />
          </Suspense>
          
          {/* Viral Offer Section */}
          <Suspense fallback={<SectionLoader section="oferta especial" />}>
            <ViralOfferSection onCtaClick={handleCtaClick} />
          </Suspense>
          
          {/* FAQ Section */}
          <Suspense fallback={<SectionLoader section="perguntas frequentes" />}>
            <FaqSection />
          </Suspense>
          
          {/* Footer */}
          <Suspense fallback={<SectionLoader section="rodapé" />}>
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
        
        {/* Scroll to top button */}
        <ScrollToTop show={showScrollTop} />
        
        {/* Creator Badge - apenas desktop e não low-end */}
        {!performanceSettings.isMobile && !performanceSettings.isLowEnd && !isLowPerformance && <CreatorBadge />}
      </div>
    </PerformanceContext.Provider>
  );
}

export default App;