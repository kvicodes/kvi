# Kaimur Valley Innovations — Corporate Website

The main corporate website for **Kaimur Valley Innovations (KVI)**, a
diversified Indian business group that builds and operates businesses across
infrastructure, agriculture & natural products, and technology.

This is the **group** website — not the site for any single business
(KVI Infra, Kaimur Farms, KVI Tech) or product (ContractorOS, CampusGrid).

## Business structure

```
Kaimur Valley Innovations (KVI)  — parent group
├── KVI Infra      Farm Development & Infrastructure
├── Kaimur Farms   Agriculture & Natural Products
└── KVI Tech       Technology & Digital Products
    ├── ContractorOS   (KVI Tech product)
    └── CampusGrid     (KVI Tech product)
```

## Tech stack

- [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (plain JSX)
- [React Router 7](https://reactrouter.com/) — `BrowserRouter` (clean URLs)
- [Tailwind CSS 3](https://tailwindcss.com/) with a token-based theme
  (all colours are CSS variables in [`src/index.css`](./src/index.css) — edit
  there to re-skin the whole site; `tailwind.config.js` only maps them)
- [Inter / Inter Tight](https://fonts.google.com/specimen/Inter) via Google Fonts
- Local inline-SVG icon set ([`src/components/Icon.jsx`](./src/components/Icon.jsx)) — no icon dependency
- `oxlint` for linting

## Project structure

```
src/
  components/   Reusable UI (Nav, Footer, Button, Section, Card, Icon, …)
  layouts/      SiteLayout — the app shell
  sections/     Page-level composed blocks (Hero, EcosystemSection, …)
  pages/        One file per route
  data/         Structured content: businesses, products, insights, navigation
  lib/          Hooks + the contact-submit seam + per-route <meta> helper
```

Content lives in `src/data/` as structured data, not hardcoded in components.
Add a business, product or article by editing the relevant file there.

## Routes

`/` · `/about` · `/businesses` · `/infra` · `/farms` · `/tech` · `/insights` ·
`/contact` · `/privacy` · `/terms`

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Local dev server with hot reload         |
| `npm run build`   | Production build to `dist/`              |
| `npm run preview` | Preview the production build             |
| `npm run lint`    | Run oxlint                               |
| `npm run deploy`  | Build + publish to GitHub Pages fallback |

No Node.js locally? Build in Docker:

```bash
docker run --rm -v "${PWD}:/app" -w /app node:22-alpine \
  sh -c "npm install && npm run build"
```

## Contact form

There is **no backend**. The form validates client-side and, until an endpoint
is configured, hands the visitor a `mailto:` fallback. To wire it to a real
service later, set `VITE_CONTACT_ENDPOINT` (POST JSON) — see
[`src/lib/submitContact.js`](./src/lib/submitContact.js). That is the only file
that needs to change.

## Deployment

**Live at [`https://kvinnovations.in`](https://kvinnovations.in)** — served on
the shared KVI host by the standalone **kvi-proxy** Caddy (container
`kvi-website`, no host ports; `www` → apex; HTTP → HTTPS; Let's Encrypt).

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full picture. The GitHub Pages
setup in this repo is now **inactive** and pending removal.
