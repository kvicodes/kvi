import { PageHero, Partnerships } from '../components/shared.jsx'
import { Button, TextLink } from '../components/ui.jsx'
import { contactPath } from '../data/contact.js'
import { sustainability, sustainabilityNote } from '../data/company.js'
import { techCapabilities } from '../data/verticals.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

// Every statement here restates something already published elsewhere on the
// site. `techCapabilities` carries the Live / Research state of each software
// capability, so this page cannot claim more than the Tech page does.
const stateOf = (title) => techCapabilities.find((c) => c.title === title)?.state

const areas = [
  {
    id: 'software',
    title: 'Software innovation',
    body: 'We build software for operations we understand, then test it against real farm and business work. Farm management, billing, education, brick kiln and contractor products are live today.',
    items: ['Farm management software', 'Agricultural ERP solutions', 'Inventory and resource management'],
    link: { to: '/products', label: 'See the product portfolio' },
  },
  {
    id: 'automation',
    title: 'Automation',
    body: 'Farm automation and IoT-based smart farming are areas we are studying. They are research, not products, and nothing here is offered for sale.',
    items: ['Farm automation', 'IoT and smart farming', 'Digital farm monitoring'],
  },
  {
    id: 'ai',
    title: 'Applied AI',
    body: 'AI-powered agricultural applications are at the research stage. We will describe them as products only when they exist and work.',
    items: ['AI-powered agricultural applications', 'Agricultural supply-chain technology'],
  },
]

export default function Innovation() {
  useDocumentMeta(seo.innovation)
  return (
    <>
      <PageHero
        title="Innovation grounded in real operations."
        lede="We build and test technology where agriculture, infrastructure and software meet, and we say plainly what is live and what is still research."
      />

      <section className="band">
        <div className="shell">
          {areas.map((a) => (
            <article key={a.id} id={a.id} className="grid gap-x-8 gap-y-4 border-t border-line py-10 lg:grid-cols-12">
              <h2 className="display display-m lg:col-span-5">{a.title}</h2>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="lede">{a.body}</p>
                <ul className="mt-6">
                  {a.items.map((i) => (
                    <li key={i} className="flex items-baseline justify-between gap-4 border-t border-line py-2.5">
                      <span>{i}</span>
                      <span className="small text-muted">{stateOf(i)}</span>
                    </li>
                  ))}
                </ul>
                {a.link && <p className="mt-6"><TextLink to={a.link.to}>{a.link.label}</TextLink></p>}
              </div>
            </article>
          ))}

          <article id="agriculture" className="grid gap-x-8 gap-y-4 border-t border-line py-10 lg:grid-cols-12">
            <h2 className="display display-m lg:col-span-5">Agricultural innovation</h2>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="lede">KVI Greens and KVI Infra develop integrated farms, from planning and structures to operations and value addition. Current work and its status is listed on the projects page.</p>
              <p className="mt-6"><TextLink to="/projects">Projects and initiatives</TextLink></p>
            </div>
          </article>

          <article id="sustainability" className="grid gap-x-8 gap-y-4 border-t border-line py-10 lg:grid-cols-12">
            <h2 className="display display-m lg:col-span-5">Sustainable development</h2>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul>
                {sustainability.map((s) => (
                  <li key={s.title} className="border-t border-line py-3">
                    <h3 className="font-medium">{s.title}</h3>
                    <p className="text-muted">{s.body}</p>
                  </li>
                ))}
              </ul>
              <p className="small mt-4 text-muted">{sustainabilityNote}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="band-sm bg-stone">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <h2 className="display display-m max-w-[18em]">Working on something that fits?</h2>
          <Button to={contactPath('technology')}>Talk to KVI Tech</Button>
        </div>
      </section>
      <Partnerships />
    </>
  )
}
