import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import Breadcrumbs from '../components/Breadcrumbs'
import ServiceCard from '../components/ServiceCard'
import HostedSolutionCard from '../components/HostedSolutionCard'
import FreeConsultation from '../components/FreeConsultation'
import { useSiteContent, overlays } from '../context/SiteContext'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'core', label: 'Core Services' },
  { id: 'software', label: 'Software Dev' },
  { id: 'it', label: 'IT & Network' },
  { id: 'hosted', label: 'Hosted Systems' },
]

export default function Services() {
  const { content } = useSiteContent()
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const { services, softwareSubServices, itServices, hostedSolutions, backgrounds } = content
  const heroImage = backgrounds?.pages?.home || '/images/hero-home.jpg'

  const groups = useMemo(
    () => ({
      core: services,
      software: softwareSubServices,
      it: itServices,
      hosted: hostedSolutions,
    }),
    [services, softwareSubServices, itServices, hostedSolutions],
  )

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase()
    const match = (item) =>
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.shortDescription?.toLowerCase().includes(q)

    if (activeTab === 'all') {
      return [
        { title: 'Core Services', items: groups.core.filter(match), useHostedCard: false },
        { title: 'Software Development', items: groups.software.filter(match), useHostedCard: false },
        { title: 'IT & Network Infrastructure', items: groups.it.filter(match), useHostedCard: false },
        { title: 'Hosted Business Systems', items: groups.hosted.filter(match), useHostedCard: true },
      ].filter((g) => g.items.length > 0)
    }

    const items = (groups[activeTab] || []).filter(match)
    const titles = {
      core: 'Core Services',
      software: 'Software Development',
      it: 'IT & Network Infrastructure',
      hosted: 'Hosted Business Systems',
    }
    return items.length
      ? [{ title: titles[activeTab], items, useHostedCard: activeTab === 'hosted' }]
      : []
  }, [activeTab, search, groups])

  return (
    <>
      <Breadcrumbs items={[{ label: 'Services & Products' }]} />

      <HeroBanner
        image={heroImage}
        overlay={overlays.light}
        minHeight="hero-height-compact"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl">
          Services & Products
        </h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          Browse everything SRL offers — logistics, cloud hosting, software, networking, and
          ready-to-use hosted business systems for your organization.
        </p>
      </HeroBanner>

      <section className="sticky sticky-below-header z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container-page w-full py-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search services, e.g. Starlink, cloud, logistics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-base min-h-[48px]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors min-h-[44px] ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-20 pb-24 lg:pb-20">
        <div className="container-page w-full">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <p className="text-slate-600 mb-4">No services match your search.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); setActiveTab('all') }}
                className="text-brand-600 font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredItems.map((group) => (
              <div key={group.title} className="mb-12 sm:mb-16 last:mb-0">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{group.title}</h2>
                <p className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8">
                  {group.items.length} {group.items.length === 1 ? 'offering' : 'offerings'} available
                </p>
                <div
                  className={`grid gap-5 sm:gap-6 ${
                    group.useHostedCard
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  }`}
                >
                  {group.items.map((item) =>
                    group.useHostedCard ? (
                      <HostedSolutionCard key={item.id} solution={item} />
                    ) : (
                      <ServiceCard key={item.id} service={item} />
                    ),
                  )}
                </div>
              </div>
            ))
          )}

          <FreeConsultation variant="banner" className="mt-14 sm:mt-16" />
        </div>
      </section>
    </>
  )
}
