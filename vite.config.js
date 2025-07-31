import { defineConfig } from 'vite'

export default defineConfig({
  root: 'client',
  build: {
    outDir: '../dist'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})