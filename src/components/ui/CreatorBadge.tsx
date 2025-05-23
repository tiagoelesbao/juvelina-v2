import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, CheckCircle } from 'lucide-react';

interface Creator {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  verified: boolean;
  rating: number;
  quote: string;
  platform: 'instagram' | 'tiktok';
}

const CreatorBadge: React.FC = () => {
  const [showBadge, setShowBadge] = useState(false);
  const [activeCreator, setActiveCreator] = useState<number>(0);
  const [badgeClosed, setBadgeClosed] = useState<boolean>(false);
  
  // Lista de creators que endossam a marca
  const creators: Creator[] = [
    {
      id: 1,
      name: "Amanda Costa",
      handle: "@amandacosta",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      followers: "345K",
      verified: true,
      rating: 5,
      quote: "Juvelina mudou minha rotina! Recomendo para todas as minhas seguidoras.",
      platform: "instagram"
    },
    {
      id: 2,
      name: "Carol Fitness",
      handle: "@carolfitpro",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      followers: "198K",
      verified: true,
      rating: 5,
      quote: "O melhor suplemento que já testei! Faz parte da minha rotina de treinos.",
      platform: "tiktok"
    },
    {
      id: 3,
      name: "Dr. Marcelo",
      handle: "@drmarcelo.saude",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      followers: "521K",
      verified: true,
      rating: 5,
      quote: "Recomendo Juvelina aos meus pacientes pela alta absorção e qualidade.",
      platform: "instagram"
    }
  ];
  
  // Mostra o badge após um delay maior e alterna entre creators
  useEffect(() => {
    // Não mostrar notificações se o usuário fechou manualmente
    if (badgeClosed) return;
    
    // Mostrar o badge após 25 segundos
    const timer = setTimeout(() => {
      setShowBadge(true);
    }, 25000);
    
    // Mudar de creator a cada 12 segundos
    const interval = setInterval(() => {
      if (showBadge) {
        setActiveCreator(prev => (prev + 1) % creators.length);
      }
    }, 12000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [showBadge, creators.length, badgeClosed]);
  
  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
          />
        </svg>
      ))}
    </div>
  );
  
  return (
    <AnimatePresence>
      {showBadge && !badgeClosed && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-5 top-24 z-40 max-w-xs"
        >
          <div className="bg-white rounded-lg shadow-xl p-3 border border-juvelina-mint">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src={creators[activeCreator].avatar} 
                  alt={creators[activeCreator].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-juvelina-gold"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm">{creators[activeCreator].name}</span>
                    {creators[activeCreator].verified && (
                      <CheckCircle size={12} className="text-blue-500 fill-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    {creators[activeCreator].platform === 'instagram' ? (
                      <Instagram size={10} />
                    ) : (
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" className="text-black">
                        <path 
                          d="M19.321 7.29152C19.2009 7.24373 19.0824 7.19334 18.9658 7.14033C18.5148 6.94291 18.0986 6.67955 17.738 6.36103C16.9266 5.55089 16.5941 4.72224 16.4558 4.09283H16.4592C16.3465 3.58604 16.3465 3.22694 16.3465 3.22694H14.3077V15.6381C14.3077 15.8549 14.3077 16.0683 14.2917 16.2783C14.2917 16.2885 14.2901 16.2971 14.2884 16.3072C14.2884 16.3106 14.2884 16.314 14.2867 16.3175C14.2217 16.7273 14.0342 17.1065 13.7503 17.4064C13.4664 17.7064 13.0991 17.9131 12.6929 18.0022C12.5299 18.0393 12.3632 18.0581 12.1957 18.0581C11.2312 18.0581 10.447 17.3818 10.2881 16.4922C10.2725 16.4176 10.2621 16.3413 10.257 16.2646C10.2518 16.2007 10.2518 16.1368 10.2518 16.0729V16.0183V2.93576H8.20456V3.96047V4.4456V16.0183C8.20456 16.1368 8.20456 16.2532 8.21153 16.3696C8.21502 16.4456 8.22199 16.5217 8.23245 16.5971C8.23593 16.6216 8.24116 16.6445 8.24639 16.6689C8.46582 18.2348 9.84213 19.4571 11.5014 19.5737C11.7273 19.5909 11.9563 19.5943 12.1853 19.5806C12.4178 19.5669 12.6485 19.5362 12.874 19.4886C13.1164 19.4384 13.3553 19.3674 13.5875 19.276C14.5851 18.8866 15.3796 18.1114 15.7517 17.1134C15.9393 16.6291 16.0428 16.1 16.0428 15.554V15.554V15.5471V10.0775V8.37581V7.99304C16.6626 8.34316 17.3536 8.58358 18.0734 8.69702C18.482 8.76577 18.8974 8.80082 19.321 8.80082V6.78789C19.321 6.78789 19.321 7.32837 19.321 7.29152Z" 
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    <span>{creators[activeCreator].handle}</span>
                    <span className="text-juvelina-gold">• {creators[activeCreator].followers}</span>
                  </div>
                </div>
              </div>
              
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setShowBadge(false);
                  setBadgeClosed(true);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="text-sm text-gray-700 mb-2">
              "{creators[activeCreator].quote}"
            </div>
            
            <div className="flex justify-between items-center">
              {renderStars(creators[activeCreator].rating)}
              
              <a 
                href="#oferta" 
                className="text-xs text-juvelina-gold font-medium hover:underline"
                onClick={() => setShowBadge(false)}
              >
                Ver produto
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatorBadge;