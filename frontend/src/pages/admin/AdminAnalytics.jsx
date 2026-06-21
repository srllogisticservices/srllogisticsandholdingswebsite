import { useEffect, useState } from 'react'
import { BarChart3, Eye, Home, MessageSquare, TrendingUp, Users } from 'lucide-react'
import { api } from '../../api/client'

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
      <div className="inline-flex p-2.5 rounded-xl bg-brand-50 text-brand-700 mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm font-medium text-slate-700 mt-1">{label}</p>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  )
}

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null)
  const [chatLogs, setChatLogs] = useState([])
  const [historyDays, setHistoryDays] = useState(30)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    Promise.all([api.adminAnalytics(historyDays), api.adminChatLogs()])
      .then(([analytics, logs]) => {
        setStats(analytics)
        setChatLogs(logs || [])
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [historyDays])

  if (loading && !stats) {
    return <p className="text-slate-600">Loading analytics...</p>
  }

  if (error && !stats) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-red-700">
        Could not load analytics: {error}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Website Analytics</h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Daily visitor counts for the home page and other pages, plus service demand from page
            views and contact or quote requests.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          History
          <select
            value={historyDays}
            onChange={(event) => setHistoryDays(Number(event.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard icon={Eye} label="Total page views" value={stats.totalPageViews} />
        <StatCard
          icon={Users}
          label="Unique visitors today"
          value={stats.uniqueVisitorsToday ?? stats.uniqueVisitors}
          hint={`${stats.uniqueVisitors} total unique visitors`}
        />
        <StatCard
          icon={Home}
          label="Home page views today"
          value={stats.homeViewsToday ?? 0}
          hint={`${stats.otherViewsToday ?? 0} other pages today`}
        />
        <StatCard
          icon={MessageSquare}
          label="Chat messages"
          value={stats.chatMessages}
          hint={`${stats.viewsThisWeek} views this week`}
        />
      </div>

      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-brand-700" />
          <h2 className="text-lg font-bold text-slate-900">Daily visitor history</h2>
        </div>
        {stats.dailyHistory?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-3 pr-4 font-semibold">Date</th>
                  <th className="py-3 pr-4 font-semibold">Unique visitors</th>
                  <th className="py-3 pr-4 font-semibold">Total views</th>
                  <th className="py-3 pr-4 font-semibold">Home page</th>
                  <th className="py-3 font-semibold">Other pages</th>
                </tr>
              </thead>
              <tbody>
                {stats.dailyHistory.map((day) => (
                  <tr key={day.date} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-medium text-slate-900">{formatDate(day.date)}</td>
                    <td className="py-3 pr-4 text-slate-700">{day.uniqueVisitors}</td>
                    <td className="py-3 pr-4 text-slate-700">{day.pageViews}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
                        {day.homeViews}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                        {day.otherViews}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No daily history recorded yet.</p>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-5 h-5 text-brand-700" />
          <h2 className="text-lg font-bold text-slate-900">Most needed services</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Ranked by service page views plus contact and quote requests in the selected period.
        </p>
        {stats.topServices?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-3 pr-4 font-semibold">Service</th>
                  <th className="py-3 pr-4 font-semibold">Page views</th>
                  <th className="py-3 pr-4 font-semibold">Inquiries</th>
                  <th className="py-3 font-semibold">Interest score</th>
                </tr>
              </thead>
              <tbody>
                {stats.topServices.map((item, index) => (
                  <tr key={item.service} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-slate-900">{item.service}</span>
                      {index === 0 && (
                        <span className="ml-2 text-[10px] uppercase font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                          Top
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">{item.pageViews}</td>
                    <td className="py-3 pr-4 text-slate-700">{item.inquiries}</td>
                    <td className="py-3 font-semibold text-brand-700">{item.totalInterest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No service activity yet. Views on service pages and contact or quote submissions will
            appear here.
          </p>
        )}
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Top pages</h2>
          {stats.topPages?.length ? (
            <ul className="space-y-3">
              {stats.topPages.map((page) => (
                <li key={page.path} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-700 truncate font-mono">{page.path}</span>
                  <span className="shrink-0 font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                    {page.views}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No page views recorded yet.</p>
          )}
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent chat activity</h2>
          {chatLogs.length ? (
            <ul className="space-y-3 max-h-[420px] overflow-y-auto">
              {chatLogs.slice(0, 20).map((log) => (
                <li key={log.id} className="text-sm border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold uppercase ${
                        log.role === 'user' ? 'text-brand-700' : 'text-slate-500'
                      }`}
                    >
                      {log.role}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{log.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No chat messages yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}
