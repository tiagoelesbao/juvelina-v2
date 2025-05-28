// src/features/ingredients/IngredientsSection.tsx - VERSÃO APRIMORADA
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Sparkles, Shield, Zap, Eye, ArrowRight, Search, X, Info } from 'lucide-react';
import IngredientsList from '../../components/ui/IngredientsList';

interface IngredientsSectionProps {
  highlightBenefit?: string; // Recebe o benefício ativo da seção anterior
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ highlightBenefit }) => {
  const [showIngredientsList, setShowIngredientsList] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Mapeamento de benefícios para ingredientes
  const benefitToIngredients: Record<string, string[]> = {
    energia: ['BCAAs', 'Vitaminas do Complexo B', 'Vitamina B12'],
    imunidade: ['Vitamina C', 'Zinco', 'Selênio', 'Glutamina'],
    beleza: ['Colágeno Bioativo', 'Biotina', 'Silício Orgânico'],
    absorcao: ['Forma Líquida', 'pH Otimizado']
  };

  // Categorias de ingredientes destacados
  const ingredientCategories = [
    {
      id: 'energy',
      title: 'Energia & Vitalidade',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-400',
      glow: 'shadow-yellow-200',
      ingredients: [
        { name: 'BCAAs', amount: '935mg', benefit: 'Energia muscular sustentada' },
        { name: 'Vitaminas do Complexo B', amount: 'Dose completa', benefit: 'Metabolismo energético' },
        { name: 'Vitamina B12', amount: '4,8mcg', benefit: 'Combate à fadiga' }
      ],
      relatedBenefit: 'energia'
    },
    {
      id: 'immunity',
      title: 'Imunidade & Proteção',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-400',
      glow: 'shadow-green-200',
      ingredients: [
        { name: 'Vitamina C', amount: '100mg', benefit: 'Fortalece defesas naturais' },
        { name: 'Zinco', amount: '11mg', benefit: 'Sistema imune robusto' },
        { name: 'Selênio', amount: '100mcg', benefit: 'Ação antioxidante potente' }
      ],
      relatedBenefit: 'imunidade'
    },
    {
      id: 'beauty',
      title: 'Beleza & Juventude',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-pink-400 to-purple-400',
      glow: 'shadow-pink-200',
      ingredients: [
        { name: 'Colágeno Bioativo', amount: '2,5g', benefit: 'Pele firme e elástica' },
        { name: 'Biotina', amount: '45mcg', benefit: 'Cabelos e unhas fortes' },
        { name: 'Silício Orgânico', amount: '5mg', benefit: 'Rejuvenescimento celular' }
      ],
      relatedBenefit: 'beleza'
    }
  ];

  // Verificar se a categoria deve ser destacada
  const shouldHighlight = (categoryId: string) => {
    const category = ingredientCategories.find(cat => cat.id === categoryId);
    return category?.relatedBenefit === highlightBenefit;
  };

  // Contador animado de nutrientes
  const [nutrientCount, setNutrientCount] = useState(0);
  
  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setNutrientCount(prev => {
          if (prev >= 25) {
            clearInterval(timer);
            return 25;
          }
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <>
      <section 
        ref={ref}
        id="ingredientes" 
        className="py-20 bg-gradient-to-b from-white to-juvelina-mint/5 relative overflow-hidden"
      >
        {/* Background decorativo animado */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute top-20 -left-20 w-96 h-96 bg-juvelina-gold rounded-full filter blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 -right-20 w-96 h-96 bg-juvelina-mint rounded-full filter blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header da seção com contador animado */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block bg-juvelina-mint/30 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Fórmula Exclusiva
            </motion.span>
            
            {/* Contador animado de nutrientes */}
            <div className="mb-6">
              <motion.div
                className="text-6xl font-bold text-juvelina-gold inline-block"
                animate={inView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {nutrientCount}
              </motion.div>
              <p className="text-lg text-gray-600">Nutrientes Premium</p>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black">
              Cada Ingrediente com <span className="text-juvelina-gold">Propósito Específico</span>
            </h2>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Nossa fórmula foi desenvolvida por especialistas para criar a sinergia perfeita entre nutrientes, 
              maximizando os benefícios para sua saúde.
            </p>
          </motion.div>

          {/* Grid de categorias com destaque condicional */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {ingredientCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${
                  shouldHighlight(category.id) ? 'ring-2 ring-juvelina-gold ring-offset-2' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Indicador de destaque */}
                {shouldHighlight(category.id) && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-juvelina-gold text-white text-xs px-2 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Relacionado
                  </motion.div>
                )}
                
                {/* Header da categoria com gradiente animado */}
                <div className={`bg-gradient-to-r ${category.color} p-4 text-white relative overflow-hidden`}>
                  {hoveredCategory === category.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <motion.div 
                      className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ${
                        hoveredCategory === category.id ? 'shadow-lg ' + category.glow : ''
                      }`}
                      animate={hoveredCategory === category.id ? { rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>

                {/* Lista de ingredientes com animação sequencial */}
                <div className="p-6 space-y-4">
                  {category.ingredients.map((ingredient, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.05 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-juvelina-gold rounded-full mt-2 flex-shrink-0"
                        animate={hoveredCategory === category.id ? { scale: [1, 1.5, 1] } : {}}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-semibold text-gray-800">{ingredient.name}</h4>
                          <span className="text-sm text-gray-500">{ingredient.amount}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{ingredient.benefit}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Seção de diferenciais com animações */}
          <motion.div 
            className="bg-gradient-to-r from-juvelina-gold/10 to-juvelina-mint/10 rounded-2xl p-8 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: <Leaf className="w-8 h-8 text-juvelina-gold" />,
                  title: '100% Natural',
                  description: 'Sem aditivos químicos ou conservantes artificiais'
                },
                {
                  icon: <Eye className="w-8 h-8 text-juvelina-gold" />,
                  title: 'Alta Biodisponibilidade',
                  description: 'Forma líquida para máxima absorção'
                },
                {
                  icon: <Shield className="w-8 h-8 text-juvelina-gold" />,
                  title: 'Testado e Aprovado',
                  description: 'Rigorosos testes de qualidade e pureza'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 10px 25px -5px rgba(169, 104, 61, 0.3)"
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA para ver lista completa com hover effect */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setShowIngredientsList(true)}
              className="inline-flex items-center gap-2 bg-white border-2 border-juvelina-gold text-juvelina-gold px-6 py-3 rounded-full hover:bg-juvelina-gold hover:text-white transition-all font-medium group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-juvelina-gold"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Ver Composição Completa</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modal com lista completa de ingredientes */}
      {showIngredientsList && (
        <IngredientsList onClose={() => setShowIngredientsList(false)} />
      )}
    </>
  );
};

export default IngredientsSection;