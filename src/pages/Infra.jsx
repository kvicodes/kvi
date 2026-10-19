import { Link } from 'react-router-dom'
import useDocumentMeta from '../lib/useDocumentMeta.js'
import PageHeader from '../components/PageHeader.jsx'
import Section from '../components/Section.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import BusinessGlyph from '../components/BusinessGlyph.jsx'
import ActivityGrid from '../components/ActivityGrid.jsx'
import ProductMark from '../components/ProductMark.jsx'
import ContactCtaSection from '../sections/ContactCtaSection.jsx'
import { byId } from '../data/businesses.js'
import { productBySlug, productPath } from '../data/products.js'
import { contactPath } from '../data/contact.js'

const PRINCIPLES = [
  {
    title: 'Practical specification',
    body: 'Designs matched to the site, the budget and local conditions — not to a template.',
  },
  {
    title: 'Disciplined execution',
    body: 'Clear scope, measured progress and documented work through every stage of a project.',
  },
  {
    title: 'Built to keep working',
    body: 'Maintainable systems and construction intended to perform long after handover.',
  },
]

export default function Infra() {
  const b = byId('kv-infra')
  const related = ['contractoros', 'bhattagrid'].map(productBySlug).filter(Boolean)

  useDocumentMeta({
    title: 'KV Infra — Infrastructure & project execution',
    description:
      'KV Infra is the infrastructure arm of Kaimur Valley Innovations, focused on construction, infrastructure development and project execution, including farm development, irrigation, storage and site works.',
    path: '/infra',
  })

  return (
    <>
      <PageHeader
        tone="ink"
        eyebrow={`KV Infra · ${b.discipline}`}
        title="The infrastructure arm of KVI."
        lede={b.summary}
        figure={
          <span className="text-paper">
            <BusinessGlyph id={b.id} size={340} />
          </span>
        }
        actions={
          <Button to={contactPath('infrastructure')} variant="inverse" withArrow>
            Discuss a project
          </Button>
        }
      />

      <Section tone="paper">
        <SectionHeading
          eyebrow="Capability areas"
          heading="Where KV Infra works."
          intro="The areas KV Infra is set up to plan and execute. These describe capability — completed projects are listed separately, only once delivered."
        />
        <ActivityGrid division={b.id} items={b.activities} label="KV Infra capability areas" />
      </Section>

      <Section tone="sunken" divide>
        <SectionHeading eyebrow="How we work" heading="Execution-first, with a long-term view." />
        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="bg-paper-raised p-8">
              <span className="font-display text-xs tabular-nums text-infra">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="paper" divide>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow accent-tick text-accent">Infrastructure for agriculture</p>
            <h2 className="text-3xl sm:text-4xl">The physical foundation for KVI Greens — and for other clients.</h2>
            <p className="mt-6 max-w-prose text-lg text-ink-muted">
              Farm development, irrigation, farm buildings and storage are where infrastructure and
              agriculture meet. KV Infra executes that work for farms partnering with KVI Greens, and
              takes on infrastructure and construction works for other clients.
            </p>
            <div className="mt-8">
              <Link to="/greens" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] link-underline">
                KVI Greens
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-5 lg:col-start-8">
            <div className="h-full border border-dashed border-line-strong bg-paper-sunken bg-blueprint p-8">
              <p className="eyebrow">Projects</p>
              <p className="mt-4 font-serif text-2xl font-medium">Project records will be published as work is delivered.</p>
              <p className="mt-3 text-sm text-ink-muted">
                KVI lists only completed, documented work here. For current capability and
                availability, contact KV Infra directly.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="sunken" divide>
          <SectionHeading
            eyebrow="Related technology"
            heading="Software for construction and building-materials operations."
            intro="KVI Tech builds software for the kind of work infrastructure businesses do every day."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {related.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 80}>
                <Link
                  to={productPath(p)}
                  className="group flex h-full items-start gap-5 border border-line bg-paper-raised p-7 transition duration-300 ease-editorial hover:-translate-y-1 hover:border-ink/40 hover:shadow-card"
                >
                  <ProductMark id={p.id} className="shrink-0 text-tech" />
                  <span className="flex flex-col">
                    <span className="font-display text-xl font-semibold">{p.name}</span>
                    <span className="mt-1 text-sm font-medium text-ink-soft">{p.category}</span>
                    <span className="mt-2 text-sm text-ink-muted">{p.summary}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <ContactCtaSection
        heading="Planning infrastructure work?"
        body="Talk to KV Infra about construction, infrastructure development or project execution."
        to={contactPath('infrastructure')}
        cta="Contact KV Infra"
      />
    </>
  )
}
