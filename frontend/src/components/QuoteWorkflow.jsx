import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { useSiteContent } from '../context/SiteContext'
import { buildConsultationChannels } from '../utils/consultation'
import { buildQuoteMailtoFromContact, getQuoteEmail } from '../utils/quote'

const STEPS = [
  { step: '1', title: 'Send your request', text: 'Fill in the form or email us your requirements.' },
  { step: '2', title: 'We review', text: 'Our team reads your request and prepares options.' },
  { step: '3', title: 'You get your quote', text: 'We reply within 24 hours with pricing and next steps.' },
]

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

export default function QuoteWorkflow() {
  const { content } = useSiteContent()
  const contact = content?.branding?.contact || {}
  const consultation = content?.branding?.consultation || {}
  const quoteEmail = getQuoteEmail(contact)
  const quoteHref = buildQuoteMailtoFromContact(contact)
  const whatsapp = buildConsultationChannels(contact, consultation).find((c) => c.id === 'whatsapp')
  const tel = contact.phone?.replace(/\s/g, '')

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STEPS.map(({ step, title, text }) => (
          <div
            key={step}
            className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-600 text-white text-sm font-bold shrink-0">
              {step}
            </span>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-brand-50 border border-brand-100">
        <h3 className="font-semibold text-slate-900 mb-3 text-sm sm:text-base">Quick ways to reach us</h3>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <a
            href={quoteHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email {quoteEmail}
          </a>
          {tel && (
            <a
              href={`tel:${tel}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl hover:border-brand-300 transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              Call {contact.phone}
            </a>
          )}
          {whatsapp && (
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl hover:border-emerald-300 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
              WhatsApp
            </a>
          )}
          <a
            href="#quote-form"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl hover:border-brand-300 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-brand-600" />
            Use form below
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
