import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { VerticalMark } from './ui.jsx'
import { company, photoNote, whatsappUrl } from '../data/company.js'
import { footerNav } from '../data/navigation.js'
import { verticals } from '../data/verticals.js'

export default function Footer() {
  return (
    <footer className="on-dark bg-field text-paper">
      <div className="shell pb-10 pt-16 lg:pt-24">
        <p className="display display-l max-w-[12em]">{company.tagline}</p>

        <div className="mt-14 grid gap-12 border-t border-line-dark pt-10 md:grid-cols-12 lg:mt-24">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-5 max-w-[34ch] text-base text-sage">{company.legalName}</p>
            <p className="text-base text-sage">{company.region}</p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-sm text-sage">Navigation</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {footerNav.map((l) => (
                <li key={l.to}><Link to={l.to} className="hover:text-rice">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-sm text-sage">Verticals</h2>
            <ul className="mt-4 space-y-2">
              {verticals.map((v) => (
                <li key={v.id}>
                  <Link to={v.to} className="inline-flex items-center gap-2.5 hover:text-rice">
                    <VerticalMark id={v.id} size={14} />
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm text-sage">Contact</h2>
            <ul className="mt-4 space-y-2">
              <li><a href={`mailto:${company.email}`} className="break-all hover:text-rice">{company.email}</a></li>
              <li><a href={`tel:${company.phoneE164}`} className="hover:text-rice">{company.phone}</a></li>
              <li><a href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="hover:text-rice">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-dark pt-6 text-sm text-sage lg:flex-row lg:items-center lg:justify-between">
          <p>{photoNote}</p>
          <p className="flex shrink-0 gap-6">
            <Link to="/privacy" className="hover:text-rice">Privacy</Link>
            <Link to="/terms" className="hover:text-rice">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
