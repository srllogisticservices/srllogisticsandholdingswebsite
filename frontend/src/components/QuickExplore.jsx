import { Link } from 'react-router-dom'
import {
  Truck, Cloud, Mail, Code2, Network, Satellite, ArrowRight, LayoutGrid,
} from 'lucide-react'

const categories = [
  { to: '/services/logistics', label: 'Logistics', icon: Truck, color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { to: '/services/cloud-hosting', label: 'Cloud Hosting', icon: Cloud, color: 'bg-brand-50 text-brand-700 border-brand-100' },
  { to: '/services/email-domains', label: 'Email & Domain', icon: Mail, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { to: '/services/software-development', label: 'Software Dev', icon: Code2, color: 'bg-violet-50 text-violet-700 border-violet-100' },
  { to: '/services/networking-installations', label: 'Networking', icon: Network, color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { to: '/services/starlink-deployments', label: 'Starlink', icon: Satellite, color: 'bg-sky-50 text-sky-700 border-sky-100' },
]

export default function QuickExplore() {
  return (
    <section className="bg-white/90 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Explore Our Services</h2>
            <p className="text-sm text-slate-600 mt-1">Tap a category to learn more about what we offer</p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 shrink-0"
          >
            <LayoutGrid className="w-4 h-4" />
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map(({ to, label, icon: Icon, color }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md hover:-translate-y-0.5 ${color}`}
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-xs sm:text-sm font-semibold text-center leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
