// ---------------------------------------------------------------------------
// KVI Tech product portfolio.
//
// These are PRODUCTS built by KVI Tech — not separate KVI businesses. Every
// surface that shows them must carry the "KVI Tech product" attribution.
//
// Linking rules:
//   `url`  — external product site. Only set when a real, confirmed public URL
//            exists. Renders "Visit product ↗" (or a `cta` override) opening in
//            a new tab.
//   `to`   — internal route/anchor, used while a product has no public site of
//            its own yet (e.g. in development). Renders an in-site link.
//   Never invent URLs. Order here is the order shown everywhere.
//
// Optional fields:
//   tagline  — short product line, shown where a product gets its own callout.
//   cta      — overrides the card's call-to-action label.
//   accent   — 'teal' gives the card FamGrid's dark/teal treatment; products
//              stay in the KVI card system otherwise.
//
// Status: 'live' (in production, links out) | 'development' (active build, no
// public product site yet — shown clearly, never styled as disabled).
// ---------------------------------------------------------------------------

export const products = [
  {
    id: 'farmgrid',
    name: 'FarmGrid',
    category: 'Farm Operations & Management Platform',
    description:
      'A digital platform for planning, managing and operating agricultural farms.',
    status: 'development',
    to: '/tech#farmgrid',
    cta: 'Learn more',
    attribution: 'KVI Tech product',
  },
  {
    id: 'contractoros',
    name: 'ContractorOS',
    category: 'Government Contractor Management Platform',
    description:
      'A management platform for government contracting operations — tenders, projects, compliance and documentation in one system.',
    status: 'live',
    url: 'https://contractoros.kvinnovations.in/',
    attribution: 'KVI Tech product',
  },
  {
    id: 'campusgrid',
    name: 'CampusGrid',
    category: 'Education Management Platform',
    description:
      'A management platform for education institutions — administration, academics, operations and records across a campus.',
    status: 'live',
    url: 'https://campusgrid.kvinnovations.in/',
    attribution: 'KVI Tech product',
  },
  {
    id: 'famgrid',
    name: 'FamGrid',
    category: 'Family Finance Tracking Platform',
    description:
      'A platform for families to track and manage their finances together.',
    tagline: 'Family finances, together.',
    status: 'live',
    url: 'https://famgrid.kvinnovations.in',
    cta: 'Visit FamGrid',
    accent: 'teal',
    attribution: 'KVI Tech product',
  },
]

export const productsNote = 'More products are being developed.'
