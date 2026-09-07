import { Link } from 'react-router-dom'
import { footerNav } from '../data/navigation.js'
import { company } from '../data/company.js'
import Wordmark from './Wordmark.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/12 bg-ink text-paper">
      <div className="shell py-section-sm">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark tone="dark" />
            <p className="mt-6 max-w-xs text-sm text-paper/60">
              {company.summary}
            </p>
            <p className="mt-6 text-sm text-paper/60">
              <a href={`mailto:${company.email}`} className="link-underline hover:text-paper">
                {company.email}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/45">
                  {col.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-sm text-paper/70 transition-colors hover:text-paper"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-sm text-paper/70 transition-colors hover:text-paper"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/12 pt-8 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Kaimur Valley Innovations. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>KVI Infra</span>
            <span aria-hidden="true">·</span>
            <span>Kaimur Farms</span>
            <span aria-hidden="true">·</span>
            <span>KVI Tech</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
