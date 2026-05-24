import {
  Truck,
  Cloud,
  Mail,
  Code2,
} from 'lucide-react'

export const services = [
  {
    id: 'logistics',
    slug: '/services/logistics',
    icon: Truck,
    title: 'Logistics & Transportation',
    shortDescription:
      'Fleet Management, Warehousing, and Inventory Management.',
    features: [
      'Fleet tracking & route optimization',
      'Warehousing & inventory management',
      'Airport delivery services',
      'Custom logistics consulting',
  
    ],
    benefits: [
      'Reduce delivery times with optimized routes'
    ],
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: '/images/logistics.jpg',
    cardImage: '/images/gallery-fleet.jpg',
  },
  {
    id: 'cloud',
    slug: '/services/cloud-hosting',
    icon: Cloud,
    title: 'Server Hosting & Cloud Solutions',
    shortDescription:
      'Secure, scalable cloud infrastructure and managed server hosting to keep your business online 24/7.',
    features: [
      'Dedicated & virtual private servers',
      'Cloud migration & deployment',
      'Managed hosting & monitoring',
      'Backup & disaster recovery',
      '24/7 infrastructure support',
    ],
    benefits: [
      'Pay only for the resources you need',
      'Enterprise-grade security and compliance',
      'Expert support when you need it most',
    ],
    color: 'from-brand-500 to-brand-700',
    bgLight: 'bg-brand-50',
    iconColor: 'text-brand-600',
    image: '/images/cloud.jpg',
    cardImage: '/images/gallery-server.jpg',
  },
  {
    id: 'email',
    slug: '/services/email-domains',
    icon: Mail,
    title: 'Email Hosting & Domain Management',
    shortDescription:
      'Professional business email, domain registration, and DNS management under one trusted roof.',
    features: [
      'Custom domain registration',
      'Business email with your brand name',
      'DNS & SSL certificate management',
      'Spam filtering & email security',
      'Shared calendars & collaboration tools',
      'Multi-domain administration',
    ],
    benefits: [
      'Build trust with a professional email address',
      'Protect your brand with secure domain management',
      'Simplify IT with an all-in-one email platform',
      'Stay connected with reliable, fast email delivery',
    ],
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    image: '/images/email.jpg',
    cardImage: '/images/gallery-office.jpg',
  },
  {
    id: 'software',
    slug: '/services/software-development',
    icon: Code2,
    title: 'Software & Database Development',
    shortDescription:
      'Custom software, web applications, and database solutions tailored to your business workflows.',
    features: [
      'Custom web & mobile applications',
      'Database design & optimization',
      'API development & integration',
      'Legacy system modernization',
      'Business intelligence & reporting',
      'Ongoing maintenance & support',
    ],
    benefits: [
      'Software built around how your team actually works',
      'Faster processes through automation',
      'Data-driven decisions with robust databases',
      'Long-term partnership for updates and growth',
    ],
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    iconColor: 'text-violet-600',
    image: '/images/software.jpg',
    cardImage: '/images/gallery-dev.jpg',
  },
]

export const stats = [
  { value: '5+', label: 'Clients Served' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '24/7', label: 'Support Available' },
  { value: '5+', label: 'Years Experience' },
]

export const testimonials = [
  {
    quote:
      'SRL transformed our supply chain. Deliveries are faster and our costs dropped by 20%.',
    author: 'Samuel Liosulia.',
    role: 'Managing Director',
    company: 'Retail Co.',
  },
  {
    quote:
      'Their cloud hosting team migrated our entire infrastructure with zero downtime. Outstanding service.',
    author: 'Sarah K.',
    role: 'IT Manager',
    company: 'Finance Group',
  },
  {
    quote:
      'The custom database they built saved us hours every week. Professional from start to finish.',
    author: 'David L.',
    role: 'CEO',
    company: 'Manufacturing Ltd.',
  },
]
