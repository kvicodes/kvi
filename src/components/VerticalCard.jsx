import { Link } from 'react-router-dom'
import Icon from './icons.jsx'
import Card from './Card.jsx'

// Card for one business vertical, linking to its dedicated /services/:slug page.
// Used on both the Home page snapshot and the Services overview page.
export default function VerticalCard({ vertical }) {
  return (
    <Link to={`/services/${vertical.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col group-hover:-translate-y-1">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-700 transition-colors duration-200 group-hover:bg-forest-700 group-hover:text-white">
          <Icon name={vertical.icon} className="h-6 w-6" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-forest-950">{vertical.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-800/75">
          {vertical.shortDescription}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-teal-700">
          Learn more
          <Icon
            name="ArrowRight"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Card>
    </Link>
  )
}
