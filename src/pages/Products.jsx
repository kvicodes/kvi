import { PageHero, Portfolio } from '../components/shared.jsx'
import { Button, TextLink } from '../components/ui.jsx'
import { agriProduct, productsNote } from '../data/products.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

export default function Products() {
  useDocumentMeta(seo.products)
  return (
    <>
      <PageHero
        title="KVI Tech software products."
        lede="FarmGrid is our agricultural platform. The rest of the portfolio serves adjacent industries."
      />
      <section className="band-sm">
        <div className="shell">
          <article className="grid gap-6 border-t border-line pt-8 lg:grid-cols-12">
            <h2 className="display display-m lg:col-span-5">{agriProduct.name}</h2>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="small text-muted">{agriProduct.category}</p>
              <p className="lede mt-2">{agriProduct.summary}</p>
              <Button to="/products/farmgrid" className="mt-6">Product details</Button>
            </div>
          </article>
          <h2 className="title mt-16">Technology portfolio</h2>
          <div className="mt-6"><Portfolio /></div>
          <p className="small mt-4 text-muted">{productsNote}</p>
          <p className="mt-8"><TextLink to="/tech">About KVI Tech</TextLink></p>
        </div>
      </section>
    </>
  )
}
