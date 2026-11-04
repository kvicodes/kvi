# Media plan

The site is complete without photographs: its main visual is a drawn site plan,
and any photo slot with no file shows a drawn plate. Photographs make it richer.

## Get the photographs

Run this on your own computer, in the VS Code terminal, from the repo:

```bash
npm run media:fetch
npm run dev
```

The script downloads 15 photographs in two sizes (960 and 1920 px WebP) to
`src/assets/photos/` and one short clip to `src/assets/video/`. Nothing needs
installing. It lists anything that failed; failed slots keep their drawn plate.

Then look at every photo on the site. The selections were made from each
source's title and description, not by viewing the images, so some may need
swapping. To swap one, change its `id` in `src/data/media.js`, delete its two
files and run the command again. When you are happy:

```bash
git add src/assets
git commit -m "site: add photographs and video"
```

## Sources

All photographs are from Unsplash under the Unsplash License (free for
commercial use, no attribution required). Confirm each one on its page before
publishing: if a page shows the Unsplash+ badge, it is not free to use.

| Slot | Used on | Source |
| --- | --- | --- |
| aerial-farm | Home, Greens | https://unsplash.com/photos/cIhRe6S05KQ |
| crop-rows | Home | https://unsplash.com/photos/aS14a9_TEeg |
| rice-field | Home (film poster) | https://unsplash.com/photos/V6_hi3GXIF0 |
| fish-pond | Home, Greens | https://unsplash.com/photos/-cmS3XCGUXk |
| field-pond | Spare | https://unsplash.com/photos/ufnPAXLS1SM |
| orchard | Home, Greens | https://unsplash.com/photos/3rmZ7Uv4Ah0 |
| plantation | Home | https://unsplash.com/photos/OGyPlgF-MDM |
| poultry | Home, Greens | https://unsplash.com/photos/Mpm69Pad_-8 |
| greenhouse | Greens, Infra | https://unsplash.com/photos/3shNBF2sTAI |
| irrigation | Home, Infra | https://unsplash.com/photos/sktVzTJcGAs |
| farm-building | Home | https://unsplash.com/photos/RBeJp_8_bGQ |
| rice-grains | Home | https://unsplash.com/photos/b-AYmZeowJQ |
| packaging | Home, Greens | https://unsplash.com/photos/jOlroOaknnI |
| mushroom | Spare | https://unsplash.com/photos/eF4zd09O4b8 |
| solar | Infra | https://unsplash.com/photos/e5kpS6Xpg04 |

Video: one Mixkit clip, used as a short muted band on the homepage with a pause
control. Check its licence on the page before publishing:
https://mixkit.co/free-stock-video/a-road-between-a-big-green-agriculture-field-827/

## Photographs to commission

Stock images should be replaced with real KVI images as they exist. Priority:

1. Aerial drone views of any KVI or partner farm (home, Greens).
2. Mokari Gobindbhog Rice: paddy, processing, packs (Greens).
3. Poultry, pond and polyhouse structures on real sites (Greens, Infra).
4. Real master plans and drawings, once they can be shared (Infra).
5. People at work on farms, with their consent (About).

To use a real photograph, save it as `<slot>-960.webp` and `<slot>-1920.webp` in
`src/assets/photos/` and update its `alt` in `src/data/media.js`.

## Rules

- Stock images are illustrative. The footer says so on every page.
- Never present a stock image as a KVI project. Project entries take real KVI
  photographs only (`images` in `src/data/projects.js`).
