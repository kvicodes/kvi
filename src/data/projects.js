// ---------------------------------------------------------------------------
// Projects and initiatives.
//
// Only what is supported by this repository's verified record belongs here.
// Do not add locations, dates, partners, figures or photographs unless they are
// confirmed by KVI. Never mark a planned item as Operational.
//
// Shape:
//   slug, title, category, vertical ('greens' | 'tech' | 'infra'),
//   status (one of statuses), description,
//   location? (only if verified), link? ({ to } or { href }, { label }),
//   images? ([{ src, alt }] real KVI photographs only)
// ---------------------------------------------------------------------------

export const statuses = {
  operational: { label: 'Operational', meaning: 'Running today' },
  development: { label: 'In Development', meaning: 'Work under way, not yet complete' },
  planned: { label: 'Planned', meaning: 'A stated direction, not yet started' },
  research: { label: 'Research', meaning: 'Being studied before any commitment' },
}

export const projects = [
  {
    slug: 'farmgrid',
    title: 'FarmGrid',
    category: 'Agricultural technology',
    vertical: 'tech',
    status: 'operational',
    description:
      'A live farm operations platform. It models a farm as configurable units, each with its own activities, inputs, labour, costs and production records.',
    link: { to: '/products/farmgrid', label: 'View FarmGrid' },
  },
  {
    slug: 'mokari-gobindbhog-rice',
    title: 'Mokari Gobindbhog Rice',
    category: 'Agricultural products',
    vertical: 'greens',
    status: 'development',
    description:
      'The first KVI Greens product, a premium aromatic rice planned in 500 g and 1 kg retail packs. It is in pre-launch and not yet on sale.',
    location: 'Named after Mokari village, Kaimur, Bihar',
    link: { to: '/greens#agri-products', label: 'About the product' },
  },
  {
    slug: 'greens-farm-model',
    title: 'Partner farm development model',
    category: 'Agricultural development',
    vertical: 'greens',
    status: 'development',
    description:
      'The working model for KVI Greens: farm partnerships, development, production, processing and market access, built stage by stage.',
    link: { to: '/greens', label: 'Explore KVI Greens' },
  },
  {
    slug: 'infra-farm-development',
    title: 'Integrated farm infrastructure practice',
    category: 'Farm infrastructure',
    vertical: 'infra',
    status: 'development',
    description:
      'Establishing KVI Infra around master planning and purpose-built agricultural structures, with one approach to land, water, roads and utilities.',
    link: { to: '/infra', label: 'Explore KVI Infra' },
  },
  {
    slug: 'carbon-projects',
    title: 'Carbon credit project development',
    category: 'Research and development',
    vertical: 'greens',
    status: 'planned',
    description:
      'A direction for agroforestry and plantation work. KVI has not issued or claimed any carbon credits.',
  },
  {
    slug: 'smart-farming',
    title: 'Smart farming and automation',
    category: 'Research and development',
    vertical: 'tech',
    status: 'research',
    description:
      'Studying where IoT monitoring, automation and AI would add practical value to farm operations.',
  },
]
