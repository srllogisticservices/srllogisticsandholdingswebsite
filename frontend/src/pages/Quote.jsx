import { useSearchParams } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import Breadcrumbs from '../components/Breadcrumbs'
import QuoteWorkflow from '../components/QuoteWorkflow'
import QuoteForm from '../components/QuoteForm'
import { useSiteContent, overlays } from '../context/SiteContext'
import { getQuoteEmail } from '../utils/quote'

export default function Quote() {
  const { content } = useSiteContent()
  const contact = content?.branding?.contact || {}
  const quoteEmail = getQuoteEmail(contact)
  const heroImage = content.backgrounds?.pages?.contact || '/images/contact.jpg'
  const [searchParams] = useSearchParams()
  const defaultService = searchParams.get('service') || searchParams.get('project') || ''

  return (
    <>
      <Breadcrumbs items={[{ label: 'Get a Quote' }]} />

      <HeroBanner
        image={heroImage}
        overlay={overlays.medium}
        minHeight="min-h-[240px] sm:min-h-[280px]"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Get a Quote</h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl">
          Tell us what you need — we&apos;ll send a custom quote to your email within 24 hours.
          All requests go to <strong className="text-white">{quoteEmail}</strong>.
        </p>
      </HeroBanner>

      <section className="py-10 sm:py-14 bg-white/80 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteWorkflow />
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm p-5 sm:p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Request Your Quote</h2>
            <p className="text-slate-600 text-sm mb-6">
              Complete the form below or use the email button if you prefer to write from your inbox.
            </p>
            <QuoteForm defaultService={defaultService} />
          </div>
        </div>
      </section>
    </>
  )
}
