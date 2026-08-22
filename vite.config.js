import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project from https://<user>.github.io/<repo-name>/,
  // so every asset URL needs the repo name as a prefix. This MUST exactly match
  // the GitHub repository name (case-sensitive), including the leading/trailing slash.
  // Matches the actual repo: github.com/kvicodes/kvi
  // When migrating to a self-hosted server that serves the site from the domain
  // root, change this back to '/'.
  base: '/kvi/',
})
