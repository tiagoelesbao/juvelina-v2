// src/App.tsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Importações de componentes comuns
import { 
  AnnouncementBar, 
  Header, 
  PurchaseModal 
} from './components/common';

// Importações de componentes UI
import { ScrollProgressBar } from './components/ui';

// Importações de hooks customizados
import { useModalState } from './hooks/ui/useModalState';
import { useScrollPosition } from './hooks/ui/useScrollPosition';

// Importações das seções - sem lazy loading para evitar efeito de carregamento
import HeroSection from './features/hero';
import VideoTestimonialsSection from './features/testimonials/VideoTestimonialsSection';
import BenefitsSection from './features/benefits/BenefitsSection';
import AbsorptionSection from './features/benefits/AbsorptionSection';
import UGCGallerySection from './features/testimonials/UGCGallerySection';
import GuaranteeSection from './features/testimonials/GuaranteeSection';
import PricingSection from './features/product/PricingSection';
import ViralOfferSection from './features/product/ViralOfferSection';
import FaqSection from './features/testimonials/FaqSection';
import Footer from './components/product/Footer';

// Componente de Scroll to Top
import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ScrollToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      className="fixed bottom-8 right-8 z-40 bg-juvelina-gold text-white p-3 rounded-full shadow-lg hover:bg-juvelina-gold/90 transition-colors group"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label="Voltar ao topo"
    >
      <ChevronUp 
        size={24} 
        className="group-hover:-translate-y-1 transition-transform duration-200"
      />
      
      {/* Efeito de pulso */}
      <motion.div
        className="absolute inset-0 rounded-full bg-juvelina-gold"
        animate={{
          scale: [1, 1.5, 1.5],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </motion.button>
  );
};

// Seção de Ingredientes temporária até criar o arquivo separado
const IngredientsSection: React.FC = () => {
  const [showIngredientsList, setShowIngredientsList] = useState(false);
  
  return (
    <section id="ingredientes" className="py-20 bg-gradient-to-b from-white to-juvelina-mint/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-juvelina-mint/30 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4">
            Fórmula Exclusiva
          </span>
          <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black">
            25 Nutrientes Premium em <span className="text-juvelina-gold">Perfeita Sinergia</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cada ingrediente foi cuidadosamente selecionado para trabalhar em harmonia.
          </p>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => setShowIngredientsList(true)}
            className="inline-flex items-center gap-2 bg-white border-2 border-juvelina-gold text-juvelina-gold px-6 py-3 rounded-full hover:bg-juvelina-gold hover:text-white transition-all font-medium"
          >
            Ver Composição Completa
          </button>
        </div>
      </div>
      
      {/* Modal com lista de ingredientes */}
      {showIngredientsList && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowIngredientsList(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Composição Completa</h3>
              <button 
                onClick={() => setShowIngredientsList(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <p className="text-center text-gray-600">
              Lista completa de ingredientes disponível em breve.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

function App() {
  const { showModal, modalVariant, openModal, closeModal } = useModalState();
  const { showScrollTop } = useScrollPosition();
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);

  // Handler para CTA clicks
  const handleCtaClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    openModal('default');
  };

  // Exit Intent Detection
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Detecta saída pela parte superior da tela
      if (e.clientY <= 10 && !exitIntentTriggered && !showModal) {
        setExitIntentTriggered(true);
        
        // Pequeno delay para evitar triggers acidentais
        timeoutId = setTimeout(() => {
          openModal('exit-intent');
        }, 100);
      }
    };
    
    // Também detectar quando o mouse está próximo ao topo
    const handleMouseMove = (e: MouseEvent) => {
      // Se o mouse estiver muito próximo ao topo e movendo-se para cima
      if (e.clientY <= 50 && e.movementY < 0 && !exitIntentTriggered && !showModal) {
        setExitIntentTriggered(true);
        openModal('exit-intent');
      }
    };
    
    // Adicionar listeners
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [exitIntentTriggered, showModal, openModal]);

  // Time-based modal trigger - após 90 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showModal && !exitIntentTriggered) {
        openModal('time-based');
      }
    }, 90000); // 90 segundos
    
    return () => clearTimeout(timer);
  }, [showModal, exitIntentTriggered, openModal]);

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de Progresso do Scroll */}
      <ScrollProgressBar 
        color="#A9683D" 
        height={3} 
        showPercentage={false}
        position="top"
      />
      
      {/* Barra de Anúncio */}
      <AnnouncementBar 
        initialUnits={54} 
        discountPercentage={30}
      />
      
      {/* Header Principal */}
      <Header onCtaClick={handleCtaClick} />
      
      {/* Hero Section */}
      <HeroSection onCtaClick={handleCtaClick} />
      
      {/* Seção de Depoimentos em Vídeo */}
      <VideoTestimonialsSection onCtaClick={handleCtaClick} />
      
      {/* Seção de Benefícios */}
      <BenefitsSection />
      
      {/* Seção de Ingredientes */}
      <IngredientsSection />
      
      {/* Seção de Absorção */}
      <AbsorptionSection />
      
      {/* Galeria de UGC */}
      <UGCGallerySection />
      
      {/* Seção de Garantia */}
      <GuaranteeSection />
      
      {/* Seção de Preços */}
      <PricingSection onCtaClick={handleCtaClick} />
      
      {/* Seção de Oferta Viral */}
      <ViralOfferSection onCtaClick={handleCtaClick} />
      
      {/* FAQ */}
      <FaqSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Modal de Compra */}
      <AnimatePresence>
        {showModal && (
          <PurchaseModal 
            isOpen={showModal} 
            onClose={closeModal}
            variant={modalVariant}
            personalizedTitle={
              modalVariant === 'exit-intent' 
                ? "Espere! Temos uma Oferta Especial"
                : modalVariant === 'time-based'
                ? "Oferta por Tempo Limitado!"
                : undefined
            }
          />
        )}
      </AnimatePresence>
      
      {/* Botão Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && <ScrollToTop />}
      </AnimatePresence>

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}

export default App;
