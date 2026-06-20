import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { useSiteContent } from '../context/SiteContext'

export default function InfoStrip() {
  const { content } = useSiteContent()
  const contact = content?.branding?.contact || {}

  const links = [
    { icon: Phone, label: contact.phone, href: contact.phone ? `tel:${contact.phone.replace(/\s/g, '')}` : null },
    { icon: Mail, label: 'Email us', href: contact.email ? `mailto:${contact.email}` : null, hideOnMobile: true },
    { icon: Clock, label: contact.hours, href: null, hideOnMobile: true },
  ].filter((l) => l.label)

  return (
    <div className="hidden sm:block bg-brand-950 text-brand-100 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          {links.map(({ icon: Icon, label, href, hideOnMobile }) => (
            <span key={label} className={hideOnMobile ? 'hidden lg:inline-flex items-center gap-1.5' : 'inline-flex items-center gap-1.5'}>
              <Icon className="w-3.5 h-3.5 text-brand-400" />
              {href ? (
                <a href={href} className="hover:text-brand-300 transition-colors">{label}</a>
              ) : (
                <span>{label}</span>
              )}
            </span>
          ))}
          {contact.address && (
            <span className="hidden xl:inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              {contact.address}
            </span>
          )}
        </div>
        <Link to="/services" className="inline-flex items-center gap-1 font-medium text-brand-400 hover:text-brand-300 transition-colors">
          Browse all services
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
