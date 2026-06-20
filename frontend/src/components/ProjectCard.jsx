import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Building2, Calendar } from 'lucide-react'

function ProjectLink({ link, primary = false }) {
  const isExternal = link.external || !link.href.startsWith('/')
  const className = primary
    ? 'inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition-colors min-h-[44px]'
    : 'inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors'

  if (isExternal) {
    return (
      <a href={link.href} className={className} target="_blank" rel="noopener noreferrer">
        {link.label}
        <ExternalLink className={primary ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      </a>
    )
  }

  return (
    <Link to={link.href} className={className}>
      {link.label}
      <ArrowRight className={primary ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
    </Link>
  )
}

export default function ProjectCard({ project }) {
  const [primaryLink, ...otherLinks] = project.links || []

  return (
    <article className="group flex flex-col bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-brand-700 shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {project.year && (
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            {project.year}
          </div>
        )}

        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{project.title}</h3>

        <p className="inline-flex items-start gap-1.5 text-sm text-slate-600 mb-3">
          <Building2 className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
          <span>{project.client}</span>
        </p>

        <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">{project.summary}</p>

        {project.links?.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-100">
            {primaryLink && <ProjectLink link={primaryLink} primary />}
            {otherLinks.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">More links</p>
                {otherLinks.map((link) => (
                  <ProjectLink key={`${link.href}-${link.label}`} link={link} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
