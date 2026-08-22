import { useEffect, useRef } from 'react'

// Adds the `is-visible` class (see .reveal in index.css) once an element
// scrolls into view, producing a lightweight fade/slide-up entrance without
// pulling in an animation library.
export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}
