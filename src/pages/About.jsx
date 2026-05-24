import { Link } from 'react-router-dom'
import { ArrowRight, Target, Users, Award, HeartHandshake } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import SectionImage from '../components/SectionImage'
import PhotoGallery from '../components/PhotoGallery'
import { backgrounds, galleryPhotos, overlayDefaults } from '../data/images'

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We measure success by the outcomes we deliver for your business, not by hours billed.',
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: 'Every solution is tailored to your unique needs, workflows, and growth goals.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards in logistics, infrastructure, and development.',
  },
  {
    icon: HeartHandshake,
    title: 'Partnership',
    description: 'We build long-term relationships, not one-off transactions.',
  },
]

const aboutGallery = galleryPhotos.slice(0, 3)

export default function About() {
  return (
    <>
      <HeroBanner image={backgrounds.pages.about} overlay={overlayDefaults.medium}>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 max-w-3xl">About SRL Logistics & Holdings</h1>
        <p className="text-lg text-slate-200 max-w-3xl leading-relaxed">
          We are a multi-service company dedicated to helping businesses operate smarter, move
          faster, and grow with confidence. From the warehouse floor to the cloud server, we have
          you covered.
        </p>
      </HeroBanner>

      <section className="py-16 lg:py-24 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  SRL Logistics & Holdings was founded with a simple vision: businesses shouldn&apos;t
                  need a dozen vendors to handle their logistics, IT infrastructure, and software
                  needs. We built a company that brings it all together.
                </p>
                <p>
                  What started as a transportation and freight company has grown into a full-service
                  partner offering cloud hosting, email and domain management, and custom software
                  development — all backed by the same commitment to reliability and client success.
                </p>
                <p>
                  Today, we serve hundreds of clients across industries, helping them streamline
                  operations, reduce costs, and focus on what they do best.
                </p>
              </div>
            </div>
            <SectionImage
              src={backgrounds.pages.about}
              alt="SRL Logistics & Holdings team"
              className="aspect-square max-w-md mx-auto lg:mx-0 max-h-[420px]"
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 text-center shadow-sm"
              >
                <div className="inline-flex p-3 rounded-xl bg-brand-50 mb-4">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoGallery
        photos={aboutGallery}
        title="Behind the Scenes"
        subtitle="A glimpse of our operations, team, and the work we deliver for clients every day."
      />

      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgrounds.pages.about})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-900/85" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-brand-100 mb-8">
            Whether you need to transport your goods, migrate to the cloud, or build custom
            software — we are here to help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
