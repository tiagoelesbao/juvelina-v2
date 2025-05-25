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
        plugins: process.env.NODE_ENV === 'production' 
          ? [['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]]
          : []
      }
    }),
    
    // Compressão Gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Comprimir arquivos > 10kb
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false
    }),
    
    // Compressão Brotli (melhor que gzip)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false
    }),
    
    // PWA para cache e offline
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        cleanupOutdatedCaches: true,
        sourcemap: true,
        runtimeCaching: [
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
          },
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
            urlPattern: /\.(js|css|png|jpg|jpeg|svg|webp)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 7 dias
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Juvelina Organics',
        short_name: 'Juvelina',
        description: 'Suplemento Multivitamínico Líquido Premium com 25 nutrientes essenciais',
        theme_color: '#A9683D',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ]
      }
    }),
    
    // Visualizador de bundle (apenas quando ANALYZE=true)
    ...(process.env.ANALYZE === 'true' ? [visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap' // ou 'sunburst', 'network'
    })] : [])
  ],

  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.otf'],

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
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Minificação agressiva com Terser
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: process.env.NODE_ENV === 'production' 
          ? ['console.log', 'console.info', 'console.debug', 'console.trace'] 
          : [],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    
    // Limite de aviso de chunk
    chunkSizeWarningLimit: 500,
    
    // Otimizar CSS
    cssCodeSplit: true,
    cssMinify: true,
    
    // Target moderno para browsers
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    
    // Rollup Options otimizadas
    rollupOptions: {
      output: {
        // CORREÇÃO: Comentar manualChunks temporariamente
        // manualChunks será reconfigurado depois que todos os componentes estiverem funcionando
        
        // Nomes de arquivos otimizados
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          const info = name.split('.');
          const ext = info[info.length - 1];
          
          // Organizar assets por tipo
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name].[hash][extname]`;
          }
          
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name].[hash][extname]`;
          }
          
          if (/css/i.test(ext)) {
            return `assets/css/[name].[hash][extname]`;
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
    reportCompressedSize: process.env.NODE_ENV === 'production',
  },
  
  // Otimizações de Dev Server
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
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
        charset: false,
      }
    },
    postcss: './postcss.config.js',
  },
  
  // Configurações de Preview (produção local)
  preview: {
    port: 4173,
    host: true,
    open: true,
    cors: true,
    headers: {
      // Headers de segurança e performance
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
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