import { Link } from 'react-router-dom'
import { useSiteContent } from '../context/SiteContext'

function SloganText({ text, className = '' }) {
  const parts = text.split(/(Logistics|Technology|Sustainable Growth)/g)

  return (
    <p className={`font-slogan leading-snug ${className}`}>
      {parts.map((part, i) => {
        if (part === 'Logistics' || part === 'Technology' || part === 'Sustainable Growth') {
          return (
            <span key={`${part}-${i}`} className="text-brand-600 font-medium not-italic">
              {part}
            </span>
          )
        }
        return <span key={`${part}-${i}`}>{part}</span>
      })}
    </p>
  )
}

export default function HeaderBrand({ onClick, showSlogan = true }) {
  const { content } = useSiteContent()
  const branding = content?.branding || {}
  const slogan = branding.slogan || 'Your Trusted Partner in Logistics, Technology, and Sustainable Growth.'
  const smallLogo = branding.logos?.small || '/images/logo-small.jpg'
  const companyName = branding.companyName || 'SRL Logistics & Holdings'

  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-2 sm:gap-3 min-w-0 max-w-[calc(100%-3rem)] lg:max-w-[min(100%,42rem)] shrink group"
    >
      <img
        src={smallLogo}
        alt={companyName}
        className="h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-xl object-contain bg-white p-0.5 shadow-md ring-1 ring-brand-200/80 shrink-0 transition-opacity group-hover:opacity-90"
        width={56}
        height={56}
      />

      {showSlogan && (
        <>
          <span
            className="hidden lg:inline-block w-px h-8 bg-brand-300/70 shrink-0 self-center"
            aria-hidden="true"
          />
          <SloganText
            text={slogan}
            className="hidden lg:block text-[0.65rem] xl:text-xs text-slate-600 not-italic tracking-normal leading-snug min-w-0 flex-1"
          />
        </>
      )}
    </Link>
  )
}
