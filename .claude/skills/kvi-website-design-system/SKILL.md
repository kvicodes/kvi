---
name: kvi-website-design-system
description: Conventions for the Kaimur Valley Innovations corporate website (this repo) — brand, tokens, components, content rules, accessibility, SEO and testing. Use when changing any page, component, copy or metadata on the KVI site.
---

# KVI website design system

Read `docs/DESIGN_SYSTEM.md` for tokens and components, `docs/content-claims.md` for what may be claimed, and `DEPLOYMENT.md` before anything touches production.

## Stack
React 19, Vite, React Router, Tailwind 3, plain JSX, npm. Static nginx container behind the shared kvi-proxy Caddy. The host has no Node: run npm in `node:22-alpine` and tests in `mcr.microsoft.com/playwright:v1.63.0-noble`, against a candidate container on localhost (see `.go-live.sh`).

## Brand
One group identity: deep forest field (#14211B), paper and stone neutrals, Instrument Serif capitals for display, Geist for text. Verticals are accents only where that vertical speaks: Greens olive, Tech rice-green, Infra copper. KVI Greens, KVI Tech and KVI Infra are capabilities of one company, not separate businesses. KVI Tech products are products, not businesses.

## Layout
Pages are thin: `PageHero`, then bands (`.band`, `.band-sm`) inside `.shell`. Put content in `src/data/`, not in JSX. Rules and whitespace structure the page; do not add card grids or boxes.

## Content rules (hard)
- Never invent products, statuses, URLs, customers, statistics, certifications, awards, testimonials or project photographs.
- Product facts come from the product's own repo README. A product is `listed` only if its public site responds. Unlisted products appear by name with their real status and no link.
- Statuses: Operational, In Development, Planned, Research. Use the weakest that is true.
- Forbidden wording is enforced in `tests/e2e/site.mjs` (`FORBIDDEN_TEXT`).
- Photos and plates are illustrative; `photoNote` says so.

## Accessibility
Semantic landmarks, one h1 per page, visible focus, keyboard-operable menus (Escape closes), 44 px touch targets, alt text on images, labelled form fields, `prefers-reduced-motion` honoured, WCAG 2.2 AA contrast. Closed menus must not hold focusable content.

## SEO
Every route has an entry in `src/data/seo.js` (unique title, description, canonical) and a line in `public/sitemap.xml`. `scripts/prerender-meta.mjs` writes static metadata at build. Structured data only for facts the site already states. New product pages are picked up from `products.js`.

## Adding things
- Page: component in `src/pages`, route in `src/App.jsx`, `seo.js`, sitemap, `ROUTES` in the tests, nav if primary.
- Product: entry in `products.js`; only add a `url` and `listed: true` once verified.
- Dependencies: none for decoration. No UI kit, no animation library.

## Verify before finishing
Lint (`oxlint`), build, candidate container, full acceptance suite. Never touch production, Caddy, DNS or volumes without explicit approval.

## Prohibited
Generic gradient hero, glassmorphism, rounded card grids, fake stats or testimonials, stock imagery presented as KVI work, third-party fonts or trackers, auto-playing sound, hiding the mailto fallback behind a fake "sent".
