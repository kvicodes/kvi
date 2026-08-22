import { Link } from 'react-router-dom'
import Icon from './icons.jsx'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const variants = {
  primary:
    'bg-forest-700 text-white hover:bg-forest-800 shadow-soft hover:shadow-lift focus-visible:ring-forest-600',
  secondary:
    'bg-white text-forest-800 border border-forest-200 hover:border-forest-400 hover:bg-forest-50 focus-visible:ring-forest-400',
  outlineLight:
    'bg-transparent text-white border border-white/50 hover:bg-white/10 focus-visible:ring-white',
  teal: 'bg-teal-600 text-white hover:bg-teal-700 shadow-soft hover:shadow-lift focus-visible:ring-teal-500',
}

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

/**
 * Shared CTA button. Renders a <Link> for internal routes ('to') or a plain
 * <button> for form actions, so it can be reused for both navigation and
 * form submission across the site.
 */
export default function Button({
  children,
  to,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon = 'ArrowRight',
  showIcon = true,
  className = '',
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {children}
      {showIcon && <Icon name={icon} className="h-4 w-4" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
