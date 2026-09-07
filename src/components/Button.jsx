import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

const VARIANTS = {
  primary:
    'bg-ink text-paper border border-ink hover:bg-accent hover:border-accent',
  secondary:
    'bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-ink hover:text-paper',
  // Sits on the green CTA band — stays solid and high-contrast on hover.
  inverse:
    'bg-paper text-ink border border-paper shadow-[0_1px_2px_rgb(0_0_0/0.18)] hover:bg-accent-wash hover:border-accent-wash',
  ghost:
    'bg-transparent text-ink border border-transparent hover:border-line-strong',
}

const SIZES = {
  md: 'h-11 px-5 text-xs',
  lg: 'h-14 px-8 text-xs',
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
