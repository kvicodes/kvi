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
# 1. keep the running image for rollback (Compose names it kvi-kvi:latest —
#    the service has no `image:` key, so the name is <project>-<service>)
docker tag kvi-kvi:latest kvi-kvi:rollback-$(date +%Y%m%d-%H%M)
# 2. rebuild the image and recreate kvi-website (only this container)
docker compose up -d --build
```

### Verify after deploying

```bash
docker ps --filter name=kvi-website            # Up, image kvi-kvi
for p in / /greens /infra /tech /products /products/farmgrid /contact /privacy; do
  curl -s -o /dev/null -w "%{http_code} $p\n" https://kvinnovations.in$p; done   # all 200
curl -sI https://kvinnovations.in/farms | grep -i location     # /greens (301)
curl -sI https://www.kvinnovations.in/ | grep -i location      # https://kvinnovations.in/
```

Then open the site on desktop and a phone: navigation menus, a product page,
and the contact form (it opens an email draft unless an endpoint is set —
see section 2).

### Roll back

```bash
docker images kvi-kvi                                   # find the rollback-* tag
docker tag kvi-kvi:rollback-YYYYMMDD-HHMM kvi-kvi:latest
docker compose up -d --no-build --force-recreate kvi    # recreate from that image
```

Rollback touches only `kvi-website`; Caddy keeps routing to it by name.

Caddy needs no restart — it already routes `kvinnovations.in` to the
`kvi-website` container by name over the `kvi-proxy` network. If a routing
change is ever needed, that's an edit to `kvi-proxy/Caddyfile` followed by
`docker exec kvi-proxy caddy reload --config /etc/caddy/Caddyfile` (zero
downtime), not a change here.

### Notes

- Static files only — no backend, database, auth, or host-published port.
- `nginx.conf`'s `try_files $uri $uri/ /index.html` is what makes deep links
  (e.g. `/businesses`) work with `BrowserRouter`. Do not remove it.
- `nginx.conf` also 301-redirects the renamed `/farms` route to `/greens`
  (`absolute_redirect off` keeps the Location relative behind Caddy).
- First-time build with no local Node: see the Docker one-liner in
  [`README.md`](./README.md).

---

## 2. Wiring the contact form to Formspree

The contact form (`src/components/ContactForm.jsx`) posts JSON to whatever
`VITE_CONTACT_ENDPOINT` points at (`src/lib/submitContact.js`). This is a
**build-time** Vite env var — it gets compiled into the bundle, so it must be
set when the image is *built*, not when the container runs.

1. Create a free form at [formspree.io](https://formspree.io) using
   `kaimurvalleyinnovations@gmail.com`. Formspree gives you an endpoint like
   `https://formspree.io/f/xxxxxxxx`.
2. On the shared KVI host, put it in a `.env` file next to
   `docker-compose.yml` (this file is git-ignored — never commit it):
   ```
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```
3. Build with that value picked up automatically by Compose:
   ```bash
   docker compose up -d --build
   ```
4. Submit the live form once — Formspree requires one confirmation click on
   the first real submission before it starts delivering mail.

Leaving `VITE_CONTACT_ENDPOINT` unset keeps the current behaviour: the form
validates client-side and then opens a pre-filled `mailto:` draft instead of
posting anywhere.

---

## Pre-launch / follow-up checklist

- [x] Live behind kvi-proxy at `https://kvinnovations.in` with a Let's
      Encrypt cert; `www` → apex; HTTP → HTTPS.
- [x] Product URLs (FarmGrid, BillGrid, CampusGrid, BhattaGrid,
      ContractorOS) wired in [`src/data/products.js`](./src/data/products.js);
      nav, footer and product pages derive from it.
- [ ] BuildGrid / FamGrid: their containers are stopped (502). They are
      hidden via `listed: false` in `src/data/products.js` until restored.
- [x] Inactive GitHub Pages fallback removed (`public/CNAME`,
      `public/404.html`, the `redirect` shim in `index.html`, the
      `predeploy`/`deploy` scripts and `gh-pages` devDependency).
- [x] Replaced `public/og.svg` with a real rasterized `public/og.png`
      (1200×630) — SVG `og:image` isn't reliably rendered by Facebook,
      LinkedIn, Slack or WhatsApp link previews; PNG is universally supported.
- [ ] Set `VITE_CONTACT_ENDPOINT` per section 2 above so the contact form
      delivers mail instead of the `mailto:` fallback.
- [ ] Publish real Privacy / Terms copy in [`src/pages/Legal.jsx`](./src/pages/Legal.jsx).
- [ ] Add real articles to [`src/data/insights.js`](./src/data/insights.js).
- [ ] Real photography: no authentic KVI farm, processing or project photos
      exist yet, so the site uses line illustrations. Replace/augment with
      genuine KVI images (farms, Mokari processing/packing, sites) — never
      stock photos presented as KVI work.
