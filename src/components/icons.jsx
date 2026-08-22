// Maps the icon name strings used in src/data/content.js to actual
// lucide-react components. Keeps content.js free of React imports.
import {
  Layers,
  Sprout,
  Cpu,
  Recycle,
  Lightbulb,
  Leaf,
  MapPin,
  Rocket,
  Wheat,
  Warehouse,
  Satellite,
  HardHat,
  LayoutDashboard,
  Mail,
  Phone,
  Clock,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

export const icons = {
  Layers,
  Sprout,
  Cpu,
  Recycle,
  Lightbulb,
  Leaf,
  MapPin,
  Rocket,
  Wheat,
  Warehouse,
  Satellite,
  HardHat,
  LayoutDashboard,
  Mail,
  Phone,
  Clock,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
}

// Renders an icon by its name key, falling back gracefully if unknown.
export default function Icon({ name, className }) {
  const Cmp = icons[name]
  if (!Cmp) return null
  return <Cmp className={className} />
}
