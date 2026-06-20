import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import Services from './pages/Services'
import Projects from './pages/Projects'
import ServicePage from './pages/ServicePage'
import HostedSolutionPage from './pages/HostedSolutionPage'
import PageLoader from './components/PageLoader'
import { useSiteContent } from './context/SiteContext'

export default function PublicApp() {
  const { content, loading } = useSiteContent()

  if (loading || !content) {
    return <PageLoader label="Loading SRL Logistics & Holdings..." />
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="quote" element={<Quote />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />

        {content.services.map((service) => (
          <Route
            key={service.id}
            path={service.slug.replace(/^\//, '')}
            element={<ServicePage service={service} />}
          />
        ))}

        {content.softwareSubServices.map((service) => (
          <Route
            key={service.id}
            path={service.slug.replace(/^\//, '')}
            element={<ServicePage service={service} />}
          />
        ))}

        {content.itServices.map((service) => (
          <Route
            key={service.id}
            path={service.slug.replace(/^\//, '')}
            element={<ServicePage service={service} />}
          />
        ))}

        {content.hostedSolutions.map((solution) => (
          <Route
            key={solution.id}
            path={`services/hosted/${solution.id}`}
            element={<HostedSolutionPage solution={solution} />}
          />
        ))}
      </Route>
    </Routes>
  )
}
