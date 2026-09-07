import Reveal from './Reveal.jsx'

/**
 * Standard section header: small eyebrow, large heading, optional intro.
 * `align` left (default) or center; `tone` adjusts muted-text colour on dark.
 */
export default function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = 'left',
  tone = 'light',
  as: HeadingTag = 'h2',
  className = '',
  children,
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start'
  const introColor = tone === 'dark' ? 'text-paper/70' : 'text-ink-muted'
  const eyebrowColor = tone === 'dark' ? 'text-paper/55' : 'text-ink-muted'

  return (
    <Reveal className={`flex flex-col ${alignment} max-w-3xl ${className}`}>
      {eyebrow && (
        <span className={`eyebrow mb-5 ${eyebrowColor}`}>{eyebrow}</span>
      )}
      <HeadingTag className="text-3xl sm:text-4xl lg:text-5xl">{heading}</HeadingTag>
      {intro && (
        <p className={`mt-6 max-w-prose text-lg ${introColor}`}>{intro}</p>
      )}
      {children}
    </Reveal>
  )
}
