import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50/80 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
          <li>
            <Link to="/" className="inline-flex items-center gap-1 hover:text-brand-600 transition-colors">
              <Home className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              {item.to && i < items.length - 1 ? (
                <Link to={item.to} className="hover:text-brand-600 transition-colors truncate max-w-[140px] sm:max-w-none">
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-800 font-medium truncate max-w-[160px] sm:max-w-none">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
