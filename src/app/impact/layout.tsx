import Navbar from '@/components/Navbar'

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--background)]">
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(76,201,240,0.06) 0%, transparent 70%)' }}
        />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  )
}
