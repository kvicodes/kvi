import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { company, whatsappUrl } from '../data/company.js'
import { hasDarkTop, primaryNav } from '../data/navigation.js'

const NAV_LINK =
  'relative py-2 text-[15px] font-medium after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300'

/**
 * "Businesses" disclosure menu (desktop). A button toggles a list of real
 * links; hover also opens it, Escape closes it and returns focus to the button,
 * and focus leaving the group closes it. Items are not rendered while closed,
 * so keyboard users never tab into hidden links.
 */
function BusinessMenu({ item, pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const button = useRef(null)
  const active = item.children.some((c) => pathname === c.to)
  const [seen, setSeen] = useState(pathname)
  if (seen !== pathname) {
    setSeen(pathname)
    setOpen(false)
  }
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !ref.current.contains(e.relatedTarget) && setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false)
          button.current.focus()
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="businesses-menu"
        onClick={() => setOpen((o) => !o)}
        className={`${NAV_LINK} inline-flex items-center gap-1.5 ${active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}
      >
        {item.label}
        <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      {open && (
        <ul id="businesses-menu" className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 border border-line bg-paper py-2 text-graphite shadow-[0_12px_32px_rgb(0_0_0/0.12)]">
          {item.children.map((c) => (
            <li key={c.to}>
              <Link to={c.to} className="block px-5 py-3 hover:bg-stone focus-visible:bg-stone">
                <span className="block text-[15px] font-medium">{c.label}</span>
                <span className="block text-sm text-muted">{c.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

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

          <nav aria-label="Primary" className={`hidden items-center gap-7 xl:gap-9 lg:flex ${text}`}>
            {primaryNav.map((item) =>
              item.children ? (
                <BusinessMenu key={item.label} item={item} pathname={pathname} />
              ) : (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `${NAV_LINK} ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}`}>
                  {item.label}
                </NavLink>
              ),
            )}
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
              {[{ label: 'Home', to: '/' }, ...primaryNav, { label: 'Contact', to: '/contact' }].map((item) => (
                <li key={item.label} className="border-t border-line-dark">
                  {item.children ? (
                    <>
                      <p className="py-3 font-serif text-[2.4rem] leading-tight">{item.label}</p>
                      <ul className="pb-3 pl-4">
                        {item.children.map((c) => (
                          <li key={c.to}>
                            <NavLink to={c.to} onClick={() => setOpen(false)} className="flex min-h-11 items-baseline justify-between py-2 text-xl">
                              {c.label}
                              <span className="font-sans text-sm text-sage">{c.note.split(' ').slice(0, 3).join(' ')}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NavLink to={item.to} onClick={() => setOpen(false)} end={item.to === '/'} className="flex items-baseline justify-between py-3 font-serif text-[2.4rem] leading-tight">
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
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
