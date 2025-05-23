import { useState, useEffect } from 'react';

export interface StatItem {
  id: number;
  value: number;
  target: number;
  label: string;
  icon: string;
}

export function useCountUp(statsArray: StatItem[], inView: boolean) {
  const [stats, setStats] = useState<StatItem[]>(statsArray);

  // Animação de contagem para estatísticas - otimizada
  useEffect(() => {
    if (inView) {
      console.log("Starting counter animations");
      
      // Ajuste para garantir que os incrementos sejam proporcionais aos valores alvo
      const interval = setInterval(() => {
        let allCompleted = true;
        
        setStats(prev => 
          prev.map(stat => {
            if (stat.value < stat.target) {
              allCompleted = false;
              
              // Ajuste dinâmico de incremento baseado no tamanho do target
              const increment = stat.target > 1000 ? 
                Math.ceil(stat.target / 40) : 
                Math.max(1, Math.ceil(stat.target / 15));
              
              return {
                ...stat,
                value: Math.min(stat.value + increment, stat.target)
              };
            }
            return stat;
          })
        );
        
        if (allCompleted) {
          console.log("Counter animations completed");
          clearInterval(interval);
        }
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [inView]);

  return { stats };
}

// Função formatadora exportada separadamente para reutilização
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `+${(num / 1000).toFixed(0)}mil`;
  } else if (num >= 1000) {
    return `+${(num / 1000).toFixed(1)}mil`.replace('.', ',');
  }
  return `${num}%`;
}