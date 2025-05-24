// src/features/testimonials/VideoTestimonialsSection/types.ts
export interface VideoTestimonial {
  id: number;
  name: string;
  username: string;
  thumbnail: string;
  videoUrl?: string;
  caption: string;
  views: string;
  rating: number;
  likes?: string;
  comments?: string;
  category?: 'energia' | 'imunidade' | 'beleza';
  platform?: 'instagram' | 'tiktok' | 'youtube';
  verified?: boolean;
  date?: string;
}