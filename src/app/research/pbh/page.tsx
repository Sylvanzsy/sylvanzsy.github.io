'use client'

import Link from 'next/link'
import ResearchPlot from '@/components/ResearchPlot'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const PAPERS = [
  {
    authors: 'Zhang, S., Liu, B., Bromm, V., & Kühnel, F.',
    year: 2025,
    title: 'Primordial Black Holes as Seeds for Extremely Overmassive AGN Observed by JWST',
    journal: 'ApJL',
    arxiv: '2512.14066',
    firstAuthor: true,
  },
  {
    authors: 'Juodžbalis, I., ..., Zhang, S., et al.',
    year: 2025,
    title: 'A direct black hole mass measurement in a Little Red Dot at the Epoch of Reionization',
    journal: 'Submitted to Nature',
    arxiv: '2508.21748',
    firstAuthor: false,
  },
  {
    authors: 'Zhang, S., Liu, B., & Bromm, V.',
    year: 2025,
    title: 'A Novel Formation Channel for Supermassive Black Hole Binaries in the Early Universe via PBHs',
    journal: 'ApJ, 992(1), 136',
    arxiv: '2508.00774',
    firstAuthor: true,
  },
  {
    authors: 'Maiolino, R., ..., Zhang, S., et al.',
    year: 2025,
    title: 'A black hole in a near-pristine galaxy 700 million years after the Big Bang',
    journal: 'MNRAS',
    arxiv: '2505.22567',
    firstAuthor: false,
  },
  {
    authors: 'Zhang, S., Liu, B., Bromm, V., Jeon, J., Boylan-Kolchin, M., & Kühnel, F.',
    year: 2025,
    title: 'How do Massive PBHs Impact the Formation of the First Stars and Galaxies',
    journal: 'ApJ, 987(2), 185',
    arxiv: '2503.17585',
    firstAuthor: true,
  },
  {
    authors: 'Übler, H., ..., Zhang, S., et al.',
    year: 2025,
    title: 'BlackTHUNDER: evidence for three massive black holes in a z~5 galaxy',
    journal: 'Submitted to A&A',
    arxiv: '2509.21575',
    firstAuthor: false,
  },
  {
    authors: 'Zhang, S., Bromm, V., & Liu, B.',
    year: 2024,
    title: 'How do PBHs change the Halo Mass Function and Structure',
    journal: 'ApJ, 975(1), 139',
    arxiv: '2405.11381',
    firstAuthor: true,
  },
  {
    authors: 'Zhang, S., Liu, B., & Bromm, V.',
    year: 2023,
    title: 'Distinguishing the impact and signature of black holes from different origins in early cosmic history',
    journal: 'MNRAS, 528, 180',
    arxiv: '2310.01763',
    firstAuthor: true,
  },
  {
    authors: 'Liu, B., Zhang, S., & Bromm, V.',
    year: 2022,
    title: 'Effects of stellar-mass PBHs on first star formation',
    journal: 'MNRAS, 514, 2376',
    arxiv: '2204.06330',
    firstAuthor: false,
  },
]

export default function PBHPage() {
  const { lang } = useLang()
  const t = T[lang]

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
        {t.researchPage.backToResearch}
      </Link>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          {t.researchPage.pbhCategory}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
          {t.researchPage.pbhTitle}
        </h1>
        <div className="h-px bg-gradient-to-r from-[var(--color-accent)]/50 to-transparent" />
      </div>

      {/* Description */}
      <div className="prose-custom mb-14 flex flex-col gap-5">
        <p className="text-[var(--muted)] leading-relaxed">
          Our research utilizes N-body simulations with the GIZMO code and semi-analytical models to investigate PBHs&apos; impact. We find that stellar-mass PBHs (10–100 solar mass), constituting a small fraction of DM, subtly influence the formation of the universe&apos;s first stars by maintaining the standard model of star formation, while their accretion feedback shifts star formation to more massive halos. Additionally, PBHs significantly contribute to the cosmic radiation background during reionization, but do not violate existing constraints on the timing of reionization.
        </p>
        <p className="text-[var(--muted)] leading-relaxed">
          On the other hand, more massive PBHs with a million solar mass could seed massive halos and disrupt hierarchical structure formation by engulfing newly formed halos. In contrast to the effects of stellar-mass PBHs, our recent studies reveal that the narrative of early star formation is complicated by initial perturbations and accretion feedback from these massive PBHs at very high redshifts. Our findings also suggest that PBHs provide a viable explanation for early SMBHs like Abell2744-QSO1.
        </p>
        <p className="text-[var(--muted)] leading-relaxed">
          Future observations with JWST, Roman, and SKA will be critical in distinguishing PBH-driven structure formation from standard Λ-CDM scenarios.
        </p>
      </div>

      {/* Research Highlights */}
      <div className="mb-14">
        <h2 className="text-lg font-bold text-[var(--foreground)] mb-6 flex items-center gap-3">
          <span className="w-5 h-0.5 bg-[var(--color-accent)] rounded" />
          {t.researchPage.highlights}
        </h2>
        <ResearchPlot
          src="/plots/PBHHydroSim_animation.gif"
          alt="GIZMO cosmological hydrodynamics simulation showing gas density on the left and temperature on the right around a massive primordial black hole at t equals 14.3 Myr redshift 112.34, with PBH accretion feedback heating surrounding gas"
          badge="🎬 Animated Simulation"
          caption={
            <>
              GIZMO cosmological hydrodynamics simulation showing gas density (left) and temperature (right)
              around a massive primordial black hole at <em>t</em> = 14.3 Myr (<em>z</em> = 112.34).
              The PBH accretion feedback heats surrounding gas, influencing early star formation.
              (Zhang, Liu &amp; Bromm)
            </>
          }
        />
      </div>

      {/* Papers */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--foreground)] mb-5 flex items-center gap-3">
          <span className="w-5 h-0.5 bg-[var(--color-accent)] rounded" />
          {t.research.relatedPapers}
        </h2>
        <div className="flex flex-col gap-4">
          {PAPERS.map((p) => (
            <div key={p.arxiv} className="flex items-start gap-3 group">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/50 group-hover:bg-[var(--color-accent)] shrink-0 transition-colors" />
              <div>
                <a
                  href={`https://arxiv.org/abs/${p.arxiv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--color-accent)] transition-colors leading-snug block"
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
                    <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-accent)] text-[#020818]">★ {t.researchPage.firstAuthor}</span>
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
