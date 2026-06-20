export default function PageLoader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 px-4">
      <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  )
}

export function SectionSkeleton({ rows = 3 }) {
  return (
    <div className="animate-pulse space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-8 bg-slate-200 rounded-lg w-1/3 mx-auto" />
      <div className="h-4 bg-slate-100 rounded w-2/3 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-48 bg-slate-100 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
