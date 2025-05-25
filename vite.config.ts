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
    
    // Plugin customizado para debug de chunks
    {
      name: 'debug-chunks',
      generateBundle(options, bundle) {
        console.log('\n=== CHUNK DEBUG ===');
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (chunk.type === 'chunk') {
            console.log(`\nChunk: ${fileName}`);
            console.log(`- Modules: ${Object.keys(chunk.modules || {}).length}`);
            console.log(`- Size: ${chunk.code?.length || 0} bytes`);
            console.log(`- Is Entry: ${chunk.isEntry}`);
            console.log(`- Is Dynamic Entry: ${chunk.isDynamicEntry}`);
            if (chunk.modules) {
              const moduleKeys = Object.keys(chunk.modules);
              console.log(`- First modules: ${moduleKeys.slice(0, 3).join(', ')}`);
              if (moduleKeys.length > 3) {
                console.log(`  ... and ${moduleKeys.length - 3} more`);
              }
            }
          }
        }
        console.log('=================\n');
      }
    },
    
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
        // Adicionar experimentalMinChunkSize para garantir chunks mínimos
        experimentalMinChunkSize: 10000, // 10KB mínimo por chunk
        
        // Manual chunks mais explícito com arrays de arquivos
        manualChunks: {
          // Vendors principais - forçar inclusão específica
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-observer': ['react-intersection-observer'],
          
          // Features - especificar arquivos explicitamente
          'feature-hero': [
            './src/features/hero/index.tsx',
            './src/features/hero/components/HeroHeading.tsx',
            './src/features/hero/components/HeroButtons.tsx',
            './src/features/hero/components/HeroStats.tsx',
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
            './src/features/testimonials/GuaranteeSection.tsx',
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
        
        // Configurar melhor os nomes dos arquivos
        entryFileNames: 'assets/js/entry-[name]-[hash].js',
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk';
          return `assets/js/${name}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
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
        
        // Configurações adicionais importantes
        interop: 'auto',
        exports: 'auto',
        preserveModules: false,
        format: 'es',
        inlineDynamicImports: false,
        
        // Adicionar generatedCode para melhor compatibilidade
        generatedCode: {
          preset: 'es2015',
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
          reservedNamesAsProps: false,
          symbols: true,
        },
      },
      
      // TEMPORARIAMENTE: Desabilitar tree-shaking para debug
      treeshake: false,
      
      // Quando funcionar, voltar para tree-shaking menos agressivo:
      /*
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        unknownGlobalSideEffects: false,
        correctVarValueBeforeDeclaration: true,
      },
      */
      
      // Configurar external se necessário
      external: [],
      
      // Plugins adicionais do Rollup se necessário
      plugins: [],
    },
    
    // Configurações adicionais de build
    reportCompressedSize: true,
    assetsInlineLimit: 4096, // 4kb
    modulePreload: {
      polyfill: true,
    },
    
    // Adicionar commonjsOptions para melhor compatibilidade
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
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/features/hero/index.tsx',
        './src/components/common/Header.tsx'
      ]
    }
  },
  
  // Otimização de dependências melhorada
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
      // Adicionar keepNames para melhor debugging
      keepNames: true,
    },
    force: process.env.FORCE_OPTIMIZE === 'true',
    entries: [
      'src/main.tsx',
      'src/App.tsx',
    ],
    // Adicionar needsInterop se necessário
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
        entryFileNames: 'assets/worker-[hash].js',
      }
    }
  },
  
  // Adicionar experimental renderBuiltUrl se necessário
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { runtime: `window.__publicPath + ${JSON.stringify(filename)}` }
      }
    }
  },
});