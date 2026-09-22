import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Для GitHub Pages сборка идёт с GITHUB_PAGES=1: база = /<имя репозитория>/
const ghPages = process.env.GITHUB_PAGES === '1';

export default defineConfig({
  plugins: [react()],
  base: ghPages ? '/gazprom-kaliningrad/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
