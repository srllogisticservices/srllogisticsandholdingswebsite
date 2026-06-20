import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, RefreshCw, Save } from 'lucide-react'
import { api } from '../../api/client'

export default function AdminContentEditor() {
  const { fileKey } = useParams()
  const [meta, setMeta] = useState(null)
  const [rawJson, setRawJson] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function loadContent() {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await api.adminGetContent(fileKey)
      setMeta(res)
      setRawJson(JSON.stringify(res.data, null, 2))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContent()
  }, [fileKey])

  function formatJson() {
    try {
      const parsed = JSON.parse(rawJson)
      setRawJson(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
    }
  }

  async function saveContent() {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const parsed = JSON.parse(rawJson)
      const result = await api.adminSaveContent(fileKey, parsed)
      setSuccess(`Saved ${result.filename} at ${new Date(result.savedAt).toLocaleString()}`)
      await loadContent()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-slate-600">Loading editor...</p>
  }

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
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{meta?.label || fileKey}</h1>
          <p className="text-slate-600 mt-2">{meta?.description}</p>
          <p className="text-xs text-slate-400 mt-2">File: {meta?.filename}</p>
        </div>
        <div className="flex flex-wrap gap-3">
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
            onClick={formatJson}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Format JSON
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
        <div className="mb-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm px-4 py-3">
          {success}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <textarea
          value={rawJson}
          onChange={(e) => setRawJson(e.target.value)}
          spellCheck={false}
          className="w-full min-h-[520px] p-4 sm:p-6 font-mono text-sm text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 resize-y"
          aria-label="JSON content editor"
        />
      </div>
    </div>
  )
}
