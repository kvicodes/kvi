import { useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import StageArt from './StageArt.jsx'
import useScrollProgress from '../lib/useScrollProgress.js'
import useReducedMotion from '../lib/useReducedMotion.js'
import useMediaQuery from '../lib/useMediaQuery.js'
import { farmChain } from '../data/farmChain.js'

const N = farmChain.length

/**
 * "From land to product" — the five Kaimur Farms stages.
 *
 * Large desktop (>= lg, motion allowed): a pinned scroll sequence. The section
 *   is tall; an inner panel sticks to the viewport while native scrolling
 *   advances the active stage — illustration cross-fades, copy swaps, a rail
 *   fills. The page never stops scrolling; nothing is hijacked.
 * Everything else (tablet, mobile, reduced motion, no-JS): the same five stages
 *   as ordinary vertical content on one continuous rail, each revealing in on
 *   scroll. Native touch scrolling throughout.
 *
 * The tall pinned track is only mounted when it is actually used, so small
 * screens never carry a 300vh+ invisible element or its scroll listener.
 */
export default function ProcessJourney() {
  const [active, setActive] = useState(0)
  const fillRef = useRef(null)
  const reduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const pinned = isDesktop && !reduced

  const trackRef = useScrollProgress(
    (p) => {
      const i = Math.max(0, Math.min(N - 1, Math.floor(p * N - 0.0001)))
      setActive((prev) => (prev === i ? prev : i))
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${Math.min(1, p * (N / (N - 1)))})`
      }
    },
    { enter: 0, exit: 1, enabled: pinned },
  )

  return (
    <>
      {/* ---------- large desktop : pinned sequence ---------- */}
      {pinned && (
        <div
          ref={trackRef}
          className="relative mt-16 hidden lg:block"
          style={{ height: `${N * 72}vh` }}
        >
          <div className="sticky top-0 flex h-screen items-center">
            <div className="grid w-full grid-cols-12 gap-12">
              {/* Stage index */}
              <ol className="relative col-span-4 flex flex-col gap-2 self-start border-l border-line-strong pl-6">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 -ml-px h-full w-px overflow-hidden"
                >
                  <span
                    ref={fillRef}
                    className="block h-full w-px origin-top scale-y-0 bg-farms"
                  />
                </span>
                {farmChain.map((stage, i) => {
                  const on = i === active
                  return (
                    <li key={stage.step}>
                      <button
                        type="button"
                        aria-current={on ? 'step' : undefined}
                        onClick={() => {
                          const el = trackRef.current
                          if (!el) return
                          const y =
                            window.scrollY +
                            el.getBoundingClientRect().top +
                            (el.offsetHeight - window.innerHeight) * ((i + 0.5) / N)
                          window.scrollTo({ top: y, behavior: 'smooth' })
                        }}
                        className="group flex w-full items-baseline gap-4 py-2 text-left"
                      >
                        <span
                          className={`font-display text-xs tabular-nums transition-colors ${
                            on ? 'text-farms' : 'text-ink-muted'
                          }`}
                        >
                          {stage.no}
                        </span>
                        <span
                          className={`font-display text-2xl font-semibold transition-all duration-500 ease-editorial ${
                            on
                              ? 'translate-x-0 text-ink'
                              : 'text-ink-muted group-hover:text-ink'
                          }`}
                        >
                          {stage.step}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>

              {/* Stage stage */}
              <div className="col-span-8">
                <div className="relative overflow-hidden border border-line bg-farms-wash/40">
                  {farmChain.map((stage, i) => (
                    <div
                      key={stage.step}
                      aria-hidden={i !== active}
                      className={`p-10 transition-[opacity,transform] duration-700 ease-editorial ${
                        i === active
                          ? 'opacity-100'
                          : 'pointer-events-none absolute inset-0 translate-y-3 opacity-0'
                      }`}
                    >
                      <StageArt scene={stage.scene} className="mx-auto max-w-lg" />
                    </div>
                  ))}
                </div>
                <div className="relative mt-8 min-h-[8.5rem]">
                  {farmChain.map((stage, i) => (
                    <div
                      key={stage.step}
                      aria-hidden={i !== active}
                      className={`transition-[opacity,transform] duration-500 ease-editorial ${
                        i === active
                          ? 'opacity-100'
                          : 'pointer-events-none absolute inset-0 translate-y-2 opacity-0'
                      }`}
                    >
                      <h3 className="font-display text-3xl font-semibold">{stage.step}</h3>
                      <p className="mt-3 max-w-md text-base text-ink-muted">{stage.body}</p>
                    </div>
                  ))}
                </div>
                {/* Progress ticks */}
                <div className="mt-8 flex gap-1.5" aria-hidden="true">
                  {farmChain.map((s, i) => (
                    <span
                      key={s.step}
                      className={`h-0.5 flex-1 transition-colors duration-500 ${
                        i <= active ? 'bg-farms' : 'bg-line-strong'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- tablet / mobile / reduced-motion / no-JS : stacked rail ---------- */}
      <ol className={`mt-12 ${pinned ? 'lg:hidden' : ''}`}>
        {farmChain.map((stage, i) => (
          <Reveal
            as="li"
            key={stage.step}
            delay={i * 60}
            className="relative border-l border-line-strong pb-10 pl-6 last:pb-0 sm:pl-8"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-farms bg-paper"
            />
            <div className="flex items-baseline gap-3">
              <span className="font-display text-xs tabular-nums text-farms">{stage.no}</span>
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">{stage.step}</h3>
            </div>
            <p className="mt-2 max-w-sm text-sm text-ink-muted">{stage.body}</p>
            <div className="mt-5 max-w-sm border border-line bg-farms-wash/50 p-5">
              <StageArt scene={stage.scene} />
            </div>
          </Reveal>
        ))}
      </ol>
    </>
  )
}
