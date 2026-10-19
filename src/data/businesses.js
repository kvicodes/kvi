// ---------------------------------------------------------------------------
// KVI's three business divisions.
//
// Order is fixed: Greens (agriculture — the centre of the company) -> Infra ->
// Tech. Greens is always given the most visual prominence.
//
// Copy rule: describe what each division does and is building towards. Never
// list completed projects, customers, contracts, certifications or figures
// that have not been verified and published by KVI.
// ---------------------------------------------------------------------------

// Per-division visual identity. All three stay in the KVI card system — this
// only swaps a hairline colour, the glyph stroke and an optional texture.
export const TINT = {
  'kvi-greens': {
    text: 'text-greens',
    bar: 'bg-greens',
    wash: 'bg-greens-wash',
    texture: 'bg-furrow',
  },
  'kv-infra': {
    text: 'text-infra',
    bar: 'bg-infra',
    wash: 'bg-infra-wash',
    texture: 'bg-blueprint',
  },
  'kvi-tech': {
    text: 'text-tech',
    bar: 'bg-tech',
    wash: 'bg-tech-wash',
    texture: 'bg-lattice',
  },
}

export const businesses = [
  {
    id: 'kvi-greens',
    index: '01',
    name: 'KVI Greens',
    short: 'Greens',
    to: '/greens',
    discipline: 'Agriculture, food processing & natural products',
    tagline:
      'Building an agricultural ecosystem that connects farmers, farms, processing and consumer brands.',
    summary:
      'KVI Greens works with farmers and farm owners to develop and improve farms, source and process agricultural produce, and build natural-product brands with reliable routes to market.',
    activities: [
      'Farmer and farm-owner partnerships',
      'Farm development and renovation',
      'Productivity and operational improvement',
      'Sourcing agricultural produce',
      'Food processing and packaging',
      'Natural and agricultural product brands',
      'Farm-to-customer supply chains',
      'Contract-farming and farm-development models, where commercially appropriate',
    ],
    cta: 'Explore KVI Greens',
  },
  {
    id: 'kv-infra',
    index: '02',
    name: 'KV Infra',
    short: 'Infra',
    to: '/infra',
    discipline: 'Infrastructure & project execution',
    tagline:
      'The infrastructure arm of KVI — planning and executing physical works with a practical, long-term view.',
    summary:
      'KV Infra focuses on infrastructure-related works and project execution: construction, site development and the physical infrastructure that agricultural and rural enterprises depend on.',
    activities: [
      'Construction works',
      'Infrastructure development',
      'Project planning and execution',
      'Farm development and land preparation',
      'Irrigation and water systems',
      'Farm buildings, storage and warehousing',
      'Internal roads and site infrastructure',
    ],
    cta: 'Explore KV Infra',
  },
  {
    id: 'kvi-tech',
    index: '03',
    name: 'KVI Tech',
    short: 'Tech',
    to: '/tech',
    discipline: 'Software products & technology services',
    tagline:
      'Software products and IT services that help agricultural businesses, infrastructure operations and other organisations run better.',
    summary:
      'KVI Tech builds and operates a portfolio of software products — FarmGrid, BillGrid, CampusGrid, BhattaGrid and ContractorOS — and provides software development and IT-related services.',
    activities: [
      'Industry-specific operations software',
      'Multi-tenant SaaS platforms',
      'Custom software development',
      'Implementation support for KVI products',
      'Integrations and automation',
      'IT-related services',
    ],
    cta: 'Explore KVI Tech',
  },
]

export const byId = (id) => businesses.find((b) => b.id === id)
