// tailwind.config.js - CONFIGURAÇÃO ATUALIZADA
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        juvelina: {
          // Cores principais
          gold: '#A9683D',       // Dourado original (primária)
          mint: '#C2F7BC',       // Verde mint original
          aqua: '#9BD0D2',       // Azul aqua original
          
          // Cores primárias e variações
          emerald: '#357266',    // Verde esmeralda para destaque e CTA secundários
          sage: '#8BB8A8',       // Verde sage para elementos sutis
          
          // Tons neutros
          cream: '#F9F5F0',      // Creme para backgrounds suaves
          sand: '#EBE6DD',       // Areia para elementos visuais sutis
          
          // Paleta de acentos para elementos de UI
          coral: '#E07A5F',      // Coral para elementos de destaque ocasionais
          peach: '#F2CC8F',      // Pêssego para elementos suaves
          
          // Tons funcionais
          success: '#4CAF50',    // Verde para elementos de sucesso
          warning: '#FFC107',    // Amarelo para avisos
          error: '#F44336',      // Vermelho para erros
          info: '#2196F3',       // Azul para informações
          
          // Tons de fundo e overlay
          overlay: 'rgba(169, 104, 61, 0.8)', // Overlay dourado
          backdrop: 'rgba(194, 247, 188, 0.15)' // Backdrop mint sutil
        }
      },
      fontFamily: {
        display: ['Ws Paradose', 'serif'],
        sans: ['Zap', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'fadeInUp': 'fadeInUp 0.7s ease-out forwards',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'expandWidth': 'expandWidth 0.5s ease-out forwards',
        'bounce-slow': 'bounce 3s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        expandWidth: {
          'from': { width: '0' },
          'to': { width: '100%' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(to right, #A9683D, #D4B26A)',
        'gradient-mint': 'linear-gradient(to right, #C2F7BC, #9BD0D2)',
        'pattern-hex': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 60 0 51.96V17.32L30 0zm0 10.39L8.66 22.17v26.66L30 60l21.34-11.17V22.17L30 10.39z' fill='%23A9683D' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")"
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(169, 104, 61, 0.39)',
        'mint': '0 4px 14px 0 rgba(194, 247, 188, 0.5)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'xs': '475px',
        // Mantém os padrões do Tailwind para outros breakpoints
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};