# Redesign plan

Decision (founder, 2026-11-17): evolve the current site. Do not rebuild.

## Done in this pass
- Navigation: About, Businesses (Greens, Tech, Infra), Products, Innovation, Projects, Contact. Accessible disclosure menu on desktop; grouped list on mobile.
- `/innovation` page: software, automation, applied AI, agricultural innovation, sustainable development. Every capability carries its Live / Research state from `techCapabilities`.
- AthletixGrid added to the portfolio as In development (no link).
- Sitemap, SEO metadata and acceptance tests updated.
- Documents: audit, design system, project skill, deployment guide, implementation report.

## Next, in order
1. Founder confirms: CreatorGrid status and whether it should be listed; BuildGrid and FamGrid back online; project statuses.
2. Run `npm run media:fetch`, view every photograph, commit. Replaces drawn plates.
3. Lighthouse and Core Web Vitals on the deployed candidate.
4. Formspree: confirm spam filtering and notification address.
5. Caddy: HSTS and a CSP (separate repo, needs explicit approval).
6. Upgrade `vite` to clear the dev advisories.
7. Insights: publish real articles, then remove `noindex`.

## Rules for any further change
Follow `.claude/skills/kvi-website-design-system/SKILL.md`. No invented products, statuses, URLs, statistics or testimonials.
