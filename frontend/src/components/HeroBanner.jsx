export default function HeroBanner({
  image,
  overlay = 'from-slate-950/90 via-slate-900/75 to-slate-950/85',
  children,
  minHeight = 'hero-height',
  align = 'left',
}) {
  const alignClass =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <section className={`relative overflow-hidden text-white ${minHeight} flex items-center`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${overlay}`} aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_50%)]"
        aria-hidden="true"
      />

      <div className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 max-lg:landscape:py-8 flex flex-col ${alignClass}`}>
        {children}
      </div>
    </section>
  )
}
