import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "", // Ensure the trailing slash
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_REACT_APP_API_URL,
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
