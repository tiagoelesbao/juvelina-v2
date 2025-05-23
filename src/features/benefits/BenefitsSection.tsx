// src/components/sections/BenefitsSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Droplets, Shield, Heart, Zap, CheckCircle, X } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('energia');
  
  // Usando useInView para ativar animações quando visíveis
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Dados dos benefícios
  const benefits = {
    energia: {
      icon: <Zap className="h-10 w-10 text-juvelina-gold" />,
      title: "Energia Sustentada",
      description: "Nosso complexo exclusivo de BCAAs e vitaminas do complexo B proporciona energia constante ao longo do dia, sem os picos e quedas de cafeína e açúcar.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVuZXJneXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      challenge: "Falta de energia constante durante o dia, especialmente à tarde",
      solution: "BCAAs e vitaminas B em forma líquida para absorção imediata"
    },
    imunidade: {
      icon: <Shield className="h-10 w-10 text-juvelina-gold" />,
      title: "Imunidade Reforçada",
      description: "A combinação sinérgica de Vitamina C, Zinco e Glutamina fortalece suas defesas naturais, deixando seu corpo preparado para enfrentar qualquer desafio.",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1tdW5pdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      challenge: "Sistema imunológico comprometido por estresse e má alimentação",
      solution: "Glutamina, Zinco e Vitamina C em proporção ideal para defesa celular"
    },
    beleza: {
      icon: <Heart className="h-10 w-10 text-juvelina-gold" />,
      title: "Beleza Radiante",
      description: "Colágeno peptídico, Biotina e Vitamina E trabalham juntos para promover pele firme, cabelos fortes e unhas saudáveis, revelando sua beleza natural.",
      image: "https://images.unsplash.com/photo-1614194248104-73b258197987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXR5JTIwc2tpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      challenge: "Pele, cabelos e unhas sem vida e fragilizados",
      solution: "Colágeno peptídico e Biotina de alta absorção para nutrição interna"
    },
    absorcao: {
      icon: <Droplets className="h-10 w-10 text-juvelina-gold" />,
      title: "Absorção Superior",
      description: "Nossa fórmula líquida permite absorção até 5x maior que cápsulas tradicionais, garantindo que cada nutriente seja aproveitado ao máximo pelo seu organismo.",
      image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlxdWlkJTIwZHJvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      challenge: "Baixa absorção de suplementos tradicionais em cápsulas",
      solution: "Tecnologia de absorção líquida que ultrapassa barreiras digestivas"
    }
  };

  return (
    <section 
      id="beneficios" 
      className="py-20 bg-gradient-to-b from-white to-juvelina-mint/10 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorativo com classes Tailwind em vez de Framer Motion */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-juvelina-mint rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-juvelina-aqua rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="badge-accent">
            Benefícios Transformadores
          </span>
          <h2 className="heading-secondary text-juvelina-emerald">
            Transformando Desafios em Bem-Estar
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Entendemos os obstáculos do dia a dia que dificultam sua jornada de saúde. Juvelina foi criada para superar esses desafios.
          </p>
        </div>
        
        {/* Tabs de navegação melhoradas */}
        <div className="flex flex-col items-center mb-12">
          {/* Indicador de scroll usando classes de animação */}
          <div className="md:hidden mb-4 flex items-center gap-2 text-juvelina-gold">
            <div className="flex items-center animate-pulse-slow">
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
        
        {/* Conteúdo do benefício ativo - usando CSS para animações simples */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Coluna de texto - Animação com whileInView em vez de layout */}
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              {benefits[activeTab as keyof typeof benefits].icon}
              <h3 className="text-2xl font-bold">{benefits[activeTab as keyof typeof benefits].title}</h3>
            </div>
            
            <p className="text-gray-700 text-lg mb-8">
              {benefits[activeTab as keyof typeof benefits].description}
            </p>
            
            {/* Comparação Desafio vs. Solução */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <motion.div 
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 border-red-500"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
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
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
            
            {/* Etapas do funcionamento */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="font-bold mb-4">Como funciona:</h4>
              <div className="space-y-4">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step}
                    className="flex items-start gap-4 animate-fadeInUp"
                    style={{ animationDelay: `${(step - 1) * 0.2}s` }}
                  >
                    <div className="bg-juvelina-mint w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-juvelina-emerald">{step}</span>
                    </div>
                    <div>
                      {activeTab === 'energia' && (
                        step === 1 ? (
                          <p>Os BCAAs são rapidamente absorvidos e transportados para as células musculares</p>
                        ) : step === 2 ? (
                          <p>Vitaminas do complexo B otimizam a produção de energia nas mitocôndrias</p>
                        ) : (
                          <p>A forma líquida garante absorção imediata e energia sustentada por horas</p>
                        )
                      )}
                      
                      {activeTab === 'imunidade' && (
                        step === 1 ? (
                          <p>Glutamina fortalece as células imunológicas e a barreira intestinal</p>
                        ) : step === 2 ? (
                          <p>Zinco e Vitamina C trabalham em sinergia para potencializar a defesa celular</p>
                        ) : (
                          <p>Formato líquido permite que os nutrientes cheguem rapidamente às células de defesa</p>
                        )
                      )}
                      
                      {activeTab === 'beleza' && (
                        step === 1 ? (
                          <p>Peptídeos de Colágeno são absorvidos e direcionados para pele, cabelos e unhas</p>
                        ) : step === 2 ? (
                          <p>Biotina e Vitamina E combatem radicais livres e estimulam a produção de queratina</p>
                        ) : (
                          <p>Resultados visíveis em 2-4 semanas com uso contínuo</p>
                        )
                      )}
                      
                      {activeTab === 'absorcao' && (
                        step === 1 ? (
                          <p>A forma líquida elimina a necessidade de quebra do revestimento das cápsulas</p>
                        ) : step === 2 ? (
                          <p>Nutrientes em estado pré-digerido são imediatamente absorvidos no intestino</p>
                        ) : (
                          <p>Tecnologia de nanoemulsão aumenta a biodisponibilidade em até 5 vezes</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Imagem do benefício - Usando classes CSS em vez de animações complexas */}
          <div className="order-1 md:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={benefits[activeTab as keyof typeof benefits].image}
                alt={benefits[activeTab as keyof typeof benefits].title}
                className="rounded-lg shadow-xl w-full h-auto object-cover animate-fadeIn"
                style={{ maxHeight: '500px' }}
              />
              
              {/* Badge flutuante */}
              <div className="absolute -bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg animate-fadeInUp">
                <div className="flex items-center gap-2 text-juvelina-emerald">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-bold">Cientificamente Comprovado</span>
                </div>
              </div>
            </motion.div>
            
            {/* Badge flutuante com estatística */}
            <div className="absolute top-5 left-5 bg-juvelina-gold text-white px-4 py-2 rounded-lg shadow-lg animate-fadeInDown">
              {activeTab === 'energia' && <span className="font-bold">97% relatam mais energia</span>}
              {activeTab === 'imunidade' && <span className="font-bold">89% percebem menos doenças</span>}
              {activeTab === 'beleza' && <span className="font-bold">92% notam pele e cabelos melhores</span>}
              {activeTab === 'absorcao' && <span className="font-bold">5x mais absorção comprovada</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;