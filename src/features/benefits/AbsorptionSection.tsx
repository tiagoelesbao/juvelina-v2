// src/features/benefits/AbsorptionSection.tsx - REFATORADO
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WaveTransition from '../../components/ui/WaveTransition';

const AbsorptionSection: React.FC = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const [containerRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const controls = useAnimation();
  const [showJuvelinaValue, setShowJuvelinaValue] = useState(false);
  const [showCapsulaValue, setShowCapsulaValue] = useState(false);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      // Mostrar valores após as barras animarem
      setTimeout(() => setShowJuvelinaValue(true), 1000);
      setTimeout(() => setShowCapsulaValue(true), 1500);
    }
  }, [controls, inView]);

  return (
    <section 
      id="absorpcao" 
      className="relative overflow-hidden bg-gradient-to-b from-white via-juvelina-mint/5 to-juvelina-mint/20"
      ref={containerRef}
    >
      {/* Background pattern animado similar ao video testimonials */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.133 7-7s-3.134-7-7-7-7 3.133-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.133 7-7s-3.134-7-7-7-7 3.133-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23D4B26A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            y: backgroundY
          }}
        />
      </div>

      {/* Efeito de gradiente superior similar ao video testimonials */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent z-10" />
      
      <div className="container mx-auto px-4 relative z-20 py-24">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block bg-juvelina-mint bg-opacity-30 px-4 py-1 rounded-full text-juvelina-emerald font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ciência & Inovação
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-juvelina-emerald"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Absorção 5x Superior
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nossa fórmula líquida revolucionária permite que seu corpo absorva os nutrientes até 5x mais rápido que suplementos em cápsulas tradicionais.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Coluna de Forma Líquida - CORRIGIDA */}
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
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
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
              
              {/* Barra de progresso com valor FORA */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Taxa de Absorção</span>
                  <motion.div>
                    {showJuvelinaValue && (
                      <motion.span 
                        className="font-bold text-juvelina-gold text-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        100% absorvido
                      </motion.span>
                    )}
                  </motion.div>
                </div>
                
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-juvelina-gold to-juvelina-mint rounded-full"
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
                    {/* Efeito de brilho animado */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ["-100%", "200%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  </motion.div>
                  
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Nutrientes em forma líquida são facilmente absorvidos pelo organismo, sem necessidade de digestão prévia, chegando rapidamente às células.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Absorção Imediata:', desc: 'Resultados desde as primeiras semanas' },
                  { title: 'Biodisponibilidade Maximizada:', desc: 'Nutrientes em forma pré-digerida' },
                  { title: 'Sinergia de Ingredientes:', desc: 'Maior eficácia e resultados' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-start gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.3 + idx * 0.1 }
                      }
                    }}
                  >
                    <div className="mt-1 text-juvelina-gold">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">{item.title}</span> {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Coluna de Cápsulas - CORRIGIDA */}
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
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
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
              
              {/* Barra de progresso com valor FORA */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Taxa de Absorção</span>
                  <motion.div>
                    {showCapsulaValue && (
                      <motion.span 
                        className="font-bold text-gray-500 text-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        20% absorvido
                      </motion.span>
                    )}
                  </motion.div>
                </div>
                
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gray-400 rounded-full"
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
                  />
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Cápsulas precisam ser quebradas pelo sistema digestivo, perdendo grande parte dos nutrientes no processo de absorção.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Baixa Absorção:', desc: 'Grande parte dos nutrientes é perdida' },
                  { title: 'Processo Lento:', desc: 'Necessidade de quebra pelo sistema digestivo' },
                  { title: 'Resultados Tardios:', desc: 'Podem demorar meses para aparecer' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-start gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.3 + idx * 0.1 }
                      }
                    }}
                  >
                    <div className="mt-1 text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">{item.title}</span> {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Seção de Estudo */}
        <motion.div 
          className="mt-16 mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-juvelina-gold">
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
          </div>
        </motion.div>
      </div>
      
      {/* Wave transition no final como no video testimonials */}
      <WaveTransition 
        color="#C2F7BC" 
        className="mt-16"
        height={120}
        animated={true}
        variant="dramatic"
      />
    </section>
  );
};

export default AbsorptionSection;