import { Link } from 'react-router-dom'
import useReveal from '../lib/useReveal.js'
import { statuses } from '../data/projects.js'

/** Link or button with the site's flat button treatment. */
export function Button({ to, href, variant = 'solid-dark', external, className = '', children, ...rest }) {
  const cls = `btn btn-${variant} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noreferrer noopener' } : {}
    return <a href={href} className={cls} {...ext} {...rest}>{children}</a>
  }
  return <button className={cls} {...rest}>{children}</button>
}

export function TextLink({ to, href, external, className = '', children }) {
  const cls = `tlink ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  const ext = external ? { target: '_blank', rel: 'noreferrer noopener' } : {}
  return <a href={href} className={cls} {...ext}>{children}</a>
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * The verticals' small signs, one drawing language each: Greens is filled
 * ground, Tech is points in a grid, Infra is drawn line.
 */
export function VerticalMark({ id, size = 22, className = '' }) {
  return (
    <svg viewBox="0 0 22 22" width={size} height={size} aria-hidden="true" className={className}>
      {id === 'greens' && (
        <g fill="currentColor">
          <rect x="1" y="1" width="9" height="13" />
          <rect x="12" y="1" width="9" height="7" />
          <rect x="1" y="16" width="9" height="5" />
          <rect x="12" y="10" width="9" height="11" />
        </g>
      )}
      {id === 'tech' && (
        <g fill="currentColor">
          {[3, 11, 19].map((x) => [3, 11, 19].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={x === 11 && y === 11 ? 2.6 : 1.5} />))}
        </g>
      )}
      {id === 'infra' && (
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1.75" y="1.75" width="18.5" height="18.5" />
          <path d="M1.75 13H20.25M8 1.75V20.25" />
        </g>
      )}
    </svg>
  )
}

const STATUS_STYLE = {
  operational: 'bg-olive text-paper',
  development: 'bg-sage/50 text-graphite',
  planned: 'shadow-[inset_0_0_0_1px_rgb(var(--graphite)/0.4)] text-graphite',
  research: 'shadow-[inset_0_0_0_1px_rgb(var(--graphite)/0.4)] text-graphite border-dashed',
}

export function StatusLabel({ status, className = '' }) {
  return (
    <span className={`inline-block rounded px-2.5 py-1 text-sm font-medium ${STATUS_STYLE[status]} ${className}`}>
      {statuses[status].label}
    </span>
  )
}
