import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import ArrowLink from '../components/ArrowLink.jsx'
import { vision } from '../data/company.js'

const STRANDS = ['Agricultural production', 'Rural enterprise', 'Infrastructure', 'Software-enabled operations']

/** Long-term vision — grounded, no invented history or impact figures. */
export default function VisionSection({ tone = 'paper', showLink = true }) {
  return (
    <Section tone={tone} divide id="vision">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow accent-tick text-accent">Our vision</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">{vision.heading}</h2>
          <div className="mt-8 max-w-prose space-y-5 text-lg text-ink-muted">
            {vision.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {showLink && (
            <div className="mt-8">
              <ArrowLink to="/about">About KVI</ArrowLink>
            </div>
          )}
        </Reveal>
        <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
          <ol className="relative border-l border-line-strong">
            {STRANDS.map((s, i) => (
              <li key={s} className="relative pb-8 pl-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border ${
                    i === 0 ? 'border-forest bg-forest' : 'border-line-strong bg-paper'
                  }`}
                />
                <span className="font-display text-xs tabular-nums text-ink-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-1 font-serif text-2xl font-medium">{s}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
