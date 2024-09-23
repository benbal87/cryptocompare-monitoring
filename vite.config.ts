import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true // This line ensures the browser will open
  },
  build: {
    outDir: 'dist', // This is the default output directory
  }
})
