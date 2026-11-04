// ---------------------------------------------------------------------------
// Local acceptance suite for the KVI website (Playwright library, headless
// Chromium). Deterministic: every request to another host is answered with an
// empty stub, so results never depend on the live product sites being
// reachable. Fonts and media are self-hosted. External product links are
// checked for their href only, never fetched.
//
//   npm run build && npm run test:e2e            # serves dist/ via vite preview
//   BASE_URL=http://127.0.0.1:18080 npm run test:e2e   # e.g. a Docker build
//
// First run on a new machine: `npx playwright install chromium`.
// Exit code is non-zero on any failure.
// ---------------------------------------------------------------------------

import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const PREVIEW_PORT = 4317
let BASE = process.env.BASE_URL
let preview

const ROUTES = [
  '/', '/about', '/greens', '/infra', '/tech', '/projects', '/products',
  '/products/farmgrid', '/products/billgrid', '/products/campusgrid',
  '/products/bhattagrid', '/products/contractoros', '/insights', '/contact',
  '/privacy', '/terms',
]
const NOT_FOUND = ['/products/buildgrid', '/products/famgrid', '/does-not-exist']
const KNOWN = new Set(ROUTES)
const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
}
// The site loads nothing from third parties (the Privacy page says so).
const ALLOWED_THIRD_PARTY = new Set()
const LIVE_PRODUCT_LINKS = ['farmgrid', 'billgrid', 'campusgrid', 'bhattagrid', 'contractoros']
  .map((p) => `https://${p}.kvinnovations.in/`)
// Unverified claims that must not appear on the site (see docs/content-claims.md).
const FORBIDDEN_TEXT = [/Mokari Premium/i, /Mokari brand/i, /\bModi\b/, /Ayodhya/i, /Ram Lalla/i, /KV Infra/, /AgroTech/, /verified carbon/i, /certified/i]

const results = []
const fail = (msg) => results.push(`FAIL ${msg}`)
const ok = (msg) => results.push(`ok   ${msg}`)
const check = (cond, good, bad) => (cond ? ok(good) : fail(bad))
const thirdPartyHosts = new Set()

async function startPreview() {
  preview = spawn('npx', ['vite', 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  BASE = `http://localhost:${PREVIEW_PORT}`
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(BASE)).ok) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error('vite preview did not start (did you run `npm run build`?)')
}

async function newContext(browser, opts) {
  const ctx = await browser.newContext(opts)
  const origin = new URL(BASE).host
  await ctx.route('**/*', (route) => {
    const url = new URL(route.request().url())
    if (url.host === origin || url.protocol === 'data:') return route.continue()
    thirdPartyHosts.add(url.host)
    return route.fulfill({ status: 200, contentType: 'application/octet-stream', body: '' })
  })
  return ctx
}

function watch(page) {
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`))
  page.on('response', (r) => r.status() >= 400 && errors.push(`http ${r.status()}: ${r.url()}`))
  return errors
}

// Per-page structural, link, content and accessibility checks.
const inspect = () => {
  const name = (el) =>
    (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || '').trim() ||
    [...el.querySelectorAll('[aria-label]')].map((n) => n.getAttribute('aria-label')).join(' ')
  return {
    path: location.pathname,
    title: document.title,
    description: document.querySelector('meta[name=description]')?.content,
    canonical: document.querySelector('link[rel=canonical]')?.href,
    robots: document.querySelector('meta[name=robots]')?.content,
    lang: document.documentElement.lang,
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().replace(/\s+/g, ' ')),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    text: document.body.innerText,
    a11y: [
      ...[...document.querySelectorAll('img:not([alt])')].map((el) => `img without alt: ${el.src}`),
      ...[...document.querySelectorAll('svg')]
        .filter((el) => el.getAttribute('aria-hidden') !== 'true' && !el.closest('[aria-hidden="true"]'))
        .filter((el) => !(el.getAttribute('role') === 'img' && (el.getAttribute('aria-label') || el.querySelector('title'))))
        .map((el) => `svg neither hidden nor labelled: ${el.outerHTML.slice(0, 80)}`),
      ...[...document.querySelectorAll('a[href], button')]
        .filter((el) => !name(el))
        .map((el) => `unnamed ${el.tagName.toLowerCase()}: ${el.outerHTML.slice(0, 80)}`),
      ...[...document.querySelectorAll('input, select, textarea')]
        .filter((el) => !(el.id && document.querySelector(`label[for="${el.id}"]`)) && !el.getAttribute('aria-label'))
        .map((el) => `unlabelled field: ${el.outerHTML.slice(0, 80)}`),
    ],
  }
}

async function routeChecks(browser) {
  const internal = new Set()
  const external = new Set()
  const titles = new Map()
  for (const [vp, opts] of Object.entries(VIEWPORTS)) {
    const ctx = await newContext(browser, opts)
    for (const route of [...ROUTES, ...NOT_FOUND]) {
      const page = await ctx.newPage()
      const errors = watch(page)
      const res = await page.goto(BASE + route, { waitUntil: 'networkidle' })
      const info = await page.evaluate(inspect)
      const tag = `[${vp}] ${route}`
      if (res.status() !== 200) fail(`${tag} HTTP ${res.status()}`)
      if (info.path !== route) fail(`${tag} redirected to ${info.path}`)
      if (errors.length) fail(`${tag} ${errors.join(' | ')}`)
      if (info.overflow > 0) fail(`${tag} horizontal overflow ${info.overflow}px`)
      if (info.h1.length !== 1) fail(`${tag} expected one h1, found ${info.h1.length}`)
      if (info.lang !== 'en-IN') fail(`${tag} html lang=${info.lang}`)
      if (info.a11y.length) fail(`${tag} accessibility: ${info.a11y.join(' | ')}`)
      for (const re of FORBIDDEN_TEXT) if (re.test(info.text)) fail(`${tag} contains forbidden text ${re}`)
      const offline = info.links.filter((h) => /buildgrid|famgrid/i.test(h))
      if (offline.length) fail(`${tag} links to an offline product: ${offline.join(', ')}`)
      for (const h of info.links) {
        if (h.startsWith('/')) internal.add(h)
        else if (/^https?:/.test(h)) external.add(h)
      }
      if (NOT_FOUND.includes(route)) {
        if (!/not found/i.test(info.title) || info.robots !== 'noindex') fail(`${tag} should be a noindex 404 (${info.title}, ${info.robots})`)
      } else if (vp === 'desktop') {
        const want = `https://kvinnovations.in${route === '/' ? '/' : route}`
        if (info.canonical !== want) fail(`${tag} canonical ${info.canonical} != ${want}`)
        if (!info.description || info.description.length < 50) fail(`${tag} weak meta description`)
        if (info.robots !== (route === '/insights' ? 'noindex, follow' : 'index, follow')) fail(`${tag} robots=${info.robots}`)
        if (titles.has(info.title)) fail(`${tag} duplicate title with ${titles.get(info.title)}`)
        titles.set(info.title, route)
      }
      await page.close()
    }
    await ctx.close()
  }
  ok(`${ROUTES.length + NOT_FOUND.length} routes x ${Object.keys(VIEWPORTS).length} viewports loaded`)

  for (const h of [...internal].sort()) {
    const path = h.split(/[?#]/)[0] || '/'
    if (!KNOWN.has(path)) fail(`internal link to unknown route: ${h}`)
  }
  ok(`${internal.size} distinct internal link targets resolve to known routes`)
  const missing = LIVE_PRODUCT_LINKS.filter((u) => !external.has(u))
  check(missing.length === 0, 'all 5 live product sites are linked (hrefs only, not fetched)', `missing product links: ${missing.join(', ')}`)
  const unexpected = [...external].filter((u) => !LIVE_PRODUCT_LINKS.includes(u) && !u.startsWith('https://wa.me/'))
  check(unexpected.length === 0, 'no other external links', `unexpected external links: ${unexpected.join(', ')}`)
}

async function interactionChecks(browser) {
  const ctx = await newContext(browser, VIEWPORTS.desktop)
  const page = await ctx.newPage()

  await page.goto(BASE + '/farms', { waitUntil: 'networkidle' })
  check(new URL(page.url()).pathname === '/greens', '/farms -> /greens', `/farms ended at ${page.url()}`)

  await page.goto(BASE + '/businesses', { waitUntil: 'networkidle' })
  check(new URL(page.url()).pathname === '/about', '/businesses -> /about', `/businesses ended at ${page.url()}`)

  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  const primary = page.getByRole('navigation', { name: 'Primary' })
  const navItems = await primary.locator('a').allTextContents()
  check(['About', 'Greens', 'Tech', 'Infra', 'Projects', 'Contact'].every((n) => navItems.includes(n)), 'primary nav lists all sections', `primary nav: ${navItems.join(' / ')}`)

  // Every briefed homepage headline, in order.
  const headings = (await page.locator('h2').allTextContents()).map((t) => t.toLowerCase())
  const wanted = ['agriculture is more than production.', 'three capabilities. one agricultural ecosystem.', 'from land to a fully operational farm.', 'building across the agricultural value chain.', 'technology that works behind the farm.', 'building productive systems for the long term.', 'our work. our initiatives. our direction.', "let's build something that grows."]
  check(wanted.every((w, i) => headings[i] === w), 'homepage sections appear in the briefed order', `homepage h2s: ${headings.join(' / ')}`)

  await page.getByRole('link', { name: 'Explore Our Ecosystem' }).click()
  await page.waitForTimeout(1400)
  const inView = await page.evaluate(() => {
    const r = document.getElementById('ecosystem')?.getBoundingClientRect()
    return Boolean(r) && r.top < innerHeight && r.bottom > 0
  })
  check(inView, 'hero "Explore Our Ecosystem" scrolls to #ecosystem', '#ecosystem not in view after hero CTA')

  // The ecosystem plan follows the scroll position.
  await page.evaluate(() => document.querySelector('#ecosystem article:nth-of-type(2)').scrollIntoView({ block: 'center', behavior: 'instant' }))
  await page.waitForTimeout(400)
  const techLayer = await page.locator('#ecosystem .sticky').locator('p').innerText()
  check(/^KVI Tech/.test(techLayer), 'ecosystem plan switches layer with scroll', `ecosystem caption: ${techLayer}`)

  // Mokari Gobindbhog Rice facts.
  await page.goto(BASE + '/greens', { waitUntil: 'networkidle' })
  const panel = await page.locator('#agri-products').innerText()
  const facts = [
    /Mokari Gobindbhog Rice/i.test(panel),
    /KVI Greens/.test(panel),
    /500 g/.test(panel) && /1 kg/.test(panel),
    /Pre-launch/i.test(panel) && /Not yet on sale/.test(panel),
  ]
  check(facts.every(Boolean), '/greens Mokari Gobindbhog Rice panel: KVI Greens product, 500 g / 1 kg, pre-launch', `Mokari panel checks ${facts}: ${panel.slice(0, 200)}`)
  await page.getByRole('link', { name: 'Register interest' }).click()
  await page.waitForURL(/\/contact/)
  const prefill = [await page.locator('#cf-type').inputValue(), await page.locator('#cf-message').inputValue()]
  check(prefill[0] === 'product-partnership' && prefill[1].includes('Mokari Gobindbhog Rice'), `register-interest CTA preselects product partnerships + "${prefill[1]}"`, `register-interest prefill: ${prefill}`)

  // Old enquiry links keep working.
  await page.goto(BASE + '/contact?enquiry=distribution', { waitUntil: 'networkidle' })
  check((await page.locator('#cf-type').inputValue()) === 'product-partnership', 'legacy enquiry value maps to a current one', 'legacy enquiry value not mapped')

  // Projects: every entry has a status; filter narrows the list.
  await page.goto(BASE + '/projects', { waitUntil: 'networkidle' })
  const before = await page.locator('main article').count()
  await page.getByRole('button', { name: 'KVI Tech' }).click()
  const after = await page.locator('main article').count()
  check(before === 6 && after === 2, 'projects filter narrows 6 entries to 2 for KVI Tech', `projects filter ${before} -> ${after}`)

  // Portfolio names offline products without linking them.
  await page.goto(BASE + '/tech', { waitUntil: 'networkidle' })
  const tech = await page.locator('#portfolio').innerText()
  check(/BuildGrid/.test(tech) && /FamGrid/.test(tech), 'BuildGrid and FamGrid are named in the portfolio (unlinked)', 'portfolio is missing BuildGrid or FamGrid')

  // Static per-route metadata for crawlers without JS (skipped if a host does not serve it).
  for (const [route, want] of [['/greens', 'KVI Greens'], ['/products/farmgrid', 'FarmGrid']]) {
    const html = await (await fetch(`${BASE}${route}/index.html`)).text()
    check(html.includes(`<title>${want}`) && html.includes(`rel="canonical" href="https://kvinnovations.in${route}"`), `${route} has static title and canonical`, `${route} static metadata missing`)
  }

  // Privacy text must match the deployed delivery mode and third parties.
  await page.goto(BASE + '/privacy', { waitUntil: 'networkidle' })
  const privacy = await page.locator('main').innerText()
  if (!/Google/.test(privacy) && /access logs/.test(privacy) && /Kaimur Valley Innovations Pvt\. Ltd\./.test(privacy)) {
    ok('privacy notice covers access logs and the legal name, and no third-party fonts')
  } else fail('privacy notice is missing a disclosure')

  await ctx.close()
}

async function widthChecks(browser) {
  const widths = [360, 390, 430, 768, 1024, 1440, 1920]
  for (const width of widths) {
    const ctx = await newContext(browser, { viewport: { width, height: 900 } })
    const page = await ctx.newPage()
    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'load' })
      await page.waitForTimeout(60)
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      if (over > 0) fail(`[${width}px] ${route} horizontal overflow ${over}px`)
    }
    await ctx.close()
  }
  ok(`${ROUTES.length} routes have no horizontal overflow at ${widths.join(', ')}px`)
}

async function contactChecks(browser, vp) {
  const ctx = await newContext(browser, VIEWPORTS[vp])
  const page = await ctx.newPage()
  const errors = watch(page)
  await page.goto(BASE + '/contact?enquiry=technology&product=farmgrid#enquiry', { waitUntil: 'networkidle' })
  const tag = `[${vp}] contact`
  const type = await page.locator('#cf-type').inputValue()
  const msg = await page.locator('#cf-message').inputValue()
  check(type === 'technology' && msg.includes('FarmGrid'), `${tag} deep link preselects type and product`, `${tag} prefill type=${type} msg=${msg}`)

  const form = page.getByRole('form', { name: 'Enquiry form' })
  const note = await form.locator('p').last().innerText()
  if (/email app/.test(note)) ok(`${tag} explains before sending that an email draft opens`)
  else fail(`${tag} delivery note: ${note}`)

  await page.locator('#cf-message').fill('')
  await form.getByRole('button', { name: /Send enquiry/ }).click()
  const errs = await page.locator('[id^=cf-][id$=-err]').allTextContents()
  check(errs.length === 3, `${tag} empty submit flags name, email and message`, `${tag} validation errors: ${errs}`)
  await page.locator('#cf-name').fill('Acceptance Test')
  await page.locator('#cf-email').fill('not-an-email')
  await page.locator('#cf-phone').fill('+91 90000 00000')
  await page.locator('#cf-org').fill('Test Farm')
  await page.locator('#cf-message').fill('Testing the enquiry form flow.')
  await form.getByRole('button', { name: /Send enquiry/ }).click()
  if (/valid email/.test(await page.locator('#cf-email-err').innerText().catch(() => ''))) ok(`${tag} invalid email rejected`)
  else fail(`${tag} invalid email accepted`)
  await page.locator('#cf-email').fill('test@example.com')
  await form.getByRole('button', { name: /Send enquiry/ }).click()

  const status = await page.locator('[role=status]').innerText()
  const open = page.getByRole('link', { name: 'Open in email app' })
  const href = (await open.getAttribute('href')) || ''
  const [, query = ''] = href.split('?')
  const params = new URLSearchParams(query)
  const body = params.get('body') || ''
  const good =
    /One more step/.test(status) && !/has been sent/i.test(status) &&
    href.startsWith('mailto:kaimurvalleyinnovations@gmail.com?') &&
    params.get('subject') === '[Technology solutions] Website enquiry from Acceptance Test' &&
    ['Name: Acceptance Test', 'Email: test@example.com', 'Phone: +91 90000 00000', 'Organisation / farm: Test Farm', 'Testing the enquiry form flow.']
      .every((line) => body.includes(line))
  check(good, `${tag} mailto fallback: correct recipient, subject and body; no "sent" claim`, `${tag} done state: ${status} | ${href}`)

  const box = await open.boundingBox()
  const width = VIEWPORTS[vp].viewport.width
  check(Boolean(box) && box.x >= 0 && box.x + box.width <= width, `${tag} "Open in email app" fully on screen`, `${tag} button off screen ${JSON.stringify(box)}`)
  if (errors.length) fail(`${tag} ${errors.join(' | ')}`)
  await ctx.close()
}

async function mobileNavChecks(browser) {
  const ctx = await newContext(browser, VIEWPORTS.mobile)
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open menu' }).click()
  const menu = page.locator('#mobile-menu')
  await menu.waitFor({ state: 'visible' })
  const locked = await page.evaluate(() => getComputedStyle(document.body).overflow)
  await menu.getByRole('link', { name: 'Projects' }).click()
  await page.waitForTimeout(600)
  const path = new URL(page.url()).pathname
  // Closed = aria-hidden + inert + opacity 0 (Playwright's isVisible ignores opacity).
  const closed = await menu.evaluate((el) => ({
    hidden: el.getAttribute('aria-hidden'),
    opacity: getComputedStyle(el).opacity,
    bodyOverflow: getComputedStyle(document.body).overflow,
  }))
  check(
    path === '/projects' && locked === 'hidden' && closed.hidden === 'true' && closed.opacity === '0' && closed.bodyOverflow !== 'hidden',
    'mobile menu opens (scroll locked), navigates, closes and unlocks scroll',
    `mobile menu path=${path} lockedWhileOpen=${locked} afterClose=${JSON.stringify(closed)}`,
  )
  await ctx.close()
}

try {
  if (!BASE) await startPreview()
  const browser = await chromium.launch()
  await routeChecks(browser)
  await interactionChecks(browser)
  await widthChecks(browser)
  await contactChecks(browser, 'desktop')
  await contactChecks(browser, 'mobile')
  await mobileNavChecks(browser)
  await browser.close()
  const extra = [...thirdPartyHosts].filter((h) => !ALLOWED_THIRD_PARTY.has(h))
  check(
    extra.length === 0,
    `third-party requests limited to: ${[...thirdPartyHosts].sort().join(', ') || 'none'} (stubbed)`,
    `undisclosed third-party requests: ${extra.join(', ')}`,
  )
} catch (e) {
  fail(`suite aborted: ${e.stack || e}`)
} finally {
  preview?.kill()
}

console.log(`KVI acceptance suite against ${BASE}\n`)
console.log(results.join('\n'))
const failures = results.filter((r) => r.startsWith('FAIL')).length
console.log(`\n${failures ? `${failures} failure(s)` : 'all checks passed'}`)
process.exit(failures ? 1 : 0)
