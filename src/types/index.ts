// src/types/index.ts
export interface PerformanceContextType {
  isMobile: boolean;
  isTablet: boolean;
  isLowEnd: boolean;
  reduceMotion: boolean;
}

export interface StatItem {
  id: number;
  value: number;
  target: number;
  label: string;
  icon: string;
}

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