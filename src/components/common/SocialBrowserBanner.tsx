// src/components/common/SocialBrowserBanner.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import useSocialBrowserDetection from '../../hooks/ui/useSocialBrowserDetection';

const SocialBrowserBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const socialBrowser = useSocialBrowserDetection();

  // Não mostrar o banner se não for um navegador in-app
  if (!socialBrowser.isInAppBrowser || !isVisible) {
    return null;
  }

  const getBrowserName = () => {
    if (socialBrowser.isInstagram) return 'Instagram';
    if (socialBrowser.isTikTok) return 'TikTok';
    if (socialBrowser.isYouTube) return 'YouTube';
    if (socialBrowser.isPinterest) return 'Pinterest';
    if (socialBrowser.isTwitter) return 'Twitter/X';
    if (socialBrowser.isFacebook) return 'Facebook';
    if (socialBrowser.isLinkedIn) return 'LinkedIn';
    if (socialBrowser.isSnapchat) return 'Snapchat';
    if (socialBrowser.isWhatsApp) return 'WhatsApp';
    return 'rede social';
  };

  const openInBrowser = () => {
    const currentUrl = window.location.href;
    
    // Copiar URL para clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
    }
    
    // Tentar abrir no navegador padrão (funciona em alguns casos)
    window.open(currentUrl, '_system');
    
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[100000] bg-gradient-to-r from-juvelina-gold to-juvelina-gold/90 text-white shadow-lg"
          style={{
            paddingTop: `${Math.max(socialBrowser.safeAreaTop - 20, 20)}px`,
            paddingBottom: '8px',
          }}
        >
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <ExternalLink size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Melhor experiência no navegador
                </p>
                <p className="text-xs text-white/90">
                  Abra no Safari ou Chrome para funcionalidade completa
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={openInBrowser}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              >
                Abrir
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Fechar banner"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialBrowserBanner;