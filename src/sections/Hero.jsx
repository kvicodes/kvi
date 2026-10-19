import Button from '../components/Button.jsx'
import HeroLandscape from '../components/HeroLandscape.jsx'
import useScrollProgress from '../lib/useScrollProgress.js'
import useMediaQuery from '../lib/useMediaQuery.js'
import { company } from '../data/company.js'

export default function Hero() {
  // Gentle parallax as the hero scrolls away — writes --hp (0 -> 1) on the
  // section; the landscape layers and copy read it. Desktop only: on mobile you
  // scroll the hero away immediately, so the effect is pure cost. Reduced
  // motion pins --hp at 0 inside useScrollProgress.
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const ref = useScrollProgress(
    (p, el) => el.style.setProperty('--hp', String(p)),
    { enter: 0, exit: 0, reducedValue: 0, enabled: isDesktop },
  )

  return (
    <section
      ref={ref}
      data-tone="dark"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-forest-deep text-paper [--hp:0]"
    >
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div
        className="shell relative pb-[clamp(13rem,34vw,25rem)] pt-[clamp(3.5rem,9vw,7.5rem)]"
        style={{ translate: '0 calc(var(--hp) * -24px)' }}
      >
        <p className="hero-rise eyebrow accent-tick is-visible block text-grain">
          Kaimur Valley Innovations · AgroTech-led enterprise
        </p>
        <h1
          id="hero-heading"
          className="mt-6 max-w-5xl font-serif text-[clamp(2.6rem,7.4vw,6.25rem)] font-medium leading-[1.0] tracking-[-0.025em]"
        >
          <span className="hero-rise block text-grain">Growing agriculture.</span>
          <span className="hero-rise hero-d1 block">Building enterprises.</span>
          <span className="hero-rise hero-d2 block">Enabling progress.</span>
        </h1>
        <p className="hero-rise hero-d3 mt-8 max-w-2xl text-lg text-paper/75 sm:text-xl">
          {company.supporting}
        </p>
        <div className="hero-rise hero-d3 mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to="/businesses" size="lg" variant="inverse" withArrow>
            Explore Our Businesses
          </Button>
          <Button to="/#partner" size="lg" variant="outline-light">
            Partner With KVI
          </Button>
        </div>
      </div>

      <HeroLandscape className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[clamp(15rem,36vw,27rem)] w-full" />

      <style>{`
        .hero-rise { animation: reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-d1 { animation-delay: 0.08s; }
        .hero-d2 { animation-delay: 0.16s; }
        .hero-d3 { animation-delay: 0.26s; }
        @media (prefers-reduced-motion: reduce) { .hero-rise { animation: none; } }
      `}</style>
    </section>
  )
}
