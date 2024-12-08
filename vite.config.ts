/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/book-search/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    reporters: 'verbose',
    coverage: {
      provider: 'v8',
    },
  },
});
