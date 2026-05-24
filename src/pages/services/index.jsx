import { services } from '../../data/services'
import ServicePage from '../ServicePage'

export function LogisticsPage() {
  return <ServicePage service={services[0]} />
}

export function CloudHostingPage() {
  return <ServicePage service={services[1]} />
}

export function EmailDomainsPage() {
  return <ServicePage service={services[2]} />
}

export function SoftwareDevPage() {
  return <ServicePage service={services[3]} />
}
