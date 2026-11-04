#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Downloads the site's photographs and video into src/assets.
//
//   npm run media:fetch            fetch everything that is missing
//   npm run media:fetch -- --force fetch again, replacing existing files
//   npm run media:fetch -- --dry   list what would be fetched
//
// Sources and licences are in src/data/media.js and docs/media-plan.md.
// No dependencies: images are sized and converted to WebP by the Unsplash image
// CDN, so nothing needs installing. Exit code is 1 if anything failed; a failed
// slot simply keeps its drawn fallback on the site.
// ---------------------------------------------------------------------------

import { mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { media, video } from '../src/data/media.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PHOTOS = join(ROOT, 'src/assets/photos')
const VIDEO = join(ROOT, 'src/assets/video')
const WIDTHS = [960, 1920]
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,image/webp,*/*',
}

const force = process.argv.includes('--force')
const dry = process.argv.includes('--dry')

const exists = (p) => stat(p).then(() => true, () => false)

// Finds the photo's image CDN address. The download endpoint is preferred; the
// photo page's own preview tag is the fallback.
export async function resolveImage(id) {
  const res = await fetch(`https://unsplash.com/photos/${id}/download?force=true`, { headers: HEADERS, redirect: 'manual' })
  const location = res.headers.get('location')
  if (location?.includes('images.unsplash.com')) return location
  if (location?.includes('plus.unsplash.com')) throw new Error('Unsplash+ photo, not free to use')

  const page = await fetch(`https://unsplash.com/photos/${id}`, { headers: HEADERS })
  if (!page.ok) throw new Error(`photo page returned HTTP ${page.status}`)
  const html = await page.text()
  const match = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)
  const url = match?.[1]?.replaceAll('&amp;', '&')
  if (url?.includes('plus.unsplash.com')) throw new Error('Unsplash+ photo, not free to use')
  if (!url?.includes('images.unsplash.com')) throw new Error('no image address found on the photo page')
  return url
}

export function sized(source, width) {
  const url = new URL(source)
  for (const key of ['dl', 'h', 'crop', 'cs', 'ixlib', 'force']) url.searchParams.delete(key)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', '72')
  url.searchParams.set('fm', 'webp')
  url.searchParams.set('fit', 'max')
  return url.href
}

async function download(url, dest) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const type = res.headers.get('content-type') || ''
  if (!/^(image|video)\//.test(type) && !type.includes('octet-stream')) throw new Error(`unexpected content type ${type}`)
  const bytes = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, bytes)
  return bytes.length
}

const kb = (n) => `${Math.round(n / 1024)} KB`

async function main() {
  await mkdir(PHOTOS, { recursive: true })
  await mkdir(VIDEO, { recursive: true })
  const failed = []
  let fetched = 0

  for (const item of media) {
    const targets = WIDTHS.map((w) => ({ w, dest: join(PHOTOS, `${item.slot}-${w}.webp`) }))
    const todo = []
    for (const t of targets) if (force || !(await exists(t.dest))) todo.push(t)
    if (!todo.length) {
      console.log(`skip  ${item.slot} (already present)`)
      continue
    }
    if (dry) {
      console.log(`would fetch ${item.slot} from https://unsplash.com/photos/${item.id}`)
      continue
    }
    try {
      const source = await resolveImage(item.id)
      const sizes = []
      for (const t of todo) sizes.push(kb(await download(sized(source, t.w), t.dest)))
      fetched += 1
      console.log(`ok    ${item.slot} (${sizes.join(', ')})`)
    } catch (e) {
      failed.push(`${item.slot}: ${e.message}`)
      console.log(`FAIL  ${item.slot}: ${e.message}`)
    }
  }

  const clip = join(VIDEO, video.file)
  if (dry) console.log(`would fetch video from ${video.url}`)
  else if (!force && (await exists(clip))) console.log(`skip  ${video.file} (already present)`)
  else {
    try {
      console.log(`ok    ${video.file} (${kb(await download(video.url, clip))})`)
      fetched += 1
    } catch (e) {
      failed.push(`${video.file}: ${e.message}`)
      console.log(`FAIL  ${video.file}: ${e.message}`)
    }
  }

  console.log(`\n${fetched} fetched, ${failed.length} failed.`)
  if (failed.length) {
    console.log('Failed items keep their drawn fallback. See docs/media-plan.md to replace them by hand.')
    process.exitCode = 1
  } else if (fetched) {
    console.log('Next: npm run dev, review each photo, then git add src/assets and commit.')
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main()
