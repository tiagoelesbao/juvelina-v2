// src/components/common/AnnouncementBar.tsx
import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface AnnouncementBarProps {
  initialUnits?: number;
  discountPercentage?: number;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ 
  initialUnits = 54, 
  discountPercentage = 30 
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 35,
    seconds: 20
  });
  const [unitsLeft, setUnitsLeft] = useState(initialUnits);
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59, hours: prev.hours };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer
          return { hours: 5, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate units decrease
  useEffect(() => {
    const unitTimer = setInterval(() => {
      setUnitsLeft(prev => {
        const decrease = Math.random() > 0.7 ? 1 : 0;
        const newValue = prev - decrease;
        return newValue > 10 ? newValue : 54; // Reset when too low
      });
    }, 60000); // Every minute

    return () => clearInterval(unitTimer);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <div className="bg-juvelina-gold text-white py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-between">
          {/* Main announcement text */}
          <p className="text-center text-sm md:text-base flex items-center justify-center gap-2 flex-grow">
            <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" />
            🌿 OFERTA ESPECIAL: {discountPercentage}% OFF + Frete Grátis | 
            Restam {formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:{formatTime(timeLeft.seconds)}s | 
            Apenas {unitsLeft} unidades! 🌿
             <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" />
          </p>

          {/* Language selector (desktop only) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Globe size={14} className="text-white" />
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white text-sm border-none outline-none cursor-pointer"
              >
                <option value="pt-BR" className="text-gray-800">Português</option>
                <option value="en-US" className="text-gray-800">English</option>
                <option value="es-ES" className="text-gray-800">Español</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;