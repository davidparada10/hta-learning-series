import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Supabase — large vendor, cache separately
          if (id.includes('node_modules/@supabase')) return 'supabase'
          // React + React DOM
          if (id.includes('node_modules/react')) return 'react'
          // Domain content data — split per domain so only needed chunks load
          if (id.includes('src/data/_d1')) return 'data-d1'
          if (id.includes('src/data/_d2')) return 'data-d2'
          if (id.includes('src/data/_d3')) return 'data-d3'
          if (id.includes('src/data/_d4')) return 'data-d4'
          if (id.includes('src/data/courseData')) return 'data-core'
        },
      },
    },
  },
})
