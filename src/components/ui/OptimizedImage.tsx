// src/components/ui/OptimizedImage.tsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { PerformanceContext } from '../../App';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: 'low' | 'medium' | 'high';
  placeholder?: string;
  aspectRatio?: string; // Ex: "16/9", "4/3", "1/1"
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 'medium',
  placeholder,
  aspectRatio = '16/9'
}) => {
  const [isInView, setIsInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowEnd } = useContext(PerformanceContext);

  // Intersection Observer para lazy loading real
  useEffect(() => {
    // Se for prioridade, carregar imediatamente
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        // Margem maior em desktop, menor em mobile para economizar dados
        rootMargin: isMobile ? '50px' : '200px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority, isMobile]);

  // Gerar URL otimizada baseada no dispositivo
  const getOptimizedSrc = () => {
    // Se for uma URL do Unsplash, adicionar parâmetros de otimização
    if (src.includes('unsplash.com')) {
      const qualitySettings = {
        low: { q: 50, w: isMobile ? 400 : 600 },
        medium: { q: 70, w: isMobile ? 600 : 800 },
        high: { q: 85, w: isMobile ? 800 : 1200 }
      };
      
      const settings = isLowEnd ? qualitySettings.low : qualitySettings[quality];
      const params = new URLSearchParams({
        q: settings.q.toString(),
        w: settings.w.toString(),
        fm: 'webp',
        fit: 'crop',
        auto: 'compress'
      });
      
      // Remover parâmetros existentes e adicionar os novos
      const baseUrl = src.split('?')[0];
      return `${baseUrl}?${params.toString()}`;
    }
    
    // Para outras imagens, retornar como está
    return src;
  };

  // Gerar placeholder de baixa qualidade
  const getLowQualityPlaceholder = () => {
    if (placeholder) return placeholder;
    
    // Para Unsplash, gerar um placeholder tiny
    if (src.includes('unsplash.com')) {
      const baseUrl = src.split('?')[0];
      return `${baseUrl}?q=10&w=50&blur=10`;
    }
    
    return '';
  };

  // Calcular aspect ratio para manter espaço
  const getAspectRatioPadding = () => {
    const [width, height] = aspectRatio.split('/').map(Number);
    return `${(height / width) * 100}%`;
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{
        paddingBottom: height ? undefined : getAspectRatioPadding(),
        height: height ? `${height}px` : undefined,
        width: width ? `${width}px` : undefined
      }}
    >
      {/* Placeholder de baixa qualidade */}
      {!loaded && getLowQualityPlaceholder() && (
        <img
          src={getLowQualityPlaceholder()}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Skeleton loader se não tiver placeholder */}
      {!loaded && !getLowQualityPlaceholder() && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Imagem real só carrega quando visível */}
      {isInView && !error && (
        <img
          src={getOptimizedSrc()}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          // Importante para performance em mobile
          importance={priority ? "high" : "low"}
        />
      )}
      
      {/* Fallback em caso de erro */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="text-center p-4">
            <svg 
              className="w-12 h-12 mx-auto text-gray-400 mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-sm text-gray-500">Erro ao carregar imagem</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;