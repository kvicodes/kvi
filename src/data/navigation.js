import { verticals } from './verticals.js'

// `children` makes a group: a disclosure menu on desktop, an indented list on
// mobile. The group itself has no page, so it has no `to`.
export const primaryNav = [
  { label: 'About', to: '/about' },
  {
    label: 'Businesses',
    children: verticals.map((v) => ({ label: v.name, to: v.to, note: v.role })),
  },
  { label: 'Products', to: '/products' },
  { label: 'Innovation', to: '/innovation' },
  { label: 'Projects', to: '/projects' },
]

export const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Greens', to: '/greens' },
  { label: 'Tech', to: '/tech' },
  { label: 'Infra', to: '/infra' },
  { label: 'Products', to: '/products' },
  { label: 'Innovation', to: '/innovation' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

// Routes whose first screen is dark, so the header starts in its light-on-dark
// state. Everything else starts dark-on-light.
const DARK_TOP = ['/', '/about', '/greens', '/tech', '/projects', '/products', '/innovation', '/insights']

export const hasDarkTop = (pathname) => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return DARK_TOP.includes(path) || path.startsWith('/products/')
}
