/**
 * Export frontend service data to data/services.json for the backend API.
 * Run from project root: node scripts/export-content.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const iconNames = {
  logistics: 'Truck', cloud: 'Cloud', email: 'Mail', software: 'Code2',
  'database-development': 'Database', 'system-integrations': 'GitMerge',
  'devops-proposals': 'ServerCog', 'mobile-apps': 'Smartphone',
  'networking-installations': 'Network', 'structured-cabling': 'Cable',
  'network-design-security': 'Shield', 'cctv-installations': 'Camera',
  'starlink-deployments': 'Satellite',
  'student-management': 'GraduationCap', 'fleet-management': 'Car',
  'website-development': 'Globe', 'waste-management': 'Recycle',
  'internet-cafe-lab': 'Monitor', 'printing-management': 'Printer',
  'wifi-management': 'Wifi',
}

function stripIcons(items) {
  return items.map(({ icon, ...rest }) => ({
    ...rest,
    iconName: iconNames[rest.id] || 'Circle',
  }))
}

const { services, softwareSubServices, itServices, hostedSolutions, stats, testimonials } =
  await import(pathToFileURL(join(root, 'frontend/src/data/services.js')).href)

const payload = {
  services: stripIcons(services),
  softwareSubServices: stripIcons(softwareSubServices),
  itServices: stripIcons(itServices),
  hostedSolutions: stripIcons(hostedSolutions),
  stats,
  testimonials,
}

const out = join(root, 'data/services.json')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify(payload, null, 2))
console.log('Exported', out)
