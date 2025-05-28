// src/features/benefits/BenefitsSection.tsx - REFATORADO
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Droplets, Shield, Heart, Zap, CheckCircle, X, ArrowRight } from 'lucide-react';
import WaveTransition from '../../components/ui/WaveTransition';

const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('energia');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Dados dos benefícios expandidos
  const benefits = {
    energia: {
      icon: <Zap className="h-10 w-10 text-juvelina-gold" />,
      title: "Energia Sustentada",
      description: "Nosso complexo exclusivo de BCAAs e vitaminas do complexo B proporciona energia constante ao longo do dia, sem os picos e quedas de cafeína e açúcar.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVuZXJneXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      challenge: "Falta de energia constante durante o dia, especialmente à tarde",
      solution: "BCAAs e vitaminas B em forma líquida para absorção imediata",
      detailedInfo: {
        ingredients: ['L-Leucina (410mg)', 'L-Isoleucina (250mg)', 'L-Valina (275mg)', 'Complexo B completo'],
        scientificEvidence: 'Estudos mostram que BCAAs podem aumentar a síntese proteica em até 22% e reduzir a fadiga mental em 15%',
        testimonials: [
          { name: 'Maria Silva', text: 'Acabou o cansaço das 15h! Energia o dia todo.' },
          { name: 'João Santos', text: 'Treino melhor e rendo mais no trabalho.' }
        ]
      }
    },
    imunidade: {
      icon: <Shield className="h-10 w-10 text-juvelina-gold" />,
      title: "Imunidade Reforçada",
      description: "A combinação sinérgica de Vitamina C, Zinco e Glutamina fortalece suas defesas naturais, deixando seu corpo preparado para enfrentar qualquer desafio.",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1tdW5pdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      challenge: "Sistema imunológico comprometido por estresse e má alimentação",
      solution: "Glutamina, Zinco e Vitamina C em proporção ideal para defesa celular",
      detailedInfo: {
        ingredients: ['Vitamina C (100mg)', 'Zinco (11mg)', 'Selênio (100mcg)', 'Glutamina (310mg)'],
        scientificEvidence: 'A suplementação com zinco pode reduzir a duração de resfriados em 33% quando tomada nas primeiras 24 horas',
        testimonials: [
          { name: 'Ana Costa', text: 'Não fico mais doente como antes!' },
          { name: 'Pedro Lima', text: 'Atravessei o inverno sem gripes.' }
        ]
      }
    },
    beleza: {
      icon: <Heart className="h-10 w-10 text-juvelina-gold" />,
      title: "Beleza Radiante",
      description: "Colágeno peptídico, Biotina e Vitamina E trabalham juntos para promover pele firme, cabelos fortes e unhas saudáveis, revelando sua beleza natural.",
      image: "https://images.unsplash.com/photo-1614194248104-73b258197987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXR5JTIwc2tpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      challenge: "Pele, cabelos e unhas sem vida e fragilizados",
      solution: "Colágeno peptídico e Biotina de alta absorção para nutrição interna",
      detailedInfo: {
        ingredients: ['Colágeno Bioativo (2,5g)', 'Biotina (45mcg)', 'Silício Orgânico (5mg)', 'Vitamina E (30mg)'],
        scientificEvidence: 'Peptídeos de colágeno aumentam a hidratação da pele em 28% e reduzem rugas em 13% após 8 semanas',
        testimonials: [
          { name: 'Carla Mendes', text: 'Minha pele nunca esteve tão bonita!' },
          { name: 'Fernanda Dias', text: 'Cabelos e unhas super fortalecidos.' }
        ]
      }
    },
    absorcao: {
      icon: <Droplets className="h-10 w-10 text-juvelina-gold" />,
      title: "Absorção Superior",
      description: "Nossa fórmula líquida permite absorção até 5x maior que cápsulas tradicionais, garantindo que cada nutriente seja aproveitado ao máximo pelo seu organismo.",
      image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlxdWlkJTIwZHJvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      challenge: "Baixa absorção de suplementos tradicionais em cápsulas",
      solution: "Tecnologia de absorção líquida que ultrapassa barreiras digestivas",
      detailedInfo: {
        ingredients: ['Forma líquida pré-digerida', 'Nanoemulsão avançada', 'pH otimizado'],
        scientificEvidence: 'Nutrientes líquidos apresentam biodisponibilidade até 98% maior comparado a formas sólidas',
        testimonials: [
          { name: 'Roberto Alves', text: 'Senti diferença já na primeira semana!' },
          { name: 'Lucia Ferreira', text: 'Finalmente um suplemento que funciona.' }
        ]
      }
    }
  };

  // Handler para abrir modal de detalhes
  const handleOpenDetails = (benefitKey: string) => {
    setSelectedBenefit(benefitKey);
    setShowDetailModal(true);
  };

  // Modal de Detalhes do Benefício
  const BenefitDetailModal = () => {
    if (!selectedBenefit || !showDetailModal) return null;
    
    const benefit = benefits[selectedBenefit as keyof typeof benefits];
    
    return (
      <AnimatePresence>
        {showDetailModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  {benefit.icon}
                  <h2 className="text-3xl font-bold text-juvelina-gold">{benefit.title}</h2>
                </div>
                
                <p className="text-lg text-gray-700 mb-8">{benefit.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-bold text-xl mb-4 text-juvelina-emerald">Ingredientes Principais</h3>
                    <ul className="space-y-2">
                      {benefit.detailedInfo.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-juvelina-gold" />
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-xl mb-4 text-juvelina-emerald">Evidência Científica</h3>
                    <p className="text-gray-700 italic bg-juvelina-mint/20 p-4 rounded-lg">
                      "{benefit.detailedInfo.scientificEvidence}"
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl mb-4 text-juvelina-emerald">O que nossos clientes dizem</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefit.detailedInfo.testimonials.map((testimonial, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 mb-2">"{testimonial.text}"</p>
                        <p className="text-sm text-juvelina-gold font-medium">- {testimonial.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <section 
        id="beneficios" 
        className="py-20 bg-white relative overflow-hidden"
        ref={sectionRef}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            {/* Badge com efeito glassmorphism e brilho */}
            <motion.div 
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glassmorphism-badge">
                Benefícios Transformadores
              </div>
            </motion.div>
            
            <h2 className="heading-secondary text-juvelina-emerald">
              Transformando Desafios em Bem-Estar
            </h2>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              Entendemos os obstáculos do dia a dia que dificultam sua jornada de saúde. Juvelina foi criada para superar esses desafios.
            </p>
          </div>
          
          {/* Tabs de navegação */}
          <div className="flex flex-col items-center mb-12">
            <div className="md:hidden mb-4 flex items-center gap-2 text-juvelina-gold">
              <div className="flex items-center animate-pulse">
                <span className="text-sm">Deslize</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            <div className="inline-flex bg-white shadow-md rounded-full p-1 overflow-x-auto hide-scrollbar max-w-full">
              {Object.entries(benefits).map(([key, benefit]) => (
                <button
                  key={key}
                  className={`px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
                    activeTab === key
                      ? 'bg-juvelina-gold text-white shadow-md'
                      : 'text-gray-700 hover:bg-juvelina-mint/20'
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  <div className="flex items-center gap-2">
                    {React.cloneElement(benefit.icon, {
                      className: `h-4 w-4 ${activeTab === key ? 'text-white' : 'text-juvelina-gold'}`
                    })}
                    <span>{benefit.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Conteúdo do benefício ativo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Coluna de texto */}
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-4 mb-6">
                    {benefits[activeTab as keyof typeof benefits].icon}
                    <h3 className="text-2xl font-bold">{benefits[activeTab as keyof typeof benefits].title}</h3>
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-8">
                    {benefits[activeTab as keyof typeof benefits].description}
                  </p>
                  
                  {/* Comparação Desafio vs. Solução com animação melhorada para mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <motion.div 
                      className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-red-500"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      whileHover={{ x: -5 }}
                    >
                      <h4 className="font-bold text-lg mb-3 text-red-500 flex items-center gap-2">
                        <X size={18} />
                        O Desafio
                      </h4>
                      <p className="text-gray-700">
                        {benefits[activeTab as keyof typeof benefits].challenge}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-juvelina-emerald"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.15,
                        ease: "easeOut"
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <h4 className="font-bold text-lg mb-3 text-juvelina-emerald flex items-center gap-2">
                        <CheckCircle size={18} />
                        Nossa Solução
                      </h4>
                      <p className="text-gray-700">
                        {benefits[activeTab as keyof typeof benefits].solution}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Botão para ver mais detalhes */}
                  <motion.button
                    className="bg-juvelina-gold text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition"
                    onClick={() => handleOpenDetails(activeTab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Ver Detalhes Científicos</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
                
                {/* Imagem do benefício com margem segura no mobile */}
                <div className="order-1 md:order-2 relative mb-8 md:mb-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={benefits[activeTab as keyof typeof benefits].image}
                      alt={benefits[activeTab as keyof typeof benefits].title}
                      className="rounded-lg shadow-xl w-full h-auto object-cover"
                      style={{ maxHeight: '500px' }}
                    />
                    
                    {/* Badge flutuante com posição ajustada para mobile */}
                    <motion.div 
                      className="absolute -bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg hidden sm:flex"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-2 text-juvelina-emerald">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="font-bold">Cientificamente Comprovado</span>
                      </div>
                    </motion.div>
                    
                    {/* Badge com estatística */}
                    <motion.div 
                      className="absolute top-5 left-5 bg-juvelina-gold text-white px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {activeTab === 'energia' && <span className="font-bold">97% relatam mais energia</span>}
                      {activeTab === 'imunidade' && <span className="font-bold">89% menos doenças</span>}
                      {activeTab === 'beleza' && <span className="font-bold">92% pele mais bonita</span>}
                      {activeTab === 'absorcao' && <span className="font-bold">5x mais absorção</span>}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* Modal de Detalhes */}
      <BenefitDetailModal />
    </>
  );
};

export default BenefitsSection;