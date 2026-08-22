import useReveal from './useReveal'

// Wraps children in the .reveal fade-up-on-scroll treatment.
// `delay` (ms) is applied via inline style so cards in a grid can stagger.
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
