import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Icon from './icons.jsx'
import Button from './Button.jsx'
import { company, nav } from '../data/content.js'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close the mobile menu on route change / resize back to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClasses = ({ isActive }) =>
    `text-sm font-heading font-semibold transition-colors ${
      isActive ? 'text-forest-800' : 'text-forest-950/70 hover:text-forest-800'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'shadow-soft' : ''
      } bg-sand-50/90 backdrop-blur border-b border-forest-100`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-700 font-heading text-base font-bold text-white">
            KVI
          </span>
          <span className="hidden font-heading text-sm font-semibold text-forest-950 sm:block">
            {company.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
          <Button to="/contact" size="md">
            Contact Us
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-forest-950 md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <Icon name={isOpen ? 'X' : 'Menu'} className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="border-t border-forest-100 bg-sand-50 px-6 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-4">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setIsOpen(false)}
                className={linkClasses}
              >
                {item.label}
              </NavLink>
            ))}
            <Button to="/contact" size="md" onClick={() => setIsOpen(false)} className="w-full">
              Contact Us
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
