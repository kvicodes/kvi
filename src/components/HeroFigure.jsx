// Hero figure — three stacked planes, one for each world KVI works in,
// threaded by a single accent spine. No photography, no flowchart: thin
// line-work only.
//   top    — INNOVATE : a small system of nodes + a panel (KVI Tech)
//   middle — OPERATE   : furrows in perspective + a seedling (Kaimur Farms)
//   bottom — BUILD     : a braced structural frame on a foundation (KVI Infra)
// The one-time draw-in is neutralised by the global prefers-reduced-motion
// rule in index.css.

export default function HeroFigure({ className = '' }) {
  return (
    <svg
      viewBox="0 0 620 560"
      fill="none"
      role="img"
      aria-label="Abstract composition of three layered planes — a network of nodes, rows of cultivated land, and a structural frame — representing KVI Tech, Kaimur Farms and KVI Infra, threaded by a single line."
      className={`hero-figure w-full ${className}`}
    >
      <defs>
        <style>{`
          .hf-line  { stroke: rgb(var(--c-ink) / 0.55); stroke-width: 1.25; }
          .hf-soft  { stroke: rgb(var(--c-ink) / 0.24); stroke-width: 1; }
          .hf-acc   { stroke: rgb(var(--c-accent)); stroke-width: 1.5; }
          .hf-fill  { fill: rgb(var(--c-accent) / 0.07); }
          .hf-node  { fill: rgb(var(--c-paper)); stroke: rgb(var(--c-ink) / 0.55); stroke-width: 1.25; }
          .hf-dot   { fill: rgb(var(--c-ink) / 0.55); }
          .hf-acc-dot { fill: rgb(var(--c-accent)); }
          .hf-label { fill: rgb(var(--c-ink) / 0.45); font: 600 11px/1 'Inter Tight', Inter, sans-serif; letter-spacing: 0.18em; }
          @media (max-width: 700px) { .hf-label { display: none; } }
          .hf-a { animation: hf-rise 0.9s cubic-bezier(0.22,1,0.36,1) both; }
          .hf-b { animation: hf-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
          .hf-c { animation: hf-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.24s both; }
          @keyframes hf-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        `}</style>
      </defs>

      {/* Spine threading the three planes. The accent overlay draws upward from
          the foundation as the hero scrolls (via --hp on the section) — Build
          -> Operate -> Innovate, bottom to top. Pinned at 0 under reduced
          motion and on mobile, where --hp never leaves 0. */}
      <line x1="512" y1="70" x2="512" y2="500" className="hf-soft" />
      <line
        x1="512"
        y1="70"
        x2="512"
        y2="500"
        className="hf-acc"
        pathLength="1"
        strokeDasharray="1"
        style={{ strokeDashoffset: 'calc(var(--hp, 0) - 1)' }}
      />

      {/* ---- TOP · INNOVATE (KVI Tech) ---- */}
      <g className="hf-a">
        <rect x="70" y="58" width="150" height="96" className="hf-line" />
        <line x1="70" y1="82" x2="220" y2="82" className="hf-soft" />
        <rect x="84" y="98" width="26" height="42" className="hf-soft" />
        <rect x="120" y="112" width="26" height="28" className="hf-soft" />
        <rect x="156" y="90" width="26" height="50" className="hf-fill" />
        <rect x="156" y="90" width="26" height="50" className="hf-soft" />
        <path d="M260 132 L300 96 L340 116 L392 72" className="hf-line" />
        <circle cx="260" cy="132" r="3.5" className="hf-dot" />
        <circle cx="300" cy="96" r="3.5" className="hf-dot" />
        <circle cx="340" cy="116" r="3.5" className="hf-dot" />
        <circle cx="392" cy="72" r="4" className="hf-acc-dot" />
        <circle cx="512" cy="104" r="4" className="hf-node" />
        <line x1="392" y1="72" x2="508" y2="104" className="hf-soft" />
        <text x="524" y="108" className="hf-label">INNOVATE</text>
      </g>

      {/* ---- MIDDLE · OPERATE (Kaimur Farms) ---- */}
      <g className="hf-b">
        <path d="M60 300 C 200 258, 380 258, 470 300" className="hf-line" />
        <path d="M60 322 C 200 282, 380 282, 470 322" className="hf-soft" />
        <path d="M60 344 C 200 306, 380 306, 470 344" className="hf-soft" />
        <path d="M60 366 C 200 330, 380 330, 470 366" className="hf-soft" />
        <line x1="250" y1="238" x2="250" y2="300" className="hf-line" />
        <path d="M250 268 C 236 268, 226 258, 226 244 C 240 244, 250 254, 250 268 Z" className="hf-fill" />
        <path d="M250 268 C 236 268, 226 258, 226 244 C 240 244, 250 254, 250 268 Z" className="hf-line" />
        <path d="M250 258 C 262 258, 272 250, 272 238 C 260 238, 250 246, 250 258 Z" className="hf-acc" />
        <circle cx="512" cy="300" r="4" className="hf-node" />
        <line x1="470" y1="300" x2="508" y2="300" className="hf-soft" />
        <text x="524" y="304" className="hf-label">OPERATE</text>
      </g>

      {/* ---- BOTTOM · BUILD (KVI Infra) ---- */}
      <g className="hf-c">
        <line x1="40" y1="500" x2="470" y2="500" className="hf-line" />
        <line x1="40" y1="510" x2="470" y2="510" className="hf-soft" />
        <path d="M96 500 V408 L210 360 L324 408 V500" className="hf-line" />
        <line x1="96" y1="408" x2="324" y2="408" className="hf-line" />
        <path d="M96 500 L210 430 L324 500" className="hf-soft" />
        <line x1="210" y1="360" x2="210" y2="500" className="hf-soft" />
        <line x1="153" y1="453" x2="153" y2="500" className="hf-soft" />
        <line x1="267" y1="453" x2="267" y2="500" className="hf-soft" />
        <circle cx="512" cy="460" r="4" className="hf-node" />
        <line x1="324" y1="460" x2="508" y2="460" className="hf-soft" />
        <text x="524" y="464" className="hf-label">BUILD</text>
      </g>
    </svg>
  )
}
