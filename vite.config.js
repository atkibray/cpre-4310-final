import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cpre-4310-final/',
  build: {
    outDir: 'docs',
  },
})
