import useReveal from '../lib/useReveal.js'

/**
 * Wraps children in a scroll-reveal container. `as` picks the element,
 * `delay` (ms) staggers grouped items. Respects prefers-reduced-motion
 * (handled inside useReveal + index.css).
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
