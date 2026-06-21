import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useSiteContent } from '../context/SiteContext'
import HeaderBrand from './HeaderBrand'

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
  }`

const dropdownLinkClass =
  'block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors'

function isPathActive(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

function ServicesDropdown({ items, onNavigate }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [softwareOpen, setSoftwareOpen] = useState(false)
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const isActive =
    isPathActive(location.pathname, '/services') ||
    items.some((item) => {
    if (item.type === 'submenu') {
      return isPathActive(location.pathname, item.to) || item.items.some((sub) => isPathActive(location.pathname, sub.to))
    }
    return isPathActive(location.pathname, item.to)
  })

  return (
    <div
      className="relative"
      onMouseEnter={canHover ? () => setOpen(true) : undefined}
      onMouseLeave={
        canHover
          ? () => {
              setOpen(false)
              setSoftwareOpen(false)
            }
          : undefined
      }
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
        }`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        Services
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 w-72 z-50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl py-2 overflow-hidden">
            <Link
              to="/services"
              onClick={onNavigate}
              className={`block px-4 py-3 text-sm font-semibold border-b border-slate-100 ${
                isPathActive(location.pathname, '/services')
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-brand-700 hover:bg-brand-50'
              }`}
            >
              View All Services & Products →
            </Link>
            {items.map((item) =>
              item.type === 'submenu' ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={canHover ? () => setSoftwareOpen(true) : undefined}
                  onMouseLeave={canHover ? () => setSoftwareOpen(false) : undefined}
                >
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.to}
                      onClick={onNavigate}
                      className={`flex-1 ${dropdownLinkClass} ${isPathActive(location.pathname, item.to) ? 'bg-brand-50 text-brand-700' : ''}`}
                    >
                      {item.label}
                    </Link>
                    <ChevronRight className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
                  </div>
                  {softwareOpen && (
                    <div className="absolute left-full top-0 pl-2 w-64">
                      <div className="bg-white rounded-xl border border-slate-200 shadow-xl py-2">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={onNavigate}
                            className={`${dropdownLinkClass} ${isPathActive(location.pathname, sub.to) ? 'bg-brand-50 text-brand-700 font-medium' : ''}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={`${dropdownLinkClass} ${isPathActive(location.pathname, item.to) ? 'bg-brand-50 text-brand-700 font-medium' : ''}`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileServicesMenu({ items, onNavigate, expanded, onToggle, softwareExpanded, onSoftwareToggle }) {
  const location = useLocation()

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Services
        <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

        {expanded && (
          <div className="ml-3 mt-1 space-y-1 border-l border-slate-200 pl-3">
            <Link
              to="/services"
              onClick={onNavigate}
              className={`block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                isPathActive(location.pathname, '/services') ? 'bg-brand-50 text-brand-700' : 'text-brand-700 hover:bg-slate-50'
              }`}
            >
              All Services & Products
            </Link>
            {items.map((item) =>
            item.type === 'submenu' ? (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={onSoftwareToggle}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${softwareExpanded ? 'rotate-180' : ''}`} />
                </button>
                {softwareExpanded && (
                  <div className="ml-3 mt-1 space-y-1 border-l border-slate-200 pl-3">
                    <Link
                      to={item.to}
                      onClick={onNavigate}
                      className={`block px-3 py-2 rounded-lg text-sm ${
                        isPathActive(location.pathname, item.to) ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Overview
                    </Link>
                    {item.items.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        onClick={onNavigate}
                        className={`block px-3 py-2 rounded-lg text-sm ${
                          isPathActive(location.pathname, sub.to) ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={`block px-3 py-2.5 rounded-lg text-sm ${
                  isPathActive(location.pathname, item.to) ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { content } = useSiteContent()
  const mainNav = content?.navigation ?? []
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [softwareOpen, setSoftwareOpen] = useState(false)

  const servicesMenu = mainNav.find((item) => item.type === 'dropdown')

  function closeMobile() {
    setOpen(false)
    setServicesOpen(false)
    setSoftwareOpen(false)
  }

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-200/60 shadow-sm safe-area-pt">
      <nav className="container-page">
        <div className="flex items-center justify-between gap-3 min-h-[var(--header-height)] py-2">
          <HeaderBrand onClick={closeMobile} />

          <div className="hidden lg:flex items-center justify-end gap-1 shrink-0">
            {mainNav.map((item) =>
              item.type === 'link' ? (
                <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                  {item.label}
                </NavLink>
              ) : (
                <ServicesDropdown key={item.label} items={item.items} onNavigate={closeMobile} />
              ),
            )}
            <Link
              to="/quote"
              className="ml-3 px-5 py-2.5 bg-brand-400 text-brand-950 text-sm font-semibold rounded-lg hover:bg-brand-300 transition-colors shadow-sm"
            >
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2.5 rounded-lg text-slate-600 hover:bg-slate-100 shrink-0 -mr-1"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 border-t border-slate-100">
            <div className="flex flex-col gap-1 pt-3">
              {mainNav.map((item) =>
                item.type === 'link' ? (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-sm font-medium ${
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <MobileServicesMenu
                    key={item.label}
                    items={item.items}
                    onNavigate={closeMobile}
                    expanded={servicesOpen}
                    onToggle={() => setServicesOpen((v) => !v)}
                    softwareExpanded={softwareOpen}
                    onSoftwareToggle={() => setSoftwareOpen((v) => !v)}
                  />
                ),
              )}
              <Link
                to="/quote"
                onClick={closeMobile}
                className="mt-2 mx-4 py-3 bg-brand-400 text-brand-950 text-sm font-semibold rounded-lg text-center hover:bg-brand-300"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
