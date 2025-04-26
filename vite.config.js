import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      '/auth': {
        target: 'http://39.123.217.25:8000',
        changeOrigin: true,
      },
    },
  },
})
