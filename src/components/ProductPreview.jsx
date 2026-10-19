// Abstract product-interface preview for a KVI Tech product card. Not a real
// screenshot — a restrained line wireframe suggesting the shape of each
// product, drawn so a real screenshot can drop into the same slot later.
// Decorative (aria-hidden); the card's heading describes the product.

const WIRES = {
  // A grid of farm units beside a side list — one unit highlighted.
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
  // An invoice: header block, line items, a highlighted total.
  billgrid: (
    <>
      <rect x="54" y="12" width="132" height="128" rx="2" className="pv-line" />
      <rect x="66" y="24" width="44" height="10" className="pv-acc-fill" />
      <path d="M140 26h34M150 33h24" className="pv-soft" />
      <path d="M66 48h108" className="pv-line" />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <path d={`M66 ${62 + r * 14}h60`} className="pv-soft" />
          <path d={`M150 ${62 + r * 14}h24`} className="pv-soft" />
        </g>
      ))}
      <path d="M66 120h108" className="pv-soft" />
      <rect x="138" y="124" width="36" height="9" className="pv-acc-fill" />
    </>
  ),
  // A weekly timetable with one booked slot.
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
  // A kiln with chimney above a stage pipeline — the current stage highlighted.
  bhattagrid: (
    <>
      <path d="M24 86h120V60H24z" className="pv-line" />
      <path d="M40 60V44h88v16" className="pv-soft" />
      <path d="M150 86V22h14v64" className="pv-line" />
      <path d="M154 16c4-4 10-4 14 0" className="pv-soft" />
      <path d="M36 74h12M60 74h12M84 74h12M108 74h12" className="pv-soft" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={20 + i * 34}
          y="108"
          width="28"
          height="14"
          className={i === 2 ? 'pv-acc-fill' : 'pv-soft'}
        />
      ))}
      <path d="M48 115h6M82 115h6M116 115h6M150 115h6M184 115h6" className="pv-soft" />
    </>
  ),
  // A tender / project table with one row's status highlighted.
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
          .pv-acc-fill { fill: rgb(var(--c-accent) / 0.16); stroke: rgb(var(--c-accent) / 0.55); stroke-width: 1; }
        `}</style>
      </defs>
      <rect x="0.5" y="0.5" width="239" height="151" className="pv-soft" />
      {wire}
    </svg>
  )
}
