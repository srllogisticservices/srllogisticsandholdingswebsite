import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'

export default function HostedSolutionCard({ solution }) {
  const Icon = solution.icon
  const demoUrl = solution.demoUrl

  return (
    <div className="group flex flex-col p-6 lg:p-8 bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50 transition-all duration-300">
      <Link to={solution.slug} className="flex flex-col flex-1">
        <div className={`inline-flex p-3 rounded-xl ${solution.bgLight} mb-5 w-fit`}>
          <Icon className={`w-7 h-7 ${solution.iconColor}`} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
          {solution.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">{solution.shortDescription}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-2.5 transition-all">
          Learn more
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>

      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-100 rounded-xl transition-colors"
        >
          Open live demo
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}
