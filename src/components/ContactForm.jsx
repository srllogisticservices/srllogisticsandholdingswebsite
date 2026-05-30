import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { hostedSolutions } from '../data/services'

const serviceOptions = [
  'Logistics & Transportation',
  'Server Hosting & Cloud Solutions',
  'Email Hosting & Domain Management',
  'Software & Database Development',
  ...hostedSolutions.map((solution) => solution.title),
  'Multiple Services',
  'General Inquiry',
]

export default function ContactForm({ defaultService = '' }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: defaultService,
    message: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 bg-emerald-50 rounded-2xl border border-emerald-200">
        <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you!</h3>
        <p className="text-slate-600">
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your Company Ltd."
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1.5">
          Service Interested In *
        </label>
        <select
          id="service"
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
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your project or requirements..."
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
      >
        <Send className="w-4 h-4" />
        Send Message
      </button>
    </form>
  )
}
