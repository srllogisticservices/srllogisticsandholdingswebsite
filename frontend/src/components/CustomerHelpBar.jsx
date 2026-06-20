import { Link } from 'react-router-dom'
import { Phone, MessageCircle } from 'lucide-react'
import { useSiteContent } from '../context/SiteContext'
import { buildConsultationChannels } from '../utils/consultation'

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

export default function CustomerHelpBar() {
  const { content } = useSiteContent()
  const contact = content?.branding?.contact || {}
  const consultation = content?.branding?.consultation || {}
  const phone = contact.phone || '+677 7885155'
  const tel = phone.replace(/\s/g, '')
  const whatsappChannel = buildConsultationChannels(contact, consultation).find((c) => c.id === 'whatsapp')

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-brand-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-pb safe-area-inset-x">
      <div className="grid grid-cols-3 divide-x divide-slate-100">
        <a
          href={`tel:${tel}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-slate-700 hover:bg-slate-50 active:bg-slate-100 min-h-[56px]"
        >
          <Phone className="w-5 h-5 text-brand-600" />
          <span className="text-xs font-medium">Call Us</span>
        </a>
        {whatsappChannel ? (
          <a
            href={whatsappChannel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3 text-slate-700 hover:bg-slate-50 active:bg-slate-100 min-h-[56px]"
          >
            <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
        ) : (
          <Link
            to="/services"
            className="flex flex-col items-center justify-center gap-1 py-3 text-slate-700 hover:bg-slate-50 active:bg-slate-100 min-h-[56px]"
          >
            <MessageCircle className="w-5 h-5 text-brand-600" />
            <span className="text-xs font-medium">Services</span>
          </Link>
        )}
        <Link
          to="/quote"
          className="flex flex-col items-center justify-center gap-1 py-3 text-brand-700 bg-brand-50 hover:bg-brand-100 active:bg-brand-100 min-h-[56px]"
        >
          <MessageCircle className="w-5 h-5 text-brand-600" />
          <span className="text-xs font-semibold">Get Quote</span>
        </Link>
      </div>
    </div>
  )
}
