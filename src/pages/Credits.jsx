import { PageHero } from '../components/shared.jsx'
import { credited, video } from '../data/media.js'
import { seo } from '../data/seo.js'
import useDocumentMeta from '../lib/useDocumentMeta.js'

export default function Credits() {
  useDocumentMeta(seo.credits)
  return (
    <>
      <PageHero title="Photo credits." lede="Photographs on this site are free-licence images from Wikimedia Commons. They are illustrative and do not show KVI projects." tone="light" />
      <section className="band-sm">
        <div className="shell max-w-prose">
          <ul>
            {credited.map((m) => (
              <li key={m.slot} className="border-t border-line py-5">
                <p className="title">{m.credit.title}</p>
                <p className="mt-1">
                  By {m.credit.author}. Licence:{' '}
                  <a href={m.credit.licenceUrl} target="_blank" rel="noreferrer noopener" className="tlink">{m.credit.licence}</a>.{' '}
                  <a href={m.credit.source} target="_blank" rel="noreferrer noopener" className="tlink">Original on Wikimedia Commons</a>.
                </p>
                <p className="small mt-1 text-muted">Changes: {m.credit.changes}.</p>
              </li>
            ))}
            <li className="border-t border-line py-5">
              <p className="title">A road between a big green agriculture field</p>
              <p className="mt-1">
                Video from Mixkit, free for commercial use without attribution.{' '}
                <a href={video.page} target="_blank" rel="noreferrer noopener" className="tlink">Source</a>.
              </p>
            </li>
          </ul>
          <p className="small mt-6 text-muted">
            Photographs under CC BY-SA remain under that licence in the form shown here. Drawings and plates on this site are KVI's own.
          </p>
        </div>
      </section>
    </>
  )
}
