// src/components/sections/GuaranteeSection.tsx - CORRECTED VERSION
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle } from 'lucide-react';

const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden" id="garantia">
      {/* Padrão de fundo sutil */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.66 22.17v26.66L30 60l21.34-11.17V22.17L30 10.39z' fill='%23A9683D' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-juvelina-mint bg-opacity-30 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4">
            Sua Confiança em Primeiro Lugar
          </span>
          <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black">
            Satisfação 100% Garantida
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experimente Juvelina com total confiança. Sua transformação é nossa missão, ou devolvemos seu dinheiro.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Selo de garantia à esquerda - CORRIGIDO */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              {/* Circle com mais espaço - Aumentado de 64px para 80px */}
              <div className="relative w-80 h-80 mx-auto">
                <motion.div
                  className="absolute inset-0 bg-juvelina-gold rounded-full opacity-20"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />
                {/* Círculo interno com espaçamento maior do conteúdo */}
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <Shield size={60} className="text-juvelina-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-juvelina-gold">Garantia de</h3>
                    <p className="text-4xl font-bold text-juvelina-gold mt-1">30 Dias</p>
                    <p className="text-sm text-gray-600 mt-3">Satisfação ou seu dinheiro de volta</p>
                    <div className="flex justify-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-juvelina-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ícones decorativos */}
              <motion.div
                className="absolute -bottom-5 -left-5 bg-white p-2 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                  delay: 1
                }}
              >
                <Clock size={24} className="text-juvelina-gold" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Detalhes da garantia à direita */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-juvelina-gold">Como Funciona Nossa Garantia:</h3>
              
              <ul className="space-y-5">
                {[
                  {
                    title: "Experimente Sem Riscos",
                    description: "Teste Juvelina por até 30 dias e avalie os resultados com toda tranquilidade."
                  },
                  {
                    title: "Satisfação Prioritária",
                    description: "Se por qualquer motivo você não estiver 100% satisfeito, devolvemos seu dinheiro."
                  },
                  {
                    title: "Processo Simples",
                    description: "Basta entrar em contato com nosso suporte informando o motivo da devolução."
                  },
                  {
                    title: "Reembolso Rápido",
                    description: "Processamos seu reembolso em até 5 dias úteis, sem perguntas ou burocracia."
                  }
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-juvelina-mint/30 rounded-full flex items-center justify-center">
                      <CheckCircle size={24} className="text-juvelina-gold" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg">{item.title}</h4>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <blockquote className="mt-8 border-l-4 border-juvelina-gold pl-4 italic text-gray-600">
                "Acreditamos tanto na eficácia do nosso produto que garantimos resultados visíveis ou seu dinheiro de volta. Sua satisfação é nossa prioridade."
                <footer className="mt-2 font-normal not-italic text-sm">— Equipe Juvelina Organics</footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;