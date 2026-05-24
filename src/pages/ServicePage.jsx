import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import SectionImage from '../components/SectionImage'
import ContactForm from '../components/ContactForm'
import { overlayDefaults } from '../data/images'

export default function ServicePage({ service }) {
  const Icon = service.icon
  const heroImage = service.image || '/images/hero-home.jpg'

  return (
    <>
      <HeroBanner
        image={heroImage}
        overlay={overlayDefaults.dark}
      >
        <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur mb-6">
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 max-w-3xl">{service.title}</h1>
        <p className="text-lg text-slate-200 leading-relaxed mb-8 max-w-2xl">{service.shortDescription}</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
        >
          Request a Quote
          <ArrowRight className="w-5 h-5" />
        </Link>
      </HeroBanner>

      <section className="py-16 lg:py-24 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {service.cardImage && (
              <SectionImage
                src={service.cardImage}
                alt={`${service.title} in action`}
                className="aspect-[4/3] lg:sticky lg:top-24"
              />
            )}

            <div className={service.cardImage ? 'space-y-12' : 'lg:col-span-2 grid lg:grid-cols-2 gap-12 lg:gap-16'}>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">What We Offer</h2>
                <ul className="space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">Key Benefits</h2>
                <ul className="space-y-4">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3 text-center">
            Get Started with {service.title.split('&')[0].trim()}
          </h2>
          <p className="text-slate-600 text-center mb-10">
            Fill out the form below and our team will reach out with a tailored solution for your
            business.
          </p>
          <div className="bg-white/90 backdrop-blur-sm p-6 lg:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <ContactForm defaultService={service.title} />
          </div>
        </div>
      </section>
    </>
  )
}
