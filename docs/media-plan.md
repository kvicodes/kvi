# Media plan

The site is complete without photographs: its main visual is a drawn site plan,
and any photo slot with no file shows a drawn plate.

## Current photographs (2026-11-17)

Six photographs from Wikimedia Commons, each viewed before use, are in
`src/assets/photos/` (960 and 1920 px WebP). Their titles, authors, licences,
source links and the changes made are in `src/data/media.js` and shown on
`/credits`. CC BY and CC BY-SA require that attribution and change note, so do
not remove the credit while a photograph is in use.

| Slot | Photograph | Licence |
| --- | --- | --- |
| aerial-farm | Aerial view of agricultural fields in Punjab | CC BY-SA 4.0 |
| crop-rows | Paddy nursery in Raichur, Karnataka | CC BY-SA 4.0 |
| rice-field | Rice fields near Darbhanga, Bihar | CC BY-SA 4.0 |
| field-pond | Farm pond (Punjab) | CC BY-SA 4.0 |
| orchard | Mango orchard, Nazra village, Madhubani, Bihar (cropped to remove a date stamp) | CC BY 4.0 |
| greenhouse | Gerbera cultivation in a polyhouse | CC BY-SA 4.0 |

Video: one Mixkit clip (free for commercial use, no attribution required),
fetched by `npm run media:fetch` to `src/assets/video/`.

Unsplash could not be used: it blocks scripted downloads (HTTP 401), so the old
Unsplash slot list was dropped. `npm run media:fetch` now only fetches the video.

## Slots still on drawn plates

fish-pond, plantation, poultry, irrigation, farm-building, rice-grains,
packaging, mushroom, solar. Candidates were rejected on viewing: the poultry
photo showed intensive battery cages, the drip-irrigation and orchard-with-wall
photos were poor, and no suitable CC-licensed packaging, farm-building or solar
image was found. Real KVI photographs are preferred for all of these.

## Adding a photograph

1. Find it on Wikimedia Commons. Accept CC0, public domain, CC BY or CC BY-SA.
   Reject anything NC or ND.
2. View it. Reject clutter, date stamps, intensive-confinement scenes, and
   anything that implies a KVI project.
3. Save as `<slot>-960.webp` and `<slot>-1920.webp`, and add its `credit` in
   `src/data/media.js`.

## Photographs to commission

1. Aerial drone views of any KVI or partner farm (home, Greens).
2. Mokari Gobindbhog Rice: paddy, processing, packs (Greens).
3. Poultry, pond and polyhouse structures on real sites (Greens, Infra).
4. Real master plans and drawings, once they can be shared (Infra).
5. People at work on farms, with their consent (About).

## Rules

- Stock images are illustrative. The footer says so on every page.
- Never present a stock image as a KVI project. Project entries take real KVI
  photographs only (`images` in `src/data/projects.js`).
