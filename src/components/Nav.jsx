import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { company, whatsappUrl } from '../data/company.js'
import { hasDarkTop, primaryNav } from '../data/navigation.js'
import { verticalById } from '../data/verticals.js'

/**
 * Header. Transparent over each page's first screen, then a solid paper bar
 * once scrolled. Below `lg` it becomes a full-screen menu that stays mounted,
 * so the close is animated and focus cannot reach it while closed (`inert`).
 */
export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // Route change closes the menu (state adjusted during render).
  const [seen, setSeen] = useState(pathname)
  if (seen !== pathname) {
    setSeen(pathname)
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const light = !scrolled && hasDarkTop(pathname)
  const text = light ? 'text-paper' : 'text-graphite'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled ? 'bg-paper/95 shadow-[0_1px_0_rgb(var(--line))]' : 'bg-transparent'}`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between">
          <Logo tone={light ? 'light' : 'dark'} />

          <nav aria-label="Primary" className={`hidden items-center gap-9 lg:flex ${text}`}>
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-2 text-[15px] font-medium after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className={`btn min-h-[2.5rem] px-4 text-[15px] ${light ? 'btn-line-light' : 'btn-line-dark'}`}>
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden ${text}`}
          >
            <span className="h-px w-6 bg-current" />
            <span className="h-px w-6 bg-current" />
          </button>
        </div>
      </header>

      {createPortal(
        <div
          id="mobile-menu"
          aria-hidden={!open}
          inert={!open}
          className={`on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto bg-field text-paper transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <div className="shell flex h-[4.5rem] shrink-0 items-center justify-between">
            <Logo tone="light" onClick={() => setOpen(false)} />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="-mr-2 flex h-11 w-11 items-center justify-center">
              <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="shell mt-6 flex flex-1 flex-col">
            <ul>
              {[{ label: 'Home', to: '/' }, ...primaryNav, { label: 'Contact', to: '/contact' }].map((item) => {
                const v = verticalById(item.label.toLowerCase())
                return (
                  <li key={item.to} className="border-t border-line-dark">
                    <NavLink to={item.to} onClick={() => setOpen(false)} end={item.to === '/'} className="flex items-baseline justify-between py-3 font-serif text-[2.4rem] leading-tight">
                      {item.label}
                      {v && <span className="font-sans text-sm text-sage">{v.role.split(' ').slice(0, 3).join(' ')}</span>}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 py-8 text-base text-sage">
              <a href={`tel:${company.phoneE164}`}>{company.phone}</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer noopener">WhatsApp</a>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </>
  )
}
