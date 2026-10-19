// ---------------------------------------------------------------------------
// KVI Greens — the agricultural ecosystem and product-branding direction.
//
// The ecosystem is the model KVI Greens is building towards. It is NOT
// presented as fully operational at scale — every surface that shows it also
// shows `ecosystemNote`. `scene` maps to an illustration in StageArt.jsx.
// ---------------------------------------------------------------------------

export const ecosystemStages = [
  {
    no: '01',
    step: 'Farmer Partnerships',
    scene: 'partners',
    body: 'Working with existing farmers and farm owners — starting from their land, their crops and what they want the farm to become.',
  },
  {
    no: '02',
    step: 'Farm Development',
    scene: 'development',
    body: 'Developing, renovating and improving farms: land preparation, water, layout and farm infrastructure, with KV Infra where it is needed.',
  },
  {
    no: '03',
    step: 'Agricultural Production',
    scene: 'production',
    body: 'Raising productivity and operational discipline through the season, supported by tools such as FarmGrid.',
  },
  {
    no: '04',
    step: 'Processing & Packaging',
    scene: 'processing',
    body: 'Sourcing produce and adding value close to source through cleaning, processing and packaging.',
  },
  {
    no: '05',
    step: 'Branding & Market Access',
    scene: 'market',
    body: 'Building natural-product brands and dependable supply chains that carry produce from farms to customers.',
  },
]

export const ecosystemNote =
  'This is the model KVI Greens is building with its partners. Stages are being developed progressively — not all of them operate at scale today.'

// How KVI Greens can work with farmers. Framed as models KVI offers or is
// exploring — not as a record of signed agreements.
export const partnershipModels = [
  {
    title: 'Farm partnerships',
    body: 'Long-term working relationships with farmers and farm owners, built around improving what a farm produces and earns.',
  },
  {
    title: 'Farm development & renovation',
    body: 'Bringing under-used or ageing farms back into productive shape — land, water, layout and the buildings a farm needs.',
  },
  {
    title: 'Productivity & operations',
    body: 'Practical support for planning, inputs, labour and record-keeping so that a farm runs as a business.',
  },
  {
    title: 'Sourcing & contract farming',
    body: 'Sourcing produce for processing and, where commercially appropriate, contract-farming arrangements with clear terms.',
  },
]

// KVI Greens' first product. It is a KVI Greens product — there is no separate
// Mokari brand or company. Keep the status honest: not on sale until KVI
// confirms launch; no prices, certifications, organic status, capacity or
// marketplace listings. Do not add temple or public-figure associations
// without founder-confirmed, citable evidence (see docs/content-claims.md).
export const featuredProduct = {
  offeredBy: 'KVI Greens',
  name: 'Mokari Gobindbhog Rice',
  status: 'Pre-launch',
  body: 'A premium aromatic rice offered by KVI Greens, highlighting the distinctive fragrance and culinary heritage of Gobindbhog rice — traditionally used in preparations such as kheer.',
  variety:
    'Gobindbhog is a short-grain aromatic rice traditionally prized in eastern India. The product takes its name from Mokari village in Kaimur, Bihar, long associated with Gobindbhog rice.',
  packSizes: ['500 g', '1 kg'],
  availability:
    'Not yet on sale. Prices and purchase details will be published here at launch; distributors, retailers and institutional buyers can register interest now.',
}

// Broader directions — clearly labelled as not yet available.
export const productDirections = [
  {
    title: 'Rice & grains',
    body: 'Distinctive and regional varieties, processed and packed close to source.',
  },
  {
    title: 'Processed food products',
    body: 'Value-added products built on produce sourced from partner farms.',
  },
  {
    title: 'Natural products',
    body: 'Agricultural and natural products developed into brands where a line can stand on its own.',
  },
]
