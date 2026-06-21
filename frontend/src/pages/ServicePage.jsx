import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Phone } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import Breadcrumbs from '../components/Breadcrumbs'
import SectionImage from '../components/SectionImage'
import HostedSolutionCard from '../components/HostedSolutionCard'
import ServiceCard from '../components/ServiceCard'
import ContactForm from '../components/ContactForm'
import { hostedSolutions, softwareSubServices } from '../data/services'
import { useSiteContent, overlays } from '../context/SiteContext'

function getRelatedServices(service, content) {
  const all = [
    ...(content?.services || []),
    ...(content?.softwareSubServices || []),
    ...(content?.itServices || []),
  ]
  return all.filter((s) => s.id !== service.id).slice(0, 3)
}

export default function ServicePage({ service }) {
  const { content } = useSiteContent()
  const hosted = content?.hostedSolutions || hostedSolutions
  const softwareSubs = content?.softwareSubServices || softwareSubServices
  const contact = content?.branding?.contact || {}
  const related = getRelatedServices(service, content)
  const Icon = service.icon
  const heroImage = service.image || '/images/hero-home.jpg'

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Services & Products', to: '/services' },
          { label: service.title },
        ]}
      />

      <HeroBanner image={heroImage} overlay={overlays.dark} minHeight="min-h-[320px] sm:min-h-[400px]">
        <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur mb-5 sm:mb-6">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 max-w-3xl">{service.title}</h1>
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
          {service.shortDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to={`/quote?service=${encodeURIComponent(service.title)}`}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg min-h-[48px]"
          >
            Request a Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
          {contact.phone && (
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors min-h-[48px]"
            >
              <Phone className="w-5 h-5" />
              Call {contact.phone}
            </a>
          )}
        </div>
      </HeroBanner>

      <section className="py-12 sm:py-16 lg:py-24 bg-white/70 backdrop-blur-sm">
        <div className="container-page w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {service.cardImage && (
              <SectionImage
                src={service.cardImage}
                alt={`${service.title} in action`}
                className="aspect-[4/3] lg:sticky lg:top-28 rounded-2xl"
              />
            )}

            <div className={service.cardImage ? 'space-y-10 sm:space-y-12' : 'lg:col-span-2 grid lg:grid-cols-2 gap-10 lg:gap-16'}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">What We Offer</h2>
                <ul className="space-y-3 sm:space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">Key Benefits</h2>
                <ul className="space-y-3 sm:space-y-4">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm sm:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {service.showSubServices && (
        <section className="py-12 sm:py-16 lg:py-24 bg-slate-50/80">
          <div className="container-page w-full">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                Software Development Services
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Explore our specialized software development offerings — from databases and
                integrations to DevOps and mobile apps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              {softwareSubs.map((sub) => (
                <ServiceCard key={sub.id} service={sub} />
              ))}
            </div>
          </div>
        </section>
      )}

      {service.showHostedSolutions && (
        <section className="py-12 sm:py-16 lg:py-24 bg-slate-50/80">
          <div className="container-page w-full">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                Hosted Business Systems
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Ready-to-use platforms we host and manage for your organization. Select one to
                learn more.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {hosted.map((solution) => (
                <HostedSolutionCard key={solution.id} solution={solution} />
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-white/70 border-t border-slate-100">
          <div className="container-page w-full">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">You may also need</h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">Related services from SRL</p>
              </div>
              <Link to="/services" className="text-brand-600 font-semibold text-sm hover:underline shrink-0">
                View all services →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 lg:py-24 pb-24 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 text-center">
            Get Started Today
          </h2>
          <p className="text-slate-600 text-center mb-8 sm:mb-10 text-sm sm:text-base">
            Fill out the form and our team will reach out with a tailored quote for{' '}
            <strong>{service.title}</strong>.
          </p>
          <div className="bg-white/90 backdrop-blur-sm p-5 sm:p-6 lg:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <ContactForm defaultService={service.title} />
          </div>
        </div>
      </section>
    </>
  )
}
