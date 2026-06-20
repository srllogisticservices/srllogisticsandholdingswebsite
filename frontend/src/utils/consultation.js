const DEFAULT_MESSAGE =
  'Hello SRL Logistics & Holdings, I would like to book a free consultation.'

function phoneDigits(phone) {
  return (phone || '').replace(/\D/g, '')
}

export function buildConsultationChannels(contact = {}, consultation = {}) {
  const email = consultation.teamsEmail || contact.email
  const phone = contact.phone
  const tel = phoneDigits(phone)
  const whatsapp = consultation.whatsapp || tel
  const message = encodeURIComponent(consultation.message || DEFAULT_MESSAGE)

  return [
    {
      id: 'teams',
      label: 'Microsoft Teams',
      description: 'Video or chat consultation',
      href: email
        ? `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`
        : null,
      external: true,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      description: 'Message us on WhatsApp',
      href: whatsapp ? `https://wa.me/${whatsapp}?text=${message}` : null,
      external: true,
    },
    {
      id: 'email',
      label: 'Email',
      description: contact.email || 'Send us an email',
      href: contact.email
        ? `mailto:${contact.email}?subject=${encodeURIComponent('Free consultation request')}&body=${message}`
        : null,
      external: false,
    },
    {
      id: 'phone',
      label: 'Phone',
      description: phone || 'Call our team',
      href: tel ? `tel:+${tel}` : null,
      external: false,
    },
    {
      id: 'portal',
      label: 'Web Portal',
      description: 'Browse services & send a message',
      href: '/contact#consultation',
      external: false,
    },
  ].filter((channel) => channel.href)
}

export function getConsultationMeta(contact = {}, consultation = {}) {
  return {
    title: consultation.title || 'Free Consultation Hours',
    subtitle:
      consultation.subtitle ||
      'Connect with our team your way — available during business hours for a no-obligation consultation.',
    hoursNote: consultation.hoursNote || contact.hours || 'Mon – Fri: 8:00 AM – 6:00 PM',
  }
}
