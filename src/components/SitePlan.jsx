import { memo, useId } from 'react'
import { sitePlan as plan } from '../data/sitePlan.js'

const ALL = ['greens', 'infra', 'tech']

function Patterns({ id }) {
  const line = { stroke: 'var(--plan-pattern)', strokeWidth: 1, fill: 'none' }
  return (
    <defs>
      {[-22, 8, 71].map((angle, i) => (
        <pattern key={angle} id={`${id}rows${i}`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
          <path d="M0 4.5H9" {...line} />
        </pattern>
      ))}
      <pattern id={`${id}orchard`} width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(6)">
        <circle cx="12" cy="12" r="5" fill="var(--plan-pattern)" />
      </pattern>
      <pattern id={`${id}plantation`} width="17" height="29" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
        <circle cx="4" cy="7" r="3" fill="var(--plan-pattern)" />
        <circle cx="12.5" cy="21.5" r="3" fill="var(--plan-pattern)" />
      </pattern>
      <pattern id={`${id}nursery`} width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.1" fill="var(--plan-pattern)" />
      </pattern>
      <pattern id={`${id}ribs`} width="7" height="7" patternUnits="userSpaceOnUse">
        <path d="M0 3.5H7" stroke="var(--plan-infra-soft)" strokeWidth="1" />
      </pattern>
    </defs>
  )
}

const toneFill = { a: 'var(--plan-parcel-a)', b: 'var(--plan-parcel-b)', c: 'var(--plan-parcel-c)' }

/**
 * The KVI site plan. Pass `active` to bring one layer forward (the others drop
 * back rather than vanish, so the land always reads as one place). `show`
 * removes layers entirely. `viewBox` crops it for small screens.
 */
function SitePlan({
  active = null,
  show = ALL,
  tone = 'dark',
  animate = false,
  labels = false,
  viewBox = `0 0 ${plan.width} ${plan.height}`,
  title,
  className = '',
  slice = true,
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const on = (layer) => !active || active === 'all' || active === layer
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true }

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio={slice ? 'xMidYMid slice' : 'xMidYMid meet'}
      className={`plan ${animate ? 'plan-animate' : ''} ${className}`}
      data-tone={tone}
      {...a11y}
    >
      <Patterns id={id} />

      <g fill="none" stroke="var(--plan-contour)" strokeWidth="1">
        {plan.contours.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {show.includes('greens') && (
        <g className="plan-layer" data-on={on('greens')}>
          {plan.parcels.map((p) => {
            const delay = animate ? { '--d': `${p.delay}s` } : undefined
            if (p.type === 'pond') {
              return <path key={p.d} d={p.d} fill="var(--plan-water)" className="plan-grow" style={delay} />
            }
            return (
              <g key={p.d} className="plan-grow" style={delay}>
                <path d={p.d} fill={toneFill[p.tone]} />
                {p.type !== 'yard' && <path d={p.d} fill={`url(#${id}${p.type})`} />}
              </g>
            )
          })}
        </g>
      )}

      {show.includes('infra') && (
        <g className="plan-layer" data-on={on('infra')} fill="none" stroke="var(--plan-infra)">
          {plan.roads.map((r, i) => (
            <path
              key={r.d}
              d={r.d}
              pathLength="1"
              className="plan-draw"
              strokeWidth={r.main ? 3.4 : 1.8}
              style={animate ? { '--d': `${0.15 + i * 0.09}s` } : undefined}
            />
          ))}
          <path d={plan.canal} pathLength="1" className="plan-draw" strokeWidth="2.2" strokeDasharray={animate ? undefined : '14 6'} style={animate ? { '--d': '0.7s' } : undefined} />
          {plan.channels.map((d) => (
            <path key={d} d={d} strokeWidth="1" strokeOpacity="0.7" strokeDasharray="6 5" />
          ))}
          {plan.buildings.map((b) => (
            <path
              key={b.d}
              d={b.d}
              strokeWidth="1.5"
              fill={b.kind === 'polyhouse' ? `url(#${id}ribs)` : 'var(--plan-infra-soft)'}
              className="plan-grow"
              style={animate ? { '--d': '1.5s' } : undefined}
            />
          ))}
        </g>
      )}

      {show.includes('tech') && (
        <g className="plan-layer" data-on={on('tech')}>
          <g fill="none" stroke="var(--plan-tech)" strokeWidth="0.9" strokeOpacity="0.55">
            {plan.links.map((d) => (
              <path key={d} d={d} className="plan-grow" style={animate ? { '--d': '2.1s' } : undefined} />
            ))}
          </g>
          {plan.nodes.map((node) => (
            <g key={`${node.x}-${node.y}`} className="plan-grow" style={animate ? { '--d': '2.3s' } : undefined}>
              <circle cx={node.x} cy={node.y} r={node.hub ? 11 : 4.5} fill="var(--plan-tech)" />
              <circle cx={node.x} cy={node.y} r={node.hub ? 22 : 11} fill="none" stroke="var(--plan-tech)" strokeWidth="0.9" strokeOpacity="0.6" />
            </g>
          ))}
        </g>
      )}

      {labels && (
        <g fontFamily="Geist Variable, sans-serif" fontSize="17" fill="var(--plan-label)">
          {plan.labels.map((l) => (
            <text key={l.text} x={l.x} y={l.y} paintOrder="stroke" stroke="var(--label-halo, transparent)" strokeWidth="5">
              {l.text}
            </text>
          ))}
        </g>
      )}
    </svg>
  )
}

export default memo(SitePlan)
