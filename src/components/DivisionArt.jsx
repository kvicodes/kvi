// Illustration panels for the three division cards. Decorative (aria-hidden).
//   kvi-greens — paddy rows in perspective under a low sun, on deep green
//   kv-infra   — a braced structure with dimension lines, on a blueprint grid
//   kvi-tech   — layered interface windows and a signal, on a dot lattice
// The panel background is set by the caller so the art can sit on any surface.

const greensRows = Array.from({ length: 14 }, (_, i) => -260 + i * 66)
const greensStalks = Array.from({ length: 22 }, (_, i) => 12 + i * 18)

const ART = {
  'kvi-greens': (
    <>
      <circle cx="258" cy="74" r="32" fill="rgb(var(--c-grain) / 0.14)" stroke="rgb(var(--c-grain) / 0.6)" strokeWidth="1.2" />
      <path d="M0 132 C 120 118 260 116 400 128 V240 H0 Z" fill="rgb(var(--c-forest))" />
      {greensRows.map((x) => (
        <line key={x} x1="200" y1="120" x2={x} y2="240" stroke="rgb(var(--c-paper) / 0.08)" />
      ))}
      {greensStalks.map((x, i) => {
        const h = 34 + ((i * 37) % 26)
        return (
          <g key={x}>
            <path d={`M${x} 240 Q${x + 2} ${240 - h * 0.6} ${x + 7} ${240 - h}`} stroke="rgb(var(--c-forest-soft))" strokeWidth="1.3" strokeLinecap="round" />
            <path
              d={`M${x + 7} ${240 - h} q8 -3 11 10`}
              stroke="rgb(var(--c-grain) / 0.9)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0.1 4"
            />
          </g>
        )
      })}
    </>
  ),
  'kv-infra': (
    <g stroke="rgb(var(--c-infra))" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 196h320" strokeWidth="1.4" />
      <path d="M40 204h320" strokeOpacity="0.35" />
      <path d="M96 196V92l104-44 104 44v104" strokeWidth="1.4" />
      <path d="M96 92h208M200 48v148" strokeOpacity="0.6" />
      <path d="M96 196l104-70 104 70M96 92l104 50 104-50" strokeOpacity="0.4" />
      <path d="M148 196v-38h28v38M224 196v-38h28v38" strokeOpacity="0.6" />
      <path d="M96 220h208M96 214v12M304 214v12" stroke="rgb(var(--c-earth))" />
      <path d="M332 92v104M326 92h12M326 196h12" stroke="rgb(var(--c-earth))" />
      <circle cx="200" cy="48" r="4" fill="rgb(var(--c-paper))" />
    </g>
  ),
  'kvi-tech': (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x="54" y="40" width="200" height="136" rx="3" fill="rgb(var(--c-paper-raised))" stroke="rgb(var(--c-tech) / 0.6)" />
      <path d="M54 60h200" stroke="rgb(var(--c-tech) / 0.4)" />
      <path d="M64 50h.01M72 50h.01M80 50h.01" stroke="rgb(var(--c-tech))" strokeWidth="3" />
      <path d="M72 150l30-34 26 20 40-48 34 22" stroke="rgb(var(--c-tech))" strokeWidth="1.4" />
      {[
        [72, 150],
        [102, 116],
        [128, 136],
        [168, 88],
        [202, 110],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3.4" fill="rgb(var(--c-paper-raised))" stroke="rgb(var(--c-tech))" strokeWidth="1.4" />
      ))}
      <rect x="196" y="98" width="150" height="104" rx="3" fill="rgb(var(--c-paper-raised))" stroke="rgb(var(--c-tech) / 0.6)" />
      <path d="M196 116h150" stroke="rgb(var(--c-tech) / 0.4)" />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <path d={`M210 ${134 + r * 16}h70`} stroke="rgb(var(--c-tech) / 0.35)" />
          <path d={`M300 ${134 + r * 16}h${r === 1 ? 32 : 20}`} stroke={r === 1 ? 'rgb(var(--c-accent))' : 'rgb(var(--c-tech) / 0.35)'} strokeWidth={r === 1 ? 2 : 1} />
        </g>
      ))}
    </g>
  ),
}

export default function DivisionArt({ id, className = '' }) {
  const art = ART[id]
  if (!art) return null
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-full w-full ${className}`}
    >
      {art}
    </svg>
  )
}
