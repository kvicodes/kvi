import { Link } from 'react-router-dom'
import { Button, StatusLabel, TextLink, VerticalMark } from './ui.jsx'
import { adjacentProducts, productPath } from '../data/products.js'
import { partnerAudiences, contactPath } from '../data/contact.js'
import { statuses } from '../data/projects.js'
import { verticalById } from '../data/verticals.js'

/** First screen of every internal page. `art` sits behind the right side. */
export function PageHero({ title, lede, art, tone = 'dark', eyebrow, children }) {
  const dark = tone === 'dark'
  return (
    <section className={`relative overflow-hidden ${dark ? 'on-dark bg-field text-paper' : 'bg-stone text-graphite'}`}>
      {art && <div className="absolute inset-0">{art}</div>}
      {art && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: dark
              ? 'linear-gradient(0deg, rgb(var(--field)) 12%, rgb(var(--field) / 0.72) 55%, rgb(var(--field) / 0.3) 100%)'
              : 'linear-gradient(0deg, rgb(var(--stone)) 12%, rgb(var(--stone) / 0.8) 55%, rgb(var(--stone) / 0.3) 100%)',
          }}
        />
      )}
      <div className="shell relative flex min-h-[72svh] flex-col justify-end pb-12 pt-32 lg:min-h-[78svh] lg:pb-20">
        {eyebrow && <div className={`mb-5 flex items-center gap-3 text-base ${dark ? 'text-sage' : 'text-muted'}`}>{eyebrow}</div>}
        <h1 className="display display-l max-w-[13em]">{title}</h1>
        {lede && <p className="lede mt-6 max-w-[46ch]">{lede}</p>}
        {children}
      </div>
    </section>
  )
}

export function VerticalEyebrow({ id }) {
  const v = verticalById(id)
  return (
    <>
      <VerticalMark id={id} size={18} />
      <span>{v.name}: {v.category}</span>
    </>
  )
}

/** Reusable project entry. Fields with no verified value simply do not render. */
export function ProjectEntry({ project }) {
  const v = verticalById(project.vertical)
  return (
    <article className="grid gap-x-8 gap-y-3 border-t border-line py-8 lg:grid-cols-12 lg:py-10">
      <div className="lg:col-span-5">
        <StatusLabel status={project.status} />
        <h3 className="title mt-4">{project.title}</h3>
      </div>
      <div className="lg:col-span-4">
        <p>{project.description}</p>
        {project.location && <p className="small mt-3 text-muted">{project.location}</p>}
        {project.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {project.images.map((img) => (
              <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 lg:col-span-3 lg:items-end lg:text-right">
        <p className="small text-muted">{project.category}</p>
        <p className="small inline-flex items-center gap-2 text-muted">
          <VerticalMark id={v.id} size={13} />
          {v.name}
        </p>
        {project.link && (
          <p className="mt-3 text-base">
            <TextLink to={project.link.to}>{project.link.label}</TextLink>
          </p>
        )}
      </div>
    </article>
  )
}

export function StatusKey() {
  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(statuses).map(([key, s]) => (
        <div key={key}>
          <dt><StatusLabel status={key} /></dt>
          <dd className="small mt-2 text-muted">{s.meaning}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Non-agricultural portfolio, as a table: it is reference information. */
export function Portfolio({ onDark = false }) {
  const rule = onDark ? 'border-line-dark' : 'border-line'
  const soft = onDark ? 'text-sage' : 'text-muted'
  return (
    <ul className={`border-b ${rule}`}>
      {adjacentProducts.map((p) => (
        <li key={p.id} className={`grid gap-x-6 gap-y-1 border-t py-5 ${rule} lg:grid-cols-12 lg:items-baseline`}>
          <div className="title lg:col-span-3">
            {p.listed ? <Link to={productPath(p)} className="hover:underline hover:decoration-1 hover:underline-offset-4">{p.name}</Link> : p.name}
          </div>
          <p className={`text-base lg:col-span-3 ${soft}`}>{p.category}</p>
          <p className="text-base lg:col-span-4">{p.summary}</p>
          <p className="small mt-1 lg:col-span-2 lg:mt-0 lg:text-right">
            {p.listed ? (
              <a href={p.url} target="_blank" rel="noreferrer noopener" className="tlink" aria-label={`${p.name} website`}>Visit website</a>
            ) : (
              <span className={soft}>Site not currently public</span>
            )}
          </p>
        </li>
      ))}
    </ul>
  )
}

export function Partnerships() {
  return (
    <section id="partner" className="band bg-stone">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="display display-l">Let's build something that grows.</h2>
          <Button to="/contact" className="mt-10">Start a Conversation</Button>
        </div>
        <ul className="lg:col-span-4 lg:col-start-9 lg:pt-3">
          {partnerAudiences.map((a) => (
            <li key={a.title} className="border-t border-graphite/25 last:border-b">
              <Link to={contactPath(a.enquiry)} className="block py-3 transition-[padding] duration-300 hover:pl-2 hover:text-copper">
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
