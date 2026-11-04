#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Post-build step. The site is a single-page app, so one index.html serves every
// route. Crawlers and link previews that do not run JavaScript would all see the
// homepage's title. This writes dist/<route>/index.html for each known route with
// that route's title, description, canonical URL and Open Graph tags. nginx
// serves these through `try_files $uri $uri/`. dist/index.html stays as it is: it
// is also the fallback for unknown paths, so it carries no canonical URL.
// ---------------------------------------------------------------------------

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { company } from '../src/data/company.js'
import { fullTitle, seo } from '../src/data/seo.js'
import { productPath, products } from '../src/data/products.js'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '../dist')
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

const pages = [
  ...Object.values(seo).filter((p) => p.path !== '/'),
  ...products.map((p) => ({ path: productPath(p), title: `${p.name}: ${p.category}`, description: p.summary })),
]

const template = await readFile(join(DIST, 'index.html'), 'utf8')

const metaContent = (html, attr, name, value) =>
  html.replace(new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`), `$1${esc(value)}$2`)

for (const page of pages) {
  const title = fullTitle(page.title)
  const url = `${company.domain}${page.path}`
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
  html = metaContent(html, 'name', 'description', page.description)
  html = metaContent(html, 'property', 'og:title', title)
  html = metaContent(html, 'property', 'og:description', page.description)
  html = metaContent(html, 'name', 'twitter:title', title)
  html = metaContent(html, 'name', 'twitter:description', page.description)
  html = html.replace(
    '</head>',
    `  <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n    <meta name="robots" content="${page.robots || 'index, follow'}" />\n  </head>`,
  )
  const dir = join(DIST, page.path.slice(1))
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'index.html'), html)
}

console.log(`prerender-meta: wrote ${pages.length} route files`)
