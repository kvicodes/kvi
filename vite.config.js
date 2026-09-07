import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// The site is served from a domain root in every target we support:
//   - Docker / nginx (primary)  -> https://<domain>/
//   - GitHub Pages + custom domain (fallback, public/CNAME) -> https://www.kvinnovations.in/
// so `base` stays '/'. Only change this if a host ever serves the app from a
// sub-path (e.g. the bare github.io/<repo> URL with no custom domain, which
// would need base: '/kvi/').
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
