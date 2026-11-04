// ---------------------------------------------------------------------------
// Photography and video slots.
//
// Each slot names a free-licence source (Unsplash License: free for commercial
// use, no attribution required). `npm run media:fetch` downloads and sizes them
// into src/assets. A slot with no file falls back to the drawn `plate`, so the
// site is complete with or without them.
//
// Rules: photographs are illustrative and never presented as KVI work. To use a
// real KVI photograph, save it as src/assets/photos/<slot>-960.webp and
// <slot>-1920.webp and update `alt`.
// ---------------------------------------------------------------------------

export const media = [
  { slot: 'aerial-farm', id: 'cIhRe6S05KQ', plate: 'parcels', alt: 'Aerial view of farmland with a road running through it' },
  { slot: 'crop-rows', id: 'aS14a9_TEeg', plate: 'rows', alt: 'Green field with parallel rows seen from above' },
  { slot: 'rice-field', id: 'V6_hi3GXIF0', plate: 'contours', alt: 'Rice field with trees in the background' },
  { slot: 'fish-pond', id: '-cmS3XCGUXk', plate: 'ponds', alt: 'Aerial view of a square fish pond' },
  { slot: 'field-pond', id: 'ufnPAXLS1SM', plate: 'ponds', alt: 'Aerial view of agricultural fields and a pond' },
  { slot: 'orchard', id: '3rmZ7Uv4Ah0', plate: 'orchard', alt: 'A row of trees in an orchard' },
  { slot: 'plantation', id: 'OGyPlgF-MDM', plate: 'orchard', alt: 'Aerial view of a field and trees' },
  { slot: 'poultry', id: 'Mpm69Pad_-8', plate: 'sheds', alt: 'Poultry on a farm' },
  { slot: 'greenhouse', id: '3shNBF2sTAI', plate: 'ribs', alt: 'Inside a greenhouse with rows of plants' },
  { slot: 'irrigation', id: 'sktVzTJcGAs', plate: 'contours', alt: 'A field being irrigated with sprinklers' },
  { slot: 'farm-building', id: 'RBeJp_8_bGQ', plate: 'sheds', alt: 'Aerial view of a building in the middle of a field' },
  { slot: 'rice-grains', id: 'b-AYmZeowJQ', plate: 'grains', alt: 'Rice grains with a measuring scoop' },
  { slot: 'packaging', id: 'jOlroOaknnI', plate: 'grains', alt: 'Packed goods in plastic packs' },
  { slot: 'mushroom', id: 'eF4zd09O4b8', plate: 'grains', alt: 'Mushrooms on a tray' },
  { slot: 'solar', id: 'e5kpS6Xpg04', plate: 'ribs', alt: 'Aerial view of solar panels in a field' },
]

export const video = {
  file: 'field-road.mp4',
  url: 'https://assets.mixkit.co/videos/827/827-720.mp4',
  page: 'https://mixkit.co/free-stock-video/a-road-between-a-big-green-agriculture-field-827/',
  poster: 'rice-field',
  alt: 'A road between green agricultural fields',
}
