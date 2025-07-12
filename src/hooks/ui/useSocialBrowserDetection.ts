// src/hooks/ui/useSocialBrowserDetection.ts
import { useEffect, useState } from 'react';

export interface SocialBrowserInfo {
  isInAppBrowser: boolean;
  isInstagram: boolean;
  isTikTok: boolean;
  isYouTube: boolean;
  isPinterest: boolean;
  isTwitter: boolean;
  isFacebook: boolean;
  isLinkedIn: boolean;
  isSnapchat: boolean;
  isWhatsApp: boolean;
  browserName: string;
  safeAreaTop: number;
  safeAreaBottom: number;
}

const useSocialBrowserDetection = (): SocialBrowserInfo => {
  const [browserInfo, setBrowserInfo] = useState<SocialBrowserInfo>({
    isInAppBrowser: false,
    isInstagram: false,
    isTikTok: false,
    isYouTube: false,
    isPinterest: false,
    isTwitter: false,
    isFacebook: false,
    isLinkedIn: false,
    isSnapchat: false,
    isWhatsApp: false,
    browserName: 'unknown',
    safeAreaTop: 60,
    safeAreaBottom: 80,
  });

  useEffect(() => {
    const detectBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Detectar cada rede social
      const isInstagram = /instagram/.test(userAgent);
      const isTikTok = /tiktok/.test(userAgent) || /musically/.test(userAgent);
      const isYouTube = /youtube/.test(userAgent);
      const isPinterest = /pinterest/.test(userAgent);
      const isTwitter = /twitter/.test(userAgent);
      const isFacebook = /facebook/.test(userAgent) || /fbav/.test(userAgent);
      const isLinkedIn = /linkedin/.test(userAgent);
      const isSnapchat = /snapchat/.test(userAgent);
      const isWhatsApp = /whatsapp/.test(userAgent);
      
      const isInAppBrowser = isInstagram || isTikTok || isYouTube || isPinterest || 
                            isTwitter || isFacebook || isLinkedIn || isSnapchat || isWhatsApp;
      
      // Determinar nome do navegador
      let browserName = 'unknown';
      let safeAreaTop = 60;
      let safeAreaBottom = 80;
      
      if (isInstagram) {
        browserName = 'instagram';
        safeAreaTop = 88;
        safeAreaBottom = 120;
      } else if (isTikTok) {
        browserName = 'tiktok';
        safeAreaTop = 90;
        safeAreaBottom = 110;
      } else if (isYouTube) {
        browserName = 'youtube';
        safeAreaTop = 85;
        safeAreaBottom = 95;
      } else if (isPinterest) {
        browserName = 'pinterest';
        safeAreaTop = 85;
        safeAreaBottom = 100;
      } else if (isTwitter) {
        browserName = 'twitter';
        safeAreaTop = 80;
        safeAreaBottom = 90;
      } else if (isFacebook) {
        browserName = 'facebook';
        safeAreaTop = 85;
        safeAreaBottom = 105;
      } else if (isLinkedIn) {
        browserName = 'linkedin';
        safeAreaTop = 85;
        safeAreaBottom = 95;
      } else if (isSnapchat) {
        browserName = 'snapchat';
        safeAreaTop = 90;
        safeAreaBottom = 110;
      } else if (isWhatsApp) {
        browserName = 'whatsapp';
        safeAreaTop = 80;
        safeAreaBottom = 90;
      }
      
      // Ajustar para orientação landscape
      if (window.innerHeight < window.innerWidth) {
        safeAreaTop = Math.max(safeAreaTop - 20, 40);
        safeAreaBottom = Math.max(safeAreaBottom - 20, 60);
      }
      
      // Ajustar para tamanhos de tela específicos
      if (window.innerHeight <= 667) { // iPhone SE e similares
        safeAreaTop = Math.min(safeAreaTop + 10, safeAreaTop);
        safeAreaBottom = Math.min(safeAreaBottom, 80);
      } else if (window.innerHeight >= 844) { // iPhone Pro Max e similares
        safeAreaTop = Math.max(safeAreaTop, 90);
        safeAreaBottom = Math.max(safeAreaBottom, 110);
      }
      
      setBrowserInfo({
        isInAppBrowser,
        isInstagram,
        isTikTok,
        isYouTube,
        isPinterest,
        isTwitter,
        isFacebook,
        isLinkedIn,
        isSnapchat,
        isWhatsApp,
        browserName,
        safeAreaTop,
        safeAreaBottom,
      });
    };
    
    detectBrowser();
    
    // Re-detectar em mudanças de orientação
    const handleOrientationChange = () => {
      setTimeout(detectBrowser, 100); // Delay para aguardar mudança de dimensões
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return browserInfo;
};

export default useSocialBrowserDetection;