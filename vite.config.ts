import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// Importações condicionais para plugins opcionais
let viteCompression: any;
let visualizer: any;

try {
  viteCompression = require('vite-plugin-compression').default;
} catch (e) {
  console.log('vite-plugin-compression não instalado, pulando compressão...');
}

try {
  visualizer = require('rollup-plugin-visualizer').visualizer;
} catch (e) {
  console.log('rollup-plugin-visualizer não instalado, pulando análise de bundle...');
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React com configuração básica
    react(),
    
    // PWA configuração
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
              }
            }
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dias
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
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
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
    
    // Compressão Gzip (apenas se disponível)
    ...(viteCompression ? [
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240, // 10kb
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false,
        filter: /\.(js|css|html|svg|json)$/i
      })
    ] : []),
    
    // Compressão Brotli (apenas se disponível)
    ...(viteCompression ? [
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'brotliCompress',
        ext: '.br',
        deleteOriginFile: false,
        filter: /\.(js|css|html|svg|json)$/i
      })
    ] : []),
    
    // Visualizador (apenas com ANALYZE=true e se disponível)
    ...(process.env.ANALYZE === 'true' && visualizer ? [
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        template: 'treemap'
      })
    ] : [])
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
  
  // Build otimizado mas seguro
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Usar esbuild por padrão (mais rápido e confiável)
    minify: 'esbuild',
    
    // Configurações de chunk
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    
    // Target moderno
    target: 'es2015',
    
    rollupOptions: {
      output: {
        // Manual chunks simplificado e seguro
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'ui-vendor': ['lucide-react', 'react-intersection-observer']
        },
        
        // Nomes de arquivo otimizados
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|webp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        }
      },
      
      // Tree shaking seguro
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        // Não usar pure_funcs aqui
      }
    },
    
    // Report de tamanho comprimido
    reportCompressedSize: true,
  },
  
  // Dev Server
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    strictPort: false,
    hmr: {
      overlay: true,
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
    exclude: [],
    esbuildOptions: {
      target: 'es2015',
    }
  },
  
  // CSS
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  
  // Preview
  preview: {
    port: 4173,
    host: true,
    open: true
  },
  
  // Variáveis de ambiente
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  }
});