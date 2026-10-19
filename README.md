# Kaimur Valley Innovations — Corporate Website

The corporate website for **Kaimur Valley Innovations Pvt. Ltd. (KVI)**, an
AgroTech-led company building businesses and technology around agriculture,
food processing, rural infrastructure and enterprise software.

## Business structure

```
Kaimur Valley Innovations Pvt. Ltd.
├── KVI Greens   Agriculture, food processing & natural products  (lead division)
├── KV Infra     Infrastructure & project execution
└── KVI Tech     Software products & technology services
    ├── FarmGrid       farmgrid.kvinnovations.in
    ├── BillGrid       billgrid.kvinnovations.in
    ├── CampusGrid     campusgrid.kvinnovations.in
    ├── BhattaGrid     bhattagrid.kvinnovations.in
    └── ContractorOS   contractoros.kvinnovations.in
```

BuildGrid and FamGrid are kept in `src/data/products.js` with `listed: false`
while their public sites are offline; flip the flag to show them again.

## Tech stack

- [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (plain JSX)
- [React Router 7](https://reactrouter.com/) — `BrowserRouter` (clean URLs)
- [Tailwind CSS 3](https://tailwindcss.com/) with a token-based theme
  (all colours are CSS variables in [`src/index.css`](./src/index.css) — edit
  there to re-skin the whole site; `tailwind.config.js` only maps them)
- [Fraunces](https://fonts.google.com/specimen/Fraunces) (h1/h2) + [Inter / Inter Tight](https://fonts.google.com/specimen/Inter) via Google Fonts
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

| Route | Page |
| --- | --- |
| `/` | Corporate homepage |
| `/about` | Company overview, mission, model, structure, vision |
| `/businesses` | The three divisions and how they connect |
| `/greens` | KVI Greens — farmer partnerships, ecosystem, Mokari |
| `/infra` | KV Infra — capability areas and execution |
| `/tech` | KVI Tech — products and technology services |
| `/products` | Full product portfolio by sector |
| `/products/:slug` | One page per product (`farmgrid`, `billgrid`, `campusgrid`, `bhattagrid`, `contractoros`) |
| `/contact` | Enquiry routes + form (`?enquiry=<type>&product=<slug>` preselects) |
| `/insights`, `/privacy`, `/terms` | Supporting pages |
| `/farms` | 301 → `/greens` (nginx) and client-side redirect |

Content rules (see the comments at the top of each `src/data/*.js` file): no
invented projects, clients, figures, certifications or history. The KVI Greens
ecosystem is always shown with its "being built progressively" note.

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
[`DEPLOYMENT.md`](./DEPLOYMENT.md#2-wiring-the-contact-form-to-formspree).

## Deployment

**Live at [`https://kvinnovations.in`](https://kvinnovations.in)** — served on
the shared KVI host by the standalone **kvi-proxy** Caddy (container
`kvi-website`, no host ports; `www` → apex; HTTP → HTTPS; Let's Encrypt).

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full picture.
