# Deployment Guide

The site is a static single-page app (React + Vite, `BrowserRouter`). Two
deployment paths are supported:

1. **Docker + nginx** — the primary path (self-hosted).
2. **GitHub Pages** — kept working as a fallback, served under the custom
   domain `www.kvinnovations.in`.

Both serve the app from the domain root, so `vite.config.js` keeps `base: '/'`.

---

## 1. Docker + nginx (primary)

Everything is in the repo:

| File                 | Role                                              |
| -------------------- | ------------------------------------------------- |
| `Dockerfile`         | Multi-stage: `node:22-alpine` build → `nginx:alpine` |
| `docker-compose.yml` | Runs the image, publishes host `8080` → container `80` |
| `nginx.conf`         | SPA fallback (`try_files … /index.html`), gzip, cache + security headers |

### Build and run

```bash
docker compose up -d --build
```

The site is then available at `http://localhost:8080/`. Put your own reverse
proxy / TLS termination (e.g. Caddy, Traefik, or an outer nginx) in front of
port 8080 and point the domain's DNS at that host.

To rebuild after changes:

```bash
docker compose up -d --build
```

### Notes

- The container serves static files only. There is no backend, database or
  auth, and nothing listens on any port other than the one Compose maps.
- `nginx.conf`'s `try_files $uri $uri/ /index.html` is what makes deep links
  (e.g. `/businesses`) work with `BrowserRouter`. Do not remove it.
- To wire up the contact form, pass `VITE_CONTACT_ENDPOINT` as a build arg /
  env at build time (it is read at build, not runtime).

---

## 2. GitHub Pages (fallback)

A `public/CNAME` file contains `www.kvinnovations.in`. Vite copies `public/`
into `dist/` on every build, so `CNAME` is republished automatically — GitHub
Pages drops the custom-domain association if that file ever goes missing from
the published branch.

### Deep-link handling

GitHub Pages has no server-side rewrites, so `BrowserRouter` deep links are
handled with the standard SPA-on-Pages shim:

- [`public/404.html`](./public/404.html) captures the requested path and
  redirects to `/?redirect=<path>`.
- The inline script in [`index.html`](./index.html) restores that path with
  `history.replaceState` before React Router boots.

This is a no-op on Docker/nginx and for normal root visits.

### Publish

```bash
npm run deploy      # = npm run build (predeploy) + gh-pages -d dist
```

This replaces the entire contents of the `gh-pages` branch with `dist/`. Don't
hand-edit files on that branch — they are wiped on the next deploy. Under
**Settings → Pages**: source *Deploy from a branch*, branch `gh-pages`, folder
`/ (root)`, custom domain `www.kvinnovations.in`.

### Dropping the Pages fallback later

If GitHub Pages is no longer needed:

- delete `public/CNAME`, `public/404.html`, and the `redirect` shim in
  `index.html`;
- remove the `predeploy` / `deploy` scripts and the `gh-pages` devDependency
  from `package.json`.

Nothing else depends on it.

---

## Pre-launch checklist

- [ ] Set `VITE_CONTACT_ENDPOINT` (or otherwise wire `src/lib/submitContact.js`)
      so the contact form delivers mail instead of falling back to `mailto:`.
- [x] ContractorOS / CampusGrid URLs wired in
      [`src/data/products.js`](./src/data/products.js) and the footer
      (`contractoros.kvinnovations.in`, `campusgrid.kvinnovations.in`).
- [ ] Replace the placeholder `public/og.svg` with a real share image if a
      designed one becomes available.
- [ ] Publish real Privacy Policy / Terms copy in
      [`src/pages/Legal.jsx`](./src/pages/Legal.jsx).
- [ ] Add real articles to [`src/data/insights.js`](./src/data/insights.js).
