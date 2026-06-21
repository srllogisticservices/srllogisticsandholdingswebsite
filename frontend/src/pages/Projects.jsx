import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import Breadcrumbs from '../components/Breadcrumbs'
import ProjectCard from '../components/ProjectCard'
import { useSiteContent, overlays } from '../context/SiteContext'

export default function Projects() {
  const { content } = useSiteContent()
  const projects = content?.projects || {}
  const items = projects.items || []
  const hero = projects.hero || {}
  const heroImage = content.backgrounds?.pages?.about || '/images/about-team.jpg'

  return (
    <>
      <Breadcrumbs items={[{ label: 'Our Projects' }]} />

      <HeroBanner
        image={heroImage}
        overlay={overlays.medium}
        minHeight="min-h-[280px] sm:min-h-[340px]"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl">
          {hero.title || 'Our Projects'}
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {hero.subtitle}
        </p>
      </HeroBanner>

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container-page w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-14 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Have a project in mind?</h3>
            <p className="text-slate-300 mb-6 text-sm sm:text-base max-w-xl mx-auto">
              Share your requirements and we&apos;ll provide a free consultation with sample solutions
              tailored to your business.
            </p>
            <Link
              to="/contact#consultation"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-colors min-h-[48px]"
            >
              Start your project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
