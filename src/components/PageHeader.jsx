import Reveal from './Reveal.jsx'
import useScrollProgress from '../lib/useScrollProgress.js'
import useMediaQuery from '../lib/useMediaQuery.js'

const TONES = {
  paper: { wrap: 'border-line bg-paper', eyebrow: 'text-accent', lede: 'text-ink-muted' },
  ink: { wrap: 'border-white/12 bg-ink text-paper', eyebrow: 'text-grain', lede: 'text-paper/70', dark: true },
  forest: { wrap: 'border-white/12 bg-forest-deep text-paper', eyebrow: 'text-grain', lede: 'text-paper/75', dark: true },
}

/**
 * Interior-page header. Large editorial title with a hairline rule beneath and
 * an optional right-column lede. `tone` = 'paper' (default) | 'ink' | 'forest'.
 * `actions` renders below the lede (e.g. CTAs).
 */
export default function PageHeader({ eyebrow, title, lede, meta, actions, tone = 'paper', rule, figure }) {
  const t = TONES[tone] || TONES.paper
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const ref = useScrollProgress(
    (p, el) => el.style.setProperty('--hp', String(p)),
    { enter: 0, exit: 0, reducedValue: 0, enabled: isDesktop },
  )
  return (
    <header
      ref={ref}
      data-tone={t.dark ? 'dark' : undefined}
      className={`relative overflow-hidden border-b [--hp:0] ${t.wrap}`}
    >
      {figure && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-1/2 hidden opacity-[0.08] lg:block"
          style={{ translate: '0 calc(-50% + var(--hp) * -60px)' }}
        >
          {figure}
        </div>
      )}
      <div className="shell relative pb-section-sm pt-[clamp(3rem,7vw,6rem)]">
        <Reveal>
          {eyebrow && (
            <p className={`eyebrow mb-6 ${t.eyebrow}`}>{eyebrow}</p>
          )}
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
              {rule && <span className={`mt-6 block h-[3px] w-16 ${rule}`} />}
            </div>
            {lede && (
              <div className="lg:col-span-5 lg:pt-3">
                <p className={`max-w-prose text-lg ${t.lede}`}>{lede}</p>
                {meta}
                {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </header>
  )
}
