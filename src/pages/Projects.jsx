import { useState } from 'react'
import { PageHero, Partnerships, ProjectEntry, StatusKey } from '../components/shared.jsx'
import { projects } from '../data/projects.js'
import { verticals } from '../data/verticals.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

const FILTERS = [{ id: 'all', name: 'All' }, ...verticals]

export default function Projects() {
  useDocumentMeta(seo.projects)
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? projects : projects.filter((p) => p.vertical === filter)

  return (
    <>
      <PageHero
        title="Our work. Our initiatives. Our direction."
        lede="Each entry carries a status, so it is always clear what runs today and what is still ahead."
      />
      <section className="band-sm">
        <div className="shell">
          <StatusKey />
          <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filter by vertical">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`btn min-h-[2.5rem] px-4 text-[15px] ${filter === f.id ? 'btn-solid-dark' : 'btn-line-dark'}`}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="mt-8 border-b border-line">
            {shown.map((p) => <ProjectEntry key={p.slug} project={p} />)}
          </div>
          <p className="small mt-6 max-w-prose text-muted">Completed farm and infrastructure projects will be added here, with locations and photographs, as they are delivered.</p>
        </div>
      </section>
      <Partnerships />
    </>
  )
}
