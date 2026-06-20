import {
  Truck, Cloud, Mail, Code2, GraduationCap, Car, Globe, Recycle, Monitor,
  Printer, Wifi, Database, GitMerge, ServerCog, Smartphone, Network, Cable,
  Shield, Camera, Satellite, Target, Users, Award, HeartHandshake, Circle,
} from 'lucide-react'

const iconMap = {
  Truck, Cloud, Mail, Code2, GraduationCap, Car, Globe, Recycle, Monitor,
  Printer, Wifi, Database, GitMerge, ServerCog, Smartphone, Network, Cable,
  Shield, Camera, Satellite, Target, Users, Award, HeartHandshake, Circle,
}

export function getIcon(name) {
  return iconMap[name] || Circle
}

export function resolveServiceIcons(service) {
  if (!service) return service
  return { ...service, icon: getIcon(service.iconName) }
}

export function resolveServiceList(list = []) {
  return list.map(resolveServiceIcons)
}
