import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../api/client'
import { getVisitorId } from '../utils/visitor'

export default function usePageTracking() {
  const location = useLocation()
  const lastPath = useRef('')

  useEffect(() => {
    const path = location.pathname + location.search
    if (path.startsWith('/admin') || path === lastPath.current) return
    lastPath.current = path

    api
      .trackPageView({
        visitorId: getVisitorId(),
        path,
        pageTitle: document.title,
        referrer: document.referrer || undefined,
      })
      .catch(() => {
        /* analytics should not block the site */
      })
  }, [location.pathname, location.search])
}
