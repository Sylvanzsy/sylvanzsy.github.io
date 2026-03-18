'use client'

import { motion } from 'framer-motion'
import StarField from './StarField'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ── Icons ──────────────────────────────────────────────────────────────────
function DocumentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}
function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}
function ScholarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  )
}
function AdsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 12.5L3.5 10.74v5.01L12 20l8.5-4.25v-5.01L12 15.5z"/>
    </svg>
  )
}
function AtomIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"/>
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/>
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const BTN_BASE = 'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105'
const BTN_OUTLINE = `${BTN_BASE} border-[var(--card-border)] bg-[var(--card)]/50 text-[var(--foreground)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-glow)] backdrop-blur-sm`

export default function Hero() {
  const { lang } = useLang()
  const isZh = lang === 'zh'
  const t = T[lang]

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(76,201,240,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl w-full"
      >
        {/* PhD badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-medium tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            {isZh ? '博士候选人 · UT Austin · 预计2026年8月' : 'PhD Candidate · UT Austin · Expected Aug 2026'}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={item} className="mb-4">
          <h1 className="text-4xl sm:text-7xl font-bold tracking-tight leading-none">
            <span className="bg-gradient-to-r from-slate-900 via-[#4cc9f0] to-purple-700 dark:from-white dark:via-[#4cc9f0] dark:to-[#9d4edd] bg-clip-text text-transparent">
              Saiyang Zhang
            </span>
          </h1>
          <p className="mt-3 text-xl sm:text-2xl text-[var(--muted)] font-light tracking-[0.15em]">
            张赛旸
          </p>
        </motion.div>

        {/* Title */}
        <motion.p variants={item} className="text-base sm:text-lg text-[var(--muted)] max-w-xl leading-relaxed mb-1">
          {isZh ? (
            <>理论与计算天体物理学博士候选人</>
          ) : (
            <>PhD Candidate in{' '}<span className="text-[var(--foreground)] font-medium">Theoretical &amp; Computational Astrophysics</span></>
          )}
        </motion.p>

        {/* Institution */}
        <motion.p variants={item} className="text-sm sm:text-base text-[var(--muted)] mb-5">
          {isZh ? '宇宙前沿中心 · 温伯格研究所 · ' : 'Cosmic Frontier Center · Weinberg Institute · '}
          <a
            href="https://www.utexas.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline underline-offset-2"
          >
            University of Texas at Austin
          </a>
        </motion.p>

        {/* Dual Fellowship announcement */}
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.08] text-sm font-medium text-[var(--foreground)] shadow-[0_0_20px_rgba(76,201,240,0.12)]">
            <span className="text-base">🎉</span>
            <span>
              {t.hero.citaPrefix}{' '}
              <a href="https://www.cita.utoronto.ca/" target="_blank" rel="noopener noreferrer"
                className="text-[var(--color-accent)] font-semibold hover:underline underline-offset-2">
                {t.hero.citaFellow}
              </a>
              {' '}{t.hero.citaAnd}{' '}
              <a href="https://www.artsci.utoronto.ca/" target="_blank" rel="noopener noreferrer"
                className="text-[var(--color-accent)] font-semibold hover:underline underline-offset-2">
                {t.hero.citaPostdoc}
              </a>
              {' '}·{' '}
              <a href="https://www.utoronto.ca/" target="_blank" rel="noopener noreferrer"
                className="hover:underline underline-offset-2">
                {t.hero.citaInstitute}
              </a>
              {' '}· {t.hero.citaSuffix}
            </span>
          </span>
        </motion.div>

        {/* Profile links */}
        <motion.div variants={item} className="flex flex-col items-center gap-3 w-full max-w-lg">
          {/* Row 1: CV (primary) + GitHub */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${BTN_BASE} border-[var(--color-accent)] bg-[var(--color-accent)] text-[#020818] font-semibold shadow-[0_0_20px_var(--color-accent-glow)] hover:shadow-[0_0_35px_var(--color-accent-glow)]`}
            >
              <DocumentIcon />{isZh ? '学术简历' : 'Curriculum Vitae'}
            </a>
            <a href="https://github.com/Sylvanzsy?tab=repositories" target="_blank" rel="noopener noreferrer" className={BTN_OUTLINE}>
              <GithubIcon />GitHub
            </a>
          </div>

          {/* Row 2: Scholar, ADS, INSPIRE, LinkedIn, Email */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: 'https://scholar.google.com/citations?user=_MmI5KUAAAAJ&hl=en', label: isZh ? '谷歌学术' : 'Scholar', icon: <ScholarIcon /> },
              { href: 'https://ui.adsabs.harvard.edu/public-libraries/rn8ayZ1WR1CJV6DeDhc2Ng', label: 'NASA/ADS', icon: <AdsIcon /> },
              { href: 'https://inspirehep.net/authors/2847731?ui-citation-summary=true', label: 'INSPIRE', icon: <AtomIcon /> },
              { href: 'https://www.linkedin.com/in/saiyang-zhang-7597b910b/', label: 'LinkedIn', icon: <LinkedInIcon /> },
              { href: 'mailto:szhangphys@utexas.edu', label: isZh ? '邮件联系' : 'Email', icon: <MailIcon />, noBlank: true },
            ].map(({ href, label, icon, noBlank }) => (
              <a
                key={label}
                href={href}
                target={noBlank ? undefined : '_blank'}
                rel={noBlank ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card)]/50 text-[var(--muted)] text-xs font-medium hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-glow)] hover:scale-105 transition-all duration-200 backdrop-blur-sm"
              >
                {icon}{label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">{isZh ? '滚动' : 'Scroll'}</span>
          <ChevronDownIcon />
        </motion.a>
      </motion.div>
    </section>
  )
}
