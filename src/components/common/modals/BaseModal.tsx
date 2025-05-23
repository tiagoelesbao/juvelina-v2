import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Lógica comum de modal aqui...

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50">
          {/* Implementação do modal */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};