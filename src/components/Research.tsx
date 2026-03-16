'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const ADS_LIBRARY = 'https://ui.adsabs.harvard.edu/public-libraries/rn8ayZ1WR1CJV6DeDhc2Ng'

const CARDS = [
  {
    href: '/research/pbh',
    title: 'Primordial Black Holes (PBHs)',
    category: 'Dark Matter · Early Universe',
    description:
      'Using N-body simulations with GIZMO and semi-analytical models to investigate PBHs\u2019 astrophysical impacts \u2014 from influencing first star formation and cosmic radiation background during reionization, to seeding supermassive black holes like Abell2744-QSO1 observed by JWST. Future observations with JWST, Roman, and SKA will be critical in distinguishing PBH-driven structure formation from standard \u039bCDM.',
    papers: [
      { id: '2512.14066' },
      { id: '2508.00774' },
      { id: '2503.17585' },
      { id: '2405.11381' },
      { id: '2310.01763' },
      { id: '2204.06330' },
    ],
    color: 'from-[#4cc9f0] to-[#4361ee]',
    glow: 'rgba(76, 201, 240, 0.2)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10"/>
        <path d="M12 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4"/>
      </svg>
    ),
  },
  {
    href: '/research/dark-stars',
    title: 'Supermassive Dark Stars (SMDSs)',
    category: 'Dark Matter · Early Universe',
    description:
      'Supermassive dark stars are luminous stellar objects formed in the early Universe at redshift z\u223c10\u201320, powered by dark matter annihilation. Using Roman Space Telescope and JWST spectroscopy \u2014 particularly the HeII\u202f1640 absorption line as a \u201csmoking gun\u201d \u2014 we can differentiate SMDSs from early galaxies via spectral, photometric, and morphological signatures.',
    papers: [{ id: '2306.11606' }],
    color: 'from-[#f72585] to-[#b5179e]',
    glow: 'rgba(247, 37, 133, 0.2)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    href: '/research/particle-dm',
    title: 'Particle Dark Matter & Pop III Stars',
    category: 'Dark Matter',
    description:
      'Pop III stars and neutron stars offer unique cosmic laboratories for probing particle dark matter microphysics in regimes inaccessible to terrestrial experiments. Developed a multiscatter capture framework to study DM particles gravitationally captured by stars, leading to observable consequences such as DM annihilation heating or stellar mass truncation. Extended to superheavy DM and constraints below the neutrino floor.',
    papers: [
      { id: '2009.11478' },
      { id: '2009.11474' },
      { id: '2005.05946' },
      { id: '1908.02700' },
    ],
    color: 'from-[#7b2fbe] to-[#4361ee]',
    glow: 'rgba(123, 47, 190, 0.2)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"/>
        <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/>
        <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>
      </svg>
    ),
  },
]

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

export default function Research() {
  const router = useRouter()
  return (
    <section id="research" className="relative py-28 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-accent)]/30" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-3">02 / Research</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">Research Areas</h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto text-sm leading-relaxed">
            Bridging particle physics and astrophysics to uncover the nature of dark matter and the first objects in the Universe.
          </p>
        </motion.div>

        {/* 3-column grid on large screens, 1-col on mobile */}
        <div className="grid lg:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              whileHover={{ y: -5 }}
              onClick={() => router.push(card.href)}
              className="group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ boxShadow: `inset 0 0 50px ${card.glow}` }}
              />
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} p-0.5 mb-5 shadow-lg shrink-0`}>
                <div className="w-full h-full rounded-[10px] bg-[var(--card)] flex items-center justify-center text-[var(--color-accent)] dark:text-white">
                  {card.icon}
                </div>
              </div>

              {/* Title + category */}
              <Link href={card.href} className="block mb-1 hover:text-[var(--color-accent)] transition-colors">
                <h3 className="text-base font-bold text-[var(--foreground)] leading-snug group-hover:text-[var(--color-accent)] transition-colors">{card.title}</h3>
              </Link>
              <p className="text-xs text-[var(--color-accent)] font-medium mb-4">{card.category}</p>

              {/* Description */}
              <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">{card.description}</p>

              {/* Read more */}
              <Link
                href={card.href}
                className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-[var(--color-accent)] hover:underline underline-offset-2 self-start"
              >
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>

              {/* Related papers chips */}
              <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
                <p className="text-xs text-[var(--muted)] mb-2 font-medium">Related papers</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {card.papers.map((p) => (
                    <a
                      key={p.id}
                      href={`https://arxiv.org/abs/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--color-accent)]/30 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/60 transition-colors"
                    >
                      arXiv:{p.id}
                    </a>
                  ))}
                </div>

                {/* ADS library button */}
                <a
                  href={ADS_LIBRARY}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:underline decoration-[var(--color-accent)]/50 underline-offset-2 transition-all"
                >
                  View all related papers
                  <ExternalLinkIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
