import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const outputDir = resolve(__dirname, '../backend/dist');

const mainPage = resolve(__dirname, 'src/index.html');
const errorPage = resolve(__dirname, 'src/errorpage.html');

export default defineConfig({
  root,
  base: '/',
  plugins: [react()],
  server: {
    open: '/',
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
      },
    },
    strictPort: false
  },
  build: {
    outDir: outputDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: mainPage,
        errorpage: errorPage,
      },
    },
  }
})

