// Tipos de produto
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  benefits: string[];
}

// Tipos de depoimento
export interface Testimonial {
  id: number;
  name: string;
  username: string;
  avatar: string;
  content: string;
  rating: number;
  platform: 'instagram' | 'tiktok';
  category: 'energia' | 'imunidade' | 'beleza';
  verified?: boolean;
  date: string;
}

// Tipos de notificação
export interface Notification {
  id: number;
  type: 'purchase' | 'review' | 'creator' | 'stock' | 'discount';
  name?: string;
  avatar?: string;
  message: string;
  time: string;
  location?: string;
}