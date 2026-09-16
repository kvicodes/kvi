import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// The site is served from the domain root (Docker / nginx behind kvi-proxy),
// so `base` stays '/'. Only change this if a host ever serves the app from a
// sub-path.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
