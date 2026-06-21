import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Eye, FileJson, Users } from 'lucide-react'
import { api } from '../../api/client'

export default function AdminDashboard() {
  const [files, setFiles] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api.adminListContent(), api.adminAnalytics()])
      .then(([contentRes, analyticsRes]) => {
        setFiles(contentRes.files || [])
        setAnalytics(analyticsRes)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-slate-600">Loading content sections...</p>
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-red-700">
        Could not load admin content: {error}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Content Dashboard</h1>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Update projects, services, pages, branding, and navigation. Changes are saved to your
          website data files and appear on the public site after refresh.
        </p>
      </div>

      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-700">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{analytics.totalPageViews}</p>
              <p className="text-sm text-slate-600">Total page views</p>
            </div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-700">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{analytics.uniqueVisitors}</p>
              <p className="text-sm text-slate-600">Unique visitors</p>
            </div>
          </div>
          <Link
            to="/admin/analytics"
            className="p-5 bg-brand-950 rounded-2xl border border-brand-800 flex items-center gap-4 text-white hover:bg-brand-900 transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-brand-400/20 text-brand-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{analytics.viewsToday} today</p>
              <p className="text-sm text-brand-200">
                {analytics.homeViewsToday ?? 0} home · {analytics.otherViewsToday ?? 0} other pages
              </p>
              <p className="text-xs text-brand-300 mt-1">View full analytics →</p>
            </div>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {files.map((file) => (
          <Link
            key={file.key}
            to={`/admin/content/${file.key}`}
            className="group block p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all"
          >
            <div className="inline-flex p-3 rounded-xl bg-brand-50 text-brand-700 mb-4">
              <FileJson className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
              {file.label}
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{file.description}</p>
            <p className="text-xs text-slate-400 mt-4">{file.filename}</p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-600 group-hover:gap-2.5 transition-all">
              Edit content
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-100 text-sm text-amber-900">
        <p className="font-semibold mb-1">Tip for editing JSON</p>
        <p>
          Each section opens a structured JSON editor. Use valid JSON syntax — quotes on all keys
          and strings, commas between items, and no trailing commas. Click <strong>Format JSON</strong>{' '}
          before saving if you paste content from elsewhere.
        </p>
      </div>
    </div>
  )
}
