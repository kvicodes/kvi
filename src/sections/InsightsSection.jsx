import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ArrowLink from '../components/ArrowLink.jsx'
import { articles, insightCategories } from '../data/insights.js'

/** Homepage Insights preview. Handles the empty state without fabricating posts. */
export default function InsightsSection() {
  const hasArticles = articles.length > 0
  return (
    <Section tone="paper" divide>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Insights"
          heading="Notes on what we're building."
          intro="Perspectives on infrastructure, agriculture, technology and building businesses for the long term."
        />
        <Reveal>
          <ArrowLink to="/insights">All insights</ArrowLink>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        {hasArticles ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <li key={a.slug} className="border border-line bg-paper-raised p-6">
                <p className="eyebrow">{a.category}</p>
                <h3 className="mt-4 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{a.excerpt}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-line bg-paper-sunken p-8">
            <p className="max-w-prose text-base text-ink-muted">
              The Insights library is in preparation. Published pieces will be
              organised across these areas:
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {insightCategories.map((c) => (
                <li key={c} className="text-sm font-medium text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Reveal>
    </Section>
  )
}
