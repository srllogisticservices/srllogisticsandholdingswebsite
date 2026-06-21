import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProjectCard from './ProjectCard'
import { useSiteContent } from '../context/SiteContext'

export default function ProjectShowcase({
  title = 'Featured Projects',
  subtitle = 'Sample links to client work — tap any project to explore related services and solutions.',
  limit,
  showViewAll = true,
  className = '',
}) {
  const { content } = useSiteContent()
  const projects = content?.projects?.items || []
  const featuredIds = content?.projects?.featuredIds || []

  let items = projects
  if (limit) {
    const featured = featuredIds
      .map((id) => projects.find((p) => p.id === id))
      .filter(Boolean)
    items = (featured.length ? featured : projects.filter((p) => p.featured)).slice(0, limit)
  }

  if (!items.length) return null

  return (
    <section className={`py-14 sm:py-20 lg:py-28 ${className}`}>
      <div className="container-page w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
            {subtitle && <p className="text-slate-600 text-sm sm:text-base">{subtitle}</p>}
          </div>
          {showViewAll && (
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 shrink-0"
            >
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
