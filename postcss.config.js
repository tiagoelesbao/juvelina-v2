// postcss.config.js
export default {
  plugins: {
    // Import inline para melhor performance
    'postcss-import': {},
    
    // Tailwind CSS
    tailwindcss: {},
    
    // Autoprefixer para compatibilidade
    autoprefixer: {},
    
    // Otimizações de produção
    ...(process.env.NODE_ENV === 'production' ? {
      // Minificar CSS
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          calc: true,
          // Manter z-index como está (evita bugs)
          zindex: false,
          // Reduzir precisão de cálculos
          reducedMotion: true,
        }]
      },
      
      // Remover CSS não utilizado (cuidado com classes dinâmicas)
      '@fullhuman/postcss-purgecss': {
        content: [
          './index.html',
          './src/**/*.{js,ts,jsx,tsx}',
        ],
        defaultExtractor: content => {
          // Extrair classes do Tailwind incluindo variantes
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          return broadMatches.concat(innerMatches);
        },
        safelist: {
          // Classes que sempre devem ser mantidas
          standard: [
            /^(bg|text|border)-juvelina-/,
            /^animate-/,
            /^shadow-/,
            /^hover:/,
            /^focus:/,
            /^active:/,
            /^group-hover:/,
            /^md:/,
            /^lg:/,
            /^xl:/,
            'html',
            'body',
          ],
          // Classes com padrões dinâmicos
          deep: [
            /^(bg|text|border)-(red|green|blue|gray|yellow|juvelina)-(100|200|300|400|500|600|700|800|900)/,
          ],
          greedy: [
            /^grid-cols-/,
            /^col-span-/,
            /^gap-/,
            /^space-/,
            /^p[xytrbl]?-/,
            /^m[xytrbl]?-/,
            /^w-/,
            /^h-/,
          ]
        },
        // Configurações para melhor detecção
        variables: true,
        keyframes: true,
        fontFace: true,
      },
      
      // Combinar media queries duplicadas
      'postcss-combine-media-query': {},
      
      // Combinar seletores duplicados
      'postcss-combine-duplicated-selectors': {
        removeDuplicatedProperties: true,
        removeDuplicatedValues: true,
      },
      
      // Ordenar propriedades CSS para melhor compressão
      'postcss-sort-media-queries': {
        sort: 'mobile-first',
      },
      
      // Converter px para rem (melhor acessibilidade)
      'postcss-pxtorem': {
        rootValue: 16,
        propList: ['*'],
        selectorBlackList: [/^html$/],
        replace: true,
        mediaQuery: false,
        minPixelValue: 2,
      },
    } : {})
  }
};