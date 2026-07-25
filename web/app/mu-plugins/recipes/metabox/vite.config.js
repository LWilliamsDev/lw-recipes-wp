import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
  'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/main.jsx', // or wherever your entry file is
      name: 'MyEditorPanel', // global variable name
      formats: ['iife'],
      fileName: () => 'editor-panel.js',
    },
    rollupOptions: {
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          '@wordpress/element': 'wp.element',
          '@wordpress/components': 'wp.components',
          '@wordpress/plugins': 'wp.plugins',
          '@wordpress/data': 'wp.data',
          '@wordpress/editor': 'wp.editor',
        },
      },
      external: [
        'react',
        'react-dom',
        '@wordpress/element',
        '@wordpress/components',
        '@wordpress/plugins',
        '@wordpress/data',
        '@wordpress/editor',
      ],
    },
  },
});