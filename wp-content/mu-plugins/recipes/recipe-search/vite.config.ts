import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { 
    host: '0.0.0.0',
    https: {
       key: fs.readFileSync('/usr/local/etc/httpd/certs/recipes.staging+1-key.pem'),
      cert: fs.readFileSync('/usr/local/etc/httpd/certs/recipes.staging+1.pem'),
    },
    allowedHosts: ['recipes.staging']
  }

})
