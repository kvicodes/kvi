import useDocumentMeta from '../lib/useDocumentMeta.js'
import { Button } from '../components/ui.jsx'

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found', description: 'This page does not exist.', robots: 'noindex' })
  return (
    <section className="band pt-32 lg:pt-40">
      <div className="shell">
        <h1 className="display display-l">Page not found.</h1>
        <p className="lede mt-6 max-w-[40ch]">This address does not exist on our site. It may have moved.</p>
        <Button to="/" className="mt-8">Go to the homepage</Button>
      </div>
    </section>
  )
}
