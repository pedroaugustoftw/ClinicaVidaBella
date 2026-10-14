import { defineConfig } from 'vite';

export default defineConfig({
  // Local development stays at /. GitHub Actions supplies the published base.
  base: process.env.VITE_BASE_PATH || '/',
});
