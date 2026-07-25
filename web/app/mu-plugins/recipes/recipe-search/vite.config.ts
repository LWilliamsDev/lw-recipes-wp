import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    host: '0.0.0.0',
    https: {
       key: fs.readFileSync('/usr/local/etc/httpd/certs/recipes.staging+1-key.pem'),
      cert: fs.readFileSync('/usr/local/etc/httpd/certs/recipes.staging+1.pem'),
    },
    allowedHosts: ['recipes.staging']
  },
  build: {
    outDir: '../blocks/assets', 
    cssCodeSplit: true,
    
    rollupOptions: {
      output: {
        // 2. This forces the primary JS file to be named exactly this
        entryFileNames: 'recipe-search.js',
        
        // This keeps the generated CSS file neatly named in the same folder
        assetFileNames: '[name].[ext]'
      },
    },
  },

})
