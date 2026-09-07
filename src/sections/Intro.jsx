import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Intro() {
  return (
    <Section tone="paper" divide>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">One group</p>
          <h2 className="mt-5 text-3xl sm:text-4xl">
            One group. Three areas of opportunity.
          </h2>
        </Reveal>
        <Reveal delay={80} className="lg:col-span-6 lg:col-start-7">
          <p className="text-lg text-ink-muted">
            KVI brings together businesses focused on developing physical
            infrastructure, operating agricultural businesses, and creating
            technology products.
          </p>
          <p className="mt-5 text-lg text-ink-muted">
            Each business runs on its own terms. Together they cover the arc from
            land and construction, through production and products, to the
            software that helps run it all.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
