import useReveal from '../lib/useReveal.js'

/**
 * Wraps children in a scroll-reveal container. `as` picks the element,
 * `delay` (ms) staggers grouped items, `variant="heading"` swaps the fade for
 * a clip "wipe up" used on large headings. Respects prefers-reduced-motion
 * (handled inside useReveal + index.css).
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  variant,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useReveal()
  const base = variant === 'heading' ? 'reveal-heading' : 'reveal'
  return (
    <Tag
      ref={ref}
      className={`${base} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
