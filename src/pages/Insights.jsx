import { PageHero } from '../components/shared.jsx'
import { TextLink } from '../components/ui.jsx'
import { articles } from '../data/insights.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

export default function Insights() {
  useDocumentMeta(seo.insights)
  return (
    <>
      <PageHero title="Insights" lede="Articles and updates from KVI." />
      <section className="band-sm">
        <div className="shell max-w-prose">
          {articles.length === 0 && (
            <p>
              No articles yet. For current work, see <TextLink to="/projects">projects and initiatives</TextLink>.
            </p>
          )}
          {articles.map((a) => (
            <article key={a.slug} className="border-t border-line py-6">
              <p className="small text-muted">{a.category}</p>
              <h2 className="title mt-1">{a.title}</h2>
              <p className="mt-2">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
