// src/components/sections/ViralOfferSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShoppingCart, CheckCircle, AlertCircle, TrendingUp, Users, Gift } from 'lucide-react';
import AnimatedButton from '../../components/ui/AnimatedButton';
import FireIcon from '../../components/ui/FireIcon';

interface ViralOfferSectionProps {
  onCtaClick: (e?: React.MouseEvent) => void;
}

const ViralOfferSection: React.FC<ViralOfferSectionProps> = ({ onCtaClick }) => {
  // Estado para controlar a contagem regressiva
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 59,
    seconds: 59
  });
  
  // Estado para controlar o número de unidades disponíveis
  const [unitsLeft, setUnitsLeft] = useState(54);
  
  // Estado para controlar a porcentagem de desconto (simula oferta dinâmica)
  const [discountPercentage, setDiscountPercentage] = useState(30);
  
  // Estado para notificações em tempo real
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    name: string;
    location: string;
    time: number;
    action: 'comprou' | 'assinou';
  }>>([]);
  
  // Referência para o elemento da oferta
  const offerRef = useRef<HTMLDivElement>(null);
  
  // Efeito para a contagem regressiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59, hours: prev.hours };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reiniciar o timer para manter a urgência
          return { hours: 5, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Efeito para simular redução gradual de unidades disponíveis
  useEffect(() => {
    const unitReductionTimer = setInterval(() => {
      const reduction = Math.floor(Math.random() * 2) + 1; // Reduz 1 ou 2 unidades
      
      setUnitsLeft(prev => {
        if (prev <= 10) {
          // Redefine para um valor maior quando fica muito baixo
          return Math.floor(Math.random() * 30) + 40;
        }
        return prev - reduction;
      });
    }, 60000); // Atualiza a cada minuto
    
    return () => clearInterval(unitReductionTimer);
  }, []);
  
  // Efeito para simular notificações de compras
  useEffect(() => {
    const namesPool = [
      "Mariana S.", "Carlos E.", "Juliana", "Ricardo", "Amanda", 
      "Paulo", "Fernanda", "João", "Luciana", "Gabriel",
      "Camila", "Rafael", "Patrícia", "Bruno", "Ana Clara"
    ];
    
    const locationsPool = [
      "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
      "Curitiba, PR", "Porto Alegre, RS", "Salvador, BA",
      "Recife, PE", "Fortaleza, CE", "Brasília, DF", "Florianópolis, SC"
    ];
    
    // Gera uma notificação inicial
    generateNotification();
    
    // Configura um intervalo para gerar notificações
    const notificationTimer = setInterval(() => {
      // 70% de chance de gerar uma notificação a cada intervalo
      if (Math.random() < 0.7) {
        generateNotification();
      }
    }, 30000); // A cada 30 segundos
    
    function generateNotification() {
      const newNotification = {
        id: Date.now(),
        name: namesPool[Math.floor(Math.random() * namesPool.length)],
        location: locationsPool[Math.floor(Math.random() * locationsPool.length)],
        time: Math.floor(Math.random() * 15) + 1, // 1-15 minutos atrás
        action: Math.random() > 0.3 ? 'comprou' : 'assinou' as 'comprou' | 'assinou'
      };
      
      setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    }
    
    return () => clearInterval(notificationTimer);
  }, []);
  
  // Efeito para simular variação no desconto
  useEffect(() => {
    const discountTimer = setInterval(() => {
      // Ajuste aleatório do desconto entre 28% e 35%
      const newDiscount = 28 + Math.floor(Math.random() * 8);
      setDiscountPercentage(newDiscount);
    }, 300000); // A cada 5 minutos
    
    return () => clearInterval(discountTimer);
  }, []);
  
  return (
    <section id="oferta" className="py-20 bg-gradient-to-b from-white to-juvelina-mint/20 relative overflow-hidden">
      {/* Padrão de fundo hexagonal */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.66 22.17v26.66L30 60l21.34-11.17V22.17L30 10.39z' fill='%23A9683D' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block bg-juvelina-gold/20 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4 animate-pulse">
            Oferta por Tempo Limitado
          </span>
          <h2 className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-juvelina-gold">
            Oferta Especial de Lançamento
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transforme sua saúde e bem-estar com nossa oferta exclusiva. Válida apenas enquanto durarem os estoques!
          </p>
        </div>
        
        {/* Contador e oferta principal */}
        <div className="relative mx-auto max-w-5xl" ref={offerRef}>
          {/* Badge de tendência */}
          <motion.div
            className="absolute -top-4 md:-top-5 -left-2 md:left-10 z-10 bg-white px-3 py-1 rounded-full shadow-lg border border-juvelina-mint/30 flex items-center gap-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-xs md:text-sm font-medium text-gray-800">Em alta: +{((countPurchases() * 100) / 150).toFixed(0)}% de aumento nas vendas hoje</span>
          </motion.div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Barra de progresso na parte superior */}
            <div className="bg-juvelina-gold/10 p-3 relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-juvelina-gold rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${100 - Math.floor((unitsLeft / 100) * 100)}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-500">Vendidos: {100 - unitsLeft}</span>
                <span className="text-juvelina-gold font-medium">Restantes: {unitsLeft}</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 p-8">
              {/* Coluna da Esquerda - Imagem do Produto */}
              <div className="md:col-span-1">
                <div className="relative mx-auto max-w-xs">
                  <img 
                    src="https://images.unsplash.com/photo-1607006333439-505849ef4f76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Juvelina Multivitamínico Líquido" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  
                  {/* Badge de desconto */}
                  <motion.div
                    className="absolute -top-3 -right-3 bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <div className="text-center leading-none">
                      <span className="text-lg font-bold">{discountPercentage}%</span>
                      <br />
                      <span className="text-xs">OFF</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Selos de credibilidade */}
                <div className="flex justify-center gap-3 mt-4">
                  {[
                    { icon: <CheckCircle size={16} />, label: "Testado" },
                    { icon: <CheckCircle size={16} />, label: "Natural" },
                    { icon: <CheckCircle size={16} />, label: "Vegano" }
                  ].map((badge, index) => (
                    <div key={index} className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center gap-1 text-gray-700">
                      {badge.icon}
                      <span>{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Coluna do Meio - Detalhes da Oferta */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-3">Juvelina Organics - Multivitamínico Líquido</h3>
                
                <div className="flex items-baseline mb-4">
                  <div className="text-gray-400 line-through text-xl">R$ 179,90</div>
                  <div className="text-3xl font-bold text-juvelina-gold ml-3">R$ {(179.9 * (1 - discountPercentage/100)).toFixed(2).replace('.', ',')}</div>
                  <span className="text-sm text-gray-500 ml-2">/frasco</span>
                </div>
                
                {/* Detalhes da Oferta */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="text-sm text-gray-600 mb-3">A oferta inclui:</div>
                  <ul className="space-y-3">
                    {[
                      "1 frasco de Juvelina Multivitamínico Líquido (30 dias de uso)",
                      "Frete Grátis para todo Brasil",
                      "Garantia de 30 dias ou seu dinheiro de volta",
                      "Acesso ao Guia de Bem-Estar Juvelina (PDF)",
                      unitsLeft < 30 ? "BÔNUS: Consulta online com especialista" : ""
                    ].filter(Boolean).map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      >
                        <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-gray-700">
                          {item}
                          {index === 4 && (
                            <span className="text-red-500 font-medium"> NOVO!</span>
                          )}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Timer */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Clock size={18} className="text-juvelina-gold" />
                    <span className="font-medium">Oferta termina em:</span>
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    {/* Horas */}
                    <div className="bg-juvelina-gold text-white py-2 px-3 rounded-lg shadow-md">
                      <div className="text-2xl font-bold">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </div>
                      <div className="text-xs">Horas</div>
                    </div>
                    
                    <div className="text-2xl font-bold self-center">:</div>
                    
                    {/* Minutos */}
                    <div className="bg-juvelina-gold text-white py-2 px-3 rounded-lg shadow-md">
                      <div className="text-2xl font-bold">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-xs">Minutos</div>
                    </div>
                    
                    <div className="text-2xl font-bold self-center">:</div>
                    
                    {/* Segundos */}
                    <div className="bg-juvelina-gold text-white py-2 px-3 rounded-lg shadow-md">
                      <div className="text-2xl font-bold">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-xs">Segundos</div>
                    </div>
                  </div>
                </div>
                
                {/* Botão CTA */}
                <AnimatedButton
                  onClick={onCtaClick}
                  color="gold"
                  size="lg"
                  className="w-full mb-4"
                >
                  <ShoppingCart size={20} />
                  <span className="font-bold">Garantir Minha Juvelina Agora</span>
                </AnimatedButton>
                
                {/* Compras recentes */}
                <div className="bg-juvelina-mint/10 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-juvelina-emerald" />
                    <span className="text-sm font-medium text-gray-700">Compras recentes</span>
                  </div>
                  
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    <AnimatePresence>
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          className="flex items-center gap-2 text-xs bg-white p-2 rounded"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium">{notification.name}</span>
                          <span className="text-gray-500">
                            {notification.action} {notification.action === 'assinou' ? 'o plano mensal' : 'Juvelina'}
                          </span>
                          <span className="text-gray-400 ml-auto">há {notification.time} min</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rodapé com selos e pagamentos */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <AlertCircle size={16} className="text-juvelina-gold" />
                  <span>Estoque limitado: apenas {unitsLeft} unidades disponíveis!</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" className="h-6 w-auto" alt="Visa" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" className="h-6 w-auto" alt="Mastercard" />
                  <img src="https://cdn-icons-png.flaticon.com/512/217/217425.png" className="h-6 w-auto" alt="Boleto" />
                  <img src="https://cdn-icons-png.flaticon.com/512/888/888870.png" className="h-6 w-auto" alt="Pix" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Badges flutuantes */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <Gift className="text-juvelina-gold" />,
              title: "Frete Grátis",
              desc: "Para todo o Brasil em todos os pedidos"
            },
            {
              icon: <Clock className="text-juvelina-gold" />,
              title: "Entrega Rápida",
              desc: "Em até 7 dias úteis para capitais"
            },
            {
              icon: <ShoppingCart className="text-juvelina-gold" />,
              title: "Pagamento Seguro",
              desc: "Todas as principais formas de pagamento"
            }
          ].map((badge, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100 flex gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-juvelina-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{badge.title}</h4>
                <p className="text-sm text-gray-600">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
  
  // Função para contar compras simuladas
  function countPurchases(): number {
    // Simula um número de compras que aumentou desde o lançamento
    const baseCount = 84;
    const todayIncrease = notifications.length * 5;
    return baseCount + todayIncrease;
  }
};

export default ViralOfferSection;