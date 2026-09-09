import Button from '../components/Button.jsx'
import HeroFigure from '../components/HeroFigure.jsx'
import useScrollProgress from '../lib/useScrollProgress.js'
import useMediaQuery from '../lib/useMediaQuery.js'
import { company } from '../data/company.js'

export default function Hero() {
  // Gentle parallax as the hero scrolls away — writes --hp (0 -> 1) on the
  // section; children drift via the independent `translate` property so the
  // figure's own SVG entrance animation is untouched. Desktop only: on mobile
  // you scroll the hero away immediately, so the effect is pure cost. Reduced
  // motion pins --hp at 0 inside useScrollProgress.
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const ref = useScrollProgress(
    (p, el) => el.style.setProperty('--hp', String(p)),
    { enter: 0, exit: 0, reducedValue: 0, enabled: isDesktop },
  )

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-line bg-paper [--hp:0]"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-paper/0 via-paper/0 to-paper" />

      <div className="shell relative grid items-center gap-12 py-[clamp(3.5rem,9vw,7rem)] lg:grid-cols-12 lg:gap-8">
        <div
          className="lg:col-span-7"
          style={{
            translate: '0 calc(var(--hp) * -16px)',
            opacity: 'calc(1 - var(--hp) * 0.12)',
          }}
        >
          <p className="hero-eyebrow eyebrow accent-tick is-visible block">
            Kaimur Valley Innovations
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            <span className="hero-line block">Building the</span>
            <span className="hero-line hero-line-2 block">future from</span>
            <span className="hero-line hero-line-3 block">the ground up.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-muted">
            {company.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-display text-sm font-semibold">
            <span className="text-ink">Build</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span className="text-ink">Operate</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span className="text-ink">Innovate</span>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/businesses" size="lg" withArrow>
              Explore Our Businesses
            </Button>
            <Button to="/about" size="lg" variant="secondary">
              About KVI
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5" style={{ translate: '0 calc(var(--hp) * -40px)' }}>
          <HeroFigure className="mx-auto max-h-[380px] w-auto max-w-full lg:max-h-none lg:w-full" />
        </div>
      </div>

      <style>{`
        .hero-eyebrow { animation: reveal-up 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-line { animation: reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-line-2 { animation-delay: 0.09s; }
        .hero-line-3 { animation-delay: 0.18s; }
        @media (prefers-reduced-motion: reduce) {
          .hero-eyebrow, .hero-line { animation: none; }
        }
      `}</style>
    </section>
  )
}
