// src/features/ingredients/IngredientsSection.tsx
import React, { useState, useEffect, useMemo, useCallback, useContext, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, Sparkles, Shield, Zap, Eye, ArrowRight, Search, X, Info, Heart } from 'lucide-react';
import { PerformanceContext } from '../../App';
import './IngredientsSection.css';

// Lazy load do modal
const IngredientsList = lazy(() => import('../../components/ui/IngredientsList'));

interface IngredientsSectionProps {
  highlightBenefit?: string;
}

// Componente de Confetti customizado (sem dependência externa)
const CustomConfetti: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${50 + (Math.random() - 0.5) * 40}%`,
            top: '40%',
            backgroundColor: ['#A9683D', '#C2F7BC', '#357266'][Math.floor(Math.random() * 3)]
          }}
          initial={{ 
            scale: 0,
            y: 0,
            x: 0,
            opacity: 1
          }}
          animate={{ 
            scale: [0, 1, 1, 0.5, 0],
            y: [0, -100, -200, -300, -400],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
            opacity: [1, 1, 1, 0.5, 0],
            rotate: [0, 180, 360, 540, 720]
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.3,
            ease: "easeOut"
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 1 }}
      >
        <span className="text-4xl font-bold text-juvelina-gold">🎉</span>
      </motion.div>
    </div>
  );
};

// Dados estáticos fora do componente
const INGREDIENT_CATEGORIES = [
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

const BENEFIT_NAMES: Record<string, string> = {
  energia: 'Energia Sustentada',
  imunidade: 'Imunidade Reforçada',
  beleza: 'Beleza Radiante',
  absorcao: 'Absorção Superior'
};

// Componente Tooltip para ingredientes
const IngredientTooltip: React.FC<{ ingredient: string; amount: string }> = ({ ingredient, amount }) => (
  <div className="group relative inline-block">
    <span className="cursor-help border-b border-dotted border-juvelina-mint">
      {ingredient}
    </span>
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                    opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
      <div className="bg-gray-900 text-white text-xs rounded-lg p-2 whitespace-nowrap shadow-xl">
        <div className="font-bold text-juvelina-mint">{amount}</div>
        <div className="text-gray-300">Dose diária recomendada</div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                        w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  </div>
);

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ highlightBenefit }) => {
  const [showIngredientsList, setShowIngredientsList] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [debouncedHoveredCategory, setDebouncedHoveredCategory] = useState<string | null>(null);
  const [loadedCategories, setLoadedCategories] = useState<string[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { isMobile, reduceMotion } = useContext(PerformanceContext);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Memoizar categorias
  const ingredientCategories = useMemo(() => INGREDIENT_CATEGORIES, []);
  
  // Debounce para hover
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedHoveredCategory(hoveredCategory);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [hoveredCategory]);
  
  // Verificar se a categoria deve ser destacada
  const shouldHighlight = useCallback((categoryId: string) => {
    const category = ingredientCategories.find(cat => cat.id === categoryId);
    return category?.relatedBenefit === highlightBenefit;
  }, [ingredientCategories, highlightBenefit]);
  
  // Lazy load de detalhes da categoria
  const loadCategoryDetails = useCallback((categoryId: string) => {
    if (!loadedCategories.includes(categoryId)) {
      setLoadedCategories(prev => [...prev, categoryId]);
    }
  }, [loadedCategories]);
  
  // Contador animado de nutrientes
  const [nutrientCount, setNutrientCount] = useState(0);
  
  useEffect(() => {
    if (inView && !reduceMotion) {
      let count = 0;
      const timer = setInterval(() => {
        count += 1;
        if (count > 25) {
          clearInterval(timer);
          setNutrientCount(25);
        } else {
          setNutrientCount(count);
        }
      }, 50);
      
      return () => clearInterval(timer);
    } else if (inView) {
      setNutrientCount(25);
    }
  }, [inView, reduceMotion]);

  // Easter egg handler
  const handleCounterClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      setShowConfetti(true);
      setClickCount(0);
      
      // Vibração haptica em mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      
      // Resetar confetti após animação
      setTimeout(() => {
        setShowConfetti(false);
      }, 2500);
    }
  };

  return (
    <>
      <section 
        ref={ref}
        id="ingredientes" 
        className="ingredients-section"
      >
        {/* Background orgânico com parallax */}
        <motion.div 
          className="ingredients-organic-bg"
          style={{ y: backgroundY }}
        />
        
        {/* Textura de terra/folhas */}
        <div className="ingredients-texture-overlay" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Indicador de conexão com benefício anterior */}
          <AnimatePresence>
            {highlightBenefit && BENEFIT_NAMES[highlightBenefit] && (
              <motion.div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white rounded-full px-6 py-3 shadow-xl border-2 border-juvelina-mint">
                  <p className="text-sm font-medium text-juvelina-emerald flex items-center gap-2">
                    <Heart size={16} className="text-juvelina-gold" />
                    Ingredientes para <span className="font-bold text-juvelina-gold">{BENEFIT_NAMES[highlightBenefit]}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Header da seção */}
          <motion.div 
            className="text-center mb-16 pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="ingredients-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              aria-label="Badge de fórmula exclusiva"
            >
              Fórmula Exclusiva
            </motion.span>
            
            {/* Contador animado com easter egg */}
            <div className="mb-6 relative">
              <motion.div
                className="text-6xl font-bold text-white inline-block cursor-pointer select-none relative"
                animate={inView && !reduceMotion ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                onClick={handleCounterClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {nutrientCount}
                {clickCount > 0 && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-juvelina-mint text-juvelina-emerald text-sm w-6 h-6 rounded-full flex items-center justify-center font-normal"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {clickCount}
                  </motion.div>
                )}
              </motion.div>
              <p className="text-lg text-white/80">Nutrientes Premium</p>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-white">
              Cada Ingrediente com <span className="text-juvelina-mint">Propósito Específico</span>
            </h2>
            
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Nossa fórmula foi desenvolvida por especialistas para criar a sinergia perfeita entre nutrientes, 
              maximizando os benefícios para sua saúde.
            </p>
          </motion.div>

          {/* Grid de categorias */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {ingredientCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`ingredients-category-card ${
                  shouldHighlight(category.id) ? 'highlighted' : ''
                } ${debouncedHoveredCategory === category.id ? 'hovered' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={!reduceMotion ? { y: -5 } : {}}
                onMouseEnter={() => {
                  setHoveredCategory(category.id);
                  loadCategoryDetails(category.id);
                }}
                onMouseLeave={() => setHoveredCategory(null)}
                role="article"
                aria-label={`Categoria de ingredientes: ${category.title}`}
              >
                {/* Indicador de destaque */}
                {shouldHighlight(category.id) && (
                  <motion.div
                    className="ingredients-highlight-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Relacionado
                  </motion.div>
                )}
                
                {/* Header da categoria */}
                <div className={`ingredients-category-header bg-gradient-to-r ${category.color}`}>
                  {debouncedHoveredCategory === category.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <motion.div 
                      className={`ingredients-icon-wrapper ${
                        debouncedHoveredCategory === category.id ? 'shadow-lg ' + category.glow : ''
                      }`}
                      animate={debouncedHoveredCategory === category.id && !reduceMotion ? { rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </div>

                {/* Lista de ingredientes */}
                <div className="p-6 space-y-4">
                  {(!loadedCategories.includes(category.id) && !inView) ? (
                    <div className="animate-pulse space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-12 bg-gray-200 rounded" />
                      ))}
                    </div>
                  ) : (
                    category.ingredients.map((ingredient, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 + idx * 0.05 }}
                      >
                        <motion.div 
                          className="ingredients-bullet"
                          animate={debouncedHoveredCategory === category.id && !reduceMotion ? { 
                            scale: [1, 1.5, 1] 
                          } : {}}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                        />
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between">
                            <IngredientTooltip 
                              ingredient={ingredient.name}
                              amount={ingredient.amount}
                            />
                            <span className="text-sm text-juvelina-emerald font-medium">{ingredient.amount}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{ingredient.benefit}</p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Seção de diferenciais */}
          <motion.div 
            className="ingredients-differentials"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: '100% Natural',
                  description: 'Sem aditivos químicos ou conservantes artificiais'
                },
                {
                  icon: <Eye className="w-8 h-8" />,
                  title: 'Alta Biodisponibilidade',
                  description: 'Forma líquida para máxima absorção'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Testado e Aprovado',
                  description: 'Rigorosos testes de qualidade e pureza'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={!reduceMotion ? { y: -5 } : {}}
                >
                  <motion.div 
                    className="ingredients-differential-icon"
                    whileHover={!reduceMotion ? { 
                      scale: 1.1,
                      boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)"
                    } : {}}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA para ver lista completa com margem adequada */}
          <motion.div 
            className="text-center mt-16 mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setShowIngredientsList(true)}
              className="ingredients-cta-button group"
              whileHover={!reduceMotion ? { scale: 1.05 } : {}}
              whileTap={!reduceMotion ? { scale: 0.95 } : {}}
              aria-label="Abrir lista completa de ingredientes"
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-juvelina-gold transition-colors">
                Ver Composição Completa
              </span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform group-hover:text-juvelina-gold" />
            </motion.button>
          </motion.div>
        </div>
        
        {/* Transição orgânica inferior */}
        <div className="ingredients-organic-transition" />
      </section>

      {/* Confetti customizado */}
      <CustomConfetti show={showConfetti} />

      {/* Modal com lista completa de ingredientes */}
      <Suspense fallback={null}>
        {showIngredientsList && (
          <IngredientsList onClose={() => setShowIngredientsList(false)} />
        )}
      </Suspense>
    </>
  );
};

export default IngredientsSection;