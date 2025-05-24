import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React com Fast Refresh
    react({
      babel: {
        plugins: [
          // Remove prop-types em produção
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]
        ]
      }
    }),
    
    // Compressão Gzip e Brotli
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Comprimir arquivos > 10kb
      algorithm: 'gzip',
      ext: '.gz',
    }),
    
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    
    // PWA para cache e offline
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 dias
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60 // 1 ano
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Juvelina Organics',
        short_name: 'Juvelina',
        description: 'Suplemento Multivitamínico Líquido Premium',
        theme_color: '#A9683D',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    
    // Visualizador de bundle (comentar em produção)
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  
  // Otimizações de Build
  build: {
    outDir: 'dist',
    sourcemap: false, // Desabilitar em produção para reduzir tamanho
    
    // Minificação agressiva com Terser
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true, // Remove debugger
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2, // Duas passadas para melhor compressão
      },
      mangle: {
        safari10: true, // Compatibilidade com Safari antigo
      },
      format: {
        comments: false, // Remove comentários
      },
    },
    
    // Limite de aviso de chunk
    chunkSizeWarningLimit: 500, // 500kb
    
    // Otimizar CSS
    cssCodeSplit: true,
    cssMinify: true,
    
    // Target moderno para browsers
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    
    // Rollup Options otimizadas
    rollupOptions: {
      output: {
        // Chunks manuais otimizados
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // Framer Motion (pesado, separar)
          if (id.includes('node_modules/framer-motion/')) {
            return 'framer-motion';
          }
          
          // UI Libraries
          if (id.includes('node_modules/lucide-react/') ||
              id.includes('node_modules/react-intersection-observer/')) {
            return 'ui-vendor';
          }
          
          // Lazy loaded features
          if (id.includes('src/features/testimonials/')) {
            return 'testimonials';
          }
          
          if (id.includes('src/features/benefits/')) {
            return 'benefits';
          }
          
          if (id.includes('src/features/product/')) {
            return 'product';
          }
        },
        
        // Nomes de arquivos otimizados
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/[name].[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          // Organizar assets por tipo
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name].[hash][extname]`;
          }
          
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name].[hash][extname]`;
          }
          
          return `assets/[name].[hash][extname]`;
        },
      },
      
      // Otimizações de tree-shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
    },
    
    // Melhorar performance de build
    reportCompressedSize: false, // Mais rápido sem relatório de compressão
  },
  
  // Otimizações de Dev Server
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false, // Desabilitar overlay de erro em dev (performance)
    },
    // Pre-bundling de dependências
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/features/hero/index.tsx',
        './src/components/common/Header.tsx'
      ]
    }
  },
  
  // Otimizar dependências
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      'react-intersection-observer'
    ],
    exclude: ['@vite/client', '@vite/env'],
    esbuildOptions: {
      target: 'es2020',
    }
  },
  
  // CSS Options
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      css: {
        charset: false, // Evitar avisos de charset
      }
    },
    // PostCSS já está configurado no postcss.config.js
    postcss: './postcss.config.js',
  },
  
  // Configurações de Preview (produção local)
  preview: {
    port: 4173,
    host: true,
    headers: {
      // Headers de segurança e performance
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    }
  },
  
  // Definir variáveis de ambiente
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  // Worker options
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/worker.[hash].js',
      }
    }
  }
});