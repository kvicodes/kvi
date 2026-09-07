import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Adds `is-visible` to an element (paired with the `.js .reveal` rules in
 * index.css) once it scrolls into view. Lightweight; no animation library.
 * Reveals immediately when reduced motion is requested, when
 * IntersectionObserver is unavailable, or as a safety fallback after a delay.
 */
export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const show = () => node.classList.add('is-visible')

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      show()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show()
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(node)

    // Safety net: never leave content hidden if the observer misses.
    const timer = window.setTimeout(show, 1800)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return ref
}
