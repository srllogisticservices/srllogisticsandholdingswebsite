import { Navigate, Outlet } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut, Mail, Shield } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import Logo from '../../components/Logo'

export default function AdminLayout() {
  const { user, loading, logout, isAuthenticated } = useAdmin()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600">Loading admin panel...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  async function handleLogout() {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo variant="light" size="sm" />
            <div>
              <p className="text-sm font-semibold">Website Admin</p>
              <p className="text-xs text-slate-400">{user.displayName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              className="text-xs sm:text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800"
            >
              View website
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex flex-wrap gap-2 mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            to="/admin/messages"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
          >
            <Mail className="w-4 h-4" />
            Contact messages
          </Link>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 border border-brand-100 text-sm font-medium text-brand-700">
            <Shield className="w-4 h-4" />
            {user.role.replace(/_/g, ' ')}
          </span>
        </nav>

        <Outlet />
      </div>
    </div>
  )
}
