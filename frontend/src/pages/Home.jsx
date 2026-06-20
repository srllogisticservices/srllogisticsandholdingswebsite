import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
import HeroCarousel from '../components/HeroCarousel'
import QuickExplore from '../components/QuickExplore'
import FreeConsultation from '../components/FreeConsultation'
import ProjectShowcase from '../components/ProjectShowcase'
import ServiceCard from '../components/ServiceCard'
import PhotoGallery from '../components/PhotoGallery'
import SectionImage from '../components/SectionImage'
import { useSiteContent, overlays } from '../context/SiteContext'

export default function Home() {
  const { content } = useSiteContent()
  const {
    home,
    backgrounds,
    gallery,
    services,
    softwareSubServices,
    itServices,
    stats,
    testimonials,
  } = content

  const hero = home?.hero || {}
  const why = home?.whyChoose || {}
  const cta = home?.cta || {}
  const heroImage = backgrounds?.pages?.home || '/images/hero-home.jpg'
  const heroSlides =
    home?.heroSlides?.length > 0
      ? home.heroSlides
      : [{ src: heroImage, alt: 'SRL Logistics & Holdings' }]

  return (
    <>
      <HeroCarousel slides={heroSlides} overlay={overlays.light}>
        <span className="inline-block px-4 py-2 mb-5 text-xs sm:text-sm font-medium bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
          {hero.badge || 'Logistics · Cloud · Email · Software · Networking · Starlink'}
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6 max-w-3xl">
          {hero.title || 'One Partner for Your'}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-brand-400 to-brand-600">
            {hero.titleHighlight || 'Business Growth'}
          </span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed mb-8 sm:mb-10 max-w-2xl">
          {hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-400 hover:bg-brand-300 text-brand-950 font-semibold rounded-xl transition-colors shadow-lg shadow-brand-400/25 min-h-[48px]"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-colors min-h-[48px]"
          >
            View All Services
          </Link>
        </div>
      </HeroCarousel>

      <QuickExplore />

      <section className="bg-white/80 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-3 sm:p-0">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-700">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Our Services</h2>
            <p className="text-slate-600 text-base sm:text-lg px-2">
              Everything your business needs under one roof — from logistics and cloud hosting to
              software, networking, and Starlink deployments.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 mt-4 text-brand-600 font-semibold hover:text-brand-700"
            >
              Browse full catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mb-12 sm:mb-16">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4 sm:mb-6">Core Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          <div className="mb-12 sm:mb-16">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4 sm:mb-6">Software Development</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
              {softwareSubServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4 sm:mb-6">IT & Network Infrastructure</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {itServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-5 sm:mb-6">
                {why.title || 'Why Choose SRL?'}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                {why.description}
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {(why.points || []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <SectionImage
              src={why.image || backgrounds?.pages?.whyChoose}
              alt="SRL team collaborating on business solutions"
              className="order-1 lg:order-2 aspect-[4/3] lg:aspect-square max-h-[360px] sm:max-h-[480px] w-full"
            />
          </div>
        </div>
      </section>

      <PhotoGallery
        photos={gallery}
        title="Our Work in Action"
        subtitle="Real projects across logistics, cloud hosting, and software development for clients in the Solomon Islands and beyond."
      />

      <ProjectShowcase
        limit={3}
        className="bg-white/70 backdrop-blur-sm border-y border-slate-100"
      />

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Trusted by businesses across logistics, finance, retail, and technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <blockquote
                key={t.author}
                className="bg-white/90 backdrop-blur-sm p-5 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 flex-1 text-sm sm:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <p className="font-semibold text-slate-900">{t.author}</p>
                  <p className="text-sm text-slate-500">{t.role}, {t.company}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FreeConsultation variant="cards" />
        </div>
      </section>

      <section className="relative py-14 sm:py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-950/88" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            {cta.title || 'Ready to Transform Your Business?'}
          </h2>
          <p className="text-brand-200 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            {cta.text}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-400 text-brand-950 font-semibold rounded-xl hover:bg-brand-300 transition-colors shadow-lg min-h-[48px]"
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
