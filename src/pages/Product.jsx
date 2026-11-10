import { useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import { Button, TextLink } from '../components/ui.jsx'
import { PageHero } from '../components/shared.jsx'
import { contactPath } from '../data/contact.js'
import { company } from '../data/company.js'
import { productBySlug, productPath } from '../data/products.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'
import billgridDesktopIcon from '../assets/billgrid-desktop-icon.png'

const DESKTOP_ICONS = { billgrid: billgridDesktopIcon }

/** Windows download for products that ship a desktop launcher (data: `desktopApp`). */
function DesktopDownload({ product: p }) {
  const d = p.desktopApp
  const facts = [
    ['Version', `${d.version} · released ${d.released}`],
    ['Platform', d.platform],
    ['Download', d.format],
    ['File size', d.size],
  ]
  return (
    <section id="desktop" aria-labelledby="desktop-title" className="band bg-stone">
      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-4">
            {DESKTOP_ICONS[p.id] && (
              <img src={DESKTOP_ICONS[p.id]} alt="" width="56" height="56" className="h-14 w-14 rounded-xl" />
            )}
            <h2 id="desktop-title" className="display display-m">{d.name}</h2>
          </div>
          <p className="lede mt-6">
            {d.name} gives {p.name} its own Windows application window, with a desktop shortcut and a Start Menu
            entry. It opens the same {p.name} web application, so it needs an internet connection, and you sign in
            with your existing {p.name} account. Your data stays in {p.name}.
          </p>
          <dl className="mt-8 grid gap-x-8 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-line py-3">
                <dt className="small text-muted">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={d.href}
              download
              type="application/zip"
              aria-label={`Download ${d.name} ${d.version} for Windows (ZIP, ${d.size})`}
            >
              Download for Windows
            </Button>
            <span className="small text-muted">ZIP · {d.size} · Windows 64-bit</span>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h3 className="text-sm text-muted">Install</h3>
          <ol className="mt-3 list-decimal space-y-2 border-t border-line pl-5 pt-3">
            <li>Download the ZIP.</li>
            <li>Extract the archive.</li>
            <li>Run <span className="break-all font-medium">{d.installer}</span>.</li>
            <li>Follow the installer instructions.</li>
            <li>Launch {d.name} and sign in with your existing {p.name} account.</li>
          </ol>
          <p className="small mt-6 text-muted">
            The installer is not yet code-signed, so Windows SmartScreen may show a warning before it runs. Make sure
            the file came from kvinnovations.in, then choose More info and Run anyway. Keep Windows security
            features switched on.
          </p>
          <p className="small mt-4 text-muted">
            SHA-256 of {d.installer}:{' '}
            <code className="break-all text-graphite">{d.installerSha256}</code>
          </p>
        </div>
      </div>
    </section>
  )
}

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
              {p.desktopApp && <Button href="#desktop" variant="line-dark">Windows app</Button>}
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

        {!p.desktopApp && <p className="shell mt-14"><TextLink to="/products">All KVI Tech products</TextLink></p>}
      </section>

      {p.desktopApp && (
        <>
          <DesktopDownload product={p} />
          <p className="shell band-sm"><TextLink to="/products">All KVI Tech products</TextLink></p>
        </>
      )}
    </>
  )
}

export default function Product() {
  const { slug } = useParams()
  const product = productBySlug(slug)
  return product ? <ProductView product={product} /> : <NotFound />
}
