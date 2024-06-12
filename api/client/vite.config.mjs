import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "", // Ensure the trailing slash if deploying to a subdirectory
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_REACT_APP_API_URL,
        changeOrigin: true,
        secure: true,
      }
    }
  },
  build: {
    outDir: 'dist', // Ensure the output directory is correct
  },
})