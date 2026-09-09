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
  tick = true,
  as: HeadingTag = 'h2',
  className = '',
  children,
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start'
  const introColor = tone === 'dark' ? 'text-paper/70' : 'text-ink-muted'
  const eyebrowColor = tone === 'dark' ? 'text-paper/55' : 'text-ink-muted'

  return (
    <div className={`flex flex-col ${alignment} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal
          as="span"
          className={`eyebrow mb-5 block ${tick && align !== 'center' ? 'accent-tick' : ''} ${eyebrowColor}`}
        >
          {eyebrow}
        </Reveal>
      )}
      <Reveal as={HeadingTag} variant="heading" delay={60} className="text-3xl sm:text-4xl lg:text-5xl">
        {heading}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={140} className={`mt-6 max-w-prose text-lg ${introColor}`}>
          {intro}
        </Reveal>
      )}
      {children}
    </div>
  )
}
