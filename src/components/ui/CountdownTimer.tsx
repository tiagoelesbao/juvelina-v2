// src/components/ui/CountdownTimer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ hours, minutes, seconds }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-gray-700 mb-2">
        <Clock size={18} className="text-juvelina-gold" />
        <span className="font-medium">Oferta termina em:</span>
      </div>
      
      <div className="flex gap-2 justify-center">
        {/* Horas */}
        <div className="bg-juvelina-gold text-white py-2 px-3 rounded-lg shadow-md">
          <div className="text-2xl font-bold">
            {String(hours).padStart(2, '0')}
          </div>
          <div className="text-xs">Horas</div>
        </div>
        
        <div className="text-2xl font-bold self-center">:</div>
        
        {/* Minutos */}
        <div className="bg-juvelina-gold text-white py-2 px-3 rounded-lg shadow-md">
          <div className="text-2xl font-bold">
            {String(minutes).padStart(2, '0')}
          </div>
          <div className="text-xs">Minutos</div>
        </div>
        
        <div className="text-2xl font-bold self-center">:</div>
        
        {/* Segundos */}
        <motion.div 
          className="bg-juvelina-gold text-white py-2 px-3 rounded-lg shadow-md"
          animate={{ 
            scale: seconds <= 10 ? [1, 1.05, 1] : 1 
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl font-bold">
            {String(seconds).padStart(2, '0')}
          </div>
          <div className="text-xs">Segundos</div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer;