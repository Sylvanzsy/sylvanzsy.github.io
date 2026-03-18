'use client'

import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import aboutData from '../../content/about.json'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const iconMap: Record<string, ReactElement> = {
  atom: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.09 3.26L16.36 7.5l-3.27 1.09L12 12l-1.09-3.27L7.64 7.5l3.27-1.09L12 3z"/><path d="M5 17l.55 1.64L7.2 19.2l-1.65.55L5 21.4l-.55-1.65L2.8 19.2l1.65-.56L5 17z"/><path d="M19 3l.55 1.64L21.2 5.2l-1.65.55L19 7.4l-.55-1.65L16.8 5.2l1.65-.56L19 3z"/>
    </svg>
  ),
  cpu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  brain: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16Z"/>
    </svg>
  ),
}

// Map interest labels to research detail pages
const INTEREST_LINKS: Record<string, string> = {
  'Dark Matter (PBHs, WIMPs, SIDM)': '/research/pbh',
  'Early Universe & Pop III Stars': '/research/particle-dm',
  'Supermassive Black Holes': '/research/pbh',
  'Supermassive Dark Stars': '/research/dark-stars',
}

const LIFE_PHOTOS = [
  { src: '/photos/sigma.jpg',  alt: 'Sigma the cat',                    caption: 'Sigma — my older cat 🐱',                                           objectPosition: 'center' },
  { src: '/photos/eta.jpg',    alt: 'Eta the cat',                      caption: 'Eta — my younger cat 🐱',                                            objectPosition: 'center' },
  { src: '/photos/talk1.jpg',  alt: 'Giving a talk at conference',      caption: 'ITC Luncheon Talk, Harvard Center for Astrophysics 🎤 (Apr 2025)',   objectPosition: 'center top' },
  { src: '/photos/hiking.jpg', alt: 'Hiking at Torreys Peak Colorado',  caption: 'Torreys Peak, Colorado 🏔️ (14,267 ft)',                             objectPosition: 'center' },
]

function GraduationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
    </svg>
  )
}

// FIX 1a: status badge with proper contrast in both modes
function StatusBadge({ status, label }: { status: string; label: string }) {
  if (status === 'Candidate') {
    return (
      <span className="ml-auto text-xs px-2 py-0.5 rounded-full shrink-0 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 font-medium">
        {label}
      </span>
    )
  }
  return (
    <span className="ml-auto text-xs px-2 py-0.5 rounded-full shrink-0 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-medium">
      {label}
    </span>
  )
}

// FIX 4a: taller photo cards with 4:3 aspect ratio
function PhotoCard({ src, alt, caption, objectPosition = 'center' }: {
  src: string; alt: string; caption: string; objectPosition?: string
}) {
  const [errored, setErrored] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative w-full rounded-xl overflow-hidden border border-[var(--card-border)] shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
        style={{ aspectRatio: '4/3', minHeight: '220px' }}
      >
        {errored ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-[var(--color-space-800)] to-[var(--color-space-900)]">
            <span className="text-4xl select-none opacity-45">📷</span>
            <span className="text-xs text-[var(--muted)] italic">Photo coming soon</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setErrored(true)}
            className="w-full h-full object-cover"
            style={{ objectPosition }}
          />
        )}
      </div>
      <p style={{ fontSize: '0.8rem', fontStyle: 'italic', textAlign: 'center' }}
        className="text-[var(--muted)] leading-snug">
        {caption}
      </p>
    </div>
  )
}

export default function About() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <section id="about" className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-3">{t.about.sectionNum}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">{t.about.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-12 items-start">

          {/* Left — Portrait */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="flex flex-col items-center"
          >
            <div className="relative group">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-violet)] opacity-25 blur-xl group-hover:opacity-45 transition-opacity duration-500" />
              <div className="relative w-[280px] h-[280px] rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--color-space-800)] shadow-[0_0_40px_rgba(76,201,240,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/avatar.jpg"
                  alt="Saiyang Zhang"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right — Bio + academic cards + photo gallery */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="flex flex-col gap-5"
          >
            {/* Bio — English from JSON, Chinese from translations */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              {(lang === 'zh' ? t.about.bioZh : aboutData.bio).split('\n\n').map((para, i) => (
                <p key={i} className="text-[var(--muted)] leading-relaxed text-base">{para}</p>
              ))}
            </motion.div>

            {/* Research Interests */}
            <motion.div variants={fadeUp} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[var(--color-accent)] rounded" />{t.about.interests}
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.interests.map((interest) => {
                  const href = INTEREST_LINKS[interest.label]
                  const displayLabel = t.about.interestLabels[interest.label] || interest.label
                  const cls = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/20 transition-colors'
                  return href ? (
                    <Link key={interest.label} href={href} className={cls}>
                      <span className="opacity-70">{iconMap[interest.icon]}</span>
                      {displayLabel}
                    </Link>
                  ) : (
                    <span key={interest.label} className={cls}>
                      <span className="opacity-70">{iconMap[interest.icon]}</span>
                      {displayLabel}
                    </span>
                  )
                })}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={fadeUp} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[var(--color-accent)] rounded" />{t.about.education}
              </h3>
              <div className="flex flex-col gap-4">
                {aboutData.education.map((edu) => {
                  const statusLabel = edu.status === 'Candidate' ? t.about.statusCandidate : t.about.statusGraduated
                  const displayDegree = t.about.degreeLabels[edu.degree] || edu.degree
                  const displayDepartment = t.about.departmentLabels[edu.department] || edu.department
                  return (
                    <div key={edu.degree} className="flex items-start gap-3">
                      <div className="mt-0.5 w-7 h-7 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/25 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                        <GraduationIcon />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--foreground)]">{displayDegree}</p>
                        <p className="text-xs text-[var(--color-accent)]">
                          {edu.institution === 'University of Texas at Austin' ? (
                            <a href="https://www.utexas.edu/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
                              {edu.institution}
                            </a>
                          ) : edu.institution === 'Colgate University' ? (
                            <a href="https://www.colgate.edu/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
                              {edu.institution}
                            </a>
                          ) : edu.institution}
                          {' · '}{displayDepartment}
                        </p>
                        {edu.advisor && (
                          <p className="text-xs text-[var(--muted)]">{t.about.advisor} {edu.advisor} · {edu.year}</p>
                        )}
                        {edu.thesis && (
                          <p className="text-xs text-[var(--muted)] italic mt-0.5 truncate">&ldquo;{edu.thesis}&rdquo;</p>
                        )}
                      </div>
                      <StatusBadge status={edu.status} label={statusLabel} />
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Awards */}
            <motion.div variants={fadeUp} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[var(--color-accent)] rounded" />{t.about.awards}
              </h3>
              <div className="flex flex-col gap-2.5">
                {aboutData.awards.map((award) => (
                  <div key={award.title} className="flex items-start gap-3">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--color-violet)]/15 border border-[var(--color-violet)]/25 flex items-center justify-center text-[var(--color-violet-light)] shrink-0">
                      <TrophyIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--foreground)]">{award.title}</p>
                      <p className="text-xs text-[var(--muted)]">{award.institution} · {award.year}{award.amount && ` · ${award.amount}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Life Outside Research */}
            <motion.div variants={fadeUp} className="pt-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 border-t border-dashed border-[var(--color-accent)]/25" />
                <h3 className="text-sm font-semibold text-[var(--foreground)] whitespace-nowrap">
                  {t.about.lifeOutside}
                </h3>
                <div className="flex-1 border-t border-dashed border-[var(--color-accent)]/25" />
              </div>

              {/* FIX 5e: 1-col on mobile, 2-col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LIFE_PHOTOS.map((photo) => (
                  <PhotoCard
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    caption={photo.caption}
                    objectPosition={photo.objectPosition}
                  />
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
