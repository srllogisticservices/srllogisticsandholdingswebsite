import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import ServiceCard from '../components/ServiceCard'
import PhotoGallery from '../components/PhotoGallery'
import SectionImage from '../components/SectionImage'
import { services, stats, testimonials } from '../data/services'
import { backgrounds, galleryPhotos, overlayDefaults } from '../data/images'

export default function Home() {
  return (
    <>
      <HeroBanner image={backgrounds.pages.home} overlay={overlayDefaults.light} minHeight="min-h-[480px] lg:min-h-[600px]">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
          Logistics · Cloud · Email · Software
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
          One Partner for Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-400">
            Business Growth
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl">
          SRL Logistics & Holdings delivers end-to-end solutions — from moving your goods across
          the country to hosting your servers, managing your domains, and building the software
          your business runs on.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-brand-500/30"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-colors"
          >
            Learn About Us
          </Link>
        </div>
      </HeroBanner>

      <section className="bg-white/80 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-brand-700">{stat.value}</p>
                <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-slate-600 text-lg">
              Everything your business needs under one roof — reliable, scalable, and built for
              growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Why Choose SRL?
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We combine deep industry expertise with modern technology to deliver solutions that
                actually work for your business — not generic packages that miss the mark.
              </p>
              <ul className="space-y-4">
                {[
                  'Single point of contact for all your business needs',
                  'Transparent pricing with no hidden fees',
                  'Dedicated support team available around the clock',
                  'Proven track record across industries',
                  'Scalable solutions that grow with you',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <SectionImage
              src={backgrounds.pages.whyChoose}
              alt="SRL team collaborating on business solutions"
              className="aspect-[4/3] lg:aspect-square max-h-[480px]"
            />
          </div>
        </div>
      </section>

      <PhotoGallery
        photos={galleryPhotos}
        title="Our Work in Action"
        subtitle="Real projects across logistics, cloud hosting, and software development for clients in the Solomon Islands and beyond."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-600 text-lg">
              Trusted by businesses across logistics, finance, retail, and technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <blockquote
                key={t.author}
                className="bg-white/90 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <p className="font-semibold text-slate-900">{t.author}</p>
                  <p className="text-sm text-slate-500">
                    {t.role}, {t.company}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgrounds.pages.home})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-900/85" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
            Get a free consultation and custom quote. Our team is ready to help you find the right
            solution.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg"
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
