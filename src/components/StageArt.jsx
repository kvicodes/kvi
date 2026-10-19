// Line illustrations for the KVI Greens ecosystem sequence.
// One visual language across all five: 1.2px ink strokes, a green accent and a
// grain accent, 200x150 frame. Decorative — the stage heading carries meaning.

const SCENES = {
  // Two people meeting at the edge of a field.
  partners: (
    <>
      <path d="M12 118h176" className="sa-line" />
      <path d="M110 118c20-6 50-8 78-6M120 132c22-5 46-6 68-5" className="sa-soft" />
      <circle cx="62" cy="52" r="9" className="sa-line" />
      <path d="M62 61v30M62 91l-10 27M62 91l10 27M62 72l22 8" className="sa-line" />
      <circle cx="116" cy="52" r="9" className="sa-line" />
      <path d="M116 61v30M116 91l-10 27M116 91l10 27M116 72l-22 8" className="sa-line" />
      <path d="M84 80h10" className="sa-acc" />
      <path d="M150 118V96M150 102c-5 0-8-3-8-8 5 0 8 3 8 8ZM150 99c5 0 8-3 8-7-5 0-8 3-8 7Z" className="sa-acc" />
      <path d="M172 118V100M172 105c-4 0-7-3-7-7 4 0 7 3 7 7Z" className="sa-soft" />
    </>
  ),
  // A farm laid out into plots, with a water channel and a structure.
  development: (
    <>
      <path d="M20 120 60 52h80l40 68z" className="sa-line" />
      <path d="M40 86h120M30 103h140M100 52v68M73 52l-13 68M127 52l13 68" className="sa-soft" />
      <path d="M86 52c-4 20 6 40-6 68" className="sa-water" />
      <path d="M150 40V24l12-8 12 8v16z" className="sa-line" />
      <path d="M156 40v-8h12v8" className="sa-soft" />
      <rect x="104" y="70" width="18" height="12" className="sa-acc" />
    </>
  ),
  // Rows of a ripening crop under the sun.
  production: (
    <>
      <path d="M12 116h176" className="sa-line" />
      <path d="M18 128h164M26 140h148" className="sa-soft" />
      {[34, 64, 94, 124, 154].map((x) => (
        <g key={x}>
          <path d={`M${x} 116V70`} className="sa-line" />
          <path d={`M${x} 76c-5-2-8-6-8-11 5 2 8 6 8 11ZM${x} 86c-5-2-8-6-8-11 5 2 8 6 8 11Z`} className="sa-grain" />
          <path d={`M${x} 81c5-2 8-6 8-11-5 2-8 6-8 11ZM${x} 91c5-2 8-6 8-11-5 2-8 6-8 11Z`} className="sa-grain" />
          <path d={`M${x} 104c-6 0-10-4-10-9M${x} 100c6 0 10-4 10-9`} className="sa-acc" />
        </g>
      ))}
      <circle cx="168" cy="34" r="12" className="sa-grain" />
    </>
  ),
  // A small processing unit: hopper, building and packed sacks.
  processing: (
    <>
      <path d="M12 120h176" className="sa-line" />
      <path d="M36 120V68l28-18 28 18v52" className="sa-line" />
      <path d="M36 68h56M52 120V94h24v26" className="sa-soft" />
      <path d="M100 58h28l-8 16h-12z" className="sa-line" />
      <path d="M114 74v18" className="sa-soft" />
      <path d="M96 98h60" className="sa-acc" />
      <path d="M100 98v-4M118 98v-4M136 98v-4M152 98v-4" className="sa-soft" />
      <path d="M140 120v-16c0-3 3-5 7-5h6c4 0 7 2 7 5v16z" className="sa-grain" />
      <path d="M162 120v-12c0-3 2-4 5-4h4c3 0 5 1 5 4v12z" className="sa-soft" />
      <path d="M145 110h12" className="sa-acc" />
    </>
  ),
  // A branded pack on a shelf and a delivery vehicle on the road.
  market: (
    <>
      <path d="M12 124h176" className="sa-line" />
      <path d="M22 64h72M22 96h72M26 64v60M90 64v60" className="sa-soft" />
      <path d="M44 96V74c0-4 4-6 8-6h12c4 0 8 2 8 6v22z" className="sa-line" />
      <path d="M50 82h16" className="sa-grain" />
      <path d="M52 88h12" className="sa-acc" />
      <path d="M112 112V88h44v24M156 96h16l10 10v6h-26" className="sa-line" />
      <circle cx="124" cy="116" r="6" className="sa-line" />
      <circle cx="166" cy="116" r="6" className="sa-line" />
      <path d="M120 100h26" className="sa-acc" />
      <path d="M100 52c20-14 50-14 70 0" className="sa-soft" />
      <path d="M165 46l5 6-7 2" className="sa-soft" />
    </>
  ),
}

export default function StageArt({ scene, className = '' }) {
  const art = SCENES[scene]
  if (!art) return null
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`w-full ${className}`}
    >
      <defs>
        <style>{`
          .sa-line  { stroke: rgb(var(--c-ink) / 0.6); stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; }
          .sa-soft  { stroke: rgb(var(--c-ink) / 0.3); stroke-width: 1; stroke-linecap: round; stroke-linejoin: round; }
          .sa-acc   { stroke: rgb(var(--c-greens)); stroke-width: 1.4; fill: none; stroke-linecap: round; stroke-linejoin: round; }
          .sa-grain { stroke: rgb(var(--c-earth)); fill: rgb(var(--c-grain) / 0.25); stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; }
          .sa-water { stroke: rgb(var(--c-infra) / 0.7); stroke-width: 2; stroke-linecap: round; }
        `}</style>
      </defs>
      {art}
    </svg>
  )
}
