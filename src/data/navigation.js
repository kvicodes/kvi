// Primary and footer navigation. Divisions and products are derived from their
// data files so that a name or URL is only ever written in one place.

import { businesses } from './businesses.js'
import { products, productPath } from './products.js'

export const divisionLinks = businesses.map((b) => ({
  label: b.name,
  to: b.to,
  desc: b.discipline,
  division: b.id,
}))

export const productLinks = products.map((p) => ({
  label: p.name,
  to: productPath(p),
  desc: p.category,
  product: p.id,
}))

// `menu` items open a dropdown panel on desktop and an expanded group on
// mobile. The parent `to` is still a real page (the panel's first link).
export const primaryNav = [
  { label: 'Home', to: '/' },
  { label: 'About KVI', to: '/about' },
  {
    label: 'Our Businesses',
    to: '/businesses',
    menu: 'businesses',
    overview: { label: 'All businesses', to: '/businesses', desc: 'How the three divisions connect' },
    items: divisionLinks,
  },
  {
    label: 'Products',
    to: '/products',
    menu: 'products',
    overview: { label: 'View all products', to: '/products', desc: 'The KVI Tech portfolio' },
    items: productLinks,
  },
]

export const footerNav = [
  {
    heading: 'Company',
    links: [
      { label: 'About KVI', to: '/about' },
      { label: 'Our Businesses', to: '/businesses' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Divisions',
    links: divisionLinks.map(({ label, to }) => ({ label, to })),
  },
  {
    heading: 'Products',
    links: [
      ...productLinks.map(({ label, to }) => ({ label, to })),
      { label: 'All products', to: '/products' },
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
