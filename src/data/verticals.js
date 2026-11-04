// ---------------------------------------------------------------------------
// KVI's three verticals: complementary capabilities around one domain,
// agriculture. They are not independent businesses.
//
// `scope` is what each vertical covers. It is not a statement that every item
// operates commercially today; pages that list it say so.
// ---------------------------------------------------------------------------

export const verticals = [
  {
    id: 'greens',
    name: 'KVI Greens',
    to: '/greens',
    category: 'Agriculture, agribusiness and natural resources',
    role: 'What we grow and produce',
    tagline: 'Growing agricultural businesses.',
    body: 'Developing and operating farms, creating value from agricultural resources, and building sustainable product and supply-chain opportunities.',
    cta: 'Explore KVI Greens',
    layer: 'greens',
    planNote: 'Crops, orchards, ponds, plantation and nursery',
  },
  {
    id: 'tech',
    name: 'KVI Tech',
    to: '/tech',
    category: 'Agritech, software, AI and automation',
    role: 'How we manage, monitor and optimize',
    tagline: 'Powering agricultural intelligence.',
    body: 'Building digital platforms, intelligent software and automation systems that improve agricultural operations and business management.',
    cta: 'Explore KVI Tech',
    layer: 'tech',
    planNote: 'Every unit reporting to one management system',
  },
  {
    id: 'infra',
    name: 'KVI Infra',
    to: '/infra',
    category: 'Farm architecture, agricultural infrastructure and farm development',
    role: 'Where and how we build agricultural operations',
    tagline: 'Building the foundation of modern farms.',
    body: 'Planning, designing and developing the physical infrastructure required for efficient and commercially viable agricultural operations.',
    cta: 'Explore KVI Infra',
    layer: 'infra',
    planNote: 'Roads, canal, sheds, polyhouses and utilities',
  },
]

export const verticalById = (id) => verticals.find((v) => v.id === id)

export const greensScope = [
  {
    heading: 'Farms',
    items: [
      'Development and operation of KVI-owned farms',
      'Farm operations and management',
      'Partner farm development and collaboration',
      'Agricultural production',
    ],
  },
  {
    heading: 'Production systems',
    items: [
      'Poultry and livestock operations',
      'Aquaculture and fisheries',
      'Horticulture and agroforestry',
      'Nursery and plantation development',
    ],
  },
  {
    heading: 'Value addition',
    items: [
      'Agricultural product processing',
      'Value addition and product commercialization',
      'Agricultural branding, packaging and distribution',
      'Agricultural supply-chain development',
    ],
  },
  {
    heading: 'Natural resources',
    items: ['Carbon credit project development', 'Plant-based commercial opportunities'],
  },
]

export const greensChain = [
  { title: 'Production', body: 'Crops, orchards, poultry, livestock and ponds, on owned and partner farms.' },
  { title: 'Processing', body: 'Cleaning, processing and adding value close to the source.' },
  { title: 'Packaging', body: 'Turning produce into products a buyer can trust and store.' },
  { title: 'Branding', body: 'Giving agricultural products a name and a clear origin.' },
  { title: 'Distribution', body: 'Building dependable routes from the farm to the market.' },
]

// `state` separates what runs today from what is being researched. Software
// platforms are live products; the AI, automation and IoT lines are direction.
export const techCapabilities = [
  { title: 'Farm management software', state: 'Live' },
  { title: 'Agricultural financial management', state: 'Live' },
  { title: 'Inventory and resource management', state: 'Live' },
  { title: 'Cloud infrastructure and digital platforms', state: 'Live' },
  { title: 'Software development and technology services', state: 'Live' },
  { title: 'Agricultural ERP solutions', state: 'Live' },
  { title: 'Digital farm monitoring', state: 'Research' },
  { title: 'Agricultural supply-chain technology', state: 'Research' },
  { title: 'AI-powered agricultural applications', state: 'Research' },
  { title: 'Farm automation', state: 'Research' },
  { title: 'IoT and smart farming', state: 'Research' },
]

export const infraScope = [
  {
    heading: 'Planning',
    items: [
      'Agricultural land development',
      'Farm master planning',
      'Farm architecture and layout planning',
      'Infrastructure project planning and execution',
    ],
  },
  {
    heading: 'Production structures',
    items: [
      'Poultry farm infrastructure',
      'Dairy and livestock infrastructure',
      'Fish ponds and aquaculture infrastructure',
      'Polyhouses and greenhouses',
      'Mushroom cultivation infrastructure',
      'Nursery infrastructure',
    ],
  },
  {
    heading: 'Site systems',
    items: [
      'Irrigation and water management',
      'Farm roads and drainage',
      'Farm utilities and electrical infrastructure',
      'Renewable energy integration',
    ],
  },
  {
    heading: 'Whole-farm work',
    items: ['Integrated farm development', 'Farm modernization and expansion'],
  },
]

export const infraTypologies = [
  { kind: 'poultry', title: 'Poultry house', body: 'Orientation, ventilation, feed and waste handling set out before construction.' },
  { kind: 'polyhouse', title: 'Polyhouse', body: 'Bay spacing, side ventilation and irrigation planned around the crop.' },
  { kind: 'pond', title: 'Aquaculture pond', body: 'Embankments, inlet, outlet and water depth designed as one section.' },
  { kind: 'water', title: 'Water system', body: 'Source, storage, distribution and drainage drawn on a single plan.' },
]

// KVI Greens' first product. There is no separate Mokari brand or company.
// Not on sale until KVI confirms launch. No prices, certifications, organic
// status, capacity or marketplace listings; no temple or public-figure
// associations without citable evidence (see docs/content-claims.md).
export const featuredProduct = {
  offeredBy: 'KVI Greens',
  name: 'Mokari Gobindbhog Rice',
  status: 'Pre-launch',
  body: 'A premium aromatic rice offered by KVI Greens, highlighting the distinctive fragrance and culinary heritage of Gobindbhog rice, traditionally used in preparations such as kheer.',
  variety:
    'Gobindbhog is a short-grain aromatic rice traditionally prized in eastern India. The product takes its name from Mokari village in Kaimur, Bihar, long associated with Gobindbhog rice.',
  packSizes: ['500 g', '1 kg'],
  availability:
    'Not yet on sale. Prices and purchase details will be published here at launch. Distributors, retailers and institutional buyers can register interest now.',
}

// How KVI Greens can work with farm owners. Models offered or being explored,
// not a record of signed agreements.
export const partnershipModels = [
  { title: 'Farm partnerships', body: 'Long-term working relationships with farmers and farm owners, built around improving what a farm produces and earns.' },
  { title: 'Farm development and renovation', body: 'Bringing under-used or ageing farms back into productive shape: land, water, layout and buildings.' },
  { title: 'Productivity and operations', body: 'Practical support for planning, inputs, labour and record-keeping, so that a farm runs as a business.' },
  { title: 'Sourcing and contract farming', body: 'Sourcing produce for processing and, where commercially appropriate, contract-farming arrangements with clear terms.' },
]

export const ecosystemNote =
  'This is the model KVI Greens is building with its partners. Stages are being developed progressively, and not all of them operate at scale today.'
