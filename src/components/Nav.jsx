import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { primaryNav } from '../data/navigation.js'
import useScrolled from '../lib/useScrolled.js'
import Wordmark from './Wordmark.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const openRef = useRef(false)
  const scrolled = useScrolled(12)
  const close = () => setOpen(false)

  useEffect(() => {
    openRef.current = open
  }, [open])

  // Apple-style: retract the bar when scrolling down, bring it back on the
  // way up. Never hidden near the top; `open` overrides via the render below.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let last = window.scrollY
    let frame = 0
    const check = () => {
      frame = 0
      const y = window.scrollY
      if (Math.abs(y - last) > 6) {
        setHidden(!openRef.current && y > last && y > 220)
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

  // Lock body scroll + close on Escape / resize to desktop while menu is open.
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
    <header
      className={`sticky top-0 z-50 transition-[transform,background-color,border-color,padding] duration-300 ease-editorial ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'border-b border-line bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-paper'
      }`}
    >
      <div
        className={`shell flex items-center justify-between transition-all duration-300 ease-editorial ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <Wordmark onClick={() => setOpen(false)} />

        {/* Desktop nav — the three operating businesses sit between hairline
            dividers to read as a group within the KVI navigation. */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryNav.map((item, i) => (
            <span key={item.to} className="flex items-center gap-7">
              {item.group && !primaryNav[i - 1]?.group && (
                <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
              )}
              <NavLink to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
              {item.group && !primaryNav[i + 1]?.group && (
                <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
              )}
            </span>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact" size="md" variant="secondary">
            Contact
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      {/* Mobile menu — full-screen overlay */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[60] flex flex-col bg-paper transition-[opacity,transform] duration-300 ease-editorial ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1.5 opacity-0'
        }`}
        inert={!open}
        aria-hidden={!open}
      >
        <div className="shell flex items-center justify-between py-5">
          <Wordmark onClick={() => setOpen(false)} />
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center text-ink"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <Icon name="close" size={22} />
          </button>
        </div>
        <nav className="shell flex flex-1 flex-col overflow-y-auto pb-10 pt-2" aria-label="Mobile">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={close}
              className={({ isActive }) =>
                `border-b border-line py-4 font-display text-2xl transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-soft'
                } ${item.group ? 'pl-4 text-xl' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button to="/contact" size="lg" className="mt-8 w-full" onClick={close}>
            Contact KVI
          </Button>
        </nav>
      </div>
    </header>
  )
}
