import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '../data/navigation.js'
import { company, whatsappUrl } from '../data/company.js'
import useScrolled from '../lib/useScrolled.js'
import Wordmark from './Wordmark.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import BusinessGlyph from './BusinessGlyph.jsx'
import ProductMark from './ProductMark.jsx'

const isUnder = (pathname, item) =>
  pathname === item.to ||
  pathname.startsWith(`${item.to}/`) ||
  (item.items || []).some((c) => pathname === c.to || pathname.startsWith(`${c.to}/`))

function MenuIcon({ item }) {
  if (item.division) {
    return (
      <span className="mt-0.5 text-accent">
        <BusinessGlyph id={item.division} size={26} />
      </span>
    )
  }
  if (item.product) return <ProductMark id={item.product} className="!h-7 !w-7 shrink-0 text-tech" />
  return null
}

/** Desktop dropdown: a disclosure button + panel. Hover opens on pointer devices. */
function NavMenu({ item, open, onOpen, onClose, active }) {
  const wrapRef = useRef(null)
  const btnRef = useRef(null)
  const timer = useRef(0)
  const panelId = `menu-${item.menu}`

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) onClose()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        btnRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const hoverOpen = (e) => {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(timer.current)
    onOpen()
  }
  const hoverClose = (e) => {
    if (e.pointerType !== 'mouse') return
    timer.current = window.setTimeout(onClose, 140)
  }

  const products = item.menu === 'products'

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={hoverOpen}
      onPointerLeave={hoverClose}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget)) onClose()
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
          active || open ? 'text-ink' : 'text-ink-muted hover:text-ink'
        }`}
      >
        {item.label}
        <Icon
          name="chevron-down"
          size={15}
          className={`transition-transform duration-300 ease-editorial ${open ? 'rotate-180' : ''}`}
        />
        {active && <span className="sr-only">(current section)</span>}
      </button>

      <div
        id={panelId}
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-[opacity,transform] duration-200 ease-editorial ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <div className={`border border-line bg-paper-raised p-3 shadow-lift ${products ? 'w-[36rem]' : 'w-[30rem]'}`}>
          <ul className={products ? 'grid grid-cols-2 gap-1' : 'grid gap-1'}>
            {item.items.map((c) => (
              <li key={c.to}>
                <NavLink
                  to={c.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-start gap-3 rounded-card p-3 transition-colors hover:bg-paper-sunken ${
                      isActive ? 'bg-paper-sunken' : ''
                    }`
                  }
                >
                  <MenuIcon item={c} />
                  <span className="flex flex-col">
                    <span className="font-display text-[15px] font-semibold text-ink">{c.label}</span>
                    <span className="mt-0.5 text-xs text-ink-muted">{c.desc}</span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to={item.overview.to}
            onClick={onClose}
            className="mt-2 flex items-center justify-between border-t border-line px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
          >
            <span>
              {item.overview.label}
              <span className="ml-2 font-normal normal-case tracking-normal text-ink-muted">
                {item.overview.desc}
              </span>
            </span>
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(null)
  const [hidden, setHidden] = useState(false)
  const keepRef = useRef(false)
  const scrolled = useScrolled(12)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  // Close everything on navigation (state adjusted during render).
  const [seenPath, setSeenPath] = useState(pathname)
  if (seenPath !== pathname) {
    setSeenPath(pathname)
    setOpen(false)
    setMenu(null)
  }

  useEffect(() => {
    keepRef.current = open || menu !== null
  }, [open, menu])

  // Retract the bar when scrolling down, bring it back on the way up. Never
  // hidden near the top or while a menu is open.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let last = window.scrollY
    let frame = 0
    const check = () => {
      frame = 0
      const y = window.scrollY
      if (Math.abs(y - last) > 6) {
        setHidden(!keepRef.current && y > last && y > 220)
        last = y
      }
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Lock body scroll + close on Escape / resize to desktop while the mobile
  // menu is open.
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
    }`

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-editorial ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled || menu
            ? 'border-b border-line bg-paper/90 backdrop-blur-md'
            : 'border-b border-transparent bg-paper'
        }`}
      >
        <div
          className={`shell flex items-center justify-between gap-6 transition-all duration-300 ease-editorial ${
            scrolled ? 'py-3' : 'py-4 lg:py-5'
          }`}
        >
          <Wordmark onClick={() => setOpen(false)} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {primaryNav.map((item) =>
              item.menu ? (
                <NavMenu
                  key={item.to}
                  item={item}
                  open={menu === item.menu}
                  onOpen={() => setMenu(item.menu)}
                  onClose={() => setMenu((m) => (m === item.menu ? null : m))}
                  active={isUnder(pathname, item)}
                />
              ) : (
                <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden lg:block">
            <Button to="/contact" size="md">
              Contact
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </header>

      {/* Mobile menu — full-screen overlay. Portaled to <body> rather than
          nested in <header>: the header carries a permanent translate-y
          transform (for the scroll-hide effect above), and any transform on
          an ancestor makes it the containing block for `position: fixed`
          descendants — which would shrink this overlay to the header's height. */}
      {createPortal(
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`lg:hidden fixed inset-0 z-[60] flex flex-col bg-paper transition-[opacity,transform] duration-300 ease-editorial ${
            open
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-1.5 opacity-0'
          }`}
          inert={!open}
          aria-hidden={!open}
        >
          <div className="shell flex items-center justify-between py-4">
            <Wordmark onClick={close} />
            <button
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
              aria-label="Close menu"
              onClick={close}
            >
              <Icon name="close" size={22} />
            </button>
          </div>
          <nav
            className="shell flex flex-1 flex-col overflow-y-auto overscroll-contain pb-10 pt-2"
            aria-label="Mobile"
          >
            {primaryNav.map((item) => (
              <div key={item.to} className="border-b border-line">
                <NavLink
                  to={item.to}
                  end
                  onClick={close}
                  className={({ isActive }) =>
                    `block py-4 font-serif text-2xl transition-colors ${isActive ? 'text-forest' : 'text-ink'}`
                  }
                >
                  {item.label}
                </NavLink>
                {item.items && (
                  <ul className="-mt-1 grid gap-0.5 pb-4 pl-1 sm:grid-cols-2">
                    {item.items.map((c) => (
                      <li key={c.to}>
                        <NavLink
                          to={c.to}
                          onClick={close}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 py-2 text-base transition-colors ${
                              isActive ? 'font-semibold text-forest' : 'text-ink-soft'
                            }`
                          }
                        >
                          <span aria-hidden="true" className="h-px w-3 bg-line-strong" />
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Button to="/contact" size="lg" className="mt-8 w-full" onClick={close}>
              Contact KVI
            </Button>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
              <a href={`tel:${company.phoneE164}`} className="inline-flex items-center gap-1.5">
                <Icon name="phone" size={15} />
                {company.phone}
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5">
                <Icon name="chat" size={15} />
                WhatsApp
              </a>
            </div>
          </nav>
        </div>,
        document.body,
      )}
    </>
  )
}
