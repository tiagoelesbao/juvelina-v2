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

  // Animação de contagem para estatísticas
  useEffect(() => {
    if (inView) {
      console.log("Starting counter animations");
      
      // Reset valores para 0 antes de começar a animação
      setStats(statsArray.map(stat => ({ ...stat, value: 0 })));
      
      // Começar animação após um pequeno delay
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          let allCompleted = true;
          
          setStats(prev => 
            prev.map(stat => {
              if (stat.value < stat.target) {
                allCompleted = false;
                
                // Ajuste dinâmico de incremento baseado no tamanho do target
                let increment;
                if (stat.target > 10000) {
                  increment = Math.ceil(stat.target / 50);
                } else if (stat.target > 1000) {
                  increment = Math.ceil(stat.target / 40);
                } else if (stat.target > 100) {
                  increment = Math.ceil(stat.target / 30);
                } else {
                  increment = Math.max(1, Math.ceil(stat.target / 20));
                }
                
                const newValue = stat.value + increment;
                
                return {
                  ...stat,
                  value: newValue > stat.target ? stat.target : newValue
                };
              }
              return stat;
            })
          );
          
          if (allCompleted) {
            console.log("Counter animations completed");
            clearInterval(interval);
          }
        }, 40);
        
        return () => clearInterval(interval);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [inView, statsArray]);

  return { stats };
}

// Função formatadora exportada separadamente para reutilização
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `+${(num / 1000).toFixed(0)}mil`;
  } else if (num >= 1000) {
    return `+${(num / 1000).toFixed(1)}mil`.replace('.', ',');
  }
  return num.toString();
}