# Kaimur Valley Innovations — Website

The marketing website for **Kaimur Valley Innovations Pvt. Ltd. (KVI)**, a
diversified innovation and technology company building solutions across
agriculture, farm infrastructure, agri-technology, construction, and digital
business platforms.

## Tech Stack

- [React 19](https://react.dev/) with [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (`HashRouter`, for static hosting on GitHub Pages)
- [Tailwind CSS](https://tailwindcss.com/) with a custom brand theme
- [lucide-react](https://lucide.dev/) for icons
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## Project Structure

```
src/
  components/   Reusable UI: Header, Footer, Button, Card, SectionHeading, etc.
  pages/        One file per route: Home, About, Services, ServiceDetail, Contact
  data/         content.js — all site copy, verticals, values, and contact
                placeholders in one place, so text can be edited without
                touching component code.
```

## Getting Started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints in the terminal (e.g. `http://localhost:5173/`).

## Available Scripts

| Command           | Description                                      |
| ------------------ | ------------------------------------------------- |
| `npm run dev`       | Start the local dev server with hot reload         |
| `npm run build`     | Build the production bundle into `dist/`           |
| `npm run preview`   | Preview the production build locally               |
| `npm run lint`      | Run oxlint                                         |
| `npm run deploy`    | Build and publish to GitHub Pages (`gh-pages`)     |

## Editing Content

Nearly all site copy — the hero text, business verticals, core values,
mission/vision, and contact details — lives in
[`src/data/content.js`](./src/data/content.js). Update it there rather than
in the page components.

The contact address, phone, and email in that file are **placeholders** —
search for `PLACEHOLDER` comments and replace them with real details before
launch.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full instructions on publishing to
GitHub Pages, and a checklist for migrating to a self-hosted server later.
