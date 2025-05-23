// src/components/sections/PricingSection.tsx - CORRECTED VERSION
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

interface PricingSectionProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onCtaClick }) => {
  const plans = [
    {
      id: 'single',
      title: 'Experimente',
      price: 149.90,
      originalPrice: 179.90,
      period: '',
      description: 'Perfeito para iniciar sua jornada',
      features: [
        '1 frasco (30 dias de uso)',
        'Frete Grátis para Todo Brasil',
        'Garantia de 30 dias'
      ],
      popular: false
    },
    {
      id: 'monthly',
      title: 'Assinatura Mensal',
      price: 129.90,
      originalPrice: 179.90,
      period: '/mês',
      description: 'A escolha inteligente para resultados contínuos',
      features: [
        'Receba 1 frasco todo mês',
        'Economize R$600/ano',
        'Frete Grátis Prioritário',
        'Cancele quando quiser',
        'Acesso a conteúdos exclusivos'
      ],
      popular: true
    },
    {
      id: 'kit',
      title: 'Kit 3 Meses',
      price: 379.90,
      originalPrice: 539.70,
      period: '',
      description: 'Economize mais com nosso pacote trimestral',
      features: [
        '3 frascos (90 dias de uso)',
        'Economize R$159,80',
        'Frete Grátis Express',
        'Garantia Estendida de 90 dias'
      ],
      popular: false
    }
  ];
  
  // Formatar preço para o formato brasileiro
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };
  
  // Calcular percentual de desconto
  const calculateDiscount = (originalPrice: number, price: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section id="planos" className="py-20 bg-gradient-to-b from-white to-juvelina-mint/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-juvelina-mint bg-opacity-30 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4">
            Escolha Seu Plano
          </span>
          <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black">
            Invista em Seu Bem-Estar
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Escolha o plano ideal para transformar sua saúde e bem-estar com a potência da Juvelina Organics.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden relative flex flex-col ${
                plan.popular ? 'ring-2 ring-juvelina-gold md:-mt-4 md:mb-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-juvelina-gold text-white py-1.5 px-6 absolute -right-12 top-6 rotate-45 font-medium text-sm z-10">
                  MAIS POPULAR
                </div>
              )}
              
              <div className="p-6 pb-3 flex-grow">
                <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                <p className="text-gray-500 text-sm min-h-[40px]">{plan.description}</p>
                
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">R$ {formatPrice(plan.price)}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                
                <div className="mb-2">
                  <span className="text-gray-400 line-through text-sm">R$ {formatPrice(plan.originalPrice)}</span>
                  <span className="ml-2 text-green-600 text-sm font-medium">
                    {calculateDiscount(plan.originalPrice, plan.price)}% OFF
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-100" />
              
              <div className="p-6 pt-4 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={18} className="text-juvelina-gold mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Botões alinhados uniformemente */}
              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={onCtaClick}
                  className={`w-full rounded-lg py-3 px-4 font-medium transition-colors ${
                    plan.popular
                      ? 'bg-juvelina-gold text-white hover:bg-opacity-90'
                      : 'bg-white text-juvelina-gold border border-juvelina-gold hover:bg-juvelina-mint/10'
                  }`}
                >
                  {plan.popular ? 'Escolher Este Plano' : 'Selecionar'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white p-6 rounded-xl shadow-sm max-w-2xl mx-auto border border-gray-100">
            <div className="flex items-center gap-3 justify-center mb-4">
              <Star className="text-juvelina-gold" size={20} fill="currentColor" />
              <h3 className="font-bold text-lg">Satisfação 100% Garantida</h3>
            </div>
            <p className="text-gray-600">
              Oferecemos garantia de devolução do seu dinheiro por 30 dias. Se você não estiver 
              completamente satisfeito com os resultados, basta entrar em contato conosco para um 
              reembolso integral, sem perguntas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;