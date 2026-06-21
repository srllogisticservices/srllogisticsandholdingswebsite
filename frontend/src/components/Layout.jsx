import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import PageBackground from './PageBackground'
import InfoStrip from './InfoStrip'
import CustomerHelpBar from './CustomerHelpBar'
import VisitorTracker from './VisitorTracker'
import ChatWidget from './ChatWidget'

export default function Layout() {
  return (
    <PageBackground>
      <VisitorTracker />
      <div className="min-h-screen flex flex-col mobile-main-pad lg:pb-0 safe-area-inset-x">
        <InfoStrip />
        <Navbar />
        <main className="flex-1 w-full min-w-0">
          <Outlet />
        </main>
        <Footer />
        <CustomerHelpBar />
        <ChatWidget />
      </div>
    </PageBackground>
  )
}
