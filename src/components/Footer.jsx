import { Link } from 'react-router-dom'
import { footerNav } from '../data/navigation.js'
import { company, whatsappUrl } from '../data/company.js'
import Wordmark from './Wordmark.jsx'
import Icon from './Icon.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-forest-deep text-paper" data-tone="dark">
      <div className="shell py-section-sm">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark tone="dark" />
            <p className="mt-6 max-w-xs text-sm text-paper/65">{company.summary}</p>
            <address className="mt-6 space-y-2.5 text-sm not-italic text-paper/70">
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 transition-colors hover:text-paper">
                <Icon name="mail" size={15} />
                <span className="link-underline">{company.email}</span>
              </a>
              <a href={`tel:${company.phoneE164}`} className="flex items-center gap-2 transition-colors hover:text-paper">
                <Icon name="phone" size={15} />
                {company.phone}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 transition-colors hover:text-paper"
              >
                <Icon name="chat" size={15} />
                WhatsApp
              </a>
              <span className="flex items-center gap-2 text-paper/55">
                <Icon name="pin" size={15} />
                {company.origin}, {company.region}
              </span>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-grain">
                  {col.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-paper/70 transition-colors hover:text-paper">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName} All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>KVI Greens</span>
            <span aria-hidden="true">·</span>
            <span>KV Infra</span>
            <span aria-hidden="true">·</span>
            <span>KVI Tech</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
