import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ service }) {
  const Icon = service.icon

  return (
    <Link
      to={service.slug}
      className="group block overflow-hidden bg-white rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50 transition-all duration-300"
    >
      {service.cardImage && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={service.cardImage}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className={`absolute bottom-4 left-4 inline-flex p-2.5 rounded-xl ${service.bgLight} shadow-sm`}>
            <Icon className={`w-6 h-6 ${service.iconColor}`} />
          </div>
        </div>
      )}

      <div className="p-6 lg:p-8">
        {!service.cardImage && (
          <div className={`inline-flex p-3 rounded-xl ${service.bgLight} mb-5`}>
            <Icon className={`w-7 h-7 ${service.iconColor}`} />
          </div>
        )}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.shortDescription}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-2.5 transition-all">
          Learn more
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}
