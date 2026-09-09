import { useEffect, useState } from 'react'

/**
 * Live match state for a media query. SSR-safe (starts `false` when there is no
 * window). Used to choose interaction *complexity* by viewport — e.g. only the
 * large-desktop breakpoint runs the pinned scroll sequence; everything below
 * gets the native-scroll fallback.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () =>
      typeof window !== 'undefined' &&
      Boolean(window.matchMedia?.(query).matches),
  )

  useEffect(() => {
    const mq = window.matchMedia?.(query)
    if (!mq) return
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [query])

  return matches
}
