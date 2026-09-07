// Line illustrations for the Kaimur Farms "land to product" sequence.
// One visual language across all five: 1.2px ink strokes, single green accent,
// 200x150 frame. Decorative — the stage heading carries the meaning.

const SCENES = {
  land: (
    <>
      <path d="M12 104h176" className="sa-line" />
      <path d="M20 118c30-8 60-8 90 0M30 132c40-10 80-10 120 0" className="sa-soft" />
      <circle cx="150" cy="60" r="16" className="sa-acc" />
      <path d="M150 26v-8M150 102v6M116 60h-8M192 60h6M126 36l-6-6M180 90l6 6" className="sa-soft" />
      <path d="M44 104V72M44 72l14 6M44 80l14 6" className="sa-line" />
    </>
  ),
  cultivation: (
    <>
      <path d="M12 108h176" className="sa-line" />
      <path d="M18 122h164M26 136h148" className="sa-soft" />
      {[36, 68, 100, 132, 164].map((x) => (
        <g key={x} className="sa-line">
          <path d={`M${x} 108v-18`} />
          <path d={`M${x} 96c-6 0-10-4-10-10 6 0 10 4 10 10Z`} />
          <path d={`M${x} 92c6 0 10-4 10-9-6 0-10 4-10 9Z`} />
        </g>
      ))}
      <path d="M12 40h150" className="sa-acc" />
      <path d="M40 40v6M76 40v6M112 40v6M148 40v6" className="sa-acc" />
    </>
  ),
  harvest: (
    <>
      <path d="M12 112h176" className="sa-line" />
      {[30, 50, 70].map((x) => (
        <path key={x} d={`M${x} 112V54M${x} 70l10-8M${x} 84l10-8M${x} 98l10-8M${x} 70l-10-8M${x} 84l-10-8`} className="sa-line" />
      ))}
      <path d="M104 112l14-40 14 40" className="sa-soft" />
      <path d="M100 96h36" className="sa-acc" />
      <path d="M150 112v-22h32v22M150 100h32" className="sa-line" />
      <path d="M156 90l4-8h12l4 8" className="sa-soft" />
    </>
  ),
  processing: (
    <>
      <path d="M12 118h176" className="sa-line" />
      <path d="M40 118V70l24-16 24 16v48" className="sa-line" />
      <path d="M40 70h48" className="sa-soft" />
      <path d="M64 54V40M52 46l24-12" className="sa-soft" />
      <path d="M88 92h40l-8 14H96z" className="sa-line" />
      <path d="M128 99h34" className="sa-acc" />
      <path d="M150 118v-14h22v14M150 111h22" className="sa-soft" />
      <circle cx="161" cy="104" r="2" className="sa-line" />
    </>
  ),
  product: (
    <>
      <path d="M12 122h176" className="sa-line" />
      <path d="M74 122V70l32-14 32 14v52z" className="sa-line" />
      <path d="M74 70l32 14 32-14M106 84v38" className="sa-soft" />
      <rect x="86" y="90" width="26" height="18" className="sa-acc" />
      <path d="M40 122v-16h20v16M156 122v-24h20v24" className="sa-soft" />
      <path d="M48 100c0-4 4-4 4 0M164 92c0-4 4-4 4 0" className="sa-line" />
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
          .sa-line { stroke: rgb(var(--c-ink) / 0.6); stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: round; }
          .sa-soft { stroke: rgb(var(--c-ink) / 0.3); stroke-width: 1; stroke-linecap: round; stroke-linejoin: round; }
          .sa-acc  { stroke: rgb(var(--c-farms)); stroke-width: 1.4; fill: none; stroke-linecap: round; stroke-linejoin: round; }
        `}</style>
      </defs>
      {art}
    </svg>
  )
}
