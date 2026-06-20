import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/client'
import { resolveServiceList } from '../utils/icons'
import * as staticServices from '../data/services'
import { mainNav } from '../data/navigation'
import { branding as staticBranding } from '../data/branding'
import { backgrounds, galleryPhotos, overlayDefaults } from '../data/images'
import { projectsContent } from '../data/projects'

const SiteContext = createContext(null)

function buildFallback() {
  return {
    navigation: mainNav,
    branding: {
      ...staticBranding,
      slogan: 'Your Trusted Partner in Logistics, Technology, and Sustainable Growth.',
      contact: {
        email: 'info@srllogisticsandholdings.com',
        quoteEmail: 'info@srllogisticsandholdings.com',
        phone: '+677 7885155',
        address: 'Green Valley, East Honiara, Solomon Islands',
        hours: 'Mon – Fri: 8:00 AM – 6:00 PM',
        facebook: 'https://www.facebook.com/profile.php?id=61558125886870',
      },
      consultation: {
        title: 'Free Consultation Hours',
        subtitle:
          'Connect with SRL your way — Teams, WhatsApp, email, phone, or through our web portal. No obligation.',
        hoursNote: 'Free consultations: Mon – Fri, 8:00 AM – 6:00 PM (Solomon Islands time)',
        teamsEmail: 'info@srllogisticsandholdings.com',
        whatsapp: '6777885155',
        ctaTitle: 'Not sure which service you need?',
        ctaText:
          'Book a free consultation — reach us on Teams, WhatsApp, email, phone, or browse our portal below.',
      },
    },
    about: null,
    home: null,
    gallery: galleryPhotos,
    projects: projectsContent,
    backgrounds: { pages: backgrounds.pages },
    services: resolveServiceList(staticServices.services),
    softwareSubServices: resolveServiceList(staticServices.softwareSubServices),
    itServices: resolveServiceList(staticServices.itServices),
    hostedSolutions: resolveServiceList(staticServices.hostedSolutions),
    stats: staticServices.stats,
    testimonials: staticServices.testimonials,
  }
}

export function SiteProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    api
      .getContent()
      .then((data) => {
        if (!active) return
        setContent({
          ...data,
          projects: data.projects?.items?.length ? data.projects : projectsContent,
          services: resolveServiceList(data.services),
          softwareSubServices: resolveServiceList(data.softwareSubServices),
          itServices: resolveServiceList(data.itServices),
          hostedSolutions: resolveServiceList(data.hostedSolutions),
        })
      })
      .catch((err) => {
        if (!active) return
        setError(err.message)
        setContent(buildFallback())
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <SiteContext.Provider value={{ content, loading, error }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSiteContent() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSiteContent must be used within SiteProvider')
  return ctx
}

export const overlays = overlayDefaults
