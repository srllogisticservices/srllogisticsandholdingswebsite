import { useEffect, useState } from 'react'
import { api } from '../../api/client'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .adminMessages()
      .then(setMessages)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-slate-600">Loading contact messages...</p>
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-red-700">
        Could not load messages: {error}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Contact Messages</h1>
      <p className="text-slate-600 mb-8">Messages submitted through the public contact form.</p>

      {messages.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-slate-500">
          No contact messages yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <article key={msg.id} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h2 className="font-bold text-slate-900">{msg.name}</h2>
                  <p className="text-sm text-slate-600">{msg.email}{msg.phone ? ` · ${msg.phone}` : ''}</p>
                </div>
                <time className="text-xs text-slate-400">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                </time>
              </div>
              <p className="text-sm font-medium text-brand-700 mb-2">{msg.service}</p>
              {msg.company && <p className="text-sm text-slate-600 mb-2">Company: {msg.company}</p>}
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
