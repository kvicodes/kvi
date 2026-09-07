import { Link } from 'react-router-dom'

/** KVI logo lockup: geometric mark + wordmark. `compact` hides the full name. */
export default function Wordmark({ tone = 'light', onClick, className = '' }) {
  const text = tone === 'dark' ? 'text-paper' : 'text-ink'
  const sub = tone === 'dark' ? 'text-paper/55' : 'text-ink-muted'
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Kaimur Valley Innovations — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span aria-hidden="true" className="flex h-8 w-8 items-end gap-[3px] rounded-[3px] bg-ink p-[6px]">
        <span className="h-[7px] w-[3px] bg-[#8a9d8f]" />
        <span className="h-[12px] w-[3px] bg-[#c9d0c9]" />
        <span className="h-[17px] w-[3px] bg-accent transition-[height] duration-500 ease-editorial group-hover:h-[7px]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[15px] font-semibold tracking-tight ${text}`}>
          Kaimur Valley Innovations
        </span>
        <span className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${sub}`}>
          KVI Group
        </span>
      </span>
    </Link>
  )
}
