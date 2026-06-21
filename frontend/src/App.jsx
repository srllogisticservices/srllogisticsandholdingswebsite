import { Routes, Route, useParams } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext'
import PublicApp from './PublicApp'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminContentEditor from './pages/admin/AdminContentEditor'
import AdminServicesEditor from './pages/admin/AdminServicesEditor'
import AdminMessages from './pages/admin/AdminMessages'
import AdminAnalytics from './pages/admin/AdminAnalytics'

function AdminContentRoute() {
  const { fileKey } = useParams()
  if (fileKey === 'services') {
    return <AdminServicesEditor />
  }
  return <AdminContentEditor />
}

export default function App() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="content/:fileKey" element={<AdminContentRoute />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
        <Route path="/*" element={<PublicApp />} />
      </Routes>
    </AdminProvider>
  )
}
