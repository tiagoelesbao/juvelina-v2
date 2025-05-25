import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: process.env.NODE_ENV === 'production' 
          ? ['babel-plugin-transform-react-remove-prop-types']
          : []
      }
    }),
    
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
      filter: /\.(js|css|html|svg|json)$/i
    }),
    
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
      filter: /\.(js|css|html|svg|json)$/i
    }),
    
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
                maxAgeSeconds: 365 * 24 * 60 * 60
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
                maxAgeSeconds: 30 * 24 * 60 * 60
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
        description: 'Suplemento Multivitamínico Líquido Premium com 25 nutrientes essenciais',
        theme_color: '#A9683D',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    }),
    
    ...(process.env.ANALYZE === 'true' ? [visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
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
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types')
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    cssMinify: true,
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    
    rollupOptions: {
      output: {
        // MANUAL CHUNKS CORRIGIDO PARA WINDOWS
        manualChunks(id) {
          // Normalizar caminhos para funcionar no Windows
          const normalizedId = id.replace(/\\/g, '/');
          
          // Debug - remova depois
          if (normalizedId.includes('/src/')) {
            console.log('Processing:', normalizedId);
          }
          
          // React e React DOM
          if (normalizedId.includes('node_modules/react/') || 
              normalizedId.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // Framer Motion
          if (normalizedId.includes('node_modules/framer-motion/')) {
            return 'framer-motion';
          }
          
          // Lucide React
          if (normalizedId.includes('node_modules/lucide-react/')) {
            return 'ui-icons';
          }
          
          // React Intersection Observer
          if (normalizedId.includes('node_modules/react-intersection-observer/')) {
            return 'ui-utils';
          }
          
          // PWA
          if (normalizedId.includes('workbox') || normalizedId.includes('vite-plugin-pwa')) {
            return 'pwa';
          }
          
          // Componentes UI compartilhados
          if (normalizedId.includes('/src/components/ui/') || 
              normalizedId.includes('/src/components/common/')) {
            return 'ui-components';
          }
          
          // Features
          if (normalizedId.includes('/src/features/hero/')) {
            return 'feature-hero';
          }
          
          if (normalizedId.includes('/src/features/testimonials/')) {
            return 'feature-testimonials';
          }
          
          if (normalizedId.includes('/src/features/benefits/')) {
            return 'feature-benefits';
          }
          
          if (normalizedId.includes('/src/features/ingredients/')) {
            return 'feature-ingredients';
          }
          
          if (normalizedId.includes('/src/features/product/')) {
            return 'feature-product';
          }
          
          // Hooks e utilitários
          if (normalizedId.includes('/src/hooks/') || 
              normalizedId.includes('/src/utils/') || 
              normalizedId.includes('/src/lib/')) {
            return 'app-utils';
          }
          
          // Estilos
          if (normalizedId.includes('.css') || normalizedId.includes('/src/styles/')) {
            return undefined; // CSS é tratado separadamente
          }
          
          // Outras dependências node_modules
          if (normalizedId.includes('node_modules/')) {
            return 'vendor-misc';
          }
        },
        
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          const info = name.split('.');
          const ext = info[info.length - 1];
          
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
      
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
    },
    
    reportCompressedSize: true,
  },
  
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
    },
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/features/hero/index.tsx',
        './src/components/common/Header.tsx'
      ]
    }
  },
  
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
  
  preview: {
    port: 4173,
    host: true,
    open: true,
    cors: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    }
  },
  
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/worker.[hash].js',
      }
    }
  }
});