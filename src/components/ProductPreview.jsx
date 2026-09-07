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
}

export default function ProductPreview({ id, className = '' }) {
  const wire = WIRES[id]
  if (!wire) return null
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
        `}</style>
      </defs>
      <rect x="0.5" y="0.5" width="239" height="151" className="pv-soft" />
      {wire}
    </svg>
  )
}
