// Per-page metadata. Used at runtime by useDocumentMeta and at build time by
// scripts/prerender-meta.mjs, so crawlers that do not run JavaScript see the
// same title, description and canonical URL as everyone else.

export const seo = {
  home: {
    path: '/',
    title: '',
    description:
      'Kaimur Valley Innovations is an integrated farm development and agritech company, combining agricultural operations, farm infrastructure and digital technology.',
  },
  about: {
    path: '/about',
    title: 'About KVI',
    description:
      'KVI is an operating company built around agriculture. Read our vision, mission and philosophy, and how KVI Greens, KVI Tech and KVI Infra work as one ecosystem.',
  },
  greens: {
    path: '/greens',
    title: 'KVI Greens: Integrated Farming and Agribusiness',
    description:
      'KVI Greens covers farm operations, partner farm development, poultry, aquaculture, horticulture, processing, value addition and agricultural supply chains.',
  },
  tech: {
    path: '/tech',
    title: 'KVI Tech: Agritech and Farm Management Technology',
    description:
      'KVI Tech builds farm management software and digital platforms, including FarmGrid, for agricultural operations and related businesses.',
  },
  infra: {
    path: '/infra',
    title: 'KVI Infra: Farm Architecture and Agricultural Infrastructure',
    description:
      'KVI Infra plans and develops farm master plans, poultry and livestock structures, aquaculture ponds, polyhouses, irrigation and farm utilities.',
  },
  projects: {
    path: '/projects',
    title: 'Projects and Initiatives',
    description:
      'KVI projects and initiatives across agricultural development, technology and farm infrastructure, each with a clear operational, in development, planned or research status.',
  },
  products: {
    path: '/products',
    title: 'Software Products',
    description:
      'The KVI Tech software portfolio: FarmGrid for farm operations, and products for billing, education, brick kilns and civil contractors.',
  },
  contact: {
    path: '/contact',
    title: 'Contact',
    description:
      'Contact Kaimur Valley Innovations about agricultural partnerships, farm development, technology solutions, infrastructure projects or product partnerships.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy',
    description:
      'How the Kaimur Valley Innovations website handles your information: no cookies or trackers, server logs and enquiries.',
  },
  terms: {
    path: '/terms',
    title: 'Terms',
    description:
      'Terms for using the Kaimur Valley Innovations Pvt. Ltd. website: general information only, not an offer, commitment or professional advice.',
  },
  insights: {
    path: '/insights',
    title: 'Insights',
    description: 'Articles and updates from Kaimur Valley Innovations on agriculture, technology and farm infrastructure.',
    robots: 'noindex, follow',
  },
}

export const BASE_TITLE = 'Kaimur Valley Innovations'
export const HOME_TITLE = `${BASE_TITLE} | Building the Future of Farming`
export const fullTitle = (title) => (title ? `${title} | ${BASE_TITLE}` : HOME_TITLE)
