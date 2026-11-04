// ---------------------------------------------------------------------------
// The KVI site plan: an invented integrated farm, generated once from a fixed
// seed. It is an illustration of the idea, not a drawing of any real KVI site,
// and every surface that shows it says so.
//
// The drawing is a single piece of land carrying the three verticals as layers:
//   parcels (Greens)  what is grown and raised
//   infra   (Infra)   roads, water and buildings
//   tech    (Tech)    the monitoring network tying each unit to one hub
// ---------------------------------------------------------------------------

const W = 1600
const H = 1000

function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Every point passes through this warp, so roads and field edges bend together
// the way boundaries do on real land.
const warp = (x, y) => [
  x + 20 * Math.sin(y / 170 + 1.2) + 9 * Math.sin(y / 61),
  y + 18 * Math.sin(x / 210) + 8 * Math.sin(x / 83 + 2),
]

const n = (v) => Math.round(v * 10) / 10
const toPath = (pts, close = false) =>
  `M${pts.map(([x, y]) => `${n(x)} ${n(y)}`).join('L')}${close ? 'Z' : ''}`

const warpedLine = (x1, y1, x2, y2, steps = 24) =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps
    return warp(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t)
  })

const quad = ([x0, y0, x1, y1], u0, v0, u1, v1, inset = 0) => {
  const ax = x0 + (x1 - x0) * u0 + inset
  const bx = x0 + (x1 - x0) * u1 - inset
  const ay = y0 + (y1 - y0) * v0 + inset
  const by = y0 + (y1 - y0) * v1 - inset
  return [
    [ax, ay],
    [bx, ay],
    [bx, by],
    [ax, by],
  ].map(([x, y]) => warp(x, y))
}

const centroid = (pts) => [
  pts.reduce((s, p) => s + p[0], 0) / pts.length,
  pts.reduce((s, p) => s + p[1], 0) / pts.length,
]

// A pond: a polygon with its corners rounded off.
const softPolygon = (pts, r = 0.22) => {
  let d = ''
  pts.forEach((p, i) => {
    const prev = pts[(i + pts.length - 1) % pts.length]
    const next = pts[(i + 1) % pts.length]
    const a = [p[0] + (prev[0] - p[0]) * r, p[1] + (prev[1] - p[1]) * r]
    const b = [p[0] + (next[0] - p[0]) * r, p[1] + (next[1] - p[1]) * r]
    d += `${i ? 'L' : 'M'}${n(a[0])} ${n(a[1])}Q${n(p[0])} ${n(p[1])} ${n(b[0])} ${n(b[1])}`
  })
  return `${d}Z`
}

const XS = [-40, 290, 640, 980, 1290, 1640]
const YS = [-40, 250, 600, 1040]
const ROAD_GAP = 9

// One row per band of land, one type per block.
const BLOCKS = [
  ['crop', 'orchard', 'plantation', 'crop', 'orchard'],
  ['pond', 'sheds', 'polyhouse', 'crop', 'nursery'],
  ['crop', 'crop', 'pond', 'orchard', 'plantation'],
]

function buildPlan() {
  const rand = mulberry32(41)
  const parcels = []
  const buildings = []
  const nodes = []

  BLOCKS.forEach((row, j) => {
    row.forEach((type, i) => {
      const box = [XS[i] + ROAD_GAP, YS[j] + ROAD_GAP, XS[i + 1] - ROAD_GAP, YS[j + 1] - ROAD_GAP]
      const delay = 0.9 + (i + j) * 0.12

      if (type === 'sheds') {
        parcels.push({ d: toPath(quad(box, 0, 0, 1, 1, 3), true), type: 'yard', tone: 'a', delay })
        for (let k = 0; k < 5; k++) {
          const v = 0.1 + k * 0.145
          const pts = quad(box, 0.08, v, 0.7, v + 0.08)
          buildings.push({ d: toPath(pts, true), kind: 'shed' })
        }
        buildings.push({ d: toPath(quad(box, 0.76, 0.12, 0.93, 0.48), true), kind: 'hall' })
        buildings.push({ d: toPath(quad(box, 0.76, 0.56, 0.93, 0.8), true), kind: 'hall' })
        nodes.push({ at: centroid(quad(box, 0.76, 0.12, 0.93, 0.48)), hub: true })
        nodes.push({ at: centroid(quad(box, 0.08, 0.3, 0.7, 0.38)) })
        return
      }

      if (type === 'polyhouse') {
        parcels.push({ d: toPath(quad(box, 0, 0, 1, 1, 3), true), type: 'yard', tone: 'b', delay })
        for (let k = 0; k < 7; k++) {
          const u = 0.07 + k * 0.126
          const pts = quad(box, u, 0.14, u + 0.094, 0.86)
          buildings.push({ d: toPath(pts, true), kind: 'polyhouse' })
        }
        nodes.push({ at: centroid(quad(box, 0.3, 0.14, 0.7, 0.86)) })
        return
      }

      if (type === 'pond') {
        const count = 4
        for (let k = 0; k < count; k++) {
          const u0 = (k % 2) * 0.5
          const v0 = Math.floor(k / 2) * 0.5
          const pts = quad(box, u0, v0, u0 + 0.5, v0 + 0.5, 12)
          parcels.push({ d: softPolygon(pts), type: 'pond', tone: 'a', delay })
        }
        nodes.push({ at: centroid(quad(box, 0, 0, 0.5, 0.5)) })
        nodes.push({ at: centroid(quad(box, 0.5, 0.5, 1, 1)) })
        return
      }

      // Cultivated land: cut into uneven strips, the way holdings divide.
      const across = box[2] - box[0] > box[3] - box[1]
      const strips = type === 'crop' ? 3 + Math.floor(rand() * 3) : 2 + Math.floor(rand() * 2)
      const cuts = [0]
      for (let s = 1; s < strips; s++) cuts.push((s + (rand() - 0.5) * 0.5) / strips)
      cuts.push(1)
      for (let s = 0; s < strips; s++) {
        const a = cuts[s]
        const b = cuts[s + 1]
        const pts = across ? quad(box, a, 0, b, 1, 2.5) : quad(box, 0, a, 1, b, 2.5)
        const pattern =
          type === 'crop' ? `rows${Math.floor(rand() * 3)}` : type === 'orchard' ? 'orchard' : type === 'plantation' ? 'plantation' : 'nursery'
        parcels.push({
          d: toPath(pts, true),
          type: pattern,
          tone: 'abc'[Math.floor(rand() * 3)],
          delay: delay + rand() * 0.2,
        })
      }
      nodes.push({ at: centroid(quad(box, 0.25, 0.25, 0.75, 0.75)) })
    })
  })

  // Roads follow the block edges.
  const roads = [
    ...XS.slice(1, -1).map((x) => ({ d: toPath(warpedLine(x, -20, x, H + 20)), main: false })),
    ...YS.slice(1, -1).map((y, i) => ({ d: toPath(warpedLine(-20, y, W + 20, y, 40)), main: i === 1 })),
  ]

  // Main canal: enters top-left, feeds the ponds, runs along the spine road.
  const canal = toPath([
    ...warpedLine(150, -20, 170, 245),
    ...warpedLine(170, 245, 620, 258, 12),
    ...warpedLine(620, 258, 640, 590, 10),
    ...warpedLine(640, 590, 1000, 612, 10),
  ])

  // Field channels off the canal.
  const channels = [
    warpedLine(170, 245, 170, 590, 8),
    warpedLine(640, 600, 640, 1010, 8),
    warpedLine(980, 612, 1280, 612, 8),
  ].map((pts) => toPath(pts))

  // Every unit's sensor reports back along the roads to the hub.
  const hub = nodes.find((node) => node.hub).at
  const links = nodes
    .filter((node) => !node.hub)
    .map(({ at }) => {
      const elbow = [at[0], hub[1] + (at[1] > hub[1] ? 8 : -8)]
      return toPath([at, elbow, hub])
    })

  const contours = Array.from({ length: 9 }, (_, i) => {
    const y0 = 70 + i * 112
    const pts = Array.from({ length: 34 }, (_, k) => {
      const x = -30 + k * 50
      return [x, y0 + 46 * Math.sin(x / 260 + i * 0.7) + 18 * Math.sin(x / 96 + i)]
    })
    return toPath(pts)
  })

  const labels = [
    { text: 'Fish ponds', at: warp(165, 430) },
    { text: 'Poultry sheds', at: warp(420, 300) },
    { text: 'Pack house', at: warp(590, 330) },
    { text: 'Polyhouses', at: warp(810, 620) },
    { text: 'Nursery', at: warp(1460, 430) },
    { text: 'Spine road', at: warp(1150, 588) },
    { text: 'Main canal', at: warp(205, 120) },
    { text: 'Orchard', at: warp(1140, 800) },
    { text: 'Plantation', at: warp(1460, 800) },
  ]

  return {
    width: W,
    height: H,
    contours,
    parcels,
    roads,
    canal,
    channels,
    buildings,
    links,
    hub,
    nodes: nodes.map(({ at, hub: isHub }) => ({ x: n(at[0]), y: n(at[1]), hub: Boolean(isHub) })),
    labels: labels.map(({ text, at }) => ({ text, x: n(at[0]), y: n(at[1]) })),
  }
}

export const sitePlan = buildPlan()
