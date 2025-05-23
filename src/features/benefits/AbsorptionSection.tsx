// src/components/sections/AbsorptionSection.tsx - CORRECTED VERSION
import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AbsorptionSection: React.FC = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Usar useInView para controlar animações
  const [containerRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section 
      id="absorpcao" 
      className="py-24 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.66 22.17v26.66L30 60l21.34-11.17V22.17L30 10.39z' fill='%23D4B26A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          y: backgroundY
        }}
      />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-juvelina-mint/10 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-juvelina-mint bg-opacity-30 px-4 py-1 rounded-full text-juvelina-emerald font-medium mb-4">
            Ciência & Inovação
          </span>
          <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-juvelina-emerald">
            Absorção 5x Superior
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nossa fórmula líquida revolucionária permite que seu corpo absorva os nutrientes até 5x mais rápido que suplementos em cápsulas tradicionais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Coluna de Forma Líquida - Redesenhado e Mais Suave */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-juvelina-mint rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-juvelina-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-juvelina-gold">Juvelina (Forma Líquida)</h3>
              </div>
              
              {/* Nova barra de progresso mais suave com animação de partículas melhorada */}
              <div className="relative h-14 bg-gray-100 rounded-lg mb-8 overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-juvelina-gold to-juvelina-mint rounded-lg flex items-center justify-end pr-6"
                  initial={{ width: 0 }}
                  variants={{
                    hidden: { width: 0 },
                    visible: { 
                      width: "100%",
                      transition: { 
                        duration: 1.5,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  <motion.span 
                    className="font-bold text-white text-lg"
                    initial={{ opacity: 0 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { 
                        opacity: 1,
                        transition: { delay: 1, duration: 0.5 }
                      }
                    }}
                  >
                    100% absorvido
                  </motion.span>
                </motion.div>
                
                {/* Animação de gotículas mais sutil e sem sobrepor texto */}
                <motion.div 
                  className="absolute top-0 left-0 w-[95%] h-full pointer-events-none"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { delay: 0.5 }
                    }
                  }}
                >
                  {[...Array(6)].map((_, index) => (
                    <motion.div 
                      key={index} 
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{ 
                        left: `${(index + 1) * 15}%`, 
                        top: '50%',
                        transform: 'translateY(-50%)',
                        boxShadow: '0 0 8px rgba(255,255,255,0.6)' 
                      }}
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: {
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5],
                          transition: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 2,
                            delay: index * 0.2,
                            ease: "easeInOut"
                          }
                        }
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Nutrientes em forma líquida são facilmente absorvidos pelo organismo, sem necessidade de digestão prévia, chegando rapidamente às células.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-juvelina-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Absorção Imediata:</span> Resultados desde as primeiras semanas
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-juvelina-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Biodisponibilidade Maximizada:</span> Nutrientes em forma pré-digerida
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-juvelina-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Sinergia de Ingredientes:</span> Maior eficácia e resultados
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Coluna de Cápsulas - Redesenhado e Mais Suave */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.2,
                  delay: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-700">Suplementos em Cápsulas</h3>
              </div>
              
              {/* Nova barra de progresso corrigida */}
              <div className="relative h-14 bg-gray-100 rounded-lg mb-8 overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gray-400 rounded-lg flex items-center justify-center"
                  initial={{ width: 0 }}
                  variants={{
                    hidden: { width: 0 },
                    visible: { 
                      width: "20%",
                      transition: { 
                        duration: 1.8,
                        ease: "easeOut",
                        delay: 0.3
                      }
                    }
                  }}
                >
                  <motion.span 
                    className="font-bold text-white text-lg whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { 
                        opacity: 1,
                        transition: { delay: 1.2, duration: 0.5 }
                      }
                    }}
                  >
                    Apenas 20% absorvido
                  </motion.span>
                </motion.div>
                
                {/* Animação simplificada sem sobrepor texto */}
                <motion.div 
                  className="absolute top-0 left-0 w-[15%] h-full pointer-events-none"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { delay: 0.8 }
                    }
                  }}
                >
                  {[...Array(2)].map((_, index) => (
                    <motion.div 
                      key={index} 
                      className="absolute w-1.5 h-1.5 bg-gray-500 rounded-full"
                      style={{ 
                        left: `${(index + 1) * 5}%`, 
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: {
                          opacity: [0, 0.5, 0],
                          scale: [0.5, 1, 0.5],
                          transition: {
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 3,
                            delay: index * 0.4,
                            ease: "easeInOut"
                          }
                        }
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Cápsulas precisam ser quebradas pelo sistema digestivo, perdendo grande parte dos nutrientes no processo de absorção.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Baixa Absorção:</span> Grande parte dos nutrientes é perdida
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Processo Lento:</span> Necessidade de quebra pelo sistema digestivo
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Resultados Tardios:</span> Podem demorar meses para aparecer
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Seção de Estudo */}
        <motion.div 
          className="mt-16 mx-auto max-w-3xl bg-white p-8 rounded-xl shadow-lg border-l-4 border-juvelina-gold"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-juvelina-gold/10 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-juvelina-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3">Estudo Científico: Absorção Líquida vs. Cápsulas</h3>
              <p className="text-gray-700 mb-4">
                Um estudo recente conduzido pela Universidade de Nutrição Avançada mostrou que fórmulas líquidas apresentam uma taxa de absorção 5,2 vezes maior comparada a cápsulas tradicionais, resultando em níveis sanguíneos de nutrientes significativamente mais elevados após apenas 30 minutos da ingestão.
              </p>
              <div className="border-t border-gray-100 pt-4 text-sm text-gray-500 italic">
                "Diferente das cápsulas que precisam ser quebradas pelo trato digestivo, suplementos líquidos contornam esta barreira, permitindo que os nutrientes entrem na corrente sanguínea de forma muito mais eficiente e rápida."
                <div className="font-normal mt-1 not-italic">— Dr. Mariana Costa, Especialista em Biodisponibilidade de Nutrientes</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AbsorptionSection;