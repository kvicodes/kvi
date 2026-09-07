# Deployment Guide

The site is a static single-page app (React + Vite, `BrowserRouter`), served
from the domain root (`vite.config.js` keeps `base: '/'`).

**Live at `https://kvinnovations.in`** (as of 2026-09), served on the shared
KVI host by the standalone **kvi-proxy** Caddy — the same reverse proxy that
fronts `contractoros.kvinnovations.in` and `campusgrid.kvinnovations.in`.

---

## 1. How it's deployed (kvi-proxy + Caddy)

```
Internet ─▶ kvi-proxy (Caddy, :80/:443, TLS via Let's Encrypt)
              kvinnovations.in       ─▶ reverse_proxy kvi-website:80
              www.kvinnovations.in   ─▶ 301 ─▶ https://kvinnovations.in
              http://(either)        ─▶ 308 ─▶ https
           ─▶ kvi-website  (this repo's container: nginx serving the SPA)
```

| File | Role |
| --- | --- |
| `Dockerfile` | Multi-stage: `node:22-alpine` build → `nginx:alpine` |
| `nginx.conf` | SPA fallback (`try_files … /index.html`), gzip, cache + security headers |
| `docker-compose.yml` | Container `kvi-website` on `kvi-website-internal` (private) + `kvi-proxy` (shared external). **No host ports** — Caddy is the only entry point. |

`kvi-proxy` itself lives in a separate repo (`kvi-proxy/`, on the shared
host). Its `Caddyfile` holds the routing; `docs/kvi-website-integration.md`
there records how this site was brought in.

### Deploy a change

```bash
# on the shared KVI host, from this repo:
docker compose up -d --build          # rebuild image + recreate kvi-website
```

Caddy needs no restart — it already routes `kvinnovations.in` to the
`kvi-website` container by name over the `kvi-proxy` network. If a routing
change is ever needed, that's an edit to `kvi-proxy/Caddyfile` followed by
`docker exec kvi-proxy caddy reload --config /etc/caddy/Caddyfile` (zero
downtime), not a change here.

### Notes

- Static files only — no backend, database, auth, or host-published port.
- `nginx.conf`'s `try_files $uri $uri/ /index.html` is what makes deep links
  (e.g. `/businesses`) work with `BrowserRouter`. Do not remove it.
- To wire the contact form, set `VITE_CONTACT_ENDPOINT` at **build** time
  (read by `src/lib/submitContact.js`; it is a build-time env, not runtime).
- First-time build with no local Node: see the Docker one-liner in
  [`README.md`](./README.md).

---

## 2. GitHub Pages fallback — INACTIVE (pending removal)

The repo still carries a GitHub Pages setup from before the kvi-proxy
architecture: `public/CNAME` (`www.kvinnovations.in`), `public/404.html` +
the `redirect` shim in `index.html`, and the `predeploy`/`deploy` scripts
with the `gh-pages` devDependency.

**This is no longer a live fallback.** `www.kvinnovations.in` now resolves to
the KVI host and is served by Caddy, so `npm run deploy` would publish to a
`gh-pages` branch that nothing points at, and `public/CNAME` is stale.

### To remove it

```
- delete public/CNAME, public/404.html
- remove the `redirect` <script> block from index.html
- remove the `predeploy` / `deploy` scripts and the `gh-pages` devDependency
  from package.json
```

Nothing else depends on it. (The `404.html` + `index.html` shim only ever
mattered for Pages; Caddy/nginx do server-side SPA fallback via `try_files`.)

---

## Pre-launch / follow-up checklist

- [x] Live behind kvi-proxy at `https://kvinnovations.in` with a Let's
      Encrypt cert; `www` → apex; HTTP → HTTPS.
- [x] ContractorOS / CampusGrid URLs wired in
      [`src/data/products.js`](./src/data/products.js) + footer.
- [ ] Set `VITE_CONTACT_ENDPOINT` (or wire `src/lib/submitContact.js`) so the
      contact form delivers mail instead of the `mailto:` fallback.
- [ ] Remove the inactive GitHub Pages fallback (section 2).
- [ ] Replace the placeholder `public/og.svg` with a real share image.
- [ ] Publish real Privacy / Terms copy in [`src/pages/Legal.jsx`](./src/pages/Legal.jsx).
- [ ] Add real articles to [`src/data/insights.js`](./src/data/insights.js).
- [ ] Push `rebuild/kvi-group-site` and merge to `dev` (branch is local-only).
