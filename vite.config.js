import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // A custom domain (www.kvinnovations.in) is configured for GitHub Pages via
  // public/CNAME, so the site is served from the domain root rather than
  // https://kvicodes.github.io/kvi/. That means base stays '/' — do NOT set
  // it to '/kvi/' while the custom domain is active, or asset URLs will
  // 404. If the custom domain is ever removed (deleting public/CNAME) and
  // the site falls back to the github.io/<repo> URL, set base back to
  // '/kvi/' to match the repo name.
  base: '/',
})
