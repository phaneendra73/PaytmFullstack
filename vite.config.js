import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches your Render publish directory
  },
  server: {
    historyApiFallback: true, // Ensure SPA routing works during development
  },
});
