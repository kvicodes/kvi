# Kaimur Valley Innovations: Corporate Website

The corporate website for **Kaimur Valley Innovations Pvt. Ltd. (KVI)**, an
integrated farm development and agritech company.

## Structure

```
Kaimur Valley Innovations Pvt. Ltd.
├── KVI Greens   Agriculture, agribusiness and natural resources
├── KVI Tech     Agritech, software, AI and automation
│   ├── FarmGrid       farmgrid.kvinnovations.in (agricultural platform)
│   ├── BillGrid       billgrid.kvinnovations.in
│   ├── CampusGrid     campusgrid.kvinnovations.in
│   ├── BhattaGrid     bhattagrid.kvinnovations.in
│   └── ContractorOS   contractoros.kvinnovations.in
└── KVI Infra    Farm architecture, agricultural infrastructure, farm development
```

BuildGrid and FamGrid are named in the portfolio with no link while their
public sites are offline. Set `listed: true` in `src/data/products.js` to link
them and give them product pages.

## Tech stack

- React 19 and Vite 8 (plain JSX)
- React Router 7, `BrowserRouter` (clean URLs)
- Tailwind CSS 3. Colours are CSS variables in `src/index.css`;
  `tailwind.config.js` only maps them
- Self-hosted fonts: Instrument Serif (display) and Geist (text), via Fontsource
- `oxlint` for linting, Playwright for the acceptance suite

## Project structure

```
src/
  assets/       Photographs and video (see docs/media-plan.md)
  components/   Nav, Footer, SitePlan, Photo, Drawings, shared blocks, ui
  layouts/      SiteLayout, the app shell
  pages/        One file per route
  data/         Content: company, verticals, projects, products, seo, media
  lib/          Hooks, the contact-submit seam, the per-route <meta> helper
scripts/
  fetch-media.mjs      Downloads the site's photographs and video
  prerender-meta.mjs   Writes per-route HTML metadata after the build
```

Content lives in `src/data/`. To add a project, add an entry to
`src/data/projects.js`; the card, filters and status labels follow.

The signature visual is `SitePlan`: one generated farm plan
(`src/data/sitePlan.js`) with Greens, Infra and Tech as layers.

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/about` | Company, vision, mission, philosophy, verticals, direction |
| `/greens`, `/tech`, `/infra` | The three verticals |
| `/projects` | Projects and initiatives with status labels |
| `/products`, `/products/:slug` | Software portfolio and product pages |
| `/contact` | Enquiry form (`?enquiry=<type>&product=<slug>` preselects) |
| `/insights` | Empty until articles exist (noindex) |
| `/privacy`, `/terms` | Legal |
| `/farms` | 301 to `/greens` |
| `/businesses` | 301 to `/about#verticals` |

Content rules: no invented projects, clients, figures, certifications or
history. Keep what operates today separate from what is planned.
`docs/content-claims.md` records claims that need evidence.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Local dev server with hot reload         |
| `npm run build`   | Production build to `dist/`, with per-route metadata |
| `npm run media:fetch` | Download photographs and video (see docs/media-plan.md) |
| `npm run preview` | Preview the production build             |
| `npm run lint`    | Run oxlint                               |
| `npm run test:e2e` | Headless acceptance suite (after `npm run build`; see DEPLOYMENT.md §2) |

No Node.js locally? Build in Docker:

```bash
docker run --rm -v "${PWD}:/app" -w /app node:22-alpine \
  sh -c "npm install && npm run build"
```

## Contact form

There is **no backend**. The form validates client-side and, until an endpoint
is configured, hands the visitor a pre-filled `mailto:` draft — it never shows
a fake "sent" confirmation. To wire it to a real
service (e.g. Formspree), set `VITE_CONTACT_ENDPOINT` (POST JSON) at **build**
time — see [`src/lib/submitContact.js`](./src/lib/submitContact.js) and
[`DEPLOYMENT.md`](./DEPLOYMENT.md#3-wiring-the-contact-form-to-formspree).

## Deployment

**Live at [`https://kvinnovations.in`](https://kvinnovations.in)** — served on
the shared KVI host by the standalone **kvi-proxy** Caddy (container
`kvi-website`, no host ports; `www` → apex; HTTP → HTTPS; Let's Encrypt).

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full picture.
