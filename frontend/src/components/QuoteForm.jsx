import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react'
import { api } from '../api/client'
import { useSiteContent } from '../context/SiteContext'
import { contactServiceOptions } from '../data/services'
import { buildQuoteMailtoFromForm, getQuoteEmail } from '../utils/quote'

export default function QuoteForm({ defaultService = '' }) {
  const { content } = useSiteContent()
  const contact = content?.branding?.contact || {}
  const quoteEmail = getQuoteEmail(contact)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: defaultService,
    message: '',
  })

  const serviceOptions = content
    ? [
        ...content.services.map((s) => s.title),
        ...content.softwareSubServices.map((s) => s.title),
        ...content.itServices.map((s) => s.title),
        ...content.hostedSolutions.map((s) => s.title),
        'Multiple Services',
        'General Inquiry',
      ]
    : contactServiceOptions

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await api.submitContact(form)
      setSubmitted(true)
    } catch {
      setError(
        `Could not reach our server. Use the button below to email your quote directly to ${quoteEmail}.`,
      )
    } finally {
      setSubmitting(false)
    }
  }

  const mailtoHref = buildQuoteMailtoFromForm(form, contact)

  if (submitted) {
    return (
      <div className="text-center py-10 px-6 bg-emerald-50 rounded-2xl border border-emerald-200">
        <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Quote request received</h3>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
          Thank you, {form.name}. Our team will review your request and reply to{' '}
          <strong>{form.email}</strong> within 24 hours.
        </p>
        <p className="text-slate-500 text-sm mt-3">
          Quotes are handled at <strong>{quoteEmail}</strong>
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-base sm:text-sm min-h-[48px]'

  return (
    <div id="quote-form">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email quote to {quoteEmail}
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="quote-name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name *
            </label>
            <input
              id="quote-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="quote-email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address *
            </label>
            <input
              id="quote-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="quote-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone Number
            </label>
            <input
              id="quote-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="+677 7885155"
            />
          </div>
          <div>
            <label htmlFor="quote-company" className="block text-sm font-medium text-slate-700 mb-1.5">
              Company
            </label>
            <input
              id="quote-company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              className={inputClass}
              placeholder="Company name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="quote-service" className="block text-sm font-medium text-slate-700 mb-1.5">
            Service you need *
          </label>
          <select
            id="quote-service"
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quote-message" className="block text-sm font-medium text-slate-700 mb-1.5">
            What do you need? *
          </label>
          <textarea
            id="quote-message"
            name="message"
            required
            rows={4}
            value={form.message}
            onChange={handleChange}
            className={`${inputClass} resize-none min-h-[100px]`}
            placeholder="Briefly describe your project, timeline, and budget if known..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 disabled:opacity-60 transition-colors min-h-[48px]"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Sending...' : 'Send Quote Request'}
          </button>
          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors min-h-[48px]"
          >
            <Mail className="w-4 h-4" />
            Email instead
          </a>
        </div>

        <p className="text-xs text-slate-500">
          Quote requests go to <strong>{quoteEmail}</strong>. We reply within 24 hours on business days.
        </p>
      </form>
    </div>
  )
}
