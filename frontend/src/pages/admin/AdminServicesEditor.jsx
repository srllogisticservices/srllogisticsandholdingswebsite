import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RefreshCw, Save, Code2, LayoutList } from 'lucide-react'
import { api } from '../../api/client'

const TABS = [
  { id: 'services', label: 'Core Services' },
  { id: 'softwareSubServices', label: 'Software Dev' },
  { id: 'itServices', label: 'IT & Network' },
  { id: 'hostedSolutions', label: 'Hosted Systems' },
  { id: 'stats', label: 'Home Stats' },
  { id: 'testimonials', label: 'Testimonials' },
]

const ICON_OPTIONS = [
  'Truck', 'Cloud', 'Mail', 'Code2', 'Database', 'GitMerge', 'ServerCog', 'Smartphone',
  'Network', 'Cable', 'Shield', 'Camera', 'Satellite', 'GraduationCap', 'Car', 'Globe',
  'Recycle', 'Monitor', 'Printer', 'Wifi',
]

function linesToList(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

function listToLines(list = []) {
  return (list || []).join('\n')
}

function ServiceFields({ service, onChange }) {
  const update = (field, value) => onChange({ ...service, [field]: value })

  return (
    <div className="space-y-4 p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
          <input
            value={service.title || ''}
            onChange={(e) => update('title', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Icon</label>
          <select
            value={service.iconName || 'Circle'}
            onChange={(e) => update('iconName', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1">Short description</label>
        <textarea
          value={service.shortDescription || ''}
          onChange={(e) => update('shortDescription', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-y"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Slug (URL path)</label>
          <input
            value={service.slug || ''}
            onChange={(e) => update('slug', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Demo URL (optional)</label>
          <input
            value={service.demoUrl || ''}
            onChange={(e) => update('demoUrl', e.target.value || null)}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Features (one per line)</label>
          <textarea
            value={listToLines(service.features)}
            onChange={(e) => update('features', linesToList(e.target.value))}
            rows={5}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono resize-y"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Benefits (one per line)</label>
          <textarea
            value={listToLines(service.benefits)}
            onChange={(e) => update('benefits', linesToList(e.target.value))}
            rows={5}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-mono resize-y"
          />
        </div>
      </div>
    </div>
  )
}

export default function AdminServicesEditor() {
  const [data, setData] = useState(null)
  const [rawJson, setRawJson] = useState('')
  const [activeTab, setActiveTab] = useState('services')
  const [view, setView] = useState('forms')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function loadContent() {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await api.adminGetContent('services')
      setData(res.data)
      setRawJson(JSON.stringify(res.data, null, 2))
    } catch (err) {
      setError(err.message || 'Could not load services from API. Is the backend running on port 8000?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContent()
  }, [])

  function updateService(groupKey, index, updated) {
    setData((prev) => {
      const next = { ...prev, [groupKey]: [...prev[groupKey]] }
      next[groupKey][index] = updated
      setRawJson(JSON.stringify(next, null, 2))
      return next
    })
  }

  async function saveContent() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const payload = view === 'json' ? JSON.parse(rawJson) : data
      const result = await api.adminSaveContent('services', payload)
      setSuccess(`Saved ${result.filename}. Refresh the public website to see changes.`)
      await loadContent()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-slate-600">Loading services from API...</p>
  }

  if (!data) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-red-700">
        {error || 'Could not load services.'}
        <button type="button" onClick={loadContent} className="block mt-3 text-sm font-semibold underline">
          Retry
        </button>
      </div>
    )
  }

  const groupItems = data[activeTab] || []

  return (
    <div>
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Services & Products</h1>
          <p className="text-slate-600 mt-2">
            Edit services using simple forms — saved to <strong>services.json</strong> via the API.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setView(view === 'forms' ? 'json' : 'forms')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {view === 'forms' ? <Code2 className="w-4 h-4" /> : <LayoutList className="w-4 h-4" />}
            {view === 'forms' ? 'Advanced JSON' : 'Form editor'}
          </button>
          <button
            type="button"
            onClick={loadContent}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw className="w-4 h-4" />
            Reload
          </button>
          <button
            type="button"
            onClick={saveContent}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3">{error}</div>
      )}
      {success && (
        <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm px-4 py-3">{success}</div>
      )}

      {view === 'json' ? (
        <textarea
          value={rawJson}
          onChange={(e) => setRawJson(e.target.value)}
          spellCheck={false}
          className="w-full min-h-[520px] p-4 sm:p-6 font-mono text-sm text-slate-800 bg-white rounded-2xl border border-slate-200 resize-y"
        />
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-brand-300'
                }`}
              >
                {tab.label} ({(data[tab.id] || []).length})
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {groupItems.length === 0 && (
              <p className="text-slate-500 text-sm">No items in this section.</p>
            )}
            {groupItems.map((item, index) => (
              <details key={item.id || index} className="bg-white rounded-2xl border border-slate-200 shadow-sm" open={index === 0}>
                <summary className="cursor-pointer px-4 sm:px-5 py-4 font-semibold text-slate-900 hover:bg-slate-50 rounded-2xl">
                  {item.title || item.label || item.author || `Item ${index + 1}`}
                  <span className="ml-2 text-xs font-normal text-slate-400">{item.id}</span>
                </summary>
                {['services', 'softwareSubServices', 'itServices', 'hostedSolutions'].includes(activeTab) ? (
                  <div className="px-4 sm:px-5 pb-5">
                    <ServiceFields
                      service={item}
                      onChange={(updated) => updateService(activeTab, index, updated)}
                    />
                  </div>
                ) : activeTab === 'stats' ? (
                  <div className="px-4 sm:px-5 pb-5 grid sm:grid-cols-2 gap-4">
                    <input
                      value={item.value || ''}
                      onChange={(e) => updateService('stats', index, { ...item, value: e.target.value })}
                      placeholder="Value e.g. 5+"
                      className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                    <input
                      value={item.label || ''}
                      onChange={(e) => updateService('stats', index, { ...item, label: e.target.value })}
                      placeholder="Label"
                      className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                ) : (
                  <div className="px-4 sm:px-5 pb-5 space-y-3">
                    <textarea
                      value={item.quote || ''}
                      onChange={(e) => updateService('testimonials', index, { ...item, quote: e.target.value })}
                      rows={3}
                      placeholder="Quote"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                    />
                    <div className="grid sm:grid-cols-3 gap-3">
                      <input
                        value={item.author || ''}
                        onChange={(e) => updateService('testimonials', index, { ...item, author: e.target.value })}
                        placeholder="Author"
                        className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                      />
                      <input
                        value={item.role || ''}
                        onChange={(e) => updateService('testimonials', index, { ...item, role: e.target.value })}
                        placeholder="Role"
                        className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                      />
                      <input
                        value={item.company || ''}
                        onChange={(e) => updateService('testimonials', index, { ...item, company: e.target.value })}
                        placeholder="Company"
                        className="px-3 py-2 rounded-lg border border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                )}
              </details>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
