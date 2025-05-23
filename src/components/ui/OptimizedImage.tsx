// src/components/ui/OptimizedImage.tsx
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false
}) => {
  const [loaded, setLoaded] = useState(false);

  // Determine if WebP version exists
  const srcWebP = src.replace(/\.(jpe?g|png)$/i, '.webp');

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      <picture>
        <source srcSet={srcWebP} type="image/webp" />
        <source srcSet={src} type={`image/${src.split('.').pop()}`} />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;