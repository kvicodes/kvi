import { useEffect, useRef } from 'react'

/**
 * Scroll progress of an element through the viewport, delivered via a callback
 * as `(progress, node)` — no re-renders; the caller writes to the node / a CSS
 * var / a separate ref. Progress goes 0 → 1 as the element travels from
 * `enter` (fraction of viewport height below which the element top sits) to
 * fully scrolled past by `exit`.
 *
 * `enabled: false` (e.g. below the desktop breakpoint) skips all listeners and
 * resolves once to `reducedValue`, so viewports that shouldn't run a
 * scroll-linked effect pay nothing for it. prefers-reduced-motion does the same.
 *
 *   const ref = useScrollProgress((p, el) => el.style.setProperty('--p', p))
 */
export default function useScrollProgress(
  onProgress,
  { enter = 0.85, exit = 0.15, reducedValue = 1, enabled = true } = {},
) {
  const ref = useRef(null)
  const cb = useRef(onProgress)

  useEffect(() => {
    cb.current = onProgress
  })

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (!enabled || reduced) {
      cb.current(reducedValue, node)
      return
    }

    let frame = 0
    const measure = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const start = vh * enter
      const end = -rect.height + vh * exit
      const p = (start - rect.top) / (start - end)
      cb.current(Math.min(1, Math.max(0, p)), node)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [enter, exit, reducedValue, enabled])

  return ref
}
