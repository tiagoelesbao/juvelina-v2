import React from 'react';
import { motion } from 'framer-motion';

const HeroImage: React.FC = () => {
  return (
    <div className="md:col-span-1 relative">
      {/* TikTok Badge - posicionado no topo da coluna */}
      <motion.div
        className="absolute -top-10 right-0 z-20"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="bg-white rounded-full shadow-xl flex items-center p-3 gap-2"
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
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center"
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
            {/* TikTok Icon */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="white"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </motion.div>
          <div className="flex flex-col">
            <motion.span 
              className="font-bold text-sm"
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
            <span className="text-xs text-gray-500">+2M de visualizações</span>
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
            transform: "scale(1.2)"
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
            src="https://i.imgur.com/Gkaa22f.png" 
            alt="Suplemento Líquido Juvelina" 
            className="max-w-full h-auto"
            style={{ 
              filter: "drop-shadow(0px 30px 60px rgba(169,104,61,0.3))",
              transform: "scale(1.25)"
            }}
          />
        </motion.div>

        {/* Selos de certificação */}
        <motion.div 
          className="absolute top-1/4 -left-16 transform"
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
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
              y: { duration: 3, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <span 
              className="font-medium text-sm text-gray-700"
            >
              Dermatologicamente Testado
            </span>
          </motion.div>
        </motion.div>
        
        {/* Selo de Pureza Certificada */}
        <motion.div
          className="bg-white rounded-full pl-2 pr-4 py-2 flex items-center gap-2 shadow-lg absolute -bottom-8 right-0"
          style={{
            boxShadow: "0 10px 25px rgba(169,104,61,0.2)",
            border: "1px solid rgba(169,104,61,0.1)"
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -4, 0]
          }}
          transition={{ 
            delay: 1, 
            duration: 0.5,
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
          <span 
            className="font-medium text-sm text-gray-700"
          >
            Pureza Certificada
          </span>
        </motion.div>
        
        {/* Selo adicional */}
        <motion.div
          className="bg-white rounded-full pl-2 pr-4 py-2 flex items-center gap-2 shadow-lg absolute bottom-1/3 -left-12"
          style={{
            boxShadow: "0 10px 25px rgba(169,104,61,0.2)",
            border: "1px solid rgba(169,104,61,0.1)"
          }}
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0,
            y: [0, -5, 0]
          }}
          transition={{ 
            delay: 1.2, 
            duration: 0.5,
            y: { delay: 1.7, duration: 3.5, repeat: Infinity, repeatType: "reverse" }
          }}
          whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(169,104,61,0.3)" }}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <span 
            className="font-medium text-sm text-gray-700"
          >
            100% Natural
          </span>
        </motion.div>
        
        {/* Selo "Absorção 5x" */}
        <motion.div
          className="bg-white rounded-full pl-2 pr-4 py-2 flex items-center gap-2 shadow-lg absolute top-1/2 -right-14"
          style={{
            boxShadow: "0 10px 25px rgba(169,104,61,0.2)",
            border: "1px solid rgba(169,104,61,0.1)"
          }}
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            x: 0,
            y: [0, -5, 0]
          }}
          transition={{ 
            delay: 1.4, 
            duration: 0.5,
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
          <span 
            className="font-medium text-sm text-gray-700"
          >
            Absorção 5x
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroImage;