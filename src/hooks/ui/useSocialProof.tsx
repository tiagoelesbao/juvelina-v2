import { useState, useEffect } from 'react';

interface SocialProof {
  id: number;
  name: string;
  avatar: string;
  action: string;
  time: string;
  location: string;
}

export const useSocialProof = () => {
  const [activeSocialProof, setActiveSocialProof] = useState<number | null>(null);
  
  // Dados de social proof
  const socialProofs: SocialProof[] = [
    {
      id: 1,
      name: "Julia Ribeiro",
      avatar: "https://images.unsplash.com/photo-1619785292559-a15caa28bde6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
      action: "acabou de comprar Juvelina",
      time: "agora mesmo",
      location: "São Paulo, SP"
    },
    {
      id: 2,
      name: "Marcos Almeida",
      avatar: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      action: "assinou o plano mensal",
      time: "há 2 minutos",
      location: "Rio de Janeiro, RJ"
    },
    {
      id: 3,
      name: "Fernanda Costa",
      avatar: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      action: "comprou o kit 3 meses",
      time: "há 5 minutos",
      location: "Belo Horizonte, MG"
    },
    {
      id: 4,
      name: "Pedro Henrique",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      action: "deixou uma avaliação 5 estrelas",
      time: "há 10 minutos",
      location: "Curitiba, PR"
    }
  ];
  
  // Mostrar primeiro social proof após 15 segundos
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setActiveSocialProof(0);
    }, 15000);
    
    // Rotacionar social proofs
    const interval = setInterval(() => {
      if (activeSocialProof !== null) {
        setActiveSocialProof(prev => prev !== null ? (prev + 1) % socialProofs.length : 0);
      }
    }, 8000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [activeSocialProof, socialProofs.length]);
  
  return {
    activeSocialProof,
    socialProofs
  };
};