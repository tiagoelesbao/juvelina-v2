import { useState } from 'react';

export const useModalState = (initialVariant = 'default') => {
  const [showModal, setShowModal] = useState(false);
  const [modalVariant, setModalVariant] = useState<'default' | 'exit-intent' | 'time-based'>(initialVariant as any);
  
  const openModal = (variant: 'default' | 'exit-intent' | 'time-based' = 'default') => {
    setModalVariant(variant);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  return {
    showModal,
    modalVariant,
    openModal,
    closeModal
  };
};