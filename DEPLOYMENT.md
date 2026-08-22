# Deployment Guide

This project is currently configured to deploy to **GitHub Pages**. It uses
`HashRouter` and a Vite `base` path so that client-side routing and asset
URLs work correctly on GitHub Pages' static hosting (no server rewrite rules
available). See the "Migrating to a self-hosted server" section below for
what to change when you move off GitHub Pages.

## 1. Push the code to GitHub

This repo is already connected to `https://github.com/kvicodes/kvi.git`, so
`vite.config.js` is set to `base: '/kvi/'` to match. **The repository name
matters**: if you ever rename the repo or fork it under a different name,
update `base` in [`vite.config.js`](./vite.config.js) to match (e.g.
`/my-repo-name/`) before deploying.

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
1. Build the production bundle into `dist/` (via `predeploy`).
2. Push the contents of `dist/` to a `gh-pages` branch on your GitHub repo.

## 4. Enable GitHub Pages in repository settings

1. Go to your repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Under **Branch**, select `gh-pages` and folder `/ (root)`, then **Save**.
4. After a minute or two, your site will be live at:

   ```
   https://kvicodes.github.io/kvi/
   ```

Re-run `npm run deploy` any time you want to publish new changes.

---

## Migrating later to a self-hosted server

When you move off GitHub Pages to your own server (or any host that lets you
control routing), make the following changes:

- [ ] **Switch the router**: in [`src/App.jsx`](./src/App.jsx), replace
      `HashRouter` with `BrowserRouter` (both are imported from
      `react-router-dom`). This removes the `#` from all URLs.
- [ ] **Remove/adjust the `base` path**: in [`vite.config.js`](./vite.config.js),
      change `base: '/kvi/'` to `base: '/'` (or remove the option
      entirely, since `'/'` is the default) so assets resolve from the
      domain root.
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
