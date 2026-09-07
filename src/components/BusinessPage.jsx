import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from './PageHeader.jsx'
import Section from './Section.jsx'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import BusinessGlyph from './BusinessGlyph.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import { TINT } from '../data/businesses.js'

/**
 * Shared scaffold for the three business pages (Infra / Farms / Tech).
 * Renders the header, the focus-area grid and the business's `sections`
 * array. Pages pass page-specific content via `children` (inserted before
 * the closing contact CTA).
 */
export default function BusinessPage({ business, metaDescription, headerTone = 'paper', children }) {
  useDocumentMeta({
    title: `${business.name} — ${business.discipline}`,
    description: metaDescription || business.summary,
    path: business.to,
  })

  const tint = TINT[business.id] || {}
  const glyphTone = headerTone === 'ink' ? 'text-paper' : 'text-ink'

  return (
    <>
      <PageHeader
        tone={headerTone}
        eyebrow={`KVI Group · ${business.verb}`}
        title={business.name}
        lede={business.summary}
        rule={tint.bar}
        figure={<span className={glyphTone}><BusinessGlyph id={business.id} size={340} /></span>}
        meta={
          <>
            <p className="mt-6 text-sm font-medium text-accent-soft">{business.discipline}</p>
            <p
              className={`mt-2 text-xs uppercase tracking-[0.16em] ${
                headerTone === 'ink' ? 'text-paper/55' : 'text-ink-muted'
              }`}
            >
              {tint.character}
            </p>
          </>
        }
      />

      <Section tone="sunken" divide>
        <SectionHeading eyebrow="Focus areas" heading="What this business covers." />
        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {business.focus.map((f, i) => (
            <Reveal key={f} delay={i * 50} className={`${tint.texture || ''} bg-paper-raised p-6`}>
              <span className={`font-display text-xs ${tint.text || 'text-ink-muted'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 font-display text-lg font-medium text-ink">{f}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {business.sections.map((s, i) => (
        <Section key={s.key} tone={i % 2 === 0 ? 'paper' : 'sunken'} divide>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <h2 className="text-2xl sm:text-3xl">{s.heading}</h2>
              {s.placeholder && (
                <span className="mt-4 inline-block border border-line px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  In preparation
                </span>
              )}
            </Reveal>
            <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-prose text-lg text-ink-muted">{s.body}</p>
            </Reveal>
          </div>
        </Section>
      ))}

      {children}

      <ContactCtaSection
        heading="Work with this business."
        body={`For enquiries about ${business.name}, partnerships or projects, get in touch with KVI.`}
      />
    </>
  )
}
