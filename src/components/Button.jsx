import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

const VARIANTS = {
  primary:
    'bg-forest text-paper border border-forest hover:bg-forest-deep hover:border-forest-deep',
  secondary:
    'bg-transparent text-ink border border-line-strong hover:border-forest hover:bg-forest hover:text-paper',
  // Light button for dark / green surfaces.
  inverse:
    'bg-paper text-forest-deep border border-paper hover:bg-grain hover:border-grain',
  // Outline button for dark / green surfaces.
  'outline-light':
    'bg-transparent text-paper border border-paper/40 hover:border-paper hover:bg-paper hover:text-forest-deep',
  ghost:
    'bg-transparent text-ink border border-transparent hover:border-line-strong',
}

const SIZES = {
  sm: 'h-10 px-4 text-[11px]',
  md: 'h-11 px-5 text-xs',
  lg: 'h-14 px-7 text-xs sm:px-8',
}

const BASE_DISABLED = 'disabled:cursor-not-allowed disabled:opacity-55'

/**
 * Primary CTA element. Renders as <Link>, <a> (external) or <button>.
 * `withArrow` appends a trailing arrow that nudges on hover.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  external = false,
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'group inline-flex items-center justify-center gap-2 rounded-card font-semibold uppercase tracking-[0.12em]',
    'transition-colors duration-300 ease-editorial',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    BASE_DISABLED,
    VARIANTS[variant],
    SIZES[size] || SIZES.md,
    className,
  ].join(' ')

  const inner = (
    <>
      {children}
      {withArrow && (
        <Icon
          name="arrow-right"
          size={16}
          className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {inner}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}
