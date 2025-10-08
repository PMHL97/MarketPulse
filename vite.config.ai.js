import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './src-ai',
  publicDir: '../public',
  build: {
    outDir: '../dist-ai',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  server: {
    port: 3002,
    open: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '@components': path.resolve(__dirname, './components'),
      '@pages': path.resolve(__dirname, './pages'),
      '@store': path.resolve(__dirname, './store'),
      '@services': path.resolve(__dirname, './services'),
      '@assets': path.resolve(__dirname, './assets')
    }
  },
  define: {
    'process.env': {}
  }
})
