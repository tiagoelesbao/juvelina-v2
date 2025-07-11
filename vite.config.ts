import { defineConfig, splitVendorChunkPlugin } from 'vite';
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
    
    // Adicionar splitVendorChunkPlugin para melhor separação de vendors
    splitVendorChunkPlugin(),
    
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
      includeAssets: [
        'favicon.png',
        'apple-touch-icon.png',
        'robots.txt',
        'images/**/*'  // Incluir todas as imagens da pasta public/images
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,woff,woff2}'],
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
          },
          // Cache para imagens locais
          {
            urlPattern: /^https:\/\/www\.juvelinaorganics\.com\.br\/images\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'local-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 horas
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 3
            }
          },
          // Cache para imagens em desenvolvimento
          {
            urlPattern: /^http:\/\/localhost:\d+\/images\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'dev-images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 // 1 hora
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
            src: '/icon-192x192.png', 
            sizes: '192x192', 
            type: 'image/png',
            purpose: 'any maskable'
          },
          { 
            src: '/icon-512x512.png', 
            sizes: '512x512', 
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    
    // Plugin para garantir que imagens sejam servidas corretamente
    {
      name: 'configure-response-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/images/')) {
            res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
            res.setHeader('X-Content-Type-Options', 'nosniff');
          }
          next();
        });
      }
    },
    
    ...(process.env.ANALYZE === 'true' ? [visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })] : [])
  ],

  // Incluir formatos de imagem adicionais
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.otf', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp'],

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
    minify: 'esbuild',
    
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    cssMinify: true,
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      
      preserveEntrySignatures: 'strict',
      
      output: {
        experimentalMinChunkSize: 10000, // 10KB mínimo por chunk
        
        // Manual chunks
        manualChunks: {
          // Vendors principais
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-observer': ['react-intersection-observer'],
          
          // Features
          'feature-hero': [
            './src/features/hero/index.tsx',
            './src/features/hero/components/HeroHeading.tsx',
            './src/features/hero/components/HeroButtons.tsx',
            './src/features/hero/components/HeroImage.tsx',
            './src/features/hero/components/ScrollIndicator.tsx',
            './src/features/hero/hooks/useCountUp.tsx',
          ],
          
          'feature-testimonials': [
            './src/features/testimonials/VideoTestimonialsSection/index.tsx',
            './src/features/testimonials/VideoTestimonialsSection/data.ts',
            './src/features/testimonials/VideoTestimonialsSection/components/VideoSectionHeader.tsx',
            './src/features/testimonials/VideoTestimonialsSection/components/VideoCarousel.tsx',
            './src/features/testimonials/VideoTestimonialsSection/components/VideoModal.tsx',
            './src/features/testimonials/VideoTestimonialsSection/components/LiveViewersIndicator.tsx',
            './src/features/testimonials/VideoTestimonialsSection/components/VideoCarouselItem.tsx',
            './src/features/testimonials/VideoTestimonialsSection/components/VideoCarouselControls.tsx',
            './src/features/testimonials/UGCGallerySection.tsx',
            './src/features/testimonials/FaqSection.tsx',
          ],
          
          'feature-benefits': [
            './src/features/benefits/BenefitsSection.tsx',
            './src/features/benefits/AbsorptionSection.tsx',
          ],
          
          'feature-ingredients': [
            './src/features/ingredients/IngredientsSection.tsx',
          ],
          
          'feature-product': [
            './src/features/product/PricingSection.tsx',
            './src/features/product/ViralOfferSection.tsx',
          ],
          
          // Componentes compartilhados
          'shared-ui': [
            './src/components/ui/ScrollToTop.tsx',
            './src/components/ui/CreatorBadge.tsx',
            './src/components/ui/WaveTransition.tsx',
            './src/components/ui/TikTokIcon.tsx',
            './src/components/ui/IngredientsList.tsx',
            './src/components/ui/AnimatedButton.tsx',
          ],
          
          'shared-common': [
            './src/components/common/AnnouncementBar.tsx',
            './src/components/common/Header.tsx',
            './src/components/common/PurchaseModal.tsx',
            './src/components/common/index.ts',
          ],
          
          'shared-product': [
            './src/components/product/Footer.tsx',
          ],
          
          // Hooks
          'app-hooks': [
            './src/hooks/ui/useScrollPosition.ts',
            './src/hooks/ui/useModalState.tsx',
            './src/hooks/ui/usePerformanceOptimization.tsx',
          ],
        },
        
        // Configurar nomes dos arquivos
        entryFileNames: 'assets/js/entry-[name]-[hash].js',
        chunkFileNames: (chunkInfo: any) => {
          const name = chunkInfo.name || 'chunk';
          return `assets/js/${name}-[hash].js`;
        },
        assetFileNames: (assetInfo: any) => {
          const name = assetInfo.name || 'asset';
          const info = name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        },
        
        interop: 'auto',
        exports: 'auto',
        preserveModules: false,
        format: 'es',
        inlineDynamicImports: false,
        
        generatedCode: {
          preset: 'es2015',
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
          reservedNamesAsProps: false,
          symbols: true,
        },
      },
      
      // Tree-shaking otimizado
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        unknownGlobalSideEffects: false,
        correctVarValueBeforeDeclaration: true,
      },
      
      external: [],
      plugins: [],
    },
    
    // Configurações adicionais
    reportCompressedSize: true,
    assetsInlineLimit: 4096, // 4kb
    modulePreload: {
      polyfill: true,
    },
    
    commonjsOptions: {
      transformMixedEsModules: true,
      defaultIsModuleExports: 'auto',
    },
  },
  
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
    },
    headers: {
      // Headers para desenvolvimento
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/features/hero/index.tsx',
        './src/components/common/Header.tsx'
      ]
    }
  },
  
  // Otimização de dependências
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'framer-motion',
      'lucide-react',
      'react-intersection-observer'
    ],
    exclude: ['@vite/client', '@vite/env'],
    esbuildOptions: {
      target: 'es2020',
      jsx: 'automatic',
      keepNames: true,
    },
    force: process.env.FORCE_OPTIMIZE === 'true',
    entries: [
      'src/main.tsx',
      'src/App.tsx',
    ],
    needsInterop: [],
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
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
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
        entryFileNames: 'assets/worker-[hash].js',
      }
    }
  },
});