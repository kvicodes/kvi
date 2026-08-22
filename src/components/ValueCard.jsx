import Icon from './icons.jsx'
import Card from './Card.jsx'

// Icon + title + description card used for core values and differentiators.
export default function ValueCard({ icon, title, description }) {
  return (
    <Card className="h-full">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="font-heading text-base font-semibold text-forest-950">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-forest-800/75">{description}</p>
    </Card>
  )
}
