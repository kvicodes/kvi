const MARKS = {
  farmgrid: (
    <>
      <path d="M8 30h32M8 38h32M16 8v32M26 8v32M36 8v32" />
      <path d="M26 30c0-8 5-13 12-15-1 8-5 13-12 15Z" className="pm-fill" />
      <path d="M26 30c0-8-4-13-11-15 1 8 5 13 11 15Z" className="pm-accent" />
    </>
  ),
  billgrid: (
    <>
      <path d="M12 6h24v36l-4-3-4 3-4-3-4 3-4-3-4 3V6Z" />
      <path d="M17 14h14M17 20h14M17 26h8" />
      <path d="M27 33h4" className="pm-accent" />
      <path d="M25 26h6" className="pm-accent" />
    </>
  ),
  campusgrid: (
    <>
      <path d="M7 39h34M11 39V19l13-9 13 9v20M17 39V27h14v12M24 10v-4" />
      <path d="M17 21h4M27 21h4M17 25h4M27 25h4" className="pm-accent" />
    </>
  ),
  bhattagrid: (
    <>
      <path d="M7 39h34M11 39V22h26v17M15 22V13h18v9M19 13V8h10v5" />
      <path d="M16 29h16M16 34h16" className="pm-accent" />
      <path d="M21 39V29M27 39V29" />
    </>
  ),
  contractoros: (
    <>
      <rect x="10" y="8" width="28" height="32" rx="2" />
      <path d="M18 8v-2h12v2M16 17h16M16 24h16M16 31h9" />
      <path d="m28 32 3 3 6-7" className="pm-accent" />
    </>
  ),
  buildgrid: (
    <>
      <path d="M8 39h32M11 35V13h26v22M11 21h26M19 13v8M29 13v8M11 29h26" />
      <path d="M17 25h4M27 25h4M17 33h4M27 33h4" className="pm-accent" />
    </>
  ),
  famgrid: (
    <>
      <circle cx="16" cy="18" r="5" />
      <circle cx="32" cy="18" r="5" />
      <circle cx="24" cy="34" r="5" />
      <path d="M20 20.5 22 31M28 20.5 26 31M21 18h6" className="pm-accent" />
    </>
  ),
}

export default function ProductMark({ id, className = '' }) {
  const mark = MARKS[id]
  if (!mark) return null

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`product-mark h-11 w-11 ${className}`}
    >
      <style>{`
        .product-mark { overflow: visible; }
        .product-mark path, .product-mark rect, .product-mark circle {
          stroke: currentColor;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .product-mark .pm-accent { stroke: rgb(var(--c-accent)); }
        .product-mark .pm-fill { fill: rgb(var(--c-accent) / 0.18); stroke: rgb(var(--c-accent)); }
      `}</style>
      {mark}
    </svg>
  )
}
