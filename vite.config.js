import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/PajaroLeck/").
// Leave unset to deploy at the domain root.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
});
