import { verticals } from './verticals.js'

export const primaryNav = [
  { label: 'About', to: '/about' },
  ...verticals.map((v) => ({ label: v.name.replace('KVI ', ''), to: v.to })),
  { label: 'Projects', to: '/projects' },
]

export const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Greens', to: '/greens' },
  { label: 'Tech', to: '/tech' },
  { label: 'Infra', to: '/infra' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

// Routes whose first screen is dark, so the header starts in its light-on-dark
// state. Everything else starts dark-on-light.
const DARK_TOP = ['/', '/about', '/greens', '/tech', '/projects', '/products', '/insights']

export const hasDarkTop = (pathname) =>
  DARK_TOP.includes(pathname) || pathname.startsWith('/products/')
