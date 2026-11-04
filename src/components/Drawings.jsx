// Small line drawings. Generic typologies, drawn for this site. They explain
// what is being planned and do not depict any KVI project.

const INK = { dark: '#C8CDB8', accent: 'rgb(var(--rice))' }

/**
 * One plot at each of the six build stages. Each stage keeps what came before
 * and adds one thing, in the order the work happens.
 */
export function StageFrame({ stage }) {
  const s = stage
  return (
    <svg viewBox="0 0 200 200" className="block w-full" aria-hidden="true">
      <rect width="200" height="200" fill="rgb(var(--field-raised))" />
      {/* 1 Plan: the land, its contours and a boundary */}
      <g fill="none" stroke="rgb(var(--sage) / 0.32)">
        {[34, 68, 102, 136, 170].map((y, i) => (
          <path key={y} d={`M0 ${y}C50 ${y - 16 + i * 3} 120 ${y + 18 - i * 2} 200 ${y - 6}`} />
        ))}
      </g>
      <rect x="20" y="20" width="160" height="160" fill="none" stroke="rgb(var(--paper))" strokeDasharray="5 4" />
      {/* 2 Design: the layout lines */}
      {s >= 2 && (
        <g stroke="rgb(var(--copper-light))" fill="none" strokeDasharray={s >= 3 ? undefined : '3 3'}>
          <path d="M20 106H180M92 20V180" strokeWidth={s >= 3 ? 2 : 1} />
          <path d="M136 106V180" />
        </g>
      )}
      {/* 3 Build: structures and water */}
      {s >= 3 && (
        <g fill="rgb(var(--copper-light) / 0.65)" stroke="rgb(var(--copper-light))">
          <rect x="102" y="30" width="68" height="12" />
          <rect x="102" y="50" width="68" height="12" />
          <rect x="102" y="70" width="68" height="12" />
        </g>
      )}
      {s >= 3 && <rect x="30" y="118" width="50" height="50" rx="8" fill="#3f6467" />}
      {/* 4 Operate: planted ground */}
      {s >= 4 && (
        <g>
          <rect x="30" y="30" width="52" height="66" fill="rgb(var(--olive))" />
          <rect x="100" y="116" width="28" height="56" fill="rgb(var(--olive))" />
          <rect x="144" y="116" width="28" height="56" fill="rgb(var(--olive) / 0.7)" />
          <g stroke="rgb(var(--sage) / 0.6)">
            {[40, 50, 60, 70, 80, 90].map((y) => <path key={y} d={`M30 ${y}H82`} />)}
          </g>
        </g>
      )}
      {/* 5 Connect: the monitoring network */}
      {s >= 5 && (
        <g>
          <path d="M56 62H136V36M56 143H114M158 144H136V56" fill="none" stroke={INK.accent} strokeWidth="0.8" />
          {[[56, 62], [56, 143], [114, 143], [158, 144], [136, 36]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="3.4" fill={INK.accent} />
          ))}
        </g>
      )}
      {/* 6 Scale: the pattern repeats past the first boundary */}
      {s >= 6 && (
        <g>
          <rect x="4" y="4" width="192" height="192" fill="none" stroke={INK.accent} />
          <path d="M180 60H196M180 150H196M60 180V196M140 180V196M60 4V20M140 4V20" stroke={INK.accent} />
        </g>
      )}
    </svg>
  )
}

const dim = { stroke: 'rgb(var(--copper))', strokeWidth: 1, fill: 'none' }
const wall = { stroke: 'rgb(var(--graphite))', strokeWidth: 1.6, fill: 'none' }
const note = { fontFamily: 'Geist Variable, sans-serif', fontSize: 12.5, fill: 'rgb(var(--muted))' }

export function Typology({ kind, title }) {
  return (
    <svg viewBox="0 0 420 240" className="block w-full" role="img" aria-label={`Illustrative section drawing: ${title}`}>
      <path d="M0 200H420" stroke="rgb(var(--graphite))" strokeWidth="1" />
      {kind === 'poultry' && (
        <>
          <path d="M70 200V112L210 62L350 112V200" {...wall} />
          <path d="M196 67V50H224V67" {...wall} />
          <path d="M100 200V150H320V200" stroke="rgb(var(--graphite) / 0.4)" fill="none" strokeDasharray="4 4" />
          <path d="M210 40V22M204 30L210 22L216 30" {...dim} />
          <text x="224" y="30" {...note}>Ridge ventilation</text>
          <path d="M40 150H68M68 150L60 145M68 150L60 155" {...dim} />
          <text x="8" y="140" {...note}>Side air</text>
          <text x="148" y="178" {...note}>Feed and water lines</text>
        </>
      )}
      {kind === 'polyhouse' && (
        <>
          {[40, 150, 260].map((x) => (
            <path key={x} d={`M${x} 200V120C${x} 76 ${x + 110} 76 ${x + 110} 120V200`} {...wall} />
          ))}
          <path d="M40 200V140" stroke="rgb(var(--copper))" strokeWidth="3" />
          <path d="M370 200V140" stroke="rgb(var(--copper))" strokeWidth="3" />
          <text x="150" y="60" {...note}>Crop bays</text>
          <text x="8" y="130" {...note}>Side</text>
          <text x="8" y="146" {...note}>curtain</text>
          <g fill="rgb(var(--olive))">
            {[70, 100, 180, 210, 290, 320].map((x) => <rect key={x} x={x} y="178" width="10" height="22" />)}
          </g>
        </>
      )}
      {kind === 'pond' && (
        <>
          <path d="M20 150H90L150 214H290L340 150H410" stroke="rgb(var(--graphite))" strokeWidth="1.6" fill="rgb(var(--paper))" />
          <path d="M105 166H325L290 214H150Z" fill="#9fb7b4" stroke="none" />
          <path d="M105 166H325" stroke="rgb(var(--graphite))" />
          <path d="M60 150V118M56 126L60 118L64 126" {...dim} />
          <text x="20" y="108" {...note}>Inlet</text>
          <path d="M370 150V118" {...dim} />
          <text x="348" y="108" {...note}>Outlet</text>
          <text x="172" y="194" {...note}>Water depth</text>
          <text x="150" y="130" {...note}>Sloped embankment</text>
        </>
      )}
      {kind === 'water' && (
        <>
          <rect x="30" y="60" width="74" height="60" {...wall} />
          <text x="44" y="94" {...note}>Storage</text>
          <path d="M104 90H400" stroke="rgb(var(--copper))" strokeWidth="2.4" />
          {[160, 230, 300, 370].map((x) => (
            <path key={x} d={`M${x} 90V190`} {...dim} strokeDasharray="4 3" />
          ))}
          <text x="150" y="76" {...note}>Main line</text>
          <text x="176" y="214" fill="rgb(var(--muted))" fontSize="12.5" fontFamily="Geist Variable, sans-serif">Field laterals to drainage</text>
          <path d="M67 200V120" stroke="rgb(var(--graphite))" />
          <text x="20" y="182" {...note}>Source</text>
        </>
      )}
    </svg>
  )
}
