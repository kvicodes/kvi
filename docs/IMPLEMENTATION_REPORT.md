# Implementation report — 2026-11-17

Approach agreed with the founder: evolve the existing site, not rebuild it. See `docs/WEBSITE_AUDIT.md` for why.

## What changed
- Navigation now reads About, Businesses (KVI Greens, KVI Tech, KVI Infra), Products, Innovation, Projects, Contact. Desktop uses a keyboard-accessible disclosure menu; mobile shows the three businesses as a grouped list.
- New `/innovation` page (software, automation, applied AI, agricultural innovation, sustainable development). Every capability shows its Live or Research state from existing data; nothing new is claimed.
- AthletixGrid appears in the portfolio as "In development", unlinked, based on its repo README.
- Sitemap, SEO entry, footer links and acceptance tests updated.
- Documents: `WEBSITE_AUDIT`, `WEBSITE_REDESIGN_PLAN`, `DESIGN_SYSTEM`, `DEPLOYMENT_GUIDE`, this report. Skill: `.claude/skills/kvi-website-design-system/SKILL.md`.

## Files
Modified: `src/App.jsx`, `src/components/Nav.jsx`, `src/components/shared.jsx`, `src/data/navigation.js`, `src/data/products.js`, `src/data/seo.js`, `public/sitemap.xml`, `tests/e2e/site.mjs`.
New: `src/pages/Innovation.jsx`, the five docs and the skill above.

## Dependencies
None added or removed.

## Tests (run locally in Docker, against a candidate container on 127.0.0.1; nothing near production)
- `oxlint`: 0 warnings, 0 errors.
- Docker image build from the repo Dockerfile: passes. nginx serves `/innovation` with 200.
- Acceptance suite: all checks passed, including 21 route-and-viewport loads, no horizontal overflow at 360 to 1920 px, link targets, redirects, downloads, contact validation and fallback, mobile menu, the new Businesses menu (closed by default, opens from keyboard, Escape closes) and AthletixGrid.
- Not run: Lighthouse, Core Web Vitals, a visual review of screenshots, a manual screen-reader pass.
- `npm audit`: 3 dev-time advisories in `vite` remain.

## Not done, and why
- CreatorGrid: no repository or public site, so no status can be verified. Not listed. Needs founder input.
- Photographs: `npm run media:fetch` needs a machine with internet access and a human to view the results.
- Brief's items skipped by decision: Next.js/TypeScript, shadcn/ui, Magic UI, Framer Motion, technology-first rebrand.
- HSTS/CSP at Caddy: separate repo, production config.

## Production
Not modified. Nothing committed, pushed or deployed. No Caddy, DNS, TLS, container or volume changes. The untracked `.go-live.sh` was only read.

## Deploy
See `docs/DEPLOYMENT_GUIDE.md`.
