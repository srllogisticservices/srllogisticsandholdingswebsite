const DEFAULT_QUOTE_EMAIL = 'info@srllogisticsandholdings.com'

export function getQuoteEmail(contact = {}) {
  return contact.quoteEmail || contact.email || DEFAULT_QUOTE_EMAIL
}

export function buildQuoteMailto(email, options = {}) {
  const { service, project, subject, body } = options
  const quoteEmail = email || DEFAULT_QUOTE_EMAIL

  const mailSubject =
    subject ||
    (service
      ? `Quote Request: ${service}`
      : project
        ? `Quote Request: ${project}`
        : 'Quote Request - SRL Logistics & Holdings')

  const mailBody =
    body ||
    (service
      ? `Hello SRL Logistics & Holdings,\n\nI would like a quote for: ${service}\n\nName:\nCompany:\nPhone:\n\nProject details:\n`
      : project
        ? `Hello SRL Logistics & Holdings,\n\nI would like a quote regarding: ${project}\n\nName:\nCompany:\nPhone:\n\nProject details:\n`
        : `Hello SRL Logistics & Holdings,\n\nI would like to request a quote.\n\nName:\nCompany:\nPhone:\n\nProject details:\n`)

  return `mailto:${quoteEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`
}

export function buildQuoteMailtoFromContact(contact = {}, options = {}) {
  return buildQuoteMailto(getQuoteEmail(contact), options)
}

export function buildQuoteMailtoFromForm(form, contact = {}) {
  const body = `Hello SRL Logistics & Holdings,

I would like a quote for: ${form.service || 'General inquiry'}

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || 'Not provided'}
Company: ${form.company || 'Not provided'}

Project details:
${form.message}`

  return buildQuoteMailto(getQuoteEmail(contact), {
    service: form.service,
    body,
  })
}
