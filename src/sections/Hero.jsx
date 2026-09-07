import Button from '../components/Button.jsx'
import HeroFigure from '../components/HeroFigure.jsx'
import { company } from '../data/company.js'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-paper/0 via-paper/0 to-paper" />

      <div className="shell relative grid items-center gap-12 py-[clamp(3.5rem,9vw,7rem)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="hero-eyebrow eyebrow">
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
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/businesses" size="lg" withArrow>
              Explore Our Businesses
            </Button>
            <Button to="/about" size="lg" variant="secondary">
              About KVI
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroFigure className="mx-auto max-w-md lg:max-w-none" />
        </div>
      </div>

      <style>{`
        .hero-eyebrow { animation: reveal-up 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-line { animation: reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-line-2 { animation-delay: 0.09s; }
        .hero-line-3 { animation-delay: 0.18s; }
      `}</style>
    </section>
  )
}
