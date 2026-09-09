// ---------------------------------------------------------------------------
// The three operating businesses under the KVI group.
//
// Order is fixed: Infra (build) -> Farms (operate) -> Tech (innovate).
// Each business has an `index` used for the subtle accent differentiation in
// cards and page headers, while all three stay unmistakably part of KVI.
// ---------------------------------------------------------------------------

// Per-business visual identity. All three stay in the KVI card system — this
// only swaps a single hairline colour, the glyph stroke and an optional
// background texture so each business has its own character.
export const TINT = {
  'kvi-infra': {
    text: 'text-infra',
    bar: 'bg-infra',
    wash: 'bg-infra-wash',
    texture: 'bg-blueprint',
    character: 'Structured · Engineered · Solid',
  },
  'kaimur-farms': {
    text: 'text-farms',
    bar: 'bg-farms',
    wash: 'bg-farms-wash',
    texture: 'bg-furrow',
    character: 'Grounded · Seasonal · Natural',
  },
  'kvi-tech': {
    text: 'text-tech',
    bar: 'bg-tech',
    wash: 'bg-tech-wash',
    texture: 'bg-lattice',
    character: 'Precise · Digital · Intelligent',
  },
}

export const businesses = [
  {
    id: 'kvi-infra',
    index: '01',
    verb: 'Build',
    name: 'KVI Infra',
    to: '/infra',
    discipline: 'Farm Development & Infrastructure',
    tagline: 'Developing agricultural assets, infrastructure and physical projects.',
    summary:
      'KVI Infra develops physical assets for the group and for partners — farm land development, agricultural infrastructure and construction, delivered with a long-term view.',
    focus: [
      'Farm development',
      'Agricultural infrastructure',
      'Irrigation',
      'Farm buildings',
      'Warehousing',
      'Internal roads and site infrastructure',
      'Development projects',
      'Construction work',
    ],
    cta: 'Explore KVI Infra',
    // Sections the page reserves space for as the business grows.
    sections: [
      {
        key: 'capabilities',
        heading: 'Capabilities',
        body: 'Planning and delivery across farm development and agricultural infrastructure — from site assessment and land development through irrigation, farm buildings and storage.',
      },
      {
        key: 'projects',
        heading: 'Projects',
        body: 'A record of completed development and infrastructure work will be published here as projects are delivered.',
        placeholder: true,
      },
      {
        key: 'approach',
        heading: 'How we work',
        body: 'Infrastructure is designed to keep working long after handover: practical specifications, maintainable systems and construction matched to local conditions.',
      },
    ],
  },
  {
    id: 'kaimur-farms',
    index: '02',
    verb: 'Operate',
    name: 'Kaimur Farms',
    to: '/farms',
    discipline: 'Agriculture & Natural Products',
    tagline:
      'Operating farms and building businesses around agricultural, food and natural products.',
    summary:
      'Kaimur Farms manages and operates farmland and develops businesses around what it produces — agricultural output, processed food and natural products, moving from land to finished product.',
    focus: [
      'Farm management',
      'Farm operations',
      'Agricultural production',
      'Processing',
      'Packaging',
      'Food products',
      'Natural products',
      'Consumer brands',
    ],
    cta: 'Explore Kaimur Farms',
    sections: [
      {
        key: 'operations',
        heading: 'Farm operations',
        body: 'Day-to-day management of farmland and agricultural production, with an emphasis on consistency and quality suited to local growing conditions.',
      },
      {
        key: 'products',
        heading: 'Products',
        body: 'Kaimur Farms is developing food and natural products from its own production. Mokari Gobindbhog rice is an early initiative. Product details and availability will be published here as they are confirmed.',
      },
      {
        key: 'brands',
        heading: 'Consumer businesses',
        body: 'Where a product line can stand on its own, it is developed into a consumer brand with its own identity — while remaining a Kaimur Farms business.',
      },
    ],
  },
  {
    id: 'kvi-tech',
    index: '03',
    verb: 'Innovate',
    name: 'KVI Tech',
    to: '/tech',
    discipline: 'Technology & Digital Products',
    tagline: 'Building software platforms and digital products for real-world problems.',
    summary:
      'KVI Tech builds digital products that turn practical problems into usable software — platforms for business and for everyday life. Each product is developed to stand on its own commercially while drawing on the group’s operating experience.',
    focus: [
      'SaaS',
      'Enterprise software',
      'Digital platforms',
      'AI and automation',
      'Business technology',
      'Product development',
    ],
    cta: 'Explore KVI Tech',
    sections: [
      {
        key: 'capabilities',
        heading: 'What we build',
        body: 'Multi-tenant SaaS platforms, workflow and management systems, integrations and automation — built for organisations that run on process.',
      },
      {
        key: 'approach',
        heading: 'Product approach',
        body: 'Products start from a specific operational problem, are validated with real users, and are built to scale only once they work.',
      },
    ],
  },
]

export const byId = (id) => businesses.find((b) => b.id === id)
