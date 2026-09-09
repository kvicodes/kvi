// Abstract product-interface preview for a KVI Tech product card. Not a real
// screenshot — a restrained line wireframe suggesting the shape of each
// product, drawn so a real screenshot can drop into the same slot later.
// Decorative (aria-hidden); the card's "KVI Tech product" label describes it.

const WIRES = {
  farmgrid: (
    <>
      <rect x="14" y="16" width="70" height="120" rx="2" className="pv-soft" />
      <path d="M22 30h54M22 46h54M22 62h40M22 78h54M22 94h34" className="pv-soft" />
      <rect x="98" y="16" width="128" height="120" rx="2" className="pv-line" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={106 + c * 23}
            y={24 + r * 27}
            width="17"
            height="20"
            className={r === 1 && c === 2 ? 'pv-acc-fill' : 'pv-soft'}
          />
        )),
      )}
    </>
  ),
  contractoros: (
    <>
      <path d="M14 20h212" className="pv-line" />
      {[0, 1, 2, 3, 4].map((r) => (
        <g key={r}>
          <path d={`M14 ${44 + r * 20}h212`} className="pv-soft" />
          <rect x="20" y={`${36 + r * 20}`} width="70" height="8" className="pv-soft" />
          <rect x="110" y={`${36 + r * 20}`} width="46" height="8" className="pv-soft" />
          <rect
            x="176"
            y={`${36 + r * 20}`}
            width={r === 1 ? 44 : 26}
            height="8"
            className={r === 1 ? 'pv-acc-fill' : 'pv-soft'}
          />
        </g>
      ))}
    </>
  ),
  campusgrid: (
    <>
      <path d="M16 20h208" className="pv-line" />
      <path d="M52 20v116M92 20v116M132 20v116M172 20v116" className="pv-soft" />
      <path d="M16 48h208M16 76h208M16 104h208" className="pv-soft" />
      <rect x="56" y="52" width="32" height="20" className="pv-acc-fill" />
      <rect x="136" y="80" width="32" height="20" className="pv-soft" />
      <rect x="96" y="108" width="32" height="20" className="pv-soft" />
    </>
  ),
  // FamGrid — a dark shared "family ledger": header, member dots, entry rows
  // with one teal-highlighted line. Matches the live product's dark/teal look.
  famgrid: (
    <>
      <rect x="0.5" y="0.5" width="239" height="151" rx="2" className="fg-bg" />
      <circle cx="24" cy="24" r="7" className="fg-acc-stroke" />
      <circle cx="41" cy="24" r="7" className="fg-dim" />
      <circle cx="58" cy="24" r="7" className="fg-dim" />
      <path d="M182 20h40M182 29h26" className="fg-hair" />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <path d={`M16 ${60 + r * 22}h208`} className="fg-hair" />
          <circle cx="28" cy={48 + r * 22} r="5" className={r === 1 ? 'fg-acc' : 'fg-dim'} />
          <rect x="42" y={44 + r * 22} width="76" height="7" rx="1" className="fg-dim" />
          <rect
            x={r === 1 ? 176 : 190}
            y={44 + r * 22}
            width={r === 1 ? 48 : 34}
            height="7"
            rx="1"
            className={r === 1 ? 'fg-acc' : 'fg-dim'}
          />
        </g>
      ))}
    </>
  ),
}

export default function ProductPreview({ id, className = '' }) {
  const wire = WIRES[id]
  if (!wire) return null
  const isFam = id === 'famgrid'
  return (
    <svg
      viewBox="0 0 240 152"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`block w-full ${className}`}
    >
      <defs>
        <style>{`
          .pv-line { stroke: rgb(var(--c-tech) / 0.55); stroke-width: 1.1; }
          .pv-soft { stroke: rgb(var(--c-tech) / 0.28); stroke-width: 1; fill: none; }
          .pv-acc-fill { fill: rgb(var(--c-accent) / 0.16); stroke: rgb(var(--c-accent) / 0.5); stroke-width: 1; }
          .fg-bg { fill: rgb(var(--c-famgrid-ink)); stroke: rgb(var(--c-famgrid) / 0.30); stroke-width: 1; }
          .fg-hair { stroke: rgb(var(--c-famgrid) / 0.16); stroke-width: 1; }
          .fg-dim { fill: rgb(var(--c-famgrid) / 0.34); }
          .fg-acc { fill: rgb(var(--c-famgrid) / 0.92); }
          .fg-acc-stroke { fill: none; stroke: rgb(var(--c-famgrid) / 0.92); stroke-width: 1.4; }
        `}</style>
      </defs>
      {!isFam && <rect x="0.5" y="0.5" width="239" height="151" className="pv-soft" />}
      {wire}
    </svg>
  )
}
