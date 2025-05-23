// src/components/ui/AnimatedButton.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'gold' | 'emerald' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  color = 'emerald',
  size = 'md'
}) => {
  const colorStyles = {
    gold: 'bg-juvelina-gold text-white hover:bg-juvelina-gold/90',
    emerald: 'bg-juvelina-emerald text-white hover:bg-juvelina-emerald/90',
    white: 'bg-white text-juvelina-emerald border border-juvelina-emerald hover:bg-juvelina-mint/20'
  };

  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6',
    lg: 'py-4 px-8 text-lg'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`rounded-full font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${colorStyles[color]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;