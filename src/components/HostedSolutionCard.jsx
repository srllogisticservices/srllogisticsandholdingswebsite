import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'

export default function HostedSolutionCard({ solution }) {
  const Icon = solution.icon
  const isExternal = Boolean(solution.href)

  const content = (
    <>
      <div className={`inline-flex p-3 rounded-xl ${solution.bgLight} mb-5`}>
        <Icon className={`w-7 h-7 ${solution.iconColor}`} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
        {solution.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-5">{solution.shortDescription}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-2.5 transition-all">
        {isExternal ? 'Visit platform' : 'Learn more'}
        {isExternal ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
      </span>
    </>
  )

  if (isExternal) {
    return (
      <a
        href={solution.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50 transition-all duration-300"
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      to={solution.slug}
      className="group block p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50 transition-all duration-300"
    >
      {content}
    </Link>
  )
}
