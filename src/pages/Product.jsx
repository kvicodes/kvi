import { useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import { Button, TextLink } from '../components/ui.jsx'
import { PageHero } from '../components/shared.jsx'
import { contactPath } from '../data/contact.js'
import { company } from '../data/company.js'
import { productBySlug, productPath } from '../data/products.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

function ProductView({ product: p }) {
  useDocumentMeta({
    title: `${p.name}: ${p.category}`,
    description: p.summary,
    path: productPath(p),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: 'BusinessApplication',
      description: p.summary,
      url: p.url,
      publisher: { '@type': 'Organization', name: company.legalName },
    },
  })

  return (
    <>
      <PageHero title={p.name} lede={p.summary}>
        <p className="mt-6 text-base text-sage">A KVI Tech product. {p.category}.</p>
      </PageHero>

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="lede">{p.intro}</p>
            {p.audience && (
              <>
                <h2 className="mt-8 text-sm text-muted">Built for</h2>
                <p className="mt-1">{p.audience}</p>
              </>
            )}
            {p.connection && <p className="mt-6 text-muted">{p.connection}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={p.url} external aria-label={`${p.name} website`}>Visit {p.name}</Button>
              <Button to={contactPath('technology', { product: p.id })} variant="line-dark">Ask about {p.name}</Button>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="text-sm text-muted">What it covers</h2>
            <ul className="mt-3 border-b border-line">
              {p.modules.map((m) => <li key={m} className="border-t border-line py-2.5">{m}</li>)}
            </ul>
            {p.scope && <p className="small mt-4 text-muted">{p.scope}</p>}
          </div>
        </div>

        {p.workflow && (
          <div className="shell mt-14">
            <h2 className="text-sm text-muted">Workflow</h2>
            <ol className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
              {p.workflow.map((step) => (
                <li key={step} className="rounded bg-stone px-3 py-1.5 text-base">{step}</li>
              ))}
            </ol>
          </div>
        )}

        <p className="shell mt-14"><TextLink to="/products">All KVI Tech products</TextLink></p>
      </section>
    </>
  )
}

export default function Product() {
  const { slug } = useParams()
  const product = productBySlug(slug)
  return product ? <ProductView product={product} /> : <NotFound />
}
