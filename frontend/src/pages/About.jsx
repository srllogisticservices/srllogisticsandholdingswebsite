import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import Breadcrumbs from '../components/Breadcrumbs'
import SectionImage from '../components/SectionImage'
import PhotoGallery from '../components/PhotoGallery'
import ProjectShowcase from '../components/ProjectShowcase'
import { useSiteContent, overlays } from '../context/SiteContext'
import { getIcon } from '../utils/icons'

export default function About() {
  const { content } = useSiteContent()
  const about = content.about || {}
  const backgrounds = content.backgrounds?.pages || {}
  const heroImage = backgrounds.about || '/images/about-team.jpg'
  const story = about.story || {}
  const values = about.values || []
  const gallery = (content.gallery || []).slice(0, 3)

  return (
    <>
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <HeroBanner image={heroImage} overlay={overlays.medium}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 sm:mb-6 max-w-3xl">
          {about.hero?.title || 'About SRL Logistics & Holdings'}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
          {about.hero?.subtitle}
        </p>
      </HeroBanner>

      <section className="py-12 sm:py-16 lg:py-24 bg-white/70 backdrop-blur-sm">
        <div className="container-page w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5 sm:mb-6">
                {story.title || 'Our Story'}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                {(story.paragraphs || []).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
            <SectionImage
              src={story.image || heroImage}
              alt="SRL Logistics & Holdings team"
              className="order-1 lg:order-2 aspect-square max-w-md mx-auto lg:mx-0 max-h-[320px] sm:max-h-[420px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container-page w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map(({ icon, title, description }) => {
              const Icon = getIcon(icon)
              return (
                <div
                  key={title}
                  className="bg-white/90 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-200 text-center shadow-sm"
                >
                  <div className="inline-flex p-3 rounded-xl bg-brand-50 mb-4">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <PhotoGallery
        photos={gallery}
        title="Behind the Scenes"
        subtitle="A glimpse of our operations, team, and the work we deliver for clients every day."
      />

      <ProjectShowcase
        limit={3}
        title="Client Projects"
        subtitle="Sample links to work we have delivered — explore related services and hosted solutions."
        className="bg-white/70 backdrop-blur-sm border-y border-slate-100"
      />

      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand-900/85" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
            {about.cta?.title || "Let's Work Together"}
          </h2>
          <p className="text-brand-100 mb-6 sm:mb-8 text-sm sm:text-base">
            {about.cta?.text}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors min-h-[48px]"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
