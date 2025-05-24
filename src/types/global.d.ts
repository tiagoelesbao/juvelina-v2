// types/global.d.ts

// Extender os tipos do React para incluir fetchPriority
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}

// Declarar variáveis globais do Vite
declare const __APP_VERSION__: string;
declare const __BUILD_TIME__: string;

// Adicionar tipo para o processo de análise
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    ANALYZE?: string;
  }
}