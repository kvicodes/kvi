import { Link } from 'react-router-dom'
import useDocumentMeta from '../lib/useDocumentMeta.js'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import { divisionLinks } from '../data/navigation.js'

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found', robots: 'noindex' })
  return (
    <Section tone="paper" className="flex min-h-[60vh] items-center">
      <div className="max-w-xl">
        <p className="eyebrow text-accent">404</p>
        <h1 className="mt-5 text-4xl sm:text-5xl">This page isn’t here.</h1>
        <p className="mt-5 text-lg text-ink-muted">
          The page may have moved, or the link may be out of date.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button to="/" withArrow>Back to home</Button>
          <Button to="/products" variant="secondary">Products</Button>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {divisionLinks.map((d) => (
            <li key={d.to}>
              <Link to={d.to} className="font-semibold link-underline">{d.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
