import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    
    // Ignore Node module file paths and only include our own files
    rollupOptions: {
      output:{
          manualChunks(id) {
              if (id.includes('node_modules')) {
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
          }
      }
    }
  },
  plugins: [react()],
})
