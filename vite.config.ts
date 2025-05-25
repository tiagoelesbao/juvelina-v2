import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}']
      },
      manifest: {
        name: 'Juvelina Organics',
        short_name: 'Juvelina',
        theme_color: '#A9683D',
        background_color: '#ffffff',
        display: 'standalone'
      }
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: false, // DESABILITAR minificação temporariamente
    
    rollupOptions: {
      output: {
        // SEM manualChunks por enquanto
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      },
      
      // IMPORTANTE: Desabilitar tree-shaking temporariamente
      treeshake: false
    }
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
});