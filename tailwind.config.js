// tailwind.config.js - Otimizado para Performance
/** @type {import('tailwindcss').Config} */
export default {
  // Arquivos para scan (importante para purge)
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Não incluir node_modules por padrão
    '!./src/**/*.test.{js,ts,jsx,tsx}',
    '!./src/**/*.stories.{js,ts,jsx,tsx}',
  ],
  
  // Modo JIT para gerar apenas CSS usado
  mode: 'jit',
  
  // Dark mode desabilitado (se não usar)
  darkMode: 'media',
  
  theme: {
    extend: {
      // Cores customizadas
      colors: {
        juvelina: {
          gold: '#A9683D',
          mint: '#C2F7BC',
          aqua: '#9BD0D2',
          emerald: '#357266',
          sage: '#8BB8A8',
          cream: '#F9F5F0',
          sand: '#EBE6DD',
          coral: '#E07A5F',
          peach: '#F2CC8F',
        }
      },
      
      // Fontes otimizadas
      fontFamily: {
        display: ['Ws Paradose', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      
      // Animações simplificadas para mobile
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'fadeInUp': 'fadeInUp 0.7s ease-out',
        'slideIn': 'slideIn 0.3s ease-out',
        // Remover animações complexas como float, pulse em produção
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      
      // Breakpoints otimizados
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Breakpoints para diferentes densidades
        'touch': { 'raw': '(hover: none)' },
        'stylus': { 'raw': '(hover: none) and (pointer: fine)' },
        'mouse': { 'raw': '(hover: hover) and (pointer: fine)' },
      },
      
      // Espaçamentos consistentes
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Sombras otimizadas (menos complexas)
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'gold': '0 4px 14px 0 rgba(169, 104, 61, 0.2)',
        'mint': '0 4px 14px 0 rgba(194, 247, 188, 0.3)',
      },
      
      // Transições padronizadas
      transitionDuration: {
        '0': '0ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      
      // Z-index organizados
      zIndex: {
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        'dropdown': 1000,
        'sticky': 1020,
        'fixed': 1030,
        'modal-backdrop': 1040,
        'modal': 1050,
        'popover': 1060,
        'tooltip': 1070,
      },
    },
  },
  
  // Variantes reduzidas para menor CSS
  variants: {
    extend: {
      // Adicionar apenas variantes necessárias
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'disabled'],
      borderColor: ['focus', 'active'],
      textColor: ['active', 'disabled'],
      scale: ['active', 'group-hover'],
    },
  },
  
  // Plugins otimizados
  plugins: [
    // Plugin para hide scrollbar
    function({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
        },
      });
    },
    
    // Plugin para GPU acceleration
    function({ addUtilities }) {
      addUtilities({
        '.gpu': {
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        },
        '.will-change-transform': {
          willChange: 'transform',
        },
        '.will-change-opacity': {
          willChange: 'opacity',
        },
      });
    },
    
    // Plugin para touch-action
    function({ addUtilities }) {
      addUtilities({
        '.touch-pan-x': {
          touchAction: 'pan-x',
        },
        '.touch-pan-y': {
          touchAction: 'pan-y',
        },
        '.touch-none': {
          touchAction: 'none',
        },
      });
    },
  ],
  
  // Configurações de produção
  future: {
    hoverOnlyWhenSupported: true, // Hover apenas quando suportado
    respectDefaultRingColorOpacity: true,
  },
  
  // Otimizações experimentais
  experimental: {
    optimizeUniversalDefaults: true, // Remove defaults não usados
    matchVariant: true,
  },
  
  // Desabilitar recursos não usados
  corePlugins: {
    // Desabilitar se não usar
    preflight: true, // Reset CSS
    container: true, // Usar container customizado
    float: false, // Raramente usado
    clear: false, // Raramente usado
    skew: false, // Transformações complexas
    space: true, // Útil para espaçamento
    divide: false, // Raramente usado
    // Adicione outros que não usa
  },
};