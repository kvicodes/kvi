/**
 * Dark hero band used at the top of every interior page (About, Services,
 * ServiceDetail, Contact). The Home page uses its own larger hero instead.
 */
export default function PageHero({ eyebrow, heading, subheading }) {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-fade opacity-20 [background-size:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-forest-600/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center animate-fade-up">
        {eyebrow && (
          <p className="mb-4 text-sm font-heading font-semibold uppercase tracking-widest text-teal-300">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight text-white">
          {heading}
        </h1>
        {subheading && (
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-sand-100/85">
            {subheading}
          </p>
        )}
      </div>
    </section>
  )
}
