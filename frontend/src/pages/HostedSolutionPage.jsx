import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import ContactForm from '../components/ContactForm'
import { overlayDefaults } from '../data/images'

export default function HostedSolutionPage({ solution }) {
  const Icon = solution.icon

  return (
    <>
      <HeroBanner image="/images/cloud.jpg" overlay={overlayDefaults.dark}>
        <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur mb-6">
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 max-w-3xl">{solution.title}</h1>
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
          {solution.shortDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          {solution.demoUrl ? (
            <a
              href={solution.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg min-h-[48px]"
            >
              Open Live Demo
              <ExternalLink className="w-5 h-5" />
            </a>
          ) : solution.href ? (
            <a
              href={solution.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg min-h-[48px]"
            >
              Access Platform
              <ExternalLink className="w-5 h-5" />
            </a>
          ) : (
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg min-h-[48px]"
            >
              Request Hosting
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
          <Link
            to="/services/cloud-hosting"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-colors min-h-[48px]"
          >
            All Hosted Solutions
          </Link>
        </div>
      </HeroBanner>

      <section className="py-12 sm:py-16 lg:py-24 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-5 sm:mb-6">What We Offer</h2>
              <ul className="space-y-4">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-5 sm:mb-6">Key Benefits</h2>
              <ul className="space-y-4">
                {solution.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 pb-24 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 text-center">
            Get Started with {solution.title}
          </h2>
          <p className="text-slate-600 text-center mb-10">
            Tell us about your requirements and our team will set up a hosted solution tailored to
            your organization.
          </p>
          <div className="bg-white/90 backdrop-blur-sm p-6 lg:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <ContactForm defaultService={solution.title} />
          </div>
        </div>
      </section>
    </>
  )
}
