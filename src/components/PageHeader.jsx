import Reveal from './Reveal.jsx'

const TONES = {
  paper: { wrap: 'border-line bg-paper', eyebrow: 'text-ink-muted', lede: 'text-ink-muted' },
  ink: { wrap: 'border-white/12 bg-ink text-paper', eyebrow: 'text-paper/55', lede: 'text-paper/70' },
}

/**
 * Interior-page header. Large editorial title with a hairline rule beneath and
 * an optional right-column lede. `tone` = 'paper' (default) | 'ink'.
 */
export default function PageHeader({ eyebrow, title, lede, meta, tone = 'paper' }) {
  const t = TONES[tone] || TONES.paper
  return (
    <header className={`border-b ${t.wrap}`}>
      <div className="shell pb-section-sm pt-[clamp(3rem,7vw,6rem)]">
        <Reveal>
          {eyebrow && (
            <p className={`eyebrow mb-6 ${t.eyebrow}`}>{eyebrow}</p>
          )}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h1 className="text-4xl sm:text-5xl lg:col-span-7 lg:text-6xl">{title}</h1>
            {lede && (
              <div className="lg:col-span-5 lg:pt-3">
                <p className={`max-w-prose text-lg ${t.lede}`}>{lede}</p>
                {meta}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </header>
  )
}
