import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import VerticalCard from '../components/VerticalCard.jsx'
import ValueCard from '../components/ValueCard.jsx'
import CTABanner from '../components/CTABanner.jsx'
import Reveal from '../components/Reveal.jsx'
import { home, verticals } from '../data/content.js'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-fade opacity-20 [background-size:24px_24px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-teal-600/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-forest-600/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-6 py-28 sm:py-36 text-center">
          <p className="animate-fade-in mb-5 text-sm font-heading font-semibold uppercase tracking-widest text-teal-300">
            {home.hero.eyebrow}
          </p>
          <h1 className="animate-fade-up text-4xl sm:text-6xl font-heading font-bold leading-[1.1] text-white">
            {home.hero.heading}
          </h1>
          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-sand-100/85"
            style={{ animationDelay: '120ms' }}
          >
            {home.hero.subheading}
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: '220ms' }}
          >
            <Button to={home.hero.ctaTo} size="lg">
              {home.hero.ctaLabel}
            </Button>
            <Button to={home.hero.secondaryCtaTo} variant="outlineLight" size="lg" showIcon={false}>
              {home.hero.secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-forest-950">
            {home.intro.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-forest-800/80">
            {home.intro.body}
          </p>
        </Reveal>
      </section>

      {/* Verticals snapshot */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              heading="Our Business Verticals"
              subheading="Five interconnected sectors, each strengthening the others."
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((vertical, i) => (
              <Reveal key={vertical.slug} delay={i * 80}>
                <VerticalCard vertical={vertical} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why KVI */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionHeading
              eyebrow={home.whyKvi.heading}
              heading={home.whyKvi.subheading}
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.whyKvi.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 80}>
                <ValueCard icon={point.icon} title={point.title} description={point.description} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission teaser */}
      <section className="bg-teal-900 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-sm font-heading font-semibold uppercase tracking-widest text-teal-300">
              {home.missionTeaser.heading}
            </p>
            <p className="mt-5 text-xl sm:text-2xl font-heading font-medium leading-snug text-white">
              {home.missionTeaser.body}
            </p>
            <div className="mt-8">
              <Button to={home.missionTeaser.ctaTo} variant="outlineLight">
                {home.missionTeaser.ctaLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA banner */}
      <CTABanner {...home.ctaBanner} />
    </>
  )
}
