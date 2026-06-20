export const mainNav = [
  { type: 'link', to: '/', label: 'Home', end: true },
  { type: 'link', to: '/about', label: 'About Us' },
  { type: 'link', to: '/projects', label: 'Our Projects' },
  {
    type: 'dropdown',
    label: 'Services',
    items: [
      { to: '/services/logistics', label: 'Logistics & Transportation' },
      { to: '/services/cloud-hosting', label: 'Cloud Hostings' },
      { to: '/services/email-domains', label: 'Email & Domain' },
      {
        type: 'submenu',
        label: 'Software Dev',
        to: '/services/software-development',
        items: [
          { to: '/services/software/database-development', label: 'Database Development' },
          { to: '/services/software/system-integrations', label: 'System Integrations' },
          { to: '/services/software/devops-proposals', label: 'DevOps Proposals' },
          { to: '/services/software/mobile-apps', label: 'Mobile Apps Systems' },
        ],
      },
      { to: '/services/networking-installations', label: 'Networking Installations' },
      { to: '/services/structured-cabling', label: 'Structured Cabling' },
      { to: '/services/network-design-security', label: 'Network Designing and Security' },
      { to: '/services/cctv-installations', label: 'CCTV Installations' },
      { to: '/services/starlink-deployments', label: 'Starlink Deployments' },
    ],
  },
]

export function flattenNavItems(items = mainNav.find((n) => n.label === 'Services')?.items ?? []) {
  const result = []
  for (const item of items) {
    if (item.type === 'submenu') {
      result.push({ to: item.to, label: item.label })
      result.push(...item.items)
    } else {
      result.push(item)
    }
  }
  return result
}
