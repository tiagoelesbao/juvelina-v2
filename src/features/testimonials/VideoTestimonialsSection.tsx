// src/components/sections/VideoTestimonialsSection.tsx - IMPROVED VERSION
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VideoCarousel from '../../components/ui/VideoCarousel';

// Dados de exemplo de vídeo depoimentos
const videoTestimonials = [
  {
    id: 1,
    name: "Amanda Silva",
    username: "@amandasilva_fit",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    platform: "tiktok" as const,
    category: "energia" as const,
    caption: "Estou completamente impressionada com a Juvelina! Depois de apenas 3 semanas, minha energia mudou completamente. Acordo disposta e mantenho o foco o dia todo. Não é como energéticos que te dão pico e depois queda. É uma energia constante e natural! ✨",
    date: "28/04/2025"
  },
  {
    id: 2,
    name: "Carlos Mendes",
    username: "@carlosmendes.trainer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1450&q=80",
    platform: "tiktok" as const,
    category: "energia" as const,
    caption: "Como treinador, já testei vários suplementos, mas nenhum com absorção tão rápida quanto Juvelina. No treino de força, aguentei 30% mais carga! Meus clientes também já estão percebendo a diferença em suas rotinas. Não tem volta! 💪",
    date: "15/04/2025"
  },
  {
    id: 3,
    name: "Patrícia Alves",
    username: "@patriciaalvesoficial",
    avatar: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1607606116242-357a0d503b6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    platform: "instagram" as const,
    category: "beleza" as const,
    caption: "Aos 42 anos, estava difícil manter a pele bonita e cabelos fortes, até encontrar Juvelina! Em apenas 1 mês, minhas amigas começaram a perguntar meu segredo. Meu dermatologista notou a diferença e até pediu para ver o produto! A elasticidade da pele melhorou muito! 🌟",
    date: "02/05/2025"
  },
  {
    id: 4,
    name: "Rodrigo Costa",
    username: "@rodrigocosta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    platform: "tiktok" as const,
    category: "imunidade" as const,
    caption: "No inverno sempre ficava doente, mas desde que comecei com Juvelina, minha imunidade está no topo! Já faz 3 meses que não pego sequer um resfriado. O melhor é que não preciso tomar várias cápsulas - apenas 5ml uma vez ao dia e pronto! 👊",
    date: "27/04/2025"
  },
  {
    id: 5,
    name: "Ana Paula Monteiro",
    username: "@anapaulamont",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1498671546682-94a232c26d17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    platform: "instagram" as const,
    category: "beleza" as const,
    caption: "Confesso que estava cética no início, mas depois de 6 semanas usando Juvelina, não consigo mais ficar sem! Minhas unhas pararam de quebrar e meu cabelo está crescendo muito mais rápido e forte. Já comprei para toda minha família! 😍",
    date: "05/05/2025"
  },
  {
    id: 6,
    name: "Fernando Gomes",
    username: "@fernandogfit",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    platform: "tiktok" as const,
    category: "energia" as const,
    caption: "Como personal trainer, recomendo Juvelina para todos meus alunos que precisam de mais energia. Eu mesmo uso diariamente antes dos treinos e sinto uma diferença absurda na performance. O sabor é bem neutro e fácil de tomar. Top demais! 💯",
    date: "30/04/2025"
  },
  {
    id: 7,
    name: "Camila Duarte",
    username: "@camiladuarte.life",
    avatar: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    platform: "instagram" as const,
    category: "imunidade" as const,
    caption: "Achei que não ia notar diferença, mas estou totalmente surpresa! Não pego gripe há meses e minha energia está constante durante todo o dia. O melhor é que não dá aquela queda depois, como acontece com café. Vou continuar usando com certeza! 🌿",
    date: "22/04/2025"
  },
  {
    id: 8,
    name: "Lucas Marques",
    username: "@lucasmarques",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1578496781379-7dcfb995293d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    platform: "tiktok" as const,
    category: "imunidade" as const,
    caption: "Sou médico e sempre fui cético com suplementos, mas os resultados dos estudos de biodisponibilidade da Juvelina me convenceram a testar. Após 2 meses, meus exames mostram níveis de vitamina D e zinco muito melhores. Recomendo a pacientes selecionados. 👨‍⚕️",
    date: "18/04/2025"
  },
  {
    id: 9,
    name: "Dr. Marcelo",
    username: "@drmarcelosilvamed",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    platform: "instagram" as const,
    category: "imunidade" as const,
    caption: "Recomendo Juvelina aos meus pacientes pela alta absorção e qualidade. Os resultados clínicos têm sido impressionantes, especialmente para aqueles com deficiências nutricionais e baixa imunidade.",
    date: "10/04/2025"
  },
  {
    id: 10,
    name: "Gabriela Lima",
    username: "@gabilimafit",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    videoThumbnail: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVuZXJneXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    platform: "tiktok" as const,
    category: "energia" as const,
    caption: "Galera, eu tô CHOCADA com a Juvelina! Sou nutricionista e sempre recomendo suplementos para meus pacientes, mas esse é diferente. A absorção é MUITO melhor, e a diferença na energia é surreal! 🤯 #JuvelinaAprovada",
    date: "02/05/2025"
  }
];

const VideoTestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('todos');

  return (
    <section id="video-depoimentos" className="py-20 bg-gradient-to-b from-juvelina-mint/20 to-white relative overflow-hidden">
      {/* Padrão de fundo sutil */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.66 22.17v26.66L30 60l21.34-11.17V22.17L30 10.39z' fill='%23A9683D' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-juvelina-gold/20 px-4 py-1 rounded-full text-juvelina-gold font-medium mb-4">
            Histórias Reais
          </span>
          <motion.h2 
            className="text-3xl md:text-4xl font-['Ws_Paradose'] mb-4 text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Veja as Transformações em <span className="text-juvelina-gold">Vídeo</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Assista aos depoimentos autênticos de pessoas que transformaram suas vidas com Juvelina Organics.
          </motion.p>
        </div>
        
        {/* Video Carousel Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <VideoCarousel 
            testimonials={videoTestimonials} 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter}
          />
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href="#oferta" 
            className="inline-flex items-center gap-2 bg-juvelina-gold text-white px-6 py-3 rounded-full hover:bg-juvelina-gold/90 transition-colors shadow-md"
          >
            <span className="font-medium">Transforme sua vida como eles</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTestimonialsSection;