import SitePlan from '../components/SitePlan.jsx'
import { Typology } from '../components/Drawings.jsx'
import Photo from '../components/Photo.jsx'
import { Button } from '../components/ui.jsx'
import { PageHero, VerticalEyebrow } from '../components/shared.jsx'
import { buildStages } from '../data/company.js'
import { contactPath } from '../data/contact.js'
import { infraScope, infraTypologies } from '../data/verticals.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

export default function Infra() {
  useDocumentMeta(seo.infra)
  return (
    <>
      <PageHero
        tone="light"
        eyebrow={<VerticalEyebrow id="infra" />}
        title="Building the foundation of modern farms."
        lede="KVI Infra plans, designs and develops the physical infrastructure of agricultural operations."
        art={<SitePlan tone="light" show={['infra']} />}
      />

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 className="display display-m lg:col-span-6">Infrastructure designed around how a farm works.</h2>
          <div className="lede space-y-5 lg:col-span-5 lg:col-start-8">
            <p>KVI Infra is not a general civil contractor or a real-estate business. Its focus is infrastructure made specifically for agricultural operations.</p>
            <p className="text-muted">Every plan starts from what the land will produce, then sets out water, access, power and structures to suit.</p>
          </div>
        </div>
      </section>

      <section className="bg-stone">
        <div className="shell pt-12 lg:pt-16">
          <h2 className="title">An integrated farm master plan</h2>
          <p className="small mt-1 text-muted">Illustrative drawing, not a KVI project.</p>
        </div>
        <div className="shell mt-6 pb-12 lg:pb-16">
          <div className="hidden aspect-[16/10] w-full lg:block">
            <SitePlan tone="light" labels title="Illustrative farm master plan with ponds, poultry sheds, a pack house, polyhouses, orchards, a nursery, roads and a canal" slice={false} />
          </div>
          <div className="aspect-[4/3] w-full lg:hidden">
            <SitePlan tone="light" labels title="Illustrative farm master plan, cropped to ponds, poultry sheds, a pack house and polyhouses" viewBox="100 170 860 640" />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="shell">
          <h2 className="display display-m max-w-[14em]">Purpose-built agricultural structures.</h2>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {infraTypologies.map((t) => (
              <article key={t.kind}>
                <div className="border-b border-line bg-stone/60 p-4 lg:p-8">
                  <Typology kind={t.kind} title={t.title} />
                </div>
                <h3 className="title mt-4">{t.title}</h3>
                <p className="mt-1 text-muted">{t.body}</p>
              </article>
            ))}
          </div>
          <p className="small mt-8 text-muted">Illustrative sections, not to scale.</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        <Photo slot="greenhouse" sizes="33vw" className="aspect-[4/3]" />
        <Photo slot="irrigation" sizes="33vw" className="aspect-[4/3]" />
        <Photo slot="solar" sizes="33vw" className="col-span-2 aspect-[2/1] lg:col-span-1 lg:aspect-[4/3]" />
      </section>

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display display-m">What KVI Infra covers.</h2>
            <p className="mt-5 text-muted">This is the scope of the vertical. Completed projects will be listed under Projects as they are delivered.</p>
          </div>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {infraScope.map((group) => (
              <div key={group.heading}>
                <h3 className="title border-b border-copper/50 pb-3">{group.heading}</h3>
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
          <h2 className="display display-m max-w-[14em]">Planning a new farm, or expanding one?</h2>
          <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 xl:grid-cols-6">
            {buildStages.map((s) => (
              <li key={s.no} className="border-t border-copper/50 pt-3">
                <p className="small text-copper">{s.no}</p>
                <p className="title">{s.title}</p>
              </li>
            ))}
          </ol>
          <Button to={contactPath('infrastructure')} className="mt-10">Discuss a farm project</Button>
        </div>
      </section>
    </>
  )
}
