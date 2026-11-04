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

### Names (verified 2026-10-19)

| What | Name |
| --- | --- |
| Compose project | `kvi` — derived from the directory name, so always run Compose from `~/kvi/repos/kvi` |
| Compose service | `kvi` (use this in `docker compose … kvi` commands) |
| Container | `kvi-website` (`container_name:`; use this with `docker ps/logs/exec`) |
| Image | `kvi-kvi:latest` — implicit `<project>-<service>`, as the service has `build:` but no `image:` |

### Deploy a change

```bash
cd ~/kvi/repos/kvi
# 0. test the candidate before touching production (isolated, localhost only)
docker build -t kvi-website:candidate .
docker run -d --rm --name kvi-website-candidate -p 127.0.0.1:18080:80 kvi-website:candidate
BASE_URL=http://127.0.0.1:18080 npm run test:e2e
docker stop kvi-website-candidate
# 1. keep the running image for rollback
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
see section 3).

### Roll back

```bash
cd ~/kvi/repos/kvi
docker images kvi-kvi                                   # find the rollback-* tag
docker tag kvi-kvi:rollback-YYYYMMDD-HHMM kvi-kvi:latest
docker compose up -d --no-build --force-recreate kvi    # service name, not container name
docker inspect kvi-website --format '{{.Image}}'        # confirm the expected image ID
```

Rollback touches only `kvi-website`; Caddy keeps routing to it by name. These
mechanics (tag → rebuild → retag → `up --no-build --force-recreate`) were
tested end to end in an isolated Compose project on 2026-10-19.

Roll back to an **image**, not a commit: the image live before the redesign
(`sha256:a0b827c4e435…`, built 2026-09-24) was built from an uncommitted
working tree. It is also exported to
`~/backups/kvi-website-live-image-20261019-135957/` — if its tag is ever
lost, `gunzip -c kvi-kvi_a0b827c4e435.tar.gz | docker load` restores
`kvi-kvi:latest`, then run the `up --no-build --force-recreate kvi` line.

Caddy needs no restart — it already routes `kvinnovations.in` to the
`kvi-website` container by name over the `kvi-proxy` network. If a routing
change is ever needed, that's an edit to `kvi-proxy/Caddyfile` followed by
`docker exec kvi-proxy caddy reload --config /etc/caddy/Caddyfile` (zero
downtime), not a change here.

### Notes

- Static files only — no backend, database, auth, or host-published port.
- `nginx.conf`'s `try_files $uri $uri/index.html /index.html` is what makes deep links
  (e.g. `/greens`) work with `BrowserRouter`. Do not remove it.
- `nginx.conf` also 301-redirects `/farms` to `/greens` and `/businesses` to
  `/about#verticals`
  (`absolute_redirect off` keeps the Location relative behind Caddy).
- First-time build with no local Node: see the Docker one-liner in
  [`README.md`](./README.md).

---

## 2. Acceptance tests

`tests/e2e/site.mjs` is a headless-Chromium (Playwright library) suite: all
public routes at desktop and mobile size, console errors and failed
requests, overflow, h1 and metadata, link targets, menus, the `/farms`
redirect, the Mokari Gobindbhog Rice panel, the privacy disclosures and the
contact form. Requests to other hosts are stubbed, so it never depends on
the live product sites, and any third-party request is a failure.

```bash
npx playwright install chromium     # once per machine
npm run build && npm run test:e2e   # serves dist/ with vite preview
BASE_URL=http://127.0.0.1:18080 npm run test:e2e   # or test a running container
```

---

## 3. Wiring the contact form to Formspree

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
3. Deploy with the procedure in section 1 (tag the running image, then
   `docker compose up -d --build`); Compose reads `.env` automatically and
   passes the value as a build arg. Check it was baked in:
   ```bash
   docker exec kvi-website sh -c 'grep -l formspree.io /usr/share/nginx/html/assets/*.js'
   ```
   The form's helper text and the Privacy page switch automatically to the
   "delivered by a form-processing service" wording.
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
- [ ] Set `VITE_CONTACT_ENDPOINT` per section 3 above so the contact form
      delivers mail instead of the `mailto:` fallback.
- [x] SEO: `scripts/prerender-meta.mjs` writes `dist/<route>/index.html` with
      each route's title, description, canonical and `og:*`; nginx serves them
      via `$uri/index.html`.
- [x] Fonts are self-hosted, so the site makes no third-party requests.
- [ ] Privacy: have a full policy reviewed (India DPDP Act 2023).
- [ ] `npm audit`: 8 build-time advisories in transitive dev dependencies
      (Tailwind 3 toolchain, `source-map-js`); none ship in the static bundle.
- [ ] Publish real Privacy / Terms copy in [`src/pages/Legal.jsx`](./src/pages/Legal.jsx).
- [ ] Add real articles to [`src/data/insights.js`](./src/data/insights.js).
- [ ] Photographs: run `npm run media:fetch` (see `docs/media-plan.md`), then
      replace with genuine KVI images as they become available. Stock photos
      are illustrative and never presented as KVI work.
