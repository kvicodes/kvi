import Section from '../components/Section.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'

export default function ContactCtaSection({
  heading = "Let's build something useful.",
  body = 'For partnerships, business enquiries, technology initiatives and other opportunities, get in touch with KVI.',
}) {
  return (
    <Section tone="accent" divide>
      <Reveal className="max-w-3xl">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl">{heading}</h2>
        <p className="mt-6 max-w-prose text-lg text-paper/75">{body}</p>
        <div className="mt-10">
          <Button to="/contact" size="lg" variant="inverse" withArrow>
            Contact KVI
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
