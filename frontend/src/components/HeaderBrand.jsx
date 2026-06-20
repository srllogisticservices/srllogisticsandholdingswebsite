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
      className="flex items-center gap-2 sm:gap-2.5 min-w-0 max-w-[70%] xs:max-w-[55%] sm:max-w-[42%] lg:max-w-md xl:max-w-lg shrink-0 group"
    >
      <img
        src={smallLogo}
        alt={companyName}
        className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-xl object-cover shadow-md ring-1 ring-brand-200/80 shrink-0 transition-opacity group-hover:opacity-90"
        width={64}
        height={64}
      />

      {showSlogan && (
        <>
          <span
            className="hidden md:inline text-brand-400 font-light text-sm leading-none select-none shrink-0"
            aria-hidden="true"
          >
            |
          </span>
          <SloganText
            text={slogan}
            className="hidden md:block text-[0.625rem] lg:text-[0.65rem] xl:text-[0.7rem] text-slate-500 italic tracking-normal leading-tight min-w-0 max-w-[11rem] lg:max-w-[13rem] xl:max-w-[15rem]"
          />
        </>
      )}
    </Link>
  )
}
