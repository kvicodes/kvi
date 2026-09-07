// Abstract architectural composition for the hero — three ascending structures
// (build / operate / innovate) rising from a common ground line, drawn as thin
// lines on the section's grid. No photography. Motion is a one-time draw-in,
// neutralised by the global prefers-reduced-motion rule in index.css.

export default function HeroFigure({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 540"
      fill="none"
      role="img"
      aria-label="Abstract composition of three ascending structures rising from a common ground line, representing KVI Infra, Kaimur Farms and KVI Tech."
      className={`hero-figure w-full ${className}`}
    >
      <defs>
        <style>{`
          .hf-line { stroke: rgb(var(--c-ink) / 0.55); stroke-width: 1.25; }
          .hf-soft { stroke: rgb(var(--c-ink) / 0.28); stroke-width: 1; }
          .hf-accent { stroke: rgb(var(--c-accent)); stroke-width: 1.5; }
          .hf-fill { fill: rgb(var(--c-accent) / 0.08); }
          .hf-node { fill: rgb(var(--c-paper)); stroke: rgb(var(--c-ink) / 0.55); stroke-width: 1.25; }
          .hf-node-accent { fill: rgb(var(--c-accent)); }
          .hf-rise { animation: hf-rise 1s cubic-bezier(0.22,1,0.36,1) both; }
          .hf-rise-2 { animation: hf-rise 1s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
          .hf-rise-3 { animation: hf-rise 1s cubic-bezier(0.22,1,0.36,1) 0.24s both; }
          @keyframes hf-rise {
            from { opacity: 0; transform: translateY(22px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </defs>

      {/* Ground line */}
      <line x1="20" y1="470" x2="580" y2="470" className="hf-line" />
      <line x1="20" y1="478" x2="580" y2="478" className="hf-soft" />

      {/* Structure 1 — Build (KVI Infra) */}
      <g className="hf-rise">
        <rect x="70" y="330" width="120" height="140" className="hf-line" fill="none" />
        <line x1="70" y1="370" x2="190" y2="370" className="hf-soft" />
        <line x1="70" y1="410" x2="190" y2="410" className="hf-soft" />
        <line x1="130" y1="330" x2="130" y2="470" className="hf-soft" />
        <circle cx="130" cy="330" r="4" className="hf-node" />
      </g>

      {/* Structure 2 — Operate (Kaimur Farms) */}
      <g className="hf-rise-2">
        <path d="M250 470 V250 L310 210 L370 250 V470 Z" className="hf-fill" />
        <path d="M250 470 V250 L310 210 L370 250 V470" className="hf-line" />
        <line x1="250" y1="320" x2="370" y2="320" className="hf-soft" />
        <line x1="250" y1="395" x2="370" y2="395" className="hf-soft" />
        <line x1="310" y1="210" x2="310" y2="470" className="hf-soft" />
        <circle cx="310" cy="210" r="4" className="hf-node" />
      </g>

      {/* Structure 3 — Innovate (KVI Tech) */}
      <g className="hf-rise-3">
        <line x1="470" y1="470" x2="470" y2="90" className="hf-accent" />
        <line x1="500" y1="470" x2="500" y2="150" className="hf-line" />
        <path d="M470 90 L500 90 L500 150" className="hf-soft" />
        <path d="M470 150 L500 150 M470 230 L500 230 M470 310 L500 310 M470 390 L500 390" className="hf-soft" />
        <circle cx="470" cy="90" r="5" className="hf-node-accent" />
        <circle cx="500" cy="150" r="3.5" className="hf-node" />
      </g>

      {/* Connective baseline nodes */}
      <circle cx="130" cy="470" r="3" className="hf-node" />
      <circle cx="310" cy="470" r="3" className="hf-node" />
      <circle cx="470" cy="470" r="3.5" className="hf-node-accent" />
    </svg>
  )
}
