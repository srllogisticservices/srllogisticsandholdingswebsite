export default function PageBackground({ children }) {
  return (
    <div className="relative min-h-full">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #fdfbf5 0%, #ffffff 35%, #f5f0e6 100%)',
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
