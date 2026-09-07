import BusinessPage from '../components/BusinessPage.jsx'
import { byId } from '../data/businesses.js'

export default function Infra() {
  return (
    <BusinessPage
      business={byId('kvi-infra')}
      metaDescription="KVI Infra develops agricultural assets, infrastructure and physical projects — farm development, irrigation, farm buildings, warehousing and construction."
    />
  )
}
