import { useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import StageArt from './StageArt.jsx'
import useScrollProgress from '../lib/useScrollProgress.js'
import useReducedMotion from '../lib/useReducedMotion.js'
import { farmChain } from '../data/farmChain.js'

const N = farmChain.length

/**
 * "From land to product" — the five Kaimur Farms stages.
 *
 * lg+  : a pinned scroll sequence (Apple-style). The section is tall; an inner
 *        panel sticks to the viewport while scrolling advances the active
 *        stage — illustration cross-fades, copy swaps, a rail fills.
 * < lg : a plain stacked list, every stage visible, no pinning.
 * Reduced motion / no-JS: useScrollProgress resolves to 1, so the pinned view
 *        simply shows the last stage; the stacked list is the real fallback.
 */
export default function ProcessJourney() {
  const [active, setActive] = useState(0)
  const fillRef = useRef(null)
  const reduced = useReducedMotion()

  const trackRef = useScrollProgress(
    (p) => {
      const i = Math.max(0, Math.min(N - 1, Math.floor(p * N - 0.0001)))
      setActive((prev) => (prev === i ? prev : i))
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${Math.min(1, p * (N / (N - 1)))})`
      }
    },
    { enter: 0, exit: 1 },
  )

  return (
    <>
      {/* ---------- lg+ : pinned sequence (skipped under reduced motion) ---------- */}
      {!reduced && (
      <div
        ref={trackRef}
        className="relative mt-16 hidden lg:block"
        style={{ height: `${N * 68}vh` }}
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

      {/* ---------- < lg (and all reduced-motion) : stacked list ---------- */}
      <ol className={`mt-12 space-y-8 ${reduced ? '' : 'lg:hidden'}`}>
        {farmChain.map((stage, i) => (
          <Reveal
            as="li"
            key={stage.step}
            delay={i * 50}
            className="relative border-l-2 border-farms/30 pl-6"
          >
            <span className="font-display text-xs text-ink-muted">{stage.no}</span>
            <h3 className="mt-1 font-display text-2xl font-semibold">{stage.step}</h3>
            <p className="mt-2 max-w-sm text-sm text-ink-muted">{stage.body}</p>
            <div className="mt-4 border border-line bg-farms-wash/50 p-4">
              <StageArt scene={stage.scene} />
            </div>
          </Reveal>
        ))}
      </ol>
    </>
  )
}
