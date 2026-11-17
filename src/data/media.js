// ---------------------------------------------------------------------------
// Photography and video slots.
//
// A slot with a `credit` has a photograph in src/assets/photos/<slot>-960.webp
// and -1920.webp, taken from Wikimedia Commons under the licence recorded here.
// CC BY and CC BY-SA require attribution and a note of changes, so every
// credited photograph is listed on /credits (src/pages/Credits.jsx reads this
// file). A slot with no credit has no photograph and shows a drawn plate.
//
// Rules: photographs are illustrative and never presented as KVI work. Before
// adding one, view it, check its licence on the Commons page (CC0, CC BY and
// CC BY-SA are acceptable; anything with NC or ND is not), and add its credit.
// To use a real KVI photograph, save it as <slot>-960.webp and <slot>-1920.webp,
// drop `credit` and update `alt`.
// ---------------------------------------------------------------------------

export const media = [
  {
    slot: 'aerial-farm',
    plate: 'parcels',
    alt: 'Aerial view of patchwork agricultural fields, farm buildings and a road in Punjab, India',
    credit: {
      title: 'Aerial view of agricultural fields in Punjab, India',
      author: 'Bhullargraphic',
      licence: 'CC BY-SA 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_agricultural_fields_in_Punjab,_India.jpg',
      changes: 'resized and converted to WebP',
    },
  },
  {
    slot: 'crop-rows',
    plate: 'rows',
    alt: 'Bright green rice seedling beds on a farm in Raichur, Karnataka',
    credit: {
      title: 'Paddy nursery in Raichur, Karnataka',
      author: 'Nanditha Gogate, WELL Labs',
      licence: 'CC BY-SA 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Paddy_nursery_in_Raichur,_Karnataka.jpg',
      changes: 'resized and converted to WebP',
    },
  },
  {
    slot: 'rice-field',
    plate: 'contours',
    alt: 'Green rice fields with trees and a power line near Darbhanga, Bihar',
    credit: {
      title: 'Rice fields near Darbhanga, Bihar 2',
      author: 'Suyash.dwivedi',
      licence: 'CC BY-SA 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Rice_fields_near_Darbhanga,_Bihar_2.jpg',
      changes: 'resized and converted to WebP',
    },
  },
  {
    slot: 'field-pond',
    plate: 'ponds',
    alt: 'A farm pond beside a green field in Punjab, India',
    credit: {
      title: 'Farm pond',
      author: 'mvskapurthala (Wikimedia Commons user)',
      licence: 'CC BY-SA 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Farm_pond.jpg',
      changes: 'resized and converted to WebP',
    },
  },
  {
    slot: 'orchard',
    plate: 'orchard',
    alt: 'Mango trees carrying green fruit in an orchard in Madhubani district, Bihar',
    credit: {
      title: 'Mango Orchard in Nazra Village, Benipatti Block, Madhubani District, Bihar, India',
      author: 'Mohammad Anees Qamar',
      licence: 'CC BY 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Mango_Orchard_in_Nazra_Village,_Benipatti_Block,_Madhubani_District,_Bihar,_India.jpg',
      changes: 'cropped, resized and converted to WebP',
    },
  },
  {
    slot: 'greenhouse',
    plate: 'ribs',
    alt: 'Rows of white gerbera flowers growing under a shade-net polyhouse',
    credit: {
      title: 'Gerbera Cultivation-in Poly-house',
      author: 'Neerajk.bit',
      licence: 'CC BY-SA 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Gerbera_Cultivation-in_Poly-house.jpg',
      changes: 'resized and converted to WebP',
    },
  },
  { slot: 'fish-pond', plate: 'ponds', alt: 'Fish pond' },
  { slot: 'plantation', plate: 'orchard', alt: 'Plantation' },
  { slot: 'poultry', plate: 'sheds', alt: 'Poultry housing' },
  { slot: 'irrigation', plate: 'contours', alt: 'Irrigation' },
  { slot: 'farm-building', plate: 'sheds', alt: 'Farm building' },
  { slot: 'rice-grains', plate: 'grains', alt: 'Rice grains' },
  { slot: 'packaging', plate: 'grains', alt: 'Packaged goods' },
  { slot: 'mushroom', plate: 'grains', alt: 'Mushroom cultivation' },
  { slot: 'solar', plate: 'ribs', alt: 'Solar panels' },
]

export const credited = media.filter((m) => m.credit)

// Mixkit Free Stock Video: free for commercial use, no attribution required
// (https://mixkit.co/license/#videoFree). Listed on /credits as a courtesy.
export const video = {
  file: 'field-road.mp4',
  url: 'https://assets.mixkit.co/videos/827/827-720.mp4',
  page: 'https://mixkit.co/free-stock-video/a-road-between-a-big-green-agriculture-field-827/',
  poster: 'rice-field',
  alt: 'A road between green agricultural fields',
}
