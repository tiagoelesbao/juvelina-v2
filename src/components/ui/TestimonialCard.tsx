// src/components/ui/TestimonialCard.tsx
import React from 'react';
import { Star, Instagram } from 'lucide-react';
import TikTokIcon from './TikTokIcon';

export interface Testimonial {
  id: number;
  name: string;
  username: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
  platform?: 'instagram' | 'tiktok';
  category?: 'energia' | 'imunidade' | 'beleza';
  highlight?: boolean;
  verified?: boolean;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  onClick: (id: number) => void;
}

// Usando React.memo para evitar re-renders desnecessários
const TestimonialCard = React.memo(({ testimonial, onClick }: TestimonialCardProps) => {
  // Função para renderizar as estrelas de avaliação
  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={14} 
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );

  // Cores de fundo para cada categoria
  const categoryColors = {
    energia: 'bg-yellow-100 text-yellow-800',
    imunidade: 'bg-green-100 text-green-800', 
    beleza: 'bg-purple-100 text-purple-800'
  };

  // Texto para exibição da categoria
  const categoryText = {
    energia: 'Energia',
    imunidade: 'Imunidade',
    beleza: 'Beleza'
  };

  return (
    <div 
      className="card-testimonial cursor-pointer"
      onClick={() => onClick(testimonial.id)}
    >
      <div className="flex items-center gap-3 mb-3">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-1">
            <h4 className="font-bold">{testimonial.name}</h4>
            {testimonial.verified && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-1">
            {renderStars(testimonial.rating)}
            {testimonial.platform && (
              <div className="ml-2">
                {testimonial.platform === 'instagram' ? (
                  <Instagram size={12} className="text-pink-600" />
                ) : (
                  <TikTokIcon size={12} className="text-black" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm">{testimonial.text}</p>
      
      <div className="flex justify-between items-center mt-3">
        <div className="text-xs text-gray-500">{testimonial.date}</div>
        
        {testimonial.category && (
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[testimonial.category]}`}>
            {categoryText[testimonial.category]}
          </div>
        )}
      </div>
      
      {/* Badge para depoimentos destacados */}
      {testimonial.highlight && (
        <div className="absolute -top-2 -left-2 bg-juvelina-gold text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
          Destaque
        </div>
      )}
    </div>
  );
});

export default TestimonialCard;