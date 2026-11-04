import SitePlan from '../components/SitePlan.jsx'
import Photo from '../components/Photo.jsx'
import { Button, Reveal, TextLink } from '../components/ui.jsx'
import { PageHero, Partnerships, VerticalEyebrow } from '../components/shared.jsx'
import { contactPath } from '../data/contact.js'
import { ecosystemNote, featuredProduct, greensChain, greensScope, partnershipModels } from '../data/verticals.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

export default function Greens() {
  useDocumentMeta(seo.greens)
  return (
    <>
      <PageHero
        eyebrow={<VerticalEyebrow id="greens" />}
        title="Growing agricultural businesses."
        lede="KVI Greens is the business of growing, producing, processing and commercializing agricultural resources."
        art={<SitePlan show={['greens']} />}
      />

      <section className="band-sm">
        <div className="shell grid grid-cols-6 gap-2 lg:gap-3">
          <Photo slot="aerial-farm" sizes="(min-width:1024px) 66vw, 100vw" className="col-span-6 aspect-[16/9] lg:col-span-4 lg:aspect-auto" />
          <div className="col-span-6 grid grid-cols-2 gap-2 lg:col-span-2 lg:grid-cols-1 lg:gap-3">
            <Photo slot="orchard" sizes="33vw" className="aspect-[4/3]" />
            <Photo slot="fish-pond" sizes="33vw" className="aspect-[4/3]" />
          </div>
          <Photo slot="poultry" sizes="33vw" className="col-span-3 aspect-[4/3] lg:col-span-2" />
          <Photo slot="greenhouse" sizes="33vw" className="col-span-3 aspect-[4/3] lg:col-span-2" />
          <Photo slot="packaging" sizes="33vw" className="col-span-6 aspect-[2/1] lg:col-span-2 lg:aspect-[4/3]" />
        </div>
      </section>

      <section className="band-sm">
        <div className="shell">
          <h2 className="display display-m max-w-[14em]">From production to commercialization.</h2>
          <ol className="mt-10 grid gap-px bg-line md:grid-cols-5">
            {greensChain.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 60} className="bg-paper py-4 md:px-5 md:first:pl-0">
                <h3 className="title">{step.title}</h3>
                <p className="small mt-2 text-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <p className="small mt-6 max-w-prose text-muted">{ecosystemNote}</p>
        </div>
      </section>

      <section id="agri-products" className="on-dark band scroll-mt-16 bg-[rgb(var(--olive))] text-paper">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-base">{featuredProduct.status}, offered by {featuredProduct.offeredBy}</p>
            <h2 className="display display-l mt-4">{featuredProduct.name}</h2>
            <p className="lede mt-6 max-w-[46ch]">{featuredProduct.body}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p>{featuredProduct.variety}</p>
            <p className="mt-5">Planned retail packs: {featuredProduct.packSizes.join(' and ')}.</p>
            <p className="mt-5">{featuredProduct.availability}</p>
            <Button to={contactPath('product-partnership', { product: 'mokari' })} variant="solid-light" className="mt-7">Register interest</Button>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display display-m">What KVI Greens covers.</h2>
            <p className="mt-5 text-muted">This is the scope of the vertical. Not every activity operates commercially today.</p>
          </div>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {greensScope.map((group) => (
              <div key={group.heading}>
                <h3 className="title border-b border-line pb-3">{group.heading}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band bg-stone">
        <div className="shell">
          <h2 className="display display-m max-w-[14em]">Working with farm owners.</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {partnershipModels.map((m) => (
              <div key={m.title} className="border-t border-graphite/25 pt-4">
                <h3 className="text-lg font-medium">{m.title}</h3>
                <p className="small mt-2 text-muted">{m.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10"><TextLink to={contactPath('agri-partnership')}>Discuss a farm partnership</TextLink></p>
        </div>
      </section>

      <Partnerships />
    </>
  )
}
