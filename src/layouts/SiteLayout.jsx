import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

/** App shell: skip link, sticky nav, routed content, footer + scroll reset. */
export default function SiteLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        const reduced = window.matchMedia?.(
          '(prefers-reduced-motion: reduce)',
        ).matches
        el.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'start',
        })
        return
      }
    }
    // Route change: jump to top instantly. A smooth animation here (the global
    // scroll-behavior) reads as the page fighting the user on mobile when the
    // previous page was scrolled down.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-card focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
