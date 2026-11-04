import SitePlan from '../components/SitePlan.jsx'
import { Reveal, StatusLabel, TextLink, VerticalMark } from '../components/ui.jsx'
import { PageHero, Partnerships } from '../components/shared.jsx'
import { company, operatingChain, rooted } from '../data/company.js'
import { verticals } from '../data/verticals.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

const STATE = [
  {
    status: 'operational',
    heading: 'What runs today',
    body: 'KVI Tech software platforms, including FarmGrid and the wider product portfolio.',
  },
  {
    status: 'development',
    heading: 'What we are developing',
    body: 'The KVI Greens partner farm model, Mokari Gobindbhog Rice and the KVI Infra farm development practice.',
  },
  {
    status: 'planned',
    heading: 'What we plan to pursue',
    body: 'Carbon credit project development, wider value addition, and smart farming and automation research.',
  },
]

export default function About() {
  useDocumentMeta(seo.about)
  return (
    <>
      <PageHero
        title="An operating company built around agriculture."
        lede={`${company.legalName} is an integrated farm development and agritech company.`}
        art={<SitePlan />}
      />

      <section className="band">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <p className="title lg:col-span-7">
            KVI operates around one domain: agriculture. We develop agricultural businesses, build their physical infrastructure, and create the digital technology needed to manage and scale them.
          </p>
          <div className="space-y-8 lg:col-span-4 lg:col-start-9">
            <div>
              <h2 className="text-sm text-muted">Vision</h2>
              <p className="mt-2 text-lg">To advance agriculture through integrated farm development, technology and infrastructure.</p>
            </div>
            <div>
              <h2 className="text-sm text-muted">Mission</h2>
              <p className="mt-2 text-lg">To develop productive agricultural businesses by combining operational expertise, digital innovation and purpose-built infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="band bg-stone">
        <div className="shell">
          <h2 className="display display-m max-w-[14em]">We build capabilities, operate real projects and commercialize what works.</h2>
          <ol className="mt-12 grid grid-cols-2 border-l border-t border-graphite/25 md:grid-cols-3 xl:grid-cols-6">
            {operatingChain.map((step, i) => (
              <Reveal as="li" key={step} delay={i * 60} className="border-b border-r border-graphite/25 p-4 lg:p-6">
                <span className="small text-muted">{i + 1}</span>
                <p className="title mt-6 lg:mt-14">{step}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="verticals" className="band">
        <div className="shell">
          <h2 className="display display-m max-w-[14em]">Three capabilities, one integrated ecosystem.</h2>
          <div className="mt-12">
            {verticals.map((v) => (
              <article key={v.id} className="grid gap-x-8 gap-y-3 border-t border-line py-8 lg:grid-cols-12">
                <div className="flex items-center gap-3 lg:col-span-3">
                  <VerticalMark id={v.id} />
                  <h3 className="title">{v.name}</h3>
                </div>
                <p className="font-medium lg:col-span-3">{v.role}</p>
                <p className="lg:col-span-4">{v.body}</p>
                <p className="lg:col-span-2 lg:text-right"><TextLink to={v.to}>{v.cta}</TextLink></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band bg-stone">
        <div className="shell">
          <h2 className="display display-m max-w-[14em]">Long-term direction, stated plainly.</h2>
          <p className="mt-5 max-w-prose text-muted">We separate what operates today from what we are still building, and we will keep this page up to date as that changes.</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STATE.map((s) => (
              <div key={s.status}>
                <StatusLabel status={s.status} />
                <h3 className="title mt-4">{s.heading}</h3>
                <p className="mt-3">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band-sm">
        <div className="shell grid gap-6 lg:grid-cols-12">
          <h2 className="display display-m lg:col-span-5">{rooted.heading}</h2>
          <p className="lede lg:col-span-6 lg:col-start-7">{rooted.body}</p>
        </div>
      </section>

      <Partnerships />
    </>
  )
}
