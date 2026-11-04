import { Link } from 'react-router-dom'

/**
 * The existing KVI mark (three ascending bars) and wordmark, unchanged in form.
 * `tone="light"` is for dark backgrounds.
 */
export default function Logo({ tone = 'dark', onClick, className = '' }) {
  const light = tone === 'light'
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Kaimur Valley Innovations, home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-end gap-[3px] rounded-[3px] p-[6px] transition-colors duration-300 ${light ? 'bg-paper/10' : 'bg-field'}`}
      >
        <span className="h-[7px] w-[3px] bg-[#8a9d8f]" />
        <span className="h-[12px] w-[3px] bg-[#c9d0c9]" />
        <span className="h-[17px] w-[3px] bg-rice transition-[height] duration-500 ease-survey group-hover:h-[7px]" />
      </span>
      <span className={`text-[15px] font-semibold leading-none tracking-tight transition-colors duration-300 ${light ? 'text-paper' : 'text-graphite'}`}>
        Kaimur Valley Innovations
      </span>
    </Link>
  )
}
