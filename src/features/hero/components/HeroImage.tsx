// src/features/hero/components/HeroImage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroImage.module.css';

const HeroImage: React.FC = () => {
  const imageUrl = import.meta.env.PROD 
    ? '/images/juvelina-bottle.png'
    : `${window.location.origin}/images/juvelina-bottle.png`;
  
  // Controles de ajuste fino para desktop
  const desktopControls = {
    tiktok: {
      top: '-190px',        // Ajuste a posição vertical
      right: '10px',       // Ajuste a posição horizontal
      scale: 1.1,          // Ajuste o tamanho (1 = 100%, 1.1 = 110%)
    },
    natural: {
      top: '-88px',        // Ajuste a posição vertical
      left: '-10px',       // Ajuste a posição horizontal
      scale: 1.05,         // Ajuste o tamanho
    },
    pureza: {
      bottom: '-100px',    // Mantém posição atual
      right: '55px',
      scale: 1,
    },
    dermato: {
      bottom: '-28px',      // Mantém posição atual
      left: '-119px',
      scale: 0.95,
    },
    absorcao: {
      top: '40px',        // Ajuste a posição vertical
      right: '-100px',     // Ajuste a posição horizontal
      scale: 1,
    }
  };
  
  return (
    <div className="md:col-span-1 relative">
      {/* TikTok Badge - AJUSTADO PARA DESKTOP */}
      <motion.div
        className="absolute z-30"
        style={{
          // Mobile
          top: window.innerWidth < 768 ? '-48px' : desktopControls.tiktok.top,
          right: window.innerWidth < 768 ? '0' : desktopControls.tiktok.right,
        }}
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 0.85, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className={`bg-white rounded-full shadow-xl p-2 md:p-3 ${styles.tiktokBadge}`}
          style={{
            transform: window.innerWidth >= 768 ? `scale(${desktopControls.tiktok.scale})` : undefined,
          }}
          animate={{ 
            scale: [1, 1.05, 1],
            boxShadow: [
              "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "0px 10px 25px rgba(0, 0, 0, 0.15)",
              "0px 4px 10px rgba(0, 0, 0, 0.1)"
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
        >
          <motion.div 
            className="w-7 h-7 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center"
            animate={{ 
              opacity: [0.8, 1, 0.8],
              filter: [
                "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.2))",
                "drop-shadow(0px 0px 10px rgba(238, 29, 82, 0.5))",
                "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.2))"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            <svg 
              width="14" 
              height="14"
              className="md:w-5 md:h-5" 
              viewBox="0 0 24 24" 
              fill="white"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </motion.div>
          <div className={styles.tiktokTextContainer}>
            <motion.span 
              className={styles.tiktokTitle}
              animate={{ 
                color: ["#000000", "#EE1D52", "#000000"],
                textShadow: [
                  "0px 0px 0px rgba(238, 29, 82, 0)",
                  "0px 0px 5px rgba(238, 29, 82, 0.5)",
                  "0px 0px 0px rgba(238, 29, 82, 0)"
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              Viral no TikTok
            </motion.span>
            <span className={styles.tiktokSubtitle}>
              +2M de visualizações
            </span>
          </div>
        </motion.div>
      </motion.div>
    
      {/* Container da imagem principal */}
      <div className="relative mx-auto max-w-lg">
        {/* Efeito de luz radial */}
        <div 
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(169,104,61,0.15) 0%, transparent 70%)",
            filter: "blur(30px)",
            transform: "translate(-50%, -50%) scale(1.2)"
          }}
        />
        
        {/* Imagem do produto */}
        <motion.div
          className="relative z-10"
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        >
          <img 
            src={imageUrl}
            alt="Suplemento Líquido Juvelina" 
            className="max-w-full h-auto transform scale-90 md:scale-125 lg:scale-150"
            style={{ 
              filter: "drop-shadow(0px 30px 60px rgba(169,104,61,0.3))"
            }}
            onError={(e) => {
              console.error('Erro ao carregar imagem Juvelina:', e);
              const target = e.currentTarget;
              if (!target.src.includes('unsplash')) {
                target.src = 'https://images.unsplash.com/photo-1607006348458-ff29e31ebb09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
              }
            }}
          />
        </motion.div>

        {/* SELOS - Versão Mobile */}
        <div className="md:hidden">
          {/* Selo 100% Natural - Mobile */}
          <motion.div 
            className="absolute top-2 left-12"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 0.75 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div
              className="bg-white rounded-full pl-1.5 pr-2.5 py-1 flex items-center gap-1 shadow-md"
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                y: { duration: 3.5, repeat: Infinity, repeatType: "reverse" }
              }}
              style={{
                fontSize: '11px',
                boxShadow: "0 4px 12px rgba(169,104,61,0.2)",
                border: "1px solid rgba(169,104,61,0.1)"
              }}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-100">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="font-medium text-gray-700 pr-1">100% Natural</span>
            </motion.div>
          </motion.div>
          
          {/* Selo Pureza Certificada - Mobile */}
          <motion.div
            className="absolute bottom-2 right-10"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 0.8 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="bg-white rounded-full pl-1.5 pr-2.5 py-1 flex items-center gap-1 shadow-md"
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                y: { delay: 1.5, duration: 4, repeat: Infinity, repeatType: "reverse" }
              }}
              style={{
                fontSize: '11px',
                boxShadow: "0 4px 12px rgba(169,104,61,0.2)",
                border: "1px solid rgba(169,104,61,0.1)"
              }}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-juvelina-gold/20">
                <svg width="12" height="12" viewBox="0 0 20 20" fill="#A9683D">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium text-gray-700 pr-1">Pureza Certificada</span>
            </motion.div>
          </motion.div>
          
          {/* Selo Zero Açúcares - Mobile */}
          <motion.div
            className="absolute bottom-8 left-0 z-10"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 0.75 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              className="bg-white rounded-full pl-1.5 pr-3 py-1 flex items-center gap-1 shadow-md"
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, repeatType: "reverse" }
              }}
              style={{
                fontSize: '11px',
                boxShadow: "0 4px 12px rgba(169,104,61,0.2)",
                border: "1px solid rgba(169,104,61,0.1)"
              }}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-100">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <span className="font-medium text-gray-700 pr-1">Zero Açúcar</span>
            </motion.div>
          </motion.div>
          
          {/* Selo Absorção 5x - Mobile */}
          <motion.div
            className="absolute top-10 right-0 z-10"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 0.75 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <motion.div
              className="bg-white rounded-full pl-1.5 pr-2.5 py-1 flex items-center gap-1 shadow-md"
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                y: { delay: 1.9, duration: 3.7, repeat: Infinity, repeatType: "reverse" }
              }}
              style={{
                fontSize: '11px',
                boxShadow: "0 4px 12px rgba(169,104,61,0.2)",
                border: "1px solid rgba(169,104,61,0.1)"
              }}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-juvelina-gold/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A9683D" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span className="font-medium text-gray-700 pr-1">Absorção 5x</span>
            </motion.div>
          </motion.div>
        </div>

        {/* SELOS - Versão Desktop com controles precisos */}
        <div className="hidden md:block">
          {/* Selo 100% Natural - Desktop - POSIÇÃO CONTROLÁVEL */}
          <motion.div 
            className="absolute z-0"
            style={{
              top: desktopControls.natural.top,
              left: desktopControls.natural.left,
              transform: `scale(${desktopControls.natural.scale})`,
            }}
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: desktopControls.natural.scale, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div
              className="bg-white rounded-full pl-2 pr-4 py-2 flex items-center gap-2 shadow-lg"
              style={{
                boxShadow: "0 10px 25px rgba(169,104,61,0.2)",
                border: "1px solid rgba(169,104,61,0.1)"
              }}
              whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(169,104,61,0.3)" }}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                y: { duration: 3.5, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="font-medium text-sm text-gray-700">
                100% Natural
              </span>
            </motion.div>
          </motion.div>
          
          {/* Selo de Pureza Certificada - Desktop */}
          <motion.div
            className="absolute z-0"
            style={{
              bottom: desktopControls.pureza.bottom,
              right: desktopControls.pureza.right,
              transform: `scale(${desktopControls.pureza.scale})`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: desktopControls.pureza.scale, 
              y: 0
            }}
            transition={{ 
              delay: 1, 
              duration: 0.5,
            }}
          >
            <motion.div
              className="bg-white rounded-full pl-2 pr-4 py-2 flex items-center gap-2 shadow-lg"
              style={{
                boxShadow: "0 10px 25px rgba(169,104,61,0.2)",
                border: "1px solid rgba(169,104,61,0.1)"
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ 
                y: { delay: 1.5, duration: 4, repeat: Infinity, repeatType: "reverse" }
              }}
              whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(169,104,61,0.3)" }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(169,104,61,0.15)" }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="15" 
                  height="15" 
                  viewBox="0 0 20 20" 
                  fill="#A9683D"
                >
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium text-sm text-gray-700">
                Pureza Certificada
              </span>
            </motion.div>
          </motion.div>
          
          {/* Selo Zero Açúcares - Desktop */}
          <motion.div 
            className="absolute z-20"
            style={{
              bottom: desktopControls.dermato.bottom,
              left: desktopControls.dermato.left,
              transform: `scale(${desktopControls.dermato.scale})`,
            }}
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: desktopControls.dermato.scale, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              className="bg-white rounded-full pl-2 pr-4 py-2 flex items-center gap-2 shadow-lg"
              style={{
                boxShadow: "0 10px 25px rgba(169,104,61,0.3)",
                border: "1px solid rgba(169,104,61,0.1)"
              }}
              whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(169,104,61,0.4)" }}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <span className={styles.dermatoDesktop}>
                Fórmula Zero Açúcar
              </span>
            </motion.div>
          </motion.div>
          
          {/* Selo "Absorção 5x" - Desktop */}
          <motion.div
            className="absolute z-20"
            style={{
              top: desktopControls.absorcao.top,
              right: desktopControls.absorcao.right,
              transform: `scale(${desktopControls.absorcao.scale})`,
            }}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ 
              opacity: 1, 
              scale: desktopControls.absorcao.scale, 
              x: 0,
            }}
            transition={{ 
              delay: 1.4, 
              duration: 0.5,
            }}
          >
            <motion.div
              className="bg-white rounded-full pl-2 pr-4 py-2 flex items-center gap-2 shadow-lg"
              style={{
                boxShadow: "0 10px 25px rgba(169,104,61,0.2)",
                border: "1px solid rgba(169,104,61,0.1)"
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                y: { delay: 1.9, duration: 3.7, repeat: Infinity, repeatType: "reverse" }
              }}
              whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(169,104,61,0.3)" }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(169,104,61,0.15)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A9683D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span className="font-medium text-sm text-gray-700">
                Absorção 5x
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;