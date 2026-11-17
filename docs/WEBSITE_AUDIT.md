# Website audit — 2026-11-17

Scope: repository and local infrastructure files only. Nothing in production was inspected or changed. The live site was not fetched.

## Existing architecture

- React 19, Vite 8, React Router 7 (`BrowserRouter`), Tailwind 3, plain JSX. No TypeScript, no Next.js. Package manager: npm (`package-lock.json`).
- Static site. `npm run build` runs `vite build`, then `scripts/prerender-meta.mjs`, which writes `dist/<route>/index.html` with each route's title, description, canonical URL and Open Graph tags (the SPA otherwise serves one `index.html`).
- Runtime: one nginx container (`kvi-website`) from a two-stage Dockerfile (`node:22-alpine` build, `nginx:alpine` serve). `docker-compose.yml` joins the private `kvi-website-internal` network and the external `kvi-proxy` network. No host ports. TLS is terminated by the shared Caddy in `kvi-proxy` (separate repo, not modified).
- Branches: `main` (current), `dev` (origin default; diverged, older design), `redesign/future-of-farming`, `restored-2026-11-03`. Working tree: only untracked `.go-live.sh`, left alone.
- Routes: `/`, `/about`, `/greens`, `/tech`, `/infra`, `/projects`, `/products`, `/products/:slug`, `/innovation` (new), `/insights` (noindex, no articles), `/contact`, `/privacy`, `/terms`, 404. `/farms` and `/businesses` redirect.
- Data-driven content: `src/data/*.js` (company, verticals, products, projects, seo, contact, navigation, media). Pages are thin and compose shared components.
- Components: `Nav`, `Footer`, `Logo`, `SitePlan`, `Drawings`, `Photo`, `ContactForm`, `ui` (Button, TextLink, Reveal, VerticalMark, StatusLabel), `shared` (PageHero, ProjectEntry, StatusKey, Portfolio, Partnerships).
- Design system: tokens in `src/index.css` and `tailwind.config.js`. See `docs/DESIGN_SYSTEM.md`.
- Fonts: Geist Variable and Instrument Serif, self-hosted via `@fontsource`. No third-party requests.
- Analytics: none. Cookies: none. Privacy page says so.
- Contact: `src/lib/submitContact.js` posts to `VITE_CONTACT_ENDPOINT` (Formspree, baked in at build time). With no endpoint it opens a prefilled email and says so; it never claims "sent".
- Secrets: none in the repo. The only env var, `VITE_CONTACT_ENDPOINT`, is a public form URL by nature.
- Health check / logging: none in the container. nginx default access log only.

## Baseline (before this change)

| Check | Result |
| --- | --- |
| `npm ci` | passes |
| `oxlint` | 0 warnings, 0 errors (45 files) |
| TypeScript | not applicable (no TypeScript) |
| `npm run build` | passes, 15 route files prerendered. JS 330 kB (102 kB gzip), CSS 31 kB (7 kB gzip) |
| `npm audit` | 3 vulnerabilities (1 moderate, 2 high), all in `vite`, a build-time tool; none ships in the bundle |
| Acceptance suite | not run at baseline; the earlier report records 33 of 33 |

## Assessment against the brief

Already met: corporate identity, three verticals shown as one ecosystem, product directory with verified links and statuses, real contact form with honest fallback, per-page metadata, sitemap, robots, JSON-LD (Organization, WebSite, SoftwareApplication), reduced-motion support, no third-party requests, a claims-evidence rule (`docs/content-claims.md`) enforced by tests.

Gaps found:

1. Navigation lacked the "Our Businesses" group and an Innovation page. Fixed in this change.
2. AthletixGrid is a KVI product in `/home/kvi/kvi/repos/AthletixGrid` but was missing from the portfolio. Added as "In development" (its README: foundation phase, nothing deployed), no link, no product page.
3. CreatorGrid has no repository and no public site. Not added. Needs founder confirmation of status.
4. Photographs and video are still absent (`docs/media-plan.md`). The site uses drawn plates instead. Selections were never viewed.
5. The Docker image and nginx.conf had never been tested. Tested in this change (see report).
6. No security headers beyond nosniff, frame and referrer policy. No CSP, no HSTS (HSTS belongs on Caddy).
7. `vite` dev-dependency advisories. Dev-time only; upgrade when convenient.
8. Not measured: Lighthouse and Core Web Vitals.

## Deviations from the brief (decided with the founder)

- Kept React/Vite/JS rather than moving to Next.js/TypeScript: the brief says to preserve the framework, and there is no technical reason to change.
- Kept the agritech-led positioning ("Building the Future of Farming") rather than a technology-first identity.
- No shadcn/ui, Magic UI or Framer Motion: the site's own components and CSS cover the need, and the brief says not to add dependencies for decoration.

## Security considerations

- Static site, no server code, no database, no secrets: small attack surface.
- Contact form: validated client-side; the server-side validation and spam protection are Formspree's. There is no CSRF token (not applicable to a cross-origin form post with no session). Honeypot/rate-limit settings live in the Formspree dashboard, which I cannot see.
- XSS: React escapes output; no `dangerouslySetInnerHTML` is used (verify with `grep -rn dangerouslySetInnerHTML src`). The prerender script escapes `& " <` in metadata.
- External links use `rel="noreferrer noopener"`.
- Recommended, not done (production config): HSTS and a CSP at Caddy.

## Risks and migration considerations

- Contact endpoint is baked in at build time. A build without `VITE_CONTACT_ENDPOINT` silently degrades to mailto. `.go-live.sh` guards against this.
- `/businesses` is a 301 to `/about#verticals`. Do not add a `/businesses` page without removing that redirect in `nginx.conf`.
- New route `/innovation` needs nothing in nginx (covered by `try_files`).
