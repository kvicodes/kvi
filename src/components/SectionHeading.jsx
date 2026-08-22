/**
 * Consistent section header used across every page: an optional eyebrow
 * label, a heading, and an optional subheading. `align` and `light`
 * (for dark section backgrounds) control presentation.
 */
export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  light = false,
  className = '',
}) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignClasses} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-heading font-semibold uppercase tracking-widest ${
            light ? 'text-teal-300' : 'text-teal-600'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-heading font-bold leading-tight ${
          light ? 'text-white' : 'text-forest-950'
        }`}
      >
        {heading}
      </h2>
      {subheading && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? 'text-sand-100/90' : 'text-forest-800/80'}`}>
          {subheading}
        </p>
      )}
    </div>
  )
}
