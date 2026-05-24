export default function PhotoGallery({ photos, title = 'Our Work in Action', subtitle }) {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url(/images/pattern-dots.svg)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          {subtitle && <p className="text-slate-600 text-lg">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5 lg:p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-300 mb-1">
                  {photo.category}
                </span>
                <span className="text-white font-semibold text-lg">{photo.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
