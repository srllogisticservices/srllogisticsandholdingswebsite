export default function PageBackground({ children }) {
  return (
    <div className="relative min-h-full">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 35%, #f1f5f9 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'url(/images/pattern-dots.svg)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
