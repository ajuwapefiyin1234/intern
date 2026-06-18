import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  cacheDir: '.vite-cache/vite8',
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  plugins: [react()],
})
