import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { ecosystem } from '../data/company.js'

export default function EcosystemSection() {
  return (
    <Section tone="ink" divide>
      <SectionHeading
        eyebrow="The KVI ecosystem"
        heading={ecosystem.heading}
        intro={ecosystem.intro}
        tone="dark"
      />

      {/* Shared spine */}
      <div className="mt-16">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-paper/55">
            Kaimur Valley Innovations
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        </div>

        <div className="grid gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-3">
          {ecosystem.nodes.map((node, i) => (
            <Reveal key={node.verb} delay={i * 100} className="flex flex-col bg-ink p-7 sm:p-8">
              <span className="font-display text-5xl font-semibold text-paper/90">
                {node.verb}
              </span>
              <Link
                to={node.to}
                className="mt-6 inline-flex items-center gap-2 font-display text-lg font-semibold text-paper link-underline"
              >
                {node.business}
              </Link>
              <p className="mt-3 flex-1 text-sm text-paper/60">{node.body}</p>
              <Link
                to={node.to}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-paper/70 transition-colors hover:text-paper"
              >
                Explore
                <Icon name="arrow-right" size={15} />
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-sm text-paper/50">
          KVI Infra develops physical assets. Kaimur Farms operates agricultural
          assets and creates products. KVI Tech builds technology that can
          support businesses across the ecosystem — while each remains an
          independent business.
        </p>
      </div>
    </Section>
  )
}
