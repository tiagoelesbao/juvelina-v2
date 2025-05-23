// src/components/sections/FaqSection.tsx - NOVA SEÇÃO
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "Como devo tomar a Juvelina?",
      answer: "Recomendamos tomar 5ml (1 colher de chá) de Juvelina uma vez ao dia, preferencialmente pela manhã. Pode ser consumida pura ou diluída em água ou suco. Para melhores resultados, use consistentemente por pelo menos 30 dias."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "A maioria dos usuários começa a notar diferenças em energia e disposição nas primeiras 2 semanas. Para resultados em pele, cabelos e unhas, os efeitos ficam mais evidentes entre 4-8 semanas de uso contínuo. Os efeitos na imunidade podem ser percebidos após o primeiro mês de uso regular."
    },
    {
      question: "A Juvelina possui contraindicações?",
      answer: "A Juvelina é segura para a maioria das pessoas. No entanto, gestantes, lactantes, pessoas com condições médicas específicas ou que fazem uso de medicamentos controlados devem consultar um médico antes de iniciar o uso. Não exceda a dosagem recomendada."
    },
    {
      question: "A Juvelina é vegana?",
      answer: "Sim, a Juvelina é 100% vegana. Não contém ingredientes de origem animal e não realizamos testes em animais. Nosso produto também é livre de glúten, lactose e açúcares adicionados."
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Absolutamente! Você tem total liberdade para cancelar sua assinatura quando desejar, sem taxas ou penalidades. Basta acessar sua conta ou entrar em contato com nosso suporte ao cliente."
    },
    {
      question: "Como funciona a garantia de satisfação?",
      answer: "Oferecemos garantia de satisfação de 30 dias a partir da data de entrega. Se você não estiver satisfeito com os resultados, entre em contato com nosso suporte para solicitar o reembolso. Basta enviar o frasco (mesmo que parcialmente utilizado) para o endereço de devolução que forneceremos."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-juvelina-mint bg-opacity-30 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black">
            Perguntas e Respostas
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre a Juvelina e seu uso.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className={`w-full text-left p-4 focus:outline-none flex justify-between items-center ${
                  openIndex === index ? 'bg-juvelina-mint/10' : 'bg-white'
                }`}
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-juvelina-gold flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-juvelina-gold flex-shrink-0" size={20} />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Tem outras dúvidas? Entre em contato com nosso suporte
          </p>
          <a 
            href="mailto:contato@juvelinaorganics.com.br"
            className="inline-block mt-2 text-juvelina-gold font-medium hover:underline"
          >
            contato@juvelinaorganics.com.br
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;