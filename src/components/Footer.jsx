import { Link } from 'react-router-dom'
import { Truck, Mail, Phone, MapPin } from 'lucide-react'
import { services, hostedSolutions } from '../data/services'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600 text-white">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">SRL</span>
                <span className="block text-xs text-slate-400">Logistics & Holdings</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted partner for logistics, cloud infrastructure, email hosting, and custom
              software development.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={s.slug} className="hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Hosted Systems</h3>
            <ul className="space-y-2.5 text-sm">
              {hostedSolutions.map((solution) => (
                <li key={solution.id}>
                  <Link to={solution.slug} className="hover:text-white transition-colors">
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>info@srllogisticsandholdings.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>+677 7885155</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>Green Valley, East Honiara, Solomon Islands</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SRL Logistics & Holdings. All rights reserved.</p>
          <p>Built for businesses that move forward.</p>
        </div>
      </div>
    </footer>
  )
}
