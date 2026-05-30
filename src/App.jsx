import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import HostedSolutionPage from './pages/HostedSolutionPage'
import {
  LogisticsPage,
  CloudHostingPage,
  EmailDomainsPage,
  SoftwareDevPage,
} from './pages/services'
import { hostedSolutions } from './data/services'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services/logistics" element={<LogisticsPage />} />
        <Route path="services/cloud-hosting" element={<CloudHostingPage />} />
        <Route path="services/email-domains" element={<EmailDomainsPage />} />
        <Route path="services/software-development" element={<SoftwareDevPage />} />
        {hostedSolutions.map((solution) => (
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
