import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/** Editorial inline "read more" link with a trailing arrow. */
export default function ArrowLink({ to, href, external, children, className = '', icon = 'arrow-right', ...rest }) {
  const cls = `group inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent ${className}`
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <Icon
        name={icon}
        size={16}
        className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
      />
    </>
  )
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to} className={cls} {...rest}>
      {inner}
    </Link>
  )
}
