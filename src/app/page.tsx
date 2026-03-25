import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Research from '@/components/Research'
import MediaCoverage from '@/components/MediaCoverage'
import Publications from '@/components/Publications'
import Talks from '@/components/Talks'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Research />
      <MediaCoverage />
      <Publications />
      <Talks />
      <Contact />
    </main>
  )
}
