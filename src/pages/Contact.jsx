import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import SectionImage from '../components/SectionImage'
import ContactForm from '../components/ContactForm'
import { backgrounds, overlayDefaults } from '../data/images'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@srllogisticsandholdings.com',
    href: 'mailto:info@srllogisticsandholdings.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+677 7885155',
    href: 'tel:+6777885155',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Green Valley, East Honiara, Solomon Islands',
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Fri: 8:00 AM – 6:00 PM',
    href: null,
  },
]

export default function Contact() {
  return (
    <>
      <HeroBanner image={backgrounds.pages.contact} overlay={overlayDefaults.medium} minHeight="min-h-[320px] lg:min-h-[380px]">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-slate-200 max-w-2xl">
          Have a question or ready to get started? Reach out and our team will respond within 24
          hours.
        </p>
      </HeroBanner>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Get in Touch</h2>
                <p className="text-slate-600">
                  We&apos;d love to hear from you. Choose the best way to reach us.
                </p>
              </div>

              <SectionImage
                src={backgrounds.pages.contact}
                alt="SRL office in Honiara, Solomon Islands"
                className="aspect-video hidden lg:block"
              />

              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-2.5 rounded-lg bg-brand-50">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    {href ? (
                      <a href={href} className="text-slate-900 font-medium hover:text-brand-600 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-900 font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 bg-white/90 backdrop-blur-sm p-6 lg:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
