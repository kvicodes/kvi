import { Link } from 'react-router-dom'
import Icon from './icons.jsx'
import SocialIcon from './SocialIcon.jsx'
import { company, nav, verticals, footer, contact } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-sand-100">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-700 font-heading text-base font-bold text-white">
                KVI
              </span>
              <span className="font-heading text-sm font-semibold text-white">{company.shortName}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-sand-100/70">{footer.tagline}</p>

            {/* Placeholder social icons — update hrefs in src/data/content.js */}
            <div className="mt-5 flex gap-3">
              {footer.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sand-100/80 transition-colors hover:border-teal-400 hover:text-teal-300"
                >
                  <SocialIcon name={item.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              {footer.quickLinksHeading}
            </h3>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-sand-100/70 hover:text-teal-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verticals */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              {footer.verticalsHeading}
            </h3>
            <ul className="mt-4 space-y-3">
              {verticals.map((v) => (
                <li key={v.slug}>
                  <Link to={`/services/${v.slug}`} className="text-sm text-sand-100/70 hover:text-teal-300">
                    {v.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              {footer.contactHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-sand-100/70">
              <li className="flex items-start gap-2">
                <Icon name="MapPin" className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span>{contact.details.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" className="h-4 w-4 shrink-0 text-teal-400" />
                <span>{contact.details.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" className="h-4 w-4 shrink-0 text-teal-400" />
                <span>{contact.details.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-sand-100/50">
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}
