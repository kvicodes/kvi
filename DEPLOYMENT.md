# Deployment Guide

This project is currently configured to deploy to **GitHub Pages**, served
under a **custom domain**: `www.kvinnovations.in`. It uses `HashRouter` so
client-side routing works on GitHub Pages' static hosting (no server rewrite
rules available). See the "Migrating to a self-hosted server" section below
for what to change when you move off GitHub Pages.

## Custom domain (important)

A `public/CNAME` file contains `www.kvinnovations.in`. Vite copies everything
in `public/` into `dist/` on every build, so the CNAME file is republished
automatically with each `npm run deploy` — this is required, because GitHub
Pages drops the custom domain association if the `CNAME` file is ever
missing from the published branch.

Because of the custom domain, the site is served from the domain root, so
`vite.config.js` has `base: '/'`. **Do not** change `base` to `/kvi/` (the
repo-name-scoped path) while the custom domain is active, or the built CSS/JS
asset URLs will 404.

If the custom domain is ever removed, delete `public/CNAME` and set `base`
back to `/kvi/` in [`vite.config.js`](./vite.config.js) so the site works
again at `https://kvicodes.github.io/kvi/`.

## 1. Push the code to GitHub

This repo is already connected to `https://github.com/kvicodes/kvi.git`.
Commit and push your changes to the branch you work from:

```bash
git add .
git commit -m "Update site"
git push
```

(If you're starting fresh in a brand-new, unconnected repository instead,
run `git init`, `git remote add origin <your-repo-url>`, and
`git push -u origin main` first.)

## 2. Install dependencies

```bash
npm install
```

## 3. Deploy to GitHub Pages

The `gh-pages` package is already configured in `package.json`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Run:

```bash
npm run deploy
```

This will:
1. Build the production bundle (including `CNAME`) into `dist/` (via `predeploy`).
2. Replace the contents of the `gh-pages` branch on your GitHub repo with `dist/`.

**Note:** this replaces the *entire* contents of `gh-pages` with whatever is
in `dist/`. Don't hand-edit files directly on the `gh-pages` branch through
the GitHub web UI (e.g. adding a README there) — anything not produced by
the build will be wiped out on the next `npm run deploy`. The one exception
is `CNAME`, since it's checked into `public/` and rebuilt every time.

## 4. GitHub Pages settings

Under your repo's **Settings → Pages**, the source should be **Deploy from a
branch**, branch `gh-pages`, folder `/ (root)`, with **Custom domain** set to
`www.kvinnovations.in`. Once DNS has propagated, the site is live at:

```
https://www.kvinnovations.in/
```

Re-run `npm run deploy` any time you want to publish new changes.

---

## Migrating later to a self-hosted server

When you move off GitHub Pages to your own server (or any host that lets you
control routing), make the following changes:

- [ ] **Switch the router**: in [`src/App.jsx`](./src/App.jsx), replace
      `HashRouter` with `BrowserRouter` (both are imported from
      `react-router-dom`). This removes the `#` from all URLs.
- [ ] **Remove `public/CNAME`** — it's specific to GitHub Pages' custom
      domain feature and has no effect elsewhere; point your new host's DNS
      / domain settings at the new server instead.
- [ ] **`base` in `vite.config.js`** can stay `'/'` if the new host also
      serves the site from its domain root (the common case). Only change it
      if the new host serves the app from a sub-path.
- [ ] **Set up SPA fallback routing on the server**: since `BrowserRouter`
      relies on the server returning `index.html` for any unknown path (so
      React Router can take over client-side), configure your server
      accordingly:
  - **Nginx**: add `try_files $uri /index.html;` in your `location /` block.
  - **Apache**: add a `.htaccess` rewrite rule to fallback to `index.html`.
  - **Node/Express**: serve `dist/` as static, with a catch-all route
    returning `dist/index.html`.
  - **Netlify/Vercel**: add a rewrite rule (`_redirects` file or platform
    config) sending all paths to `/index.html`.
- [ ] Remove the `predeploy` / `deploy` scripts and the `gh-pages` dev
      dependency from `package.json` if you no longer need GitHub Pages
      deployment (optional).
- [ ] Update the placeholder contact details in
      [`src/data/content.js`](./src/data/content.js) (address, phone, email)
      and the map placeholder in
      [`src/pages/Contact.jsx`](./src/pages/Contact.jsx) if not already done.
