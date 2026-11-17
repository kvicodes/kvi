import SitePlan from '../components/SitePlan.jsx'
import { Button } from '../components/ui.jsx'
import { PageHero, Partnerships, Portfolio, VerticalEyebrow } from '../components/shared.jsx'
import { contactPath } from '../data/contact.js'
import { agriProduct, productsNote } from '../data/products.js'
import { techCapabilities } from '../data/verticals.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

// Source: the FarmGrid repository README (Core principle, Unit Types, Production
// Records, Reporting). Describe design, never outcomes: no measured results exist.
const farmChanges = [
  {
    problem: 'Land, labour, inputs, animals and cash sit in separate notebooks.',
    answer: 'One structure: organization, farm, unit, batch, activity, resources and financials, so every record belongs to something.',
  },
  {
    problem: 'A mixed farm does not fit software built for one crop.',
    answer: 'Unit types and custom fields are configured by the client with no code deployment, so a field, an orchard block, a shed or a pond each keep the records that suit them.',
  },
  {
    problem: 'It is hard to see which part of the farm makes or loses money.',
    answer: 'Activities, inputs, labour and costs roll up into farm, unit and batch profit-and-loss reporting.',
  },
  {
    problem: 'Production is tracked differently on every unit.',
    answer: 'One production-records engine handles milk yield, egg count, weight, feed, mortality and other record types the farm defines.',
  },
]

const STATE_STYLE = { Live: 'text-rice', Research: 'text-sage' }

export default function Tech() {
  useDocumentMeta(seo.tech)
  return (
    <>
      <PageHero
        eyebrow={<VerticalEyebrow id="tech" />}
        title="Powering agricultural intelligence."
        lede="KVI Tech develops the digital ecosystem that runs KVI's agricultural operations and serves other agricultural businesses."
        art={<SitePlan active="tech" />}
      />

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 className="display display-m lg:col-span-5">A farm is a business that needs its records in one place.</h2>
          <div className="lede space-y-5 lg:col-span-6 lg:col-start-7">
            <p>Land, labour, inputs, animals, stock and cash usually sit in separate notebooks. Agricultural digitalization starts by bringing them into one system.</p>
            <p className="text-muted">We build software for operations we understand, and test it against real farm and business work.</p>
          </div>
        </div>
      </section>

      <section id="farmgrid" className="on-dark band bg-field text-paper">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-base text-rice">{agriProduct.category}</p>
            <h2 className="display display-l mt-3">{agriProduct.name}</h2>
            <p className="lede mt-6 max-w-[46ch]">{agriProduct.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={agriProduct.url} external variant="solid-light" aria-label="FarmGrid website">Visit FarmGrid</Button>
              <Button to="/products/farmgrid" variant="line-light">Product details</Button>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="text-sm text-sage">What it covers</h3>
            <ul className="mt-3">
              {agriProduct.modules.map((m) => <li key={m} className="border-t border-line-dark py-2.5">{m}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="on-the-farm" className="band">
        <div className="shell">
          <h2 className="display display-m max-w-[14em]">What software changes on a farm.</h2>
          <p className="mt-5 max-w-prose text-muted">What FarmGrid is built to do, as set out in its own documentation. It describes the design, not measured results.</p>
          <dl className="mt-10 border-b border-line">
            {farmChanges.map((c) => (
              <div key={c.problem} className="grid gap-x-8 gap-y-2 border-t border-line py-6 lg:grid-cols-12">
                <dt className="lg:col-span-4">
                  <span className="small block text-muted">The problem</span>
                  <span className="title mt-1 block">{c.problem}</span>
                </dt>
                <dd className="lg:col-span-7 lg:col-start-6">
                  <span className="small block text-muted">In FarmGrid</span>
                  <span className="mt-1 block">{c.answer}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="portfolio" className="band">
        <div className="shell">
          <h2 className="display display-m max-w-[14em]">The technology portfolio.</h2>
          <p className="mt-5 max-w-prose text-muted">KVI Tech also builds products for adjacent industries. These are software products, and they are not agricultural businesses of KVI.</p>
          <div className="mt-10"><Portfolio /></div>
          <p className="small mt-4 text-muted">{productsNote}</p>
        </div>
      </section>

      <section className="band bg-stone">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display display-m">Technology capabilities.</h2>
            <p className="mt-5 text-muted">Live capabilities are in use in KVI products today. Research means we are studying the area and have not released it.</p>
          </div>
          <ul className="on-dark bg-field p-6 text-paper lg:col-span-7 lg:col-start-6 lg:p-10">
            {techCapabilities.map((c) => (
              <li key={c.title} className="flex items-baseline justify-between gap-6 border-t border-line-dark py-3 first:border-t-0">
                <span>{c.title}</span>
                <span className={`small shrink-0 ${STATE_STYLE[c.state]}`}>{c.state}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-sm">
        <div className="shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display display-m max-w-[14em]">Need software for an agricultural business?</h2>
          <Button to={contactPath('technology')} className="shrink-0">Talk to KVI Tech</Button>
        </div>
      </section>

      <Partnerships />
    </>
  )
}
