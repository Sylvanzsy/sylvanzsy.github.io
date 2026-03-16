import Link from 'next/link'
import ResearchPlot from '@/components/ResearchPlot'

const PAPERS = [
  {
    authors: 'Zhang, S., Ilie, C., & Freese, K.',
    year: 2024,
    title: 'Detectability of Supermassive Dark Stars with the Roman Space Telescope',
    journal: 'ApJ, 965(2), 121',
    arxiv: '2306.11606',
    firstAuthor: true,
  },
]


export const metadata = {
  title: 'Supermassive Dark Stars | Saiyang Zhang',
}

export default function DarkStarsPage() {
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
        <p className="text-[#f72585] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          Dark Matter · Early Universe
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
          Supermassive Dark Stars (SMDSs)
        </h1>
        <div className="h-px bg-gradient-to-r from-[#f72585]/50 to-transparent" />
      </div>

      {/* Description */}
      <div className="mb-14 flex flex-col gap-5">
        <p className="text-[var(--muted)] leading-relaxed">
          Supermassive dark stars (SMDSs) are luminous stellar objects formed in the early Universe at redshift z~10–20, made primarily of hydrogen and helium, yet powered by dark matter annihilation. Differentiating SMDSs from early galaxies containing zero metallicity stars at similar redshifts requires spectral, photometric, and morphological comparisons.
        </p>
        <p className="text-[var(--muted)] leading-relaxed">
          With only the Roman Space Telescope (RST), differentiation of SMDSs — particularly those formed via adiabatic contraction with M &gt; 10<sup>5</sup> M<sub>☉</sub> and lensed by &gt;100× — is possible due to their distinct photometric signatures from the first galaxies. Those formed via dark matter capture can be differentiated only by image morphology: point object (SMDSs) vs. extended object (sufficiently magnified galaxies).
        </p>
        <p className="text-[var(--muted)] leading-relaxed">
          By additionally employing James Webb Space Telescope (JWST) spectroscopy, we can identify the HeII 1640 absorption line, a &ldquo;smoking gun&rdquo; for SMDS detection. Although RST doesn&apos;t cover the required wavelength band (for z&gt;10 objects), JWST does, hence the two can be used in tandem to identify SMDSs.
        </p>
        <p className="text-[var(--muted)] leading-relaxed">
          The detection of SMDSs would confirm a new type of star powered by dark matter and may shed light on the origins of the supermassive black holes powering bright quasars observed at z&gt;6.
        </p>
      </div>

      {/* Research Highlights */}
      <div className="mb-14">
        <h2 className="text-lg font-bold text-[var(--foreground)] mb-6 flex items-center gap-3">
          <span className="w-5 h-0.5 bg-[#f72585] rounded" />
          Research Highlights
        </h2>
        <ResearchPlot
          src="/plots/SMDS_Spectra.png"
          alt="Flux density spectra of Supermassive Dark Stars at various masses from 4.1 times 10 to the 4th to 10 to the 6th solar masses for DM capture and Extended Adiabatic Contraction formation channels showing HeII 1640 absorption line features in RST and JWST wavelength bands"
          caption={
            <>
              Flux density spectra of Supermassive Dark Stars at various masses (4.1×10<sup>4</sup> – 10<sup>6</sup> M<sub>☉</sub>)
              for two formation channels: DM capture (left) and Extended Adiabatic Contraction (right).
              Top panels show full spectrum with HeII and H Lyman Break features; bottom panels zoom into
              RST/JWST wavelength bands highlighting the HeII 1640Å absorption line. (Zhang, Ilie &amp; Freese 2024)
            </>
          }
        />
      </div>

      {/* Papers */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--foreground)] mb-5 flex items-center gap-3">
          <span className="w-5 h-0.5 bg-[#f72585] rounded" />
          Related Papers
        </h2>
        <div className="flex flex-col gap-4">
          {PAPERS.map((p) => (
            <div key={p.arxiv} className="flex items-start gap-3 group">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f72585]/50 group-hover:bg-[#f72585] shrink-0 transition-colors" />
              <div>
                <a
                  href={`https://arxiv.org/abs/${p.arxiv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[var(--foreground)] hover:text-[#f72585] transition-colors leading-snug block"
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
