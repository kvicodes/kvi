import { Link } from 'react-router-dom'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import BusinessGlyph from '../components/BusinessGlyph.jsx'
import useScrollProgress from '../lib/useScrollProgress.js'
import { ecosystem } from '../data/company.js'
import { businesses } from '../data/businesses.js'

const BY_VERB = Object.fromEntries(businesses.map((b) => [b.verb, b.id]))

/**
 * "Built independently. Connected by purpose." — the three businesses as a
 * threaded editorial list rather than a flowchart. A single hairline runs down
 * the left; each business hangs off it with an oversized verb.
 */
export default function EcosystemSection() {
  const railRef = useScrollProgress(
    (p, el) => el.style.setProperty('--rail', String(p)),
    { enter: 0.8, exit: 0.5 },
  )

  return (
    <Section tone="ink" divide>
      <SectionHeading
        eyebrow="How the businesses connect"
        heading={ecosystem.heading}
        intro={ecosystem.intro}
        tone="dark"
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <ol ref={railRef} className="relative border-l border-white/15 pl-6 [--rail:0] sm:pl-10">
            <span
              aria-hidden="true"
              className="absolute -left-px top-0 h-full w-px overflow-hidden"
            >
              <span
                className="block h-full w-px origin-top bg-paper/70"
                style={{ transform: 'scaleY(var(--rail))' }}
              />
            </span>
            {ecosystem.nodes.map((node, i) => (
              <Reveal
                key={node.verb}
                delay={i * 90}
                as="li"
                className="relative pb-12 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-2 h-3 w-3 rounded-full border border-white/30 bg-ink sm:-left-[calc(2.5rem+7px)]"
                />
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <span className="font-display text-4xl font-semibold text-paper sm:text-5xl">
                    {node.verb}
                  </span>
                  <Link
                    to={node.to}
                    className="inline-flex items-center gap-2 font-display text-lg font-semibold text-paper/90 link-underline"
                  >
                    <span className="text-paper/40">
                      <BusinessGlyph id={BY_VERB[node.verb]} size={22} />
                    </span>
                    {node.business}
                  </Link>
                </div>
                <p className="mt-3 max-w-xl text-sm text-paper/60">{node.body}</p>
                <Link
                  to={node.to}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-paper/70 transition-colors hover:text-paper"
                >
                  Explore {node.business}
                  <Icon name="arrow-right" size={14} />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={120} className="lg:col-span-4 lg:pt-2">
          <div className="border border-white/12 bg-white/[0.03] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/45">
              On the relationship
            </p>
            <p className="mt-4 text-sm text-paper/65">{ecosystem.note}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
