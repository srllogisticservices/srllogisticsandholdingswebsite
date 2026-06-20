import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import Breadcrumbs from '../components/Breadcrumbs'
import SectionImage from '../components/SectionImage'
import ContactForm from '../components/ContactForm'
import FreeConsultation from '../components/FreeConsultation'
import { useSiteContent, overlays } from '../context/SiteContext'

export default function Contact() {
  const { content } = useSiteContent()
  const contact = content.branding?.contact || {}
  const heroImage = content.backgrounds?.pages?.contact || '/images/contact.jpg'

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : null,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: contact.phone ? `tel:${contact.phone.replace(/\s/g, '')}` : null,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: contact.address,
      href: null,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: contact.hours,
      href: null,
    },
  ].filter((item) => item.value)

  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <HeroBanner
        image={heroImage}
        overlay={overlays.medium}
        minHeight="min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Contact Us</h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mb-6">
          Book a free consultation via Teams, WhatsApp, email, phone, or our web portal. We respond
          within 24 hours.
        </p>
        <Link
          to="/quote"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg min-h-[48px]"
        >
          Get a Quote
          <ArrowRight className="w-5 h-5" />
        </Link>
      </HeroBanner>

      <section className="py-12 sm:py-16 bg-white/70 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FreeConsultation id="consultation" variant="cards" />
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14">
            <div className="lg:col-span-2 space-y-5 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Get in Touch</h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  We&apos;d love to hear from you. Choose the best way to reach us.
                </p>
              </div>

              <SectionImage
                src={heroImage}
                alt="SRL office in Honiara, Solomon Islands"
                className="aspect-video hidden md:block rounded-2xl"
              />

              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm"
                >
                  <div className="p-2.5 rounded-lg bg-brand-50 shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-slate-900 font-medium hover:text-brand-600 transition-colors break-all text-sm sm:text-base"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-900 font-medium text-sm sm:text-base">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 bg-white/90 backdrop-blur-sm p-5 sm:p-6 lg:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
