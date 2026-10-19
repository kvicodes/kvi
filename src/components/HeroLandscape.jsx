// Hero landscape — a productive rural scene drawn for a deep-green surface.
//   sky        — a low sun and a faint node network (the technology cue)
//   far ridge  — rolling land
//   mid field  — furrows in perspective, an irrigation channel and a small
//                processing shed with a silo (the infrastructure / processing cue)
//   foreground — a band of ripening paddy (the agriculture cue, front and centre)
// Decorative only. Parallax layers read --hp (0 -> 1) from the hero section;
// --hp stays 0 on mobile and under reduced motion. The gentle sway animation is
// neutralised by the global prefers-reduced-motion rule in index.css.

// Small deterministic PRNG so the paddy is identical on every render.
function seeded(seed) {
  let t = seed
  return () => {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const W = 1440
const H = 520
const rand = seeded(7)

const STALKS = Array.from({ length: 110 }, (_, i) => {
  const x = i * 13.2 + rand() * 9
  const h = 46 + rand() * 62
  const lean = 6 + rand() * 14
  const tx = x + lean
  const ty = H - h
  const droop = 10 + rand() * 10
  return {
    key: i,
    group: i % 3,
    stem: `M${x.toFixed(1)} ${H} Q${(x + lean * 0.25).toFixed(1)} ${(H - h * 0.6).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`,
    head: `M${tx.toFixed(1)} ${ty.toFixed(1)} q${(droop * 0.7).toFixed(1)} -4 ${droop.toFixed(1)} ${(droop * 0.9).toFixed(1)}`,
  }
})

// Furrows converge on a vanishing point on the mid field.
const VP = { x: 760, y: 336 }
const FURROWS = Array.from({ length: 36 }, (_, i) => -820 + i * 88)

const NODES = [
  [1168, 92],
  [1236, 136],
  [1308, 84],
  [1372, 146],
  [1222, 214],
  [1330, 222],
]
const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [3, 5],
  [4, 5],
]

export default function HeroLandscape({ className = '' }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`hero-landscape ${className}`}
    >
      <defs>
        <clipPath id="hl-mid">
          <path d="M0 384 C 260 350 520 352 760 362 C 1000 372 1220 344 1440 352 V520 H0 Z" />
        </clipPath>
        <style>{`
          .hero-landscape .hl-sway { transform-box: fill-box; transform-origin: 50% 100%; animation: hl-sway 7s ease-in-out infinite alternate; }
          .hero-landscape .hl-sway-1 { animation-delay: -2.3s; animation-duration: 8s; }
          .hero-landscape .hl-sway-2 { animation-delay: -4.6s; animation-duration: 9s; }
          @keyframes hl-sway { from { transform: skewX(-1.4deg); } to { transform: skewX(1.4deg); } }
        `}</style>
      </defs>

      {/* Sky: sun + node network */}
      <g style={{ transform: 'translateY(calc(var(--hp, 0) * 36px))' }}>
        <circle cx="1090" cy="190" r="104" stroke="rgb(var(--c-grain) / 0.10)" />
        <circle cx="1090" cy="190" r="66" fill="rgb(var(--c-grain) / 0.12)" stroke="rgb(var(--c-grain) / 0.5)" strokeWidth="1.2" />
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="rgb(var(--c-paper) / 0.14)"
          />
        ))}
        {NODES.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 2 ? 3.6 : 2.6}
            fill={i === 2 ? 'rgb(var(--c-grain))' : 'rgb(var(--c-paper) / 0.4)'}
          />
        ))}
      </g>

      {/* Far ridge */}
      <path
        d="M0 330 C 180 300 360 290 540 306 C 720 322 900 286 1080 280 C 1260 274 1360 296 1440 300 V520 H0 Z"
        fill="rgb(var(--c-forest-soft) / 0.22)"
        style={{ transform: 'translateY(calc(var(--hp, 0) * 18px))' }}
      />

      {/* Mid field with furrows, channel and processing shed */}
      <path
        d="M0 384 C 260 350 520 352 760 362 C 1000 372 1220 344 1440 352 V520 H0 Z"
        fill="rgb(var(--c-forest))"
      />
      <g clipPath="url(#hl-mid)">
        {FURROWS.map((x) => (
          <line key={x} x1={VP.x} y1={VP.y} x2={x} y2={H} stroke="rgb(var(--c-paper) / 0.06)" />
        ))}
        <path
          d="M250 520 C 400 462 560 420 760 398 C 920 382 1120 378 1440 388"
          stroke="rgb(150 190 196 / 0.38)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g stroke="rgb(var(--c-paper) / 0.42)" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M952 370 V334 L990 314 L1028 334 V370 Z" fill="rgb(var(--c-forest-deep))" />
        <path d="M978 370 V350 H1000 V370" />
        <path d="M952 334 H1028" stroke="rgb(var(--c-paper) / 0.22)" />
        <rect x="1038" y="318" width="24" height="52" rx="12" fill="rgb(var(--c-forest-deep))" />
        <path d="M1038 334 H1062" stroke="rgb(var(--c-grain) / 0.7)" />
      </g>

      {/* Near field */}
      <path
        d="M0 448 C 300 426 600 430 900 440 C 1150 448 1300 434 1440 430 V520 H0 Z"
        fill="rgb(22 46 33)"
      />

      {/* Foreground paddy */}
      {[0, 1, 2].map((g) => (
        <g key={g} className={`hl-sway hl-sway-${g}`}>
          {STALKS.filter((s) => s.group === g).map((s) => (
            <g key={s.key}>
              <path d={s.stem} stroke="rgb(var(--c-forest-soft) / 0.75)" strokeWidth="1.4" strokeLinecap="round" />
              <path
                d={s.head}
                stroke="rgb(var(--c-grain) / 0.85)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeDasharray="0.1 4.4"
              />
            </g>
          ))}
        </g>
      ))}
    </svg>
  )
}
