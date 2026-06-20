import { Link } from 'react-router-dom'
import { branding } from '../data/branding'

export default function Logo({ variant = 'default', className = '', onClick }) {
  const src =
    variant === 'light'
      ? branding.logos.light
      : variant === 'icon'
        ? branding.logos.icon
        : branding.logos.default

  const sizeClass =
    variant === 'icon' ? 'h-10 w-10' : 'h-11 sm:h-12 w-auto max-w-[220px] sm:max-w-[260px]'

  return (
    <Link to="/" className="inline-flex shrink-0 group" onClick={onClick}>
      <img
        src={src}
        alt={branding.companyName}
        className={`${sizeClass} object-contain object-left transition-opacity group-hover:opacity-90 ${className}`}
      />
    </Link>
  )
}
