import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/listovki/",
  build: {
      outDir: "dist-preview"
  },
  // Ensure public assets are correctly handled
  publicDir: 'public'
})
