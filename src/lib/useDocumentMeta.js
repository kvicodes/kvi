import { useEffect } from 'react'
import { company } from '../data/company.js'

const BASE_TITLE = 'Kaimur Valley Innovations'

function setMeta(selector, attr, value) {
  if (!value) return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, name] = selector.match(/\[(?:name|property)="(.+)"\]/) || []
    if (selector.includes('property=')) el.setAttribute('property', name)
    else el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/**
 * Per-route document metadata without a helmet dependency.
 * Pass a page title (composed with the brand), description, and path.
 */
export default function useDocumentMeta({ title, description, path } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | ${company.positioning}`
    document.title = fullTitle

    const desc = description || company.summary
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', desc)

    if (path) {
      const url = `${company.domain}${path}`
      setMeta('meta[property="og:url"]', 'content', url)
      let canonical = document.head.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', url)
    }
  }, [title, description, path])
}
