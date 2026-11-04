# Redesign report: Building the Future of Farming

Branch: `redesign/future-of-farming`, from `main` at 89d851b. Not pushed, not deployed.

## Audit summary

- React 19, Vite 8, React Router 7 (`BrowserRouter`), Tailwind 3, plain JSX.
  Kept. The project has no TypeScript, so none was added.
- Static nginx container behind the shared kvi-proxy Caddy. Dockerfile and
  docker-compose.yml are unchanged. nginx.conf gained one redirect and an mp4
  cache rule.
- No kvi-proxy, Caddy, environment or container changes.

## Design system

- Palette (`src/index.css`): field #14211B, stone #E6E4DB, paper #F4F3ED,
  graphite #232623, olive #58623C, sage #A8B096, copper #8F4E23, rice #C5CE7A.
- Colour by vertical: olive for Greens, rice for Tech, copper for Infra.
- Type: Instrument Serif capitals for display, Geist for text, both self-hosted.
- Signature: one drawn farm plan with Greens, Infra and Tech as layers. It draws
  itself once in the hero and changes layer as you scroll the ecosystem section.

## Pages

Redesigned: Home, About, Greens, Tech, Infra, Products, Product, Contact,
Insights, Privacy, Terms, 404. New: Projects. Removed: `/businesses`, which now
301s to `/about#verticals`.

## Components

Created: `SitePlan`, `Drawings` (StageFrame, Typology), `Photo` (Photo, FieldFilm,
plates), `Logo`, `ui` (Button, TextLink, Reveal, VerticalMark, StatusLabel),
`shared` (PageHero, ProjectEntry, StatusKey, Portfolio, Partnerships).
Rewritten: `Nav`, `Footer`, `ContactForm` (delivery logic unchanged).
Removed: the old `components/` and `sections/` folders.

## Dependencies

Added: `@fontsource-variable/geist`, `@fontsource/instrument-serif`. Removed: none.
Removing Google Fonts means the site makes no third-party requests, and the
Privacy page is updated to say so.

## SEO

Unique titles and descriptions (`src/data/seo.js`), canonical URLs, Open Graph,
new `og.png`, Organization, WebSite and SoftwareApplication structured data,
updated sitemap. New: per-route static HTML metadata at build time.

## Tests

Run in a cloud workspace with `npm run build`, `npm run lint`, `npm run test:e2e`.
Result: lint clean, build passes, 33 of 33 acceptance checks pass, axe WCAG A and AA clean on 8 key pages at desktop and mobile. The suite covers all routes at desktop
and mobile, 7 widths for overflow, console errors, failed requests, h1, metadata,
link targets, accessibility basics, homepage order, ecosystem scroll, redirects,
project filter, contact form, mobile menu and blocked claims.

## Known limitations

- Photographs and video are not yet in the repo (see `docs/media-plan.md`). Image
  sites were unreachable from the build environment, so the photo selections
  have not been viewed and the fetch script has only been tested with mock data.
- The Docker image and nginx.conf were not tested: no Docker daemon or nginx was
  available. Use the candidate step in DEPLOYMENT.md before deploying.
- Live product sites could not be checked. Links rely on the repo's record from
  2026-10-19.
- No social links are shown because none are recorded in the repo.

## For the founder to confirm

- Project statuses in `src/data/projects.js`.
- Capability states on the Tech page (`techCapabilities`). Anything with no
  evidence in the repo is marked Research.
- "KVI has not issued or claimed carbon credits" (home, Projects).
- Whether any KVI-owned farm operates today. If so, add it to Projects, with its
  location and photographs.
- Whether BuildGrid and FamGrid are back online.

## Deployment

1. Review the branch locally with `npm run dev`.
2. Run `npm run media:fetch`, review, commit.
3. Merge to `main`, then follow "Deploy a change" in DEPLOYMENT.md, including the
   candidate container test.
4. After deploying, also check that `/businesses` returns 301 and that
   `curl -s https://kvinnovations.in/greens | grep '<title>'` shows the Greens title.
