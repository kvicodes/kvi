const TONES = {
  paper: { bg: 'bg-paper text-ink', border: 'border-line' },
  raised: { bg: 'bg-paper-raised text-ink', border: 'border-line' },
  sunken: { bg: 'bg-paper-sunken text-ink', border: 'border-line' },
  ink: { bg: 'bg-ink text-paper', border: 'border-white/12' },
  accent: { bg: 'bg-accent-deep text-paper', border: 'border-white/15' },
}

/**
 * A page section with consistent vertical rhythm and an optional background
 * tone. `divide` adds a hairline top border in the tone's contrast colour.
 */
export default function Section({
  as: Tag = 'section',
  tone = 'paper',
  size = 'md',
  divide = false,
  bleed = false,
  id,
  className = '',
  children,
  ...rest
}) {
  const t = TONES[tone] || TONES.paper
  const pad = size === 'sm' ? 'py-section-sm' : size === 'none' ? '' : 'py-section'
  return (
    <Tag
      id={id}
      className={`${t.bg} ${pad} ${divide ? `border-t ${t.border}` : ''} ${className}`}
      {...rest}
    >
      <div className={bleed ? '' : 'shell'}>{children}</div>
    </Tag>
  )
}
