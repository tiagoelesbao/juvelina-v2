// src/components/ui/WaveTransition.tsx (novo componente)
import React from 'react';

interface WaveTransitionProps {
  color?: string;
  className?: string;
}

const WaveTransition: React.FC<WaveTransitionProps> = ({ 
  color = '#C2F7BC', 
  className = '' 
}) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg 
        viewBox="0 0 1440 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <path 
          d="M0,40 C240,80 480,20 720,40 C960,60 1200,30 1440,40 L1440,120 L0,120 Z" 
          fill={color}
          fillOpacity="0.1"
        />
        <path 
          d="M0,60 C360,30 720,90 1080,60 C1260,45 1350,50 1440,60 L1440,120 L0,120 Z" 
          fill={color}
          fillOpacity="0.15"
        />
        <path 
          d="M0,80 C180,60 360,100 540,80 C720,60 900,90 1080,80 C1260,70 1350,75 1440,80 L1440,120 L0,120 Z" 
          fill={color}
          fillOpacity="0.2"
        />
      </svg>
      {/* Efeito de tinta/pintura */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color}40 20%, ${color}60 50%, ${color}40 80%, transparent 100%)`,
          filter: 'blur(2px)'
        }}
      />
    </div>
  );
};

export default WaveTransition;