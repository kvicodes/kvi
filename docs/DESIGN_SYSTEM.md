# KVI design system

Source of truth: `src/index.css` (tokens), `tailwind.config.js` (mapping), `src/components/` (parts).

## Brand
One corporate identity for the group, with each vertical marked by one accent. Colour is rationed: neutral stone and paper surfaces, one dark surface (field).

| Token | Value | Use |
| --- | --- | --- |
| field | #14211B | the dark surface; deep forest charcoal |
| field-raised | #1F2E26 | cards on field |
| paper | #F4F3ED | page background |
| stone | #E6E4DB | alternate band |
| graphite | #232623 | text |
| muted | #545950 | secondary text |
| line / line-dark | #CDCBBF / #3E4E45 | rules |
| olive | #58623C | KVI Greens |
| rice | #C5CE7A | KVI Tech (on field) |
| copper / copper-light | #8F4E23 / #D99664 | KVI Infra; focus ring on light |
| sage | #A8B096 | secondary text on field |

The brief suggested navy for KVI Tech and stone for KVI Infra. The shipped system uses rice-green and copper instead because they hold contrast on field and keep the group looking like one company. Revisit only with a contrast check.

## Typography
- Display: Instrument Serif, uppercase, tight leading. Classes `display`, `display-xl`, `display-l`, `display-m`.
- Text: Geist Variable, 17 px base, 1.6 line height. `lede`, `title`, `small`.
- Both self-hosted. No third-party font requests.

## Spacing, shape, motion
- Container `.shell`: max 1560 px, gutters 16 / 24 / 40 / 56 px by breakpoint.
- Vertical rhythm: `.band` and `.band-sm` use clamp-based padding.
- Radius: 3 px default. Shadows are used sparingly; rules (1 px lines) do most of the structuring.
- Easing `survey` = cubic-bezier(0.22, 1, 0.36, 1). Reveal on scroll via `Reveal`; all motion respects `prefers-reduced-motion` (`useReducedMotion`).

## Breakpoints
sm 480, md 768, lg 1024, xl 1280, 2xl 1680. Desktop navigation from lg.

## Components
`Nav` (desktop disclosure + mobile full-screen menu), `Footer`, `Logo`, `PageHero`, `VerticalEyebrow`, `StatusLabel` / `StatusKey` (Operational, In Development, Planned, Research), `ProjectEntry`, `Portfolio`, `Partnerships`, `Button` (solid-dark, solid-light, line-dark, line-light), `TextLink`, `Reveal`, `VerticalMark`, `SitePlan` (the signature drawing), `Photo`, `ContactForm`.

## States
Focus: 2 px outline, copper on light, rice on dark, 3 px offset. Buttons: min height 2.5 rem desktop, 44 px touch targets on mobile. Hover is never the only affordance.
