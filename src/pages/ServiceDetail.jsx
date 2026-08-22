import { Link, useParams, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Icon from '../components/icons.jsx'
import Button from '../components/Button.jsx'
import CTABanner from '../components/CTABanner.jsx'
import Reveal from '../components/Reveal.jsx'
import { verticals, home } from '../data/content.js'

export default function ServiceDetail() {
  const { slug } = useParams()
  const vertical = verticals.find((v) => v.slug === slug)

  // Unknown vertical slug — send back to the Services overview.
  if (!vertical) return <Navigate to="/services" replace />

  const currentIndex = verticals.findIndex((v) => v.slug === slug)
  const next = verticals[(currentIndex + 1) % verticals.length]

  return (
    <>
      <PageHero {...vertical.hero} />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-teal-700 hover:text-teal-800"
          >
            <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
            All Services
          </Link>

          <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-700 text-white">
            <Icon name={vertical.icon} className="h-7 w-7" />
          </div>

          <p className="mt-6 text-base leading-relaxed text-forest-800/85">{vertical.overview}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-forest-100 bg-white p-7 shadow-soft">
              <h3 className="font-heading text-lg font-semibold text-forest-950">
                {vertical.points.heading}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {vertical.points.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />
                    <span className="text-sm leading-relaxed text-forest-800/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-teal-100 bg-teal-50 p-7">
              <h3 className="font-heading text-lg font-semibold text-teal-900">
                {vertical.benefits.heading}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {vertical.benefits.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                    <span className="text-sm leading-relaxed text-teal-900/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl bg-forest-50 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-heading font-semibold uppercase tracking-wide text-forest-700/70">
                Next Vertical
              </p>
              <p className="mt-1 font-heading text-lg font-semibold text-forest-950">{next.title}</p>
            </div>
            <Button to={`/services/${next.slug}`} variant="secondary">
              Explore
            </Button>
          </div>
        </Reveal>
      </section>

      <CTABanner {...home.ctaBanner} />
    </>
  )
}
