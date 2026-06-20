import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useSiteContent } from '../context/SiteContext'
import Logo from './Logo'

export default function Footer() {
  const { content } = useSiteContent()
  const { branding, services, softwareSubServices, itServices, hostedSolutions } = content
  const contact = branding.contact || {}
  const coreServices = services.filter((s) => s.id !== 'software')

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-5">
              <Logo variant="light" size="md" />
            </div>
            <p className="text-sm leading-relaxed text-brand-200/80 max-w-xs">
              Logistics, cloud hosting, software development, networking, and IT infrastructure
              for businesses across the Solomon Islands.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-brand-300 transition-colors font-medium text-brand-400">
                  All Services & Products →
                </Link>
              </li>
              {coreServices.map((s) => (
                <li key={s.id}>
                  <Link to={s.slug} className="hover:text-brand-300 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services/software-development" className="hover:text-brand-300 transition-colors">
                  Software Dev
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Software Dev</h3>
            <ul className="space-y-2.5 text-sm">
              {softwareSubServices.map((s) => (
                <li key={s.id}>
                  <Link to={s.slug} className="hover:text-brand-300 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">IT & Network</h3>
            <ul className="space-y-2.5 text-sm">
              {itServices.map((s) => (
                <li key={s.id}>
                  <Link to={s.slug} className="hover:text-brand-300 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Hosted Systems</h3>
            <ul className="space-y-2.5 text-sm">
              {hostedSolutions.map((solution) => (
                <li key={solution.id}>
                  <Link to={solution.slug} className="hover:text-brand-300 transition-colors">
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <Link to="/about" className="hover:text-brand-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-300 transition-colors">Our Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-300 transition-colors">Contact</Link>
              </li>
            </ul>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span className="break-all">{contact.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-brand-200/70">
          <div className="text-center sm:text-left space-y-1">
            <p>
              Copyright © {new Date().getFullYear()} - {branding.companyName}. All rights reserved.
            </p>
            <Link to="/admin/login" className="text-brand-300/50 hover:text-brand-300 text-xs">
              System Administrator
            </Link>
          </div>
          {contact.facebook && (
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Facebook"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-900 text-brand-200 hover:bg-brand-400 hover:text-brand-950 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
