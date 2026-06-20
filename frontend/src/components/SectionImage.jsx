export default function SectionImage({ src, alt, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
    </div>
  )
}
