import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SitePlan from '../components/SitePlan.jsx'
import Photo, { FieldFilm } from '../components/Photo.jsx'
import { StageFrame } from '../components/Drawings.jsx'
import { Button, Reveal, TextLink, VerticalMark } from '../components/ui.jsx'
import { Partnerships, Portfolio, ProjectEntry } from '../components/shared.jsx'
import { buildStages, company, focusAreas, sustainability, sustainabilityNote, valueChain } from '../data/company.js'
import { agriProduct } from '../data/products.js'
import { projects } from '../data/projects.js'
import { verticals, verticalById } from '../data/verticals.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'
import useMediaQuery from '../lib/useMediaQuery.js'

function Hero() {
  return (
    <section className="on-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-field text-paper">
      {/* Phone: the plan is its own band above the text. Desktop: full bleed. */}
      <div className="relative h-[36svh] shrink-0 lg:absolute lg:inset-0 lg:h-auto">
        <SitePlan animate title="Illustrative site plan of an integrated farm with fields, ponds, roads, buildings and a monitoring network" className="lg:hidden" viewBox="240 120 880 700" />
        <SitePlan animate className="hidden -scale-x-100 lg:block" />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(180deg, rgb(var(--field) / 0.5) 0%, rgb(var(--field) / 0.12) 26%, rgb(var(--field) / 0.3) 52%, rgb(var(--field) / 0.93) 94%)' }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-field to-transparent lg:hidden" />
      </div>

      <div className="shell relative flex flex-1 flex-col justify-end pb-8 pt-6 lg:pb-10">
        <p className="text-sm tracking-[0.14em] text-paper/85 lg:text-base">KAIMUR VALLEY INNOVATIONS</p>
        <h1 className="display display-xl mt-3">
          Building the<br />future of<br />farming.
        </h1>
        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:items-end">
          <p className="lede lg:col-span-6">
            We bring together agricultural operations, digital innovation and infrastructure development to build a more productive, connected and sustainable agricultural ecosystem.
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <Button to="/#ecosystem" variant="solid-light" className="max-sm:px-4">Explore Our Ecosystem</Button>
            <Button to="/about" variant="line-light" className="max-sm:px-4">Discover KVI</Button>
          </div>
        </div>
        <p className="small mt-5 text-sage/80">Illustrative site plan, not a KVI project.</p>
      </div>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="band">
      <div className="shell">
        <h2 className="display display-l max-w-[11em]">Agriculture is more than production.</h2>
        <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-12">
          <div className="lede space-y-5 lg:col-span-4">
            <p>We believe the future of agriculture lies in integrating the physical, operational and digital foundations of farming.</p>
            <p className="text-muted">KVI brings these capabilities together to develop agricultural businesses that are productive, efficient and commercially sustainable.</p>
          </div>
          {/* Each stage stands on the one before it, so the column steps inward. */}
          <ol className="lg:col-span-7 lg:col-start-6">
            {valueChain.map((step, i) => (
              <Reveal as="li" key={step.word} delay={i * 70} className="border-t border-line py-4 last:border-b">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between" style={{ paddingLeft: `${i * 6}%` }}>
                  <span className="font-serif text-[clamp(2.2rem,4.4vw,4.25rem)] leading-none">{step.word}</span>
                  <span className="small text-muted md:max-w-[24ch] md:text-right">{step.note}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

const VERTICAL_STYLE = {
  greens: 'text-olive',
  tech: 'text-graphite',
  infra: 'text-copper',
}

function VerticalPanel({ v, innerRef, index, compact }) {
  return (
    <article ref={innerRef} data-index={index} className={compact ? 'border-t border-line py-10' : 'flex min-h-[74vh] flex-col justify-center'}>
      {compact && (
        <div className="-mx-4 mb-7 aspect-[4/3] bg-stone sm:-mx-6">
          <SitePlan tone="light" active={v.layer} viewBox="280 150 800 600" title={`Illustrative site plan with the ${v.name} layer highlighted: ${v.planNote.toLowerCase()}`} />
        </div>
      )}
      <div className={`flex items-center gap-3 ${VERTICAL_STYLE[v.id]}`}>
        <VerticalMark id={v.id} />
        <span className="text-lg font-medium">{v.name}</span>
      </div>
      <h3 className="title mt-4 text-[clamp(2rem,3.4vw,3.25rem)]">{v.tagline}</h3>
      <p className="mt-4 max-w-[44ch]">{v.body}</p>
      <p className="mt-6"><TextLink to={v.to}>{v.cta}</TextLink></p>
    </article>
  )
}

/**
 * One piece of land, three layers. As the reader scrolls each vertical brings
 * its layer forward on the same drawing, and the last panel shows all three
 * together. That is the point being made: same site, three capabilities.
 */
function Ecosystem() {
  const wide = useMediaQuery('(min-width: 1024px)')
  const [active, setActive] = useState(0)
  const panels = useRef([])

  useEffect(() => {
    if (!wide) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.dataset.index))
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    panels.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [wide])

  const current = verticals[active]

  return (
    <section id="ecosystem" className="band bg-paper pb-0">
      <div className="shell">
        <h2 className="display display-l max-w-[11em]">Three capabilities. One agricultural ecosystem.</h2>

        {!wide && (
          <div className="mt-12">
            {verticals.map((v) => <VerticalPanel key={v.id} v={v} compact />)}
          </div>
        )}

        {wide && (
          <div className="mt-6 grid grid-cols-12 gap-10">
            <div className="col-span-5">
              {verticals.map((v, i) => (
                <VerticalPanel key={v.id} v={v} index={i} innerRef={(el) => (panels.current[i] = el)} />
              ))}
              <div ref={(el) => (panels.current[3] = el)} data-index={3} className="flex min-h-[74vh] flex-col justify-center">
                <h3 className="title text-[clamp(2rem,3.4vw,3.25rem)]">The same land, working as one operation.</h3>
                <p className="mt-4 max-w-[44ch]">Greens decides what the land should produce. Infra builds what that production needs. Tech keeps every unit measured and managed.</p>
              </div>
            </div>
            <div className="col-span-7">
              <div className="sticky top-[12vh] h-[76vh] overflow-hidden bg-stone">
                <SitePlan tone="light" active={current ? current.layer : 'all'} title="Illustrative site plan showing Greens, Tech and Infra as layers of one farm" />
                <p className="small absolute bottom-0 left-0 bg-stone px-4 py-3 text-muted">
                  {current ? `${current.name}: ${current.planNote.toLowerCase()}` : 'All three layers on one illustrative site'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function HowWeBuild() {
  return (
    <section className="on-dark band mt-16 bg-field text-paper lg:mt-24">
      <div className="shell">
        <h2 className="display display-l max-w-[11em]">From land to a fully operational farm.</h2>
      </div>
      <ol className="rail shell mt-12 flex gap-5 overflow-x-auto pb-4 max-md:flex-col max-md:overflow-visible lg:mt-16 xl:grid xl:grid-cols-6 xl:overflow-visible">
        {buildStages.map((s, i) => (
          <li key={s.no} className="flex shrink-0 gap-4 md:w-56 md:flex-col xl:w-auto">
            <div className="w-24 shrink-0 md:w-full"><StageFrame stage={i + 1} /></div>
            <div>
              <p className="small text-sage">Step {s.no}</p>
              <h3 className="title md:mt-1">{s.title}</h3>
              <p className="small mt-2 text-paper/80">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function FocusAreas() {
  const [active, setActive] = useState(0)
  return (
    <section className="band">
      <div className="shell">
        <h2 className="display display-l max-w-[12em]">Building across the agricultural value chain.</h2>
        <p className="mt-6 max-w-prose text-muted">
          These are the areas KVI works in and is building towards. They show the direction of our activity, and not every area operates commercially today.
        </p>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-6">
            {focusAreas.map((area, i) => (
              <li key={area.title} className="border-t border-line last:border-b">
                <div
                  onMouseEnter={() => setActive(i)}
                  className="flex items-center gap-4 py-3 lg:py-2.5"
                >
                  <Photo slot={area.slot} sizes="96px" className="h-16 w-20 shrink-0 lg:hidden" />
                  <Link
                    to={verticalById(area.vertical).to}
                    onFocus={() => setActive(i)}
                    className={`font-serif text-[clamp(1.5rem,2.4vw,2.35rem)] leading-tight transition-colors duration-200 ${active === i ? 'lg:text-copper' : ''}`}
                  >
                    {area.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="sticky top-28">
              <Photo key={focusAreas[active].slot} slot={focusAreas[active].slot} sizes="40vw" className="page-enter aspect-[4/5]" />
              <p className="small mt-3 text-muted">Illustrative: {focusAreas[active].title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Technology() {
  return (
    <section className="on-dark band bg-field text-paper">
      <div className="shell">
        <h2 className="display display-l max-w-[10em]">Technology that works behind the farm.</h2>
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="lede">KVI Tech builds the digital systems behind KVI's agricultural operations, and for other agricultural businesses.</p>
            <p className="mt-4 text-sage">Some KVI Tech products serve adjacent industries. FarmGrid is the agricultural platform.</p>
            <p className="mt-6"><TextLink to="/tech">Explore KVI Tech</TextLink></p>
          </div>
          <div className="bg-field-raised p-6 lg:col-span-7 lg:p-10">
            <p className="small text-rice">{agriProduct.category}</p>
            <h3 className="display display-m mt-2">{agriProduct.name}</h3>
            <p className="mt-4 max-w-[52ch]">{agriProduct.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={agriProduct.url} external variant="solid-light" aria-label="FarmGrid website">Visit FarmGrid</Button>
              <Button to="/products/farmgrid" variant="line-light">Product details</Button>
            </div>
          </div>
        </div>
        <h3 className="title mt-16 lg:mt-24">Technology portfolio</h3>
        <div className="mt-6"><Portfolio onDark /></div>
      </div>
    </section>
  )
}

function Sustainability() {
  return (
    <section>
      <FieldFilm className="aspect-[16/10] max-h-[78vh] w-full lg:aspect-[21/9]" />
      <div className="band shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="display display-m">Building productive systems for the long term.</h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="grid gap-x-8 sm:grid-cols-2">
            {sustainability.map((s) => (
              <div key={s.title} className="border-t border-line py-4">
                <dt className="font-medium">{s.title}</dt>
                <dd className="small mt-1 text-muted">{s.body}</dd>
              </div>
            ))}
          </dl>
          <p className="small mt-6 text-muted">{sustainabilityNote}</p>
        </div>
      </div>
    </section>
  )
}

function Initiatives() {
  return (
    <section className="band pt-0">
      <div className="shell">
        <h2 className="display display-l max-w-[11em]">Our work. Our initiatives. Our direction.</h2>
        <div className="mt-12">
          {projects.slice(0, 4).map((p) => <ProjectEntry key={p.slug} project={p} />)}
        </div>
        <p className="mt-6"><TextLink to="/projects">View all projects and initiatives</TextLink></p>
      </div>
    </section>
  )
}

export default function Home() {
  useDocumentMeta({
    ...seo.home,
    description: seo.home.description,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: company.name,
      url: `${company.domain}/`,
    },
  })
  return (
    <>
      <Hero />
      <Philosophy />
      <Ecosystem />
      <HowWeBuild />
      <FocusAreas />
      <Technology />
      <Sustainability />
      <Initiatives />
      <Partnerships />
    </>
  )
}
