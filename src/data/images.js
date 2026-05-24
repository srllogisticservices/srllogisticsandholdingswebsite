/**
 * Site images & backgrounds — replace any file in /public/images/ to customize.
 * Keep the same filename, or update the path here.
 */
export const backgrounds = {
  site: {
    body: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 40%, #f1f5f9 100%)',
    pattern: '/images/pattern-dots.svg',
  },
  pages: {
    home: '/images/hero-home.jpg',
    about: '/images/about-team.jpg',
    contact: '/images/contact.jpg',
    whyChoose: '/images/why-choose.jpg',
  },
  services: {
    logistics: '/images/logistics.jpg',
    cloud: '/images/cloud.jpg',
    email: '/images/email.jpg',
    software: '/images/software.jpg',
  },
}

export const galleryPhotos = [
  {
    src: '/images/gallery-warehouse.jpg',
    alt: 'Warehouse and inventory management facility',
    title: 'Warehouse Operations',
    category: 'Logistics',
  },
  {
    src: '/images/gallery-fleet.jpg',
    alt: 'Fleet of delivery trucks on the road',
    title: 'Fleet Management',
    category: 'Transportation',
  },
  {
    src: '/images/gallery-delivery.jpg',
    alt: 'Package delivery and last-mile logistics',
    title: 'Delivery Services',
    category: 'Logistics',
  },
  {
    src: '/images/gallery-server.jpg',
    alt: 'Server room and cloud infrastructure',
    title: 'Cloud Infrastructure',
    category: 'Hosting',
  },
  {
    src: '/images/gallery-office.jpg',
    alt: 'Modern office workspace',
    title: 'Business Solutions',
    category: 'Consulting',
  },
  {
    src: '/images/gallery-dev.jpg',
    alt: 'Software development team at work',
    title: 'Software Development',
    category: 'Development',
  },
]

export const serviceImages = {
  logistics: {
    hero: backgrounds.services.logistics,
    card: '/images/gallery-fleet.jpg',
  },
  cloud: {
    hero: backgrounds.services.cloud,
    card: '/images/gallery-server.jpg',
  },
  email: {
    hero: backgrounds.services.email,
    card: '/images/gallery-office.jpg',
  },
  software: {
    hero: backgrounds.services.software,
    card: '/images/gallery-dev.jpg',
  },
}

export const overlayDefaults = {
  dark: 'from-slate-950/90 via-slate-900/75 to-slate-950/85',
  medium: 'from-slate-950/80 via-slate-900/60 to-slate-950/75',
  light: 'from-brand-950/85 via-brand-900/70 to-slate-900/80',
}
