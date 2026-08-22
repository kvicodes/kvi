/**
 * Generic card shell reused for values, differentiators, and other
 * icon + title + description blocks. For linked vertical cards, see
 * VerticalCard.jsx which builds on top of this.
 */
export default function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-2xl border border-forest-100 bg-white p-6 sm:p-7 shadow-soft transition-shadow duration-200 hover:shadow-lift ${className}`}
    >
      {children}
    </div>
  )
}
