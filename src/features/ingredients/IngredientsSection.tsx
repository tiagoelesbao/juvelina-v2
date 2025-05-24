// src/features/ingredients/IngredientsSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Sparkles, Shield, Zap, Eye, ArrowRight } from 'lucide-react';
import IngredientsList from '../../components/ui/IngredientsList';

const IngredientsSection: React.FC = () => {
  const [showIngredientsList, setShowIngredientsList] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Categorias de ingredientes destacados
  const ingredientCategories = [
    {
      id: 'energy',
      title: 'Energia & Vitalidade',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-400',
      ingredients: [
        { name: 'BCAAs', amount: '935mg', benefit: 'Energia muscular sustentada' },
        { name: 'Vitaminas do Complexo B', amount: 'Dose completa', benefit: 'Metabolismo energético' },
        { name: 'Vitamina B12', amount: '4,8mcg', benefit: 'Combate à fadiga' }
      ]
    },
    {
      id: 'immunity',
      title: 'Imunidade & Proteção',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-400',
      ingredients: [
        { name: 'Vitamina C', amount: '100mg', benefit: 'Fortalece defesas naturais' },
        { name: 'Zinco', amount: '11mg', benefit: 'Sistema imune robusto' },
        { name: 'Selênio', amount: '100mcg', benefit: 'Ação antioxidante potente' }
      ]
    },
    {
      id: 'beauty',
      title: 'Beleza & Juventude',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-pink-400 to-purple-400',
      ingredients: [
        { name: 'Colágeno Bioativo', amount: '2,5g', benefit: 'Pele firme e elástica' },
        { name: 'Biotina', amount: '45mcg', benefit: 'Cabelos e unhas fortes' },
        { name: 'Silício Orgânico', amount: '5mg', benefit: 'Rejuvenescimento celular' }
      ]
    }
  ];

  return (
    <>
      <section 
        ref={ref}
        id="ingredientes" 
        className="py-20 bg-gradient-to-b from-white to-juvelina-mint/5 relative overflow-hidden"
      >
        {/* Background decorativo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-juvelina-gold rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-juvelina-mint rounded-full filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header da seção */}
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
            
            <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black">
              25 Nutrientes Premium em <span className="text-juvelina-gold">Perfeita Sinergia</span>
            </h2>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cada ingrediente foi cuidadosamente selecionado e dosado para trabalhar em harmonia, 
              potencializando os benefícios para sua saúde e bem-estar.
            </p>
          </motion.div>

          {/* Grid de categorias */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {ingredientCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Header da categoria */}
                <div className={`bg-gradient-to-r ${category.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>

                {/* Lista de ingredientes */}
                <div className="p-6 space-y-4">
                  {category.ingredients.map((ingredient, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.05 }}
                    >
                      <div className="w-2 h-2 bg-juvelina-gold rounded-full mt-2 flex-shrink-0" />
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

          {/* Seção de diferenciais */}
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
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA para ver lista completa */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => setShowIngredientsList(true)}
              className="inline-flex items-center gap-2 bg-white border-2 border-juvelina-gold text-juvelina-gold px-6 py-3 rounded-full hover:bg-juvelina-gold hover:text-white transition-all font-medium group"
            >
              <span>Ver Composição Completa</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
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