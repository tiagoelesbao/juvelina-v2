// src/components/modals/PurchaseModal.tsx - VERSÃO OTIMIZADA PARA CONVERSÃO
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, CheckCircle, Clock, Shield } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'default' | 'exit-intent' | 'time-based';
  personalizedTitle?: string;
}

type PurchaseOption = 'single' | 'monthly' | 'kit';

interface OptionType {
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  benefits: string[];
  popular?: boolean;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ 
  isOpen, 
  onClose, 
  variant = 'default',
  personalizedTitle
}) => {
  const [selectedOption, setSelectedOption] = useState<PurchaseOption>('monthly');
  const [timeLeft, setTimeLeft] = useState({
    minutes: 15,
    seconds: 0
  });
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  
  // Verificar se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Resetar estados quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      if (variant === 'exit-intent' && !exitIntentShown) {
        setShowExitIntent(true);
        setExitIntentShown(true);
      } else {
        setShowExitIntent(false);
      }
    }
  }, [isOpen, variant, exitIntentShown]);
  
  // Gatilho de urgência - contador regressivo
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isOpen]);
  
  // Click fora para fechar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (!showExitIntent) {
          onClose();
        }
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, showExitIntent]);
  
  const options: Record<PurchaseOption, OptionType> = {
    single: {
      title: 'Experimente',
      price: 149.90,
      originalPrice: 179.90,
      description: 'Perfeito para iniciar sua jornada',
      benefits: [
        '1 frasco (30 dias de uso)',
        'Frete Grátis em Todo Brasil',
        'Garantia de 30 dias'
      ]
    },
    monthly: {
      title: 'Assinatura Mensal',
      price: 129.90,
      originalPrice: 179.90,
      description: 'A escolha inteligente para resultados contínuos',
      benefits: [
        'Receba 1 frasco todo mês sem preocupações',
        'Economize R$600/ano',
        'Frete Grátis Prioritário',
        'Cancele quando quiser',
        'Acesso a conteúdos exclusivos'
      ],
      popular: true
    },
    kit: {
      title: 'Kit 3 Meses',
      price: 379.90,
      originalPrice: 539.70,
      description: 'Economize mais com nosso pacote trimestral',
      benefits: [
        '3 frascos (90 dias de uso)',
        'Economize R$159,80',
        'Frete Grátis Express',
        'Garantia Estendida de 90 dias'
      ]
    }
  };
  
  // Formatar preço
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };
  
  // Calcular desconto
  const calculateDiscount = (originalPrice: number, price: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };
  
  // Título personalizado com base no variant
  const getTitle = () => {
    if (personalizedTitle) {
      return personalizedTitle;
    }
    
    if (variant === 'exit-intent') {
      return "Espere! Oferta Especial para Você";
    } else if (variant === 'time-based') {
      return "Oferta por Tempo Limitado!";
    }
    
    return "Oferta Especial de Lançamento";
  };
  
  // Handler para fechar o exit intent
  const handleCloseExitIntent = () => {
    setShowExitIntent(false);
  };

  // Handler para aceitar a oferta de exit intent
  const handleAcceptExitOffer = () => {
    setShowExitIntent(false);
    setSelectedOption('monthly');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Conteúdo do modal responsivo - VERSÃO MOBILE OTIMIZADA SEM SCROLL */}
          {isMobile ? (
            <motion.div
              ref={modalRef}
              className="bg-white rounded-2xl shadow-2xl mx-auto w-[92%] transform-gpu overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              {/* Header */}
              <div className="bg-juvelina-gold text-white p-3 rounded-t-2xl relative">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold truncate pr-6">{getTitle()}</h3>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors absolute right-3 top-3"
                    aria-label="Fechar"
                  >
                    <X size={22} />
                  </button>
                </div>
                <div className="mt-1 flex items-center gap-1 text-white/90">
                  <Clock size={14} />
                  <div className="text-xs">
                    Oferta expira em: <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>
              
              {/* Conteúdo principal - sem scroll */}
              <div className="p-4">
                {/* Descrição compacta */}
                <p className="text-sm text-gray-700 mb-3">
                  Nosso suplemento líquido premium com 25 nutrientes essenciais e absorção 5x superior garante resultados visíveis desde as primeiras semanas.
                </p>
                
                <p className="font-medium text-gray-800 mb-2">Escolha sua opção:</p>
                
                {/* Opção 1: Experimente */}
                <div 
                  className={`border rounded-xl p-3 hover:border-juvelina-gold transition-all cursor-pointer mb-2 ${
                    selectedOption === 'single' ? 'border-2 border-juvelina-gold bg-juvelina-mint/10' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedOption('single')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="option-single"
                        name="purchase_option"
                        checked={selectedOption === 'single'}
                        onChange={() => setSelectedOption('single')}
                        className="accent-juvelina-gold w-4 h-4"
                      />
                      <div>
                        <label htmlFor="option-single" className="font-medium block">
                          Experimente <span className="ml-1 text-xs text-white bg-juvelina-gold px-1.5 py-0.5 rounded-sm">17% OFF</span>
                        </label>
                        <p className="text-xs text-gray-500">Perfeito para iniciar sua jornada</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-juvelina-gold font-bold">R$ 149,90</div>
                      <div className="text-xs text-gray-400 line-through">R$ 179,90</div>
                    </div>
                  </div>
                </div>
                
                {/* Opção 2: Assinatura Mensal */}
                <div 
                  className={`border rounded-xl p-3 hover:border-juvelina-gold transition-all cursor-pointer mb-2 ${
                    selectedOption === 'monthly' ? 'border-2 border-juvelina-gold bg-juvelina-mint/10' : 'border-gray-200'
                  } ${options.monthly.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedOption('monthly')}
                >
                  {options.monthly.popular && (
                    <div className="absolute -top-2.5 right-3 bg-juvelina-gold text-white text-xs px-2 py-0.5 rounded-md">
                      MAIS POPULAR
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="option-monthly"
                        name="purchase_option"
                        checked={selectedOption === 'monthly'}
                        onChange={() => setSelectedOption('monthly')}
                        className="accent-juvelina-gold w-4 h-4"
                      />
                      <div>
                        <label htmlFor="option-monthly" className="font-medium block">
                          Assinatura Mensal <span className="ml-1 text-xs text-white bg-juvelina-gold px-1.5 py-0.5 rounded-sm">28% OFF</span>
                        </label>
                        <p className="text-xs text-gray-500">A escolha inteligente para resultados contínuos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-juvelina-gold font-bold">R$ 129,90<span className="text-xs font-normal">/mês</span></div>
                      <div className="text-xs text-gray-400 line-through">R$ 179,90</div>
                    </div>
                  </div>
                  
                  {/* Benefícios da opção selecionada */}
                  {selectedOption === 'monthly' && (
                    <div className="mt-2 grid grid-cols-1 gap-1 pt-2 border-t border-gray-100">
                      {options.monthly.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-1">
                          <CheckCircle size={12} className="text-juvelina-gold mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Opção 3: Kit 3 Meses */}
                <div 
                  className={`border rounded-xl p-3 hover:border-juvelina-gold transition-all cursor-pointer ${
                    selectedOption === 'kit' ? 'border-2 border-juvelina-gold bg-juvelina-mint/10' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedOption('kit')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="option-kit"
                        name="purchase_option"
                        checked={selectedOption === 'kit'}
                        onChange={() => setSelectedOption('kit')}
                        className="accent-juvelina-gold w-4 h-4"
                      />
                      <div>
                        <label htmlFor="option-kit" className="font-medium block">
                          Kit 3 Meses <span className="ml-1 text-xs text-white bg-juvelina-gold px-1.5 py-0.5 rounded-sm">30% OFF</span>
                        </label>
                        <p className="text-xs text-gray-500">Economize mais com nosso pacote trimestral</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-juvelina-gold font-bold">R$ 379,90</div>
                      <div className="text-xs text-gray-400 line-through">R$ 539,70</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Botão de ação principal */}
              <div className="p-4 pt-2">
                <button 
                  className="w-full py-3 bg-juvelina-gold text-white rounded-full font-medium flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingCart size={18} />
                  Garantir Meu Juvelina Agora
                </button>
                
                {/* Elementos de confiança - versão compacta */}
                <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield size={10} className="text-juvelina-gold" />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle size={10} className="text-juvelina-gold" />
                    <span>Garantia de 30 dias</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Layout Desktop (cards horizontais)
            <motion.div
              ref={modalRef}
              className="relative max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="bg-gradient-to-r from-juvelina-gold to-juvelina-gold/80 text-white p-4 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{getTitle()}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <div className="text-sm">
                        Oferta expira em: <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <h4 className="font-bold text-xl text-juvelina-gold mb-2">Escolha seu plano Juvelina</h4>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Nosso suplemento líquido premium com 25 nutrientes essenciais e absorção 5x superior para transformar seu bem-estar.
                  </p>
                </div>
                
                {/* Cards horizontais */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {(Object.entries(options) as [PurchaseOption, typeof options.single][]).map(([key, option]) => (
                    <div
                      key={key}
                      className={`border rounded-xl p-5 hover:border-juvelina-gold transition-all cursor-pointer relative ${
                        selectedOption === key
                          ? 'border-2 border-juvelina-gold bg-juvelina-mint bg-opacity-10 transform scale-105 shadow-lg'
                          : 'border-gray-200'
                      } ${option.popular ? 'ring-1 ring-juvelina-gold ring-offset-2' : ''}`}
                      onClick={() => setSelectedOption(key)}
                    >
                      {option.popular && (
                        <motion.div
                          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-juvelina-gold text-white text-xs px-4 py-1 rounded-full uppercase font-bold tracking-wide"
                          animate={{ 
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              '0 0 0 rgba(212, 178, 106, 0.4)',
                              '0 0 8px rgba(212, 178, 106, 0.8)',
                              '0 0 0 rgba(212, 178, 106, 0.4)'
                            ]
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 2
                          }}
                        >
                          Mais Popular
                        </motion.div>
                      )}
                      
                      <div className="text-center">
                        <h5 className="font-bold text-lg mb-1">{option.title}</h5>
                        <p className="text-sm text-gray-600 h-10">{option.description}</p>
                        
                        <div className="mt-4 mb-6">
                          <div className="text-3xl font-bold text-juvelina-gold">
                            R$ {formatPrice(option.price)}
                            {key === 'monthly' && <span className="text-sm font-normal">/mês</span>}
                          </div>
                          <div className="flex justify-center items-center gap-2">
                            <span className="text-gray-500 line-through text-sm">
                              R$ {formatPrice(option.originalPrice)}
                            </span>
                            <span className="bg-juvelina-gold/10 text-juvelina-gold text-xs px-2 py-0.5 rounded-full">
                              {calculateDiscount(option.originalPrice, option.price)}% OFF
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-left mb-6">
                          {option.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-juvelina-gold mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                        
                        <label htmlFor={`desktop-option-${key}`} className="flex items-center justify-center gap-2 cursor-pointer">
                          <input
                            id={`desktop-option-${key}`}
                            type="radio"
                            name="desktop_purchase_option"
                            checked={selectedOption === key}
                            onChange={() => setSelectedOption(key)}
                            className="accent-juvelina-gold w-5 h-5"
                          />
                          <span className="font-medium">Selecionar</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <button
                    className="bg-juvelina-gold text-white px-10 py-3 rounded-full hover:bg-opacity-90 transition font-medium flex items-center justify-center gap-2 shadow-lg max-w-md w-full"
                  >
                    <ShoppingCart size={20} />
                    Garantir Meu Juvelina Agora
                  </button>
                </div>
                
                {/* Elementos de confiança no rodapé */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap justify-around items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-juvelina-gold" />
                    <span>Pagamento 100% Seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-juvelina-gold" />
                    <span>Satisfação Garantida</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" className="h-6 w-auto" alt="Visa" />
                    <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" className="h-6 w-auto" alt="Mastercard" />
                    <img src="https://cdn-icons-png.flaticon.com/512/217/217425.png" className="h-6 w-auto" alt="Boleto" />
                    <img src="https://cdn-icons-png.flaticon.com/512/888/888870.png" className="h-6 w-auto" alt="Pix" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Modal de Intent de Saída */}
          <AnimatePresence>
            {showExitIntent && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-70 z-60 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  // Permitir fechar o exit intent ao clicar fora
                  if (e.target === e.currentTarget) {
                    handleCloseExitIntent();
                  }
                }}
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                >
                  <div className="bg-juvelina-gold text-white p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">Espere! Oferta Especial</h3>
                      <button
                        onClick={handleCloseExitIntent}
                        className="text-white hover:text-gray-200"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">
                      Não perca nossa oferta exclusiva de lançamento! Ganhe um frasco adicional <strong>GRÁTIS</strong> ao assinar hoje.
                    </p>
                    
                    <div className="flex justify-center my-4">
                      <motion.div
                        className="bg-juvelina-mint/30 rounded-lg p-4 flex items-center gap-4"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="text-3xl font-bold text-juvelina-gold">+1</div>
                        <div>
                          <div className="font-bold">Frasco Adicional</div>
                          <div className="text-sm text-gray-600">Valor: R$ 149,90</div>
                          <div className="text-juvelina-gold font-bold">GRÁTIS</div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <button
                      className="w-full bg-juvelina-gold text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition font-medium mt-4"
                      onClick={handleAcceptExitOffer}
                    >
                      Sim! Quero Aproveitar Esta Oferta
                    </button>
                    
                    <button
                      className="w-full text-gray-500 px-6 py-2 rounded-full hover:bg-gray-100 transition text-sm mt-2"
                      onClick={handleCloseExitIntent}
                    >
                      Não, prefiro pagar preço integral depois
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseModal;