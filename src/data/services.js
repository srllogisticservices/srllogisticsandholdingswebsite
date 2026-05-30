import {
  Truck,
  Cloud,
  Mail,
  Code2,
  GraduationCap,
  Car,
  Globe,
  Recycle,
  Monitor,
  Printer,
  Wifi,
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
    showHostedSolutions: true,
    features: [
      'Dedicated & virtual private servers',
      'Cloud migration & deployment',
      'Managed hosting & monitoring',
      'Backup & disaster recovery',
      'Hosted business systems & web applications',
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

export const hostedSolutions = [
  {
    id: 'student-management',
    slug: '/services/hosted/student-management',
    icon: GraduationCap,
    title: 'Student Management System',
    shortDescription:
      'A complete school platform for online enrolment, fee payments, results, and an integrated e-learning portal — hosted and managed by SRL.',
    features: [
      'Online student enrolment & registration',
      'Secure fee payment processing',
      'Results & academic records management',
      'Integrated e-learning portal for students and teachers',
      'Parent & student portals with role-based access',
      'Reports, attendance, and academic analytics',
    ],
    benefits: [
      'Streamline admissions and reduce paperwork',
      'Accept and track fee payments online',
      'Give students and parents instant access to results',
      'Deliver learning materials through one hosted portal',
    ],
    color: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50',
    iconColor: 'text-sky-600',
    href: null,
  },
  {
    id: 'fleet-management',
    slug: '/services/hosted/fleet-management',
    icon: Car,
    title: 'Fleet Management System',
    shortDescription:
      'Track vehicles, drivers, maintenance, and routes from a secure cloud-hosted fleet management platform.',
    features: [
      'Real-time vehicle tracking & GPS monitoring',
      'Driver assignment & trip management',
      'Maintenance schedules & service alerts',
      'Fuel usage & cost reporting',
      'Route planning & dispatch tools',
      'Fleet performance dashboards',
    ],
    benefits: [
      'Improve fleet visibility and accountability',
      'Reduce downtime with proactive maintenance alerts',
      'Optimize routes and control operating costs',
      'Access your fleet data securely from anywhere',
    ],
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    iconColor: 'text-amber-600',
    href: null,
  },
  {
    id: 'website-development',
    slug: '/services/hosted/website-development',
    icon: Globe,
    title: 'Website Development & Hosting',
    shortDescription:
      'Professional website design, development, and hosting — from business sites to custom web portals.',
    features: [
      'Custom website design & development',
      'Responsive layouts for mobile and desktop',
      'Domain, SSL, and secure hosting included',
      'Content management & easy updates',
      'SEO-friendly structure and performance tuning',
      'Ongoing maintenance & support',
    ],
    benefits: [
      'Establish a professional online presence',
      'Reach customers with a fast, secure website',
      'Manage content without technical expertise',
      'Keep your site online with reliable hosting',
    ],
    color: 'from-cyan-500 to-teal-600',
    bgLight: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    href: null,
  },
  {
    id: 'waste-management',
    slug: '/services/hosted/waste-management',
    icon: Recycle,
    title: 'Waste Management System',
    shortDescription:
      'Digitize waste collection, billing, route planning, and reporting with a hosted management platform.',
    features: [
      'Customer & account management',
      'Collection scheduling & route optimization',
      'Billing, invoicing & payment tracking',
      'Bin/asset tracking and service history',
      'Field staff mobile access',
      'Compliance & operational reporting',
    ],
    benefits: [
      'Improve collection efficiency and service delivery',
      'Automate billing and reduce manual errors',
      'Track assets and service requests in one place',
      'Generate reports for management and compliance',
    ],
    color: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50',
    iconColor: 'text-green-600',
    href: null,
  },
  {
    id: 'internet-cafe-lab',
    slug: '/services/hosted/internet-cafe-lab',
    icon: Monitor,
    title: 'Internet Cafe, Cabling & Computer Lab Setup',
    shortDescription:
      'End-to-end setup for internet cafes, structured cabling, and computer labs — hardware, network, and support.',
    features: [
      'Internet cafe layout & workstation setup',
      'Structured network cabling & patch panels',
      'Computer lab design & equipment installation',
      'Router, switch & server configuration',
      'User management & billing systems',
      'Maintenance, upgrades & technical support',
    ],
    benefits: [
      'Get a turnkey setup ready for daily operations',
      'Reliable networking built for high-traffic environments',
      'Professional cabling for long-term performance',
      'Ongoing support from a local technical team',
    ],
    color: 'from-indigo-500 to-violet-600',
    bgLight: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    href: null,
  },
  {
    id: 'printing-management',
    slug: '/services/hosted/printing-management',
    icon: Printer,
    title: 'Printing Management System',
    shortDescription:
      'Manage print jobs, quotas, billing, and devices from a centralized hosted printing platform.',
    features: [
      'Print queue & job tracking',
      'User quotas & cost allocation',
      'Device monitoring & usage reports',
      'Secure release printing',
      'Billing integration for cafes, schools & offices',
      'Multi-location printer management',
    ],
    benefits: [
      'Control printing costs across your organization',
      'Track usage by user, department, or location',
      'Reduce waste with secure print release',
      'Simplify billing for paid print services',
    ],
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    iconColor: 'text-rose-600',
    href: null,
  },
  {
    id: 'wifi-management',
    slug: '/services/hosted/wifi-management',
    icon: Wifi,
    title: 'WiFi Management System',
    shortDescription:
      'Centralized WiFi management for hotspots, vouchers, user access, and network monitoring.',
    features: [
      'Hotspot & voucher-based access control',
      'User authentication & bandwidth management',
      'Multi-site access point monitoring',
      'Usage analytics & session reporting',
      'Guest and staff network segmentation',
      'Remote configuration & support',
    ],
    benefits: [
      'Offer secure, managed public or private WiFi',
      'Control access with vouchers or user accounts',
      'Monitor network health across multiple sites',
      'Scale WiFi services as your business grows',
    ],
    color: 'from-fuchsia-500 to-purple-600',
    bgLight: 'bg-fuchsia-50',
    iconColor: 'text-fuchsia-600',
    href: null,
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
      'SRL transformed our transport logistics and have been supporting us for the past 5 years.',
    author: 'Mr. Fiona Aisake',
    role: 'Chief Operating Officer',
    company: 'ANZ Solomon Islands',
  },
  {
    quote:
      'Their cloud hosting team migrated our entire infrastructure with zero downtime. Outstanding service.',
    author: 'john Doe.',
    role: 'Admin Officer',
    company: 'Solomon Star',
  },
  {
    quote:
      'The custom database they built saved us hours every week. Professional from start to finish.',
    author: 'Joe Kelesi',
    role: 'ECD',
    company: 'Solomon Islands Government Ministry of Environment, Climate Change, Disaster Management and Meteorology',

  },
]
