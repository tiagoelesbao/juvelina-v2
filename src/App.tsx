// src/App.tsx
import React, { useState, useEffect, createContext, Suspense, lazy, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/index.css';
import { 
  prefetchCriticalResources, 
  addResourceHints, 
  registerServiceWorker,
  monitorPerformanceBudget 
} from './utils/performance';

// Componentes essenciais (não lazy) - Hero e Header devem carregar imediatamente
import { AnnouncementBar, Header, PurchaseModal } from './components/common';
import SocialBrowserBanner from './components/common/SocialBrowserBanner';
import HeroSection from './features/hero';
import LoadingSection from './components/ui/LoadingSection';
import ScrollToTop from './components/ui/ScrollToTop';
import CreatorBadge from './components/ui/CreatorBadge';
import { useScrollPosition } from './hooks/ui/useScrollPosition';
import { useModalState } from './hooks/ui/useModalState';
import { usePerformanceOptimization } from './hooks/ui/usePerformanceOptimization';

// LAZY LOADING SIMPLIFICADO PARA VITE
const VideoTestimonialsSection = lazy(() => import('./features/testimonials/VideoTestimonialsSection'));
const BenefitsSection = lazy(() => import('./features/benefits/BenefitsSection'));
const IngredientsSection = lazy(() => import('./features/ingredients/IngredientsSection'));
const AbsorptionSection = lazy(() => import('./features/benefits/AbsorptionSection'));
const UGCGallerySection = lazy(() => import('./features/testimonials/UGCGallerySection'));
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
  hardwareConcurrency: number;
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
  <div className="py-20 flex flex-col items-center justify-center bg-gradient-to-b from-white to-juvelina-mint/5 min-h-[200px]">
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-juvelina-gold" />
      <div className="absolute inset-0 rounded-full h-12 w-12 border-t-2 border-b-2 border-juvelina-gold/20" />
    </div>
    <p className="mt-4 text-gray-600 text-sm">Carregando {section}...</p>
  </div>
);

// ErrorBoundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="py-20 text-center">
          <p className="text-red-600">Erro ao carregar o componente.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-juvelina-gold text-white rounded"
          >
            Recarregar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { showScrollTop } = useScrollPosition();
  const { showModal, modalVariant, openModal, closeModal } = useModalState();
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState<string>('energia');
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

  // Detectar capacidades do dispositivo e inicializar otimizações
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
        isLowEnd: !!isLowEnd,
        reduceMotion,
        isLowPerformance,
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    // Inicializar otimizações de performance
    addResourceHints();
    prefetchCriticalResources();
    registerServiceWorker();
    monitorPerformanceBudget();
    
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
        import('./features/testimonials/VideoTestimonialsSection').catch(console.error);
        import('./features/benefits/BenefitsSection').catch(console.error);
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
        <SocialBrowserBanner />
        <AnnouncementBar />
        <Header onCtaClick={handleCtaClick} />
        
        {/* Seções principais */}
        <main>
          {/* Hero Section - Sempre carregada imediatamente */}
          <HeroSection onCtaClick={handleCtaClick} />
          
          {/* VideoTestimonialsSection - Segunda mais importante */}
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader section="depoimentos em vídeo" />}>
              <VideoTestimonialsSection onCtaClick={handleCtaClick} />
            </Suspense>
          </ErrorBoundary>
          
          {/* Benefits Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader section="benefícios" />}>
              <BenefitsSection onBenefitChange={setActiveBenefit} />
            </Suspense>
          </ErrorBoundary>
          
          {/* Ingredients Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader section="ingredientes" />}>
              <IngredientsSection highlightBenefit={activeBenefit} />
            </Suspense>
          </ErrorBoundary>
          
          {/* Absorption Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader section="tecnologia de absorção" />}>
              <AbsorptionSection />
            </Suspense>
          </ErrorBoundary>
          
          {/* UGC Gallery */}
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader section="galeria de clientes" />}>
              <UGCGallerySection />
            </Suspense>
          </ErrorBoundary>
          
          {/* Viral Offer Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader section="oferta especial" />}>
              <ViralOfferSection onCtaClick={handleCtaClick} />
            </Suspense>
          </ErrorBoundary>
          
          {/* FAQ Section */}
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader section="perguntas frequentes" />}>
              <FaqSection />
            </Suspense>
          </ErrorBoundary>
          
          {/* Footer */}
          <ErrorBoundary>
            <Suspense fallback={<SectionLoader section="rodapé" />}>
              <Footer />
            </Suspense>
          </ErrorBoundary>
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