import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import { useSiteContent } from '../context/SiteContext'
import { buildConsultationChannels, getConsultationMeta } from '../utils/consultation'

function TeamsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.625 8.227V18.75a1.125 1.125 0 0 1-1.125 1.125h-7.5A1.125 1.125 0 0 1 10.875 18.75v-7.5a1.125 1.125 0 0 1 1.125-1.125h7.5a1.125 1.125 0 0 1 1.125 1.102zM9.375 10.5H3.375A1.125 1.125 0 0 0 2.25 11.625v7.125A1.125 1.125 0 0 0 3.375 19.875h6A1.125 1.125 0 0 0 10.5 18.75v-7.125A1.125 1.125 0 0 0 9.375 10.5zm8.25-7.875h-6a1.125 1.125 0 0 0-1.125 1.125v5.25h7.125A1.125 1.125 0 0 0 18.75 7.875v-3.75A1.125 1.125 0 0 0 17.625 2.625z" />
    </svg>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function EmailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function PortalIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

const ICONS = {
  teams: TeamsIcon,
  whatsapp: WhatsAppIcon,
  email: EmailIcon,
  phone: PhoneIcon,
  portal: PortalIcon,
}

const CHANNEL_STYLES = {
  teams: 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100',
  whatsapp: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100',
  email: 'bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100',
  phone: 'bg-amber-50 text-amber-800 border-amber-100 hover:bg-amber-100',
  portal: 'bg-white text-brand-700 border-white/30 hover:bg-brand-50',
}

function ChannelLink({ channel, variant }) {
  const Icon = ICONS[channel.id]
  const style =
    variant === 'banner'
      ? CHANNEL_STYLES[channel.id]
      : 'bg-white border-slate-200 text-slate-800 hover:border-brand-300 hover:shadow-md'

  const className = `flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl border transition-all hover:-translate-y-0.5 min-h-[100px] text-center ${style}`

  const content = (
    <>
      {Icon && <Icon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />}
      <span className="text-sm font-semibold leading-tight">{channel.label}</span>
      <span className={`text-xs leading-snug ${variant === 'banner' ? 'opacity-80' : 'text-slate-500'}`}>
        {channel.description}
      </span>
    </>
  )

  if (channel.href.startsWith('/')) {
    return (
      <Link to={channel.href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={channel.href}
      className={className}
      {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  )
}

export default function FreeConsultation({ variant = 'banner', id, className = '' }) {
  const { content } = useSiteContent()
  const contact = content?.branding?.contact || {}
  const consultation = content?.branding?.consultation || {}
  const meta = getConsultationMeta(contact, consultation)
  const channels = buildConsultationChannels(contact, consultation)

  if (variant === 'banner') {
    return (
      <div
        id={id}
        className={`p-6 sm:p-8 lg:p-10 rounded-2xl bg-brand-600 text-white text-center ${className}`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          {consultation.ctaTitle || 'Not sure which service you need?'}
        </h3>
        <p className="text-brand-100 mb-2 text-sm sm:text-base max-w-2xl mx-auto">
          {consultation.ctaText ||
            "Tell us about your business and we'll recommend the right solution — free consultation."}
        </p>
        <p className="inline-flex items-center justify-center gap-2 text-brand-100/90 text-xs sm:text-sm mb-6">
          <Clock className="w-4 h-4 shrink-0" />
          {meta.hoursNote}
        </p>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto mb-6">
          {channels.map((channel) => (
            <ChannelLink key={channel.id} channel={channel} variant="banner" />
          ))}
        </div>

        <Link
          to="/contact#consultation"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors min-h-[48px]"
        >
          Contact Our Team
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{meta.title}</h2>
        <p className="text-slate-600 text-sm sm:text-base">{meta.subtitle}</p>
        <p className="inline-flex items-center justify-center gap-2 mt-4 text-sm font-medium text-brand-700 bg-brand-50 px-4 py-2 rounded-full">
          <Clock className="w-4 h-4" />
          {meta.hoursNote}
        </p>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {channels.map((channel) => (
          <ChannelLink key={channel.id} channel={channel} variant="cards" />
        ))}
      </div>
    </section>
  )
}
