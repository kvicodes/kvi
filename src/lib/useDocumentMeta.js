import { useEffect } from 'react'
import { company } from '../data/company.js'
import { fullTitle } from '../data/seo.js'

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
 * Per-route document metadata without a helmet dependency. Takes an entry from
 * data/seo.js, or the same shape. `jsonLd` adds page-level structured data.
 */
export default function useDocumentMeta({ title, description, path, robots, jsonLd } = {}) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const full = fullTitle(title)
    document.title = full

    const desc = description || company.summary
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', full)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[name="twitter:title"]', 'content', full)
    setMeta('meta[name="twitter:description"]', 'content', desc)
    setMeta('meta[name="robots"]', 'content', robots || 'index, follow')

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

    if (ld) {
      const node = document.createElement('script')
      node.type = 'application/ld+json'
      node.dataset.page = 'true'
      node.textContent = ld
      document.head.appendChild(node)
      return () => node.remove()
    }
  }, [title, description, path, robots, ld])
}
