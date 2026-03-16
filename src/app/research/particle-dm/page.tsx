import Link from 'next/link'
import ResearchPlot from '@/components/ResearchPlot'

const PAPERS = [
  {
    authors: 'Ilie, C., Pilawa, J., & Zhang, S.',
    year: 2020,
    title: 'Probing below the neutrino floor with the first generation of stars',
    journal: 'ArXiv Preprint',
    arxiv: '2009.11478',
    firstAuthor: false,
  },
  {
    authors: 'Ilie, C., Levy, C., Pilawa, J., & Zhang, S.',
    year: 2021,
    title: 'Constraining dark matter properties with the first generation of stars',
    journal: 'Phys. Rev. D, 104, 123031',
    arxiv: '2009.11474',
    firstAuthor: false,
  },
  {
    authors: 'Ilie, C., Pilawa, J., & Zhang, S.',
    year: 2020,
    title: 'Comment on "Multiscatter stellar capture of dark matter"',
    journal: 'Phys. Rev. D, 102, 048301',
    arxiv: '2005.05946',
    firstAuthor: false,
  },
  {
    authors: 'Ilie, C., & Zhang, S.',
    year: 2019,
    title: 'Multiscatter capture of superheavy dark matter by Pop III stars',
    journal: 'JCAP, 2019(12), 051',
    arxiv: '1908.02700',
    firstAuthor: false,
  },
]


export const metadata = {
  title: 'Particle Dark Matter & Pop III Stars | Saiyang Zhang',
}

export default function ParticleDMPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 pt-28 pb-24">
      {/* Back */}
      <Link
        href="/#research"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--color-accent)] transition-colors mb-8 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Research
      </Link>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[#c77dff] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          Dark Matter
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
          Particle Dark Matter &amp; Pop III Stars
        </h1>
        <div className="h-px bg-gradient-to-r from-[#7b2fbe]/50 to-transparent" />
      </div>

      {/* Description */}
      <div className="mb-14 flex flex-col gap-5">
        <p className="text-[var(--muted)] leading-relaxed">
          The first generation of stars (Pop III) and compact remnants such as neutron stars offer unique cosmic laboratories for probing the microphysics of particle dark matter (DM), especially in regimes inaccessible to terrestrial experiments. In a series of works, Zhang and collaborators develop a multiscatter capture framework to study how DM particles can be gravitationally captured by stars via repeated interactions, leading to observable consequences such as DM annihilation heating or stellar mass truncation.
        </p>
        <p className="text-[var(--muted)] leading-relaxed">
          Applying this formalism to Pop III stars forming in primordial minihalos at high redshift (z ≳ 15), they show that even current bounds from direct detection experiments like XENON1T imply that dark matter can significantly limit the stellar mass scale. Conversely, observations of massive Pop III stars (≳300 M<sub>☉</sub>) would constrain DM–nucleon scattering cross sections far below the neutrino floor, especially in spin-dependent channels. The framework is further extended to superheavy DM, where annihilation or energy deposition effects can dramatically alter the early stellar population.
        </p>
        <p className="text-[var(--muted)] leading-relaxed">
          Complementing this, the team explores DM capture in neutron stars, where the extreme densities make even small DM cross sections detectable via stellar heating or collapse signatures. These compact stars, coupled with Pop III progenitors, offer a multi-messenger probe of DM parameter space spanning many orders of magnitude in mass and cross section.
        </p>
      </div>

      {/* Research Highlights */}
      <div className="mb-14">
        <h2 className="text-lg font-bold text-[var(--foreground)] mb-6 flex items-center gap-3">
          <span className="w-5 h-0.5 bg-[#c77dff] rounded" />
          Research Highlights
        </h2>
        <ResearchPlot
          src="/plots/PopIIIDM-scatter.png"
          alt="DM-nucleon spin-independent and spin-dependent cross section constraints from Pop III stars showing excluded parameter space for stellar masses M★ = 100, 300, 1000 solar masses compared to XENON1T, Borexino, PICO-60, Migdal Effect, and Direct Detection bounds"
          caption={
            <>
              DM-nucleon spin-independent (top) and spin-dependent (bottom) cross section constraints from Pop III stars
              at two DM density environments. Colored regions show excluded parameter space for stellar masses{' '}
              M★ = 100, 300, 1000 M<sub>☉</sub>, compared against XENON1T, Borexino, PICO-60, Migdal Effect,
              and Direct Detection bounds. (Ilie, Pilawa &amp; Zhang 2020)
            </>
          }
        />
      </div>

      {/* Papers */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--foreground)] mb-5 flex items-center gap-3">
          <span className="w-5 h-0.5 bg-[#c77dff] rounded" />
          Related Papers
        </h2>
        <div className="flex flex-col gap-4">
          {PAPERS.map((p) => (
            <div key={p.arxiv} className="flex items-start gap-3 group">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7b2fbe]/60 group-hover:bg-[#c77dff] shrink-0 transition-colors" />
              <div>
                <a
                  href={`https://arxiv.org/abs/${p.arxiv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[var(--foreground)] hover:text-[#c77dff] transition-colors leading-snug block"
                >
                  {p.title}
                </a>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {p.authors} ({p.year}). <em>{p.journal}.</em>
                  {' '}
                  <a
                    href={`https://arxiv.org/abs/${p.arxiv}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] font-mono hover:underline"
                  >
                    arXiv:{p.arxiv}
                  </a>
                  {p.firstAuthor && (
                    <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-accent)] text-[#020818]">★ First Author</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
