import Button from './Button.jsx'

// Full-width call-to-action band, used at the base of the Home page (and
// reusable anywhere a page should funnel visitors toward Contact).
export default function CTABanner({ heading, body, ctaLabel, ctaTo }) {
  return (
    <section className="bg-teal-800">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">{heading}</h2>
        {body && <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-teal-50/90">{body}</p>}
        <div className="mt-8">
          <Button to={ctaTo} variant="outlineLight" size="lg">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
