import { useState } from 'react'
import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import { articles, insightCategories } from '../data/insights.js'

export default function Insights() {
  useDocumentMeta({
    title: 'Insights',
    description:
      'Perspectives from Kaimur Valley Innovations on infrastructure, agriculture, technology, business and innovation.',
    path: '/insights',
  })

  const [filter, setFilter] = useState('All')
  const shown =
    filter === 'All' ? articles : articles.filter((a) => a.category === filter)

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Notes on what we're building."
        lede="Perspectives on infrastructure, agriculture, technology and the practical work of building businesses for the long term."
      />

      <Section tone="paper" divide>
        <Reveal className="flex flex-wrap gap-2">
          {['All', ...insightCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`h-9 rounded-card border px-3.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                filter === c
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line-strong text-ink-muted hover:border-ink hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="mt-12">
          {shown.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((a) => (
                <li key={a.slug} className="border border-line bg-paper-raised p-6">
                  <div className="flex items-center justify-between text-xs text-ink-muted">
                    <span className="font-semibold uppercase tracking-[0.12em]">{a.category}</span>
                    <span>{a.readingTime}</span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold">{a.title}</h2>
                  <p className="mt-2 text-sm text-ink-muted">{a.excerpt}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Reveal className="border border-line bg-paper-sunken p-10">
              <p className="max-w-prose text-lg text-ink-muted">
                {filter === 'All'
                  ? 'KVI Insights will collect notes from across the group — on the work of building infrastructure, running farm operations and developing technology. Pieces are published here as they are written.'
                  : `No ${filter} pieces yet.`}
              </p>
            </Reveal>
          )}
        </div>
      </Section>

      <ContactCtaSection
        heading="Working on something relevant?"
        body="If you're building in infrastructure, agriculture or technology and there's a reason to talk, get in touch."
      />
    </>
  )
}
