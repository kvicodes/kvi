// Primary navigation. `group: true` items get subtle visual separation in the
// nav as the three operating businesses.

export const primaryNav = [
  { label: 'About', to: '/about' },
  { label: 'Businesses', to: '/businesses' },
  { label: 'KVI Infra', to: '/infra', group: true },
  { label: 'Kaimur Farms', to: '/farms', group: true },
  { label: 'KVI Tech', to: '/tech', group: true },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav = [
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Businesses', to: '/businesses' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Businesses',
    links: [
      { label: 'KVI Infra', to: '/infra' },
      { label: 'Kaimur Farms', to: '/farms' },
      { label: 'KVI Tech', to: '/tech' },
    ],
  },
  {
    heading: 'Technology',
    links: [
      { label: 'KVI Tech', to: '/tech' },
      { label: 'FarmGrid', href: 'https://farmgrid.kvinnovations.in/', external: true },
      { label: 'ContractorOS', href: 'https://contractoros.kvinnovations.in/', external: true },
      { label: 'CampusGrid', href: 'https://campusgrid.kvinnovations.in/', external: true },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
]
