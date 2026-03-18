'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import publicationsData from '../../content/publications.json'
import atelsData from '../../content/atels.json'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

type Publication = typeof publicationsData[number]
type ATel = typeof atelsData[number]
type SortKey = 'year-desc' | 'year-asc' | 'journal-az'

const MY_NAME = 'Saiyang Zhang'

function formatAuthors(authors: string[]) {
  return authors.map((author, i) => (
    <span key={`${author}-${i}`}>
      {author === MY_NAME ? (
        <strong className="text-[var(--foreground)] font-semibold">{author}</strong>
      ) : (
        <span className="text-[var(--muted)]">{author}</span>
      )}
      {i < authors.length - 1 && <span className="text-[var(--muted)]">, </span>}
    </span>
  ))
}

function ArxivIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

function AdsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 12.5L3.5 10.74v5.01L12 20l8.5-4.25v-5.01L12 15.5z"/>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

const CATEGORY_COLOR: Record<string, string> = {
  'Dark Matter': 'text-[#4cc9f0] bg-[#4cc9f0]/10 border-[#4cc9f0]/25',
  'Early Universe': 'text-[#f72585] bg-[#f72585]/10 border-[#f72585]/25',
  Cosmology: 'text-[#c77dff] bg-[#7b2fbe]/10 border-[#7b2fbe]/25',
  // FIX 1c: Other category — proper contrast in light mode
  Other: 'text-slate-600 bg-slate-100 border-slate-200 dark:text-slate-300 dark:bg-slate-700/50 dark:border-slate-600/50',
}

const TYPE_FILTER_KEYS = ['All', 'Peer-Reviewed', 'Preprints', 'First Author'] as const

const ALL_YEARS = [...new Set(publicationsData.map((p) => p.year))].sort((a, b) => b - a)

function PublicationEntry({ pub, index, t }: { pub: Publication; index: number; t: typeof T['en'] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative flex gap-5 py-6 border-b border-[var(--card-border)] last:border-0"
    >
      {/* Year marker */}
      <div className="hidden sm:flex flex-col items-center gap-1 pt-0.5 shrink-0 w-10">
        <span className="text-lg font-bold text-[var(--color-accent)]">{pub.year}</span>
        <div className="w-px flex-1 bg-[var(--card-border)] mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3 mb-2 flex-wrap">
          {pub.firstAuthor && (
            <span className="inline-flex items-center gap-1 shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-accent)] text-[#020818] shadow-[0_0_8px_var(--color-accent-glow)]">
              <StarIcon /> {t.publications.badgeFirstAuthor}
            </span>
          )}
          {pub.isPreprint && (
            // FIX 1c: Preprint badge — proper contrast in light mode
            <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10">
              {t.publications.badgePreprint}
            </span>
          )}
          <span className={`shrink-0 text-xs px-2.5 py-0.5 rounded-full border font-medium ${CATEGORY_COLOR[pub.category] || CATEGORY_COLOR['Other']}`}>
            {pub.category}
          </span>
        </div>

        {/* Title */}
        {pub.arxiv ? (
          <a href={`https://arxiv.org/abs/${pub.arxiv}`} target="_blank" rel="noopener noreferrer"
            className="text-sm sm:text-base font-semibold text-[var(--foreground)] hover:text-[var(--color-accent)] transition-colors leading-snug block mb-1.5">
            {pub.title}
          </a>
        ) : (
          <p className="text-sm sm:text-base font-semibold text-[var(--foreground)] leading-snug block mb-1.5">
            {pub.title}
          </p>
        )}

        {/* Authors */}
        <p className="text-sm mb-1.5">{formatAuthors(pub.authors)}</p>

        {/* Journal */}
        <p className="text-xs text-[var(--muted)] mb-3 italic">
          {pub.journal}
          {pub.volume && `, ${pub.volume}`}
          {pub.pages && `, ${pub.pages}`}
          {` (${pub.year})`}
        </p>

        {/* FIX 1b: Tags — proper contrast in both modes */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pub.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-700/70 dark:text-slate-200 font-mono border border-slate-200 dark:border-slate-600/50">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 flex-wrap">
          {pub.arxiv && (
            <a href={`https://arxiv.org/abs/${pub.arxiv}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-md border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 transition-all">
              <ArxivIcon /> arXiv:{pub.arxiv}
            </a>
          )}
          {pub.arxiv && (
            <a href={`https://ui.adsabs.harvard.edu/abs/arXiv:${pub.arxiv}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-md border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 transition-all">
              <AdsIcon /> NASA/ADS
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function AtelRow({ atel }: { atel: ATel }) {
  return (
    <a
      href={atel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 px-5 py-4 hover:bg-[var(--color-accent)]/5 transition-colors group border-b border-[var(--card-border)] last:border-0"
    >
      <span className="text-xs font-mono font-semibold text-[var(--color-accent)] shrink-0 mt-0.5 w-16">
        #{atel.atelNumber}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
          {atel.title}
        </p>
        <p className="text-xs text-[var(--muted)] mt-0.5">{atel.authors} ({atel.year})</p>
      </div>
      <ExternalLinkIcon />
    </a>
  )
}

export default function Publications() {
  const [typeFilter, setTypeFilter] = useState<string>('All')
  const [sort, setSort] = useState<SortKey>('year-desc')
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all')
  const [atelOpen, setAtelOpen] = useState(false)
  const { lang } = useLang()
  const t = T[lang]

  const TYPE_FILTER_LABELS: Record<string, string> = {
    'All': t.publications.filterAll,
    'Peer-Reviewed': t.publications.filterPeerReviewed,
    'Preprints': t.publications.filterPreprints,
    'First Author': t.publications.filterFirstAuthor,
  }

  const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'year-desc', label: t.publications.sortYearDesc },
    { key: 'year-asc', label: t.publications.sortYearAsc },
    { key: 'journal-az', label: t.publications.sortJournalAZ },
  ]

  const filtered = [...publicationsData]
    .filter((p) => {
      if (typeFilter === 'Peer-Reviewed') return !p.isPreprint
      if (typeFilter === 'Preprints') return p.isPreprint
      if (typeFilter === 'First Author') return p.firstAuthor
      return true
    })
    .filter((p) => yearFilter === 'all' || p.year === yearFilter)
    .sort((a, b) => {
      if (sort === 'year-desc') return b.year - a.year
      if (sort === 'year-asc') return a.year - b.year
      if (sort === 'journal-az') return (a.shortJournal || a.journal).localeCompare(b.shortJournal || b.journal)
      return 0
    })

  const btnBase = 'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 whitespace-nowrap shrink-0'
  const btnActive = `${btnBase} bg-[var(--color-accent)] text-[#020818] border-[var(--color-accent)] shadow-[0_0_14px_var(--color-accent-glow)]`
  const btnInactive = `${btnBase} border-[var(--card-border)] text-[var(--muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]`

  return (
    <section id="publications" className="relative py-28 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-accent)]/30" />
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-3">{t.publications.sectionNum}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">{t.publications.title}</h2>
          <p className="mt-3 text-xs text-[var(--muted)]">
            h-index: 11 · 366 total citations · 7 first-author papers —{' '}
            <a href="https://ui.adsabs.harvard.edu/public-libraries/rn8ayZ1WR1CJV6DeDhc2Ng" target="_blank" rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline underline-offset-2">
              NASA/ADS
            </a>
          </p>
          <div className="mt-4">
            <a href="https://ui.adsabs.harvard.edu/public-libraries/rn8ayZ1WR1CJV6DeDhc2Ng" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-accent)]/40 text-[var(--color-accent)] text-xs font-semibold hover:bg-[var(--color-accent)]/10 transition-all">
              <AdsIcon />
              {t.publications.fullLibrary}
            </a>
          </div>
        </motion.div>

        {/* FIX 5d: Mobile-scrollable control bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3 mb-6"
        >
          {/* Sort */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 items-center w-max sm:w-auto sm:flex-wrap sm:justify-center">
              <span className="text-xs font-semibold text-[var(--muted)] mr-1 shrink-0">{t.publications.sortLabel}</span>
              {SORT_OPTIONS.map((opt) => (
                <button key={opt.key} onClick={() => setSort(opt.key)}
                  className={sort === opt.key ? btnActive : btnInactive}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type filter */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center">
              {TYPE_FILTER_KEYS.map((f) => (
                <button key={f} onClick={() => setTypeFilter(f)}
                  className={typeFilter === f ? btnActive : btnInactive}>
                  {TYPE_FILTER_LABELS[f]}
                </button>
              ))}
            </div>
          </div>

          {/* Year filter */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 items-center w-max sm:w-auto sm:flex-wrap sm:justify-center">
              <span className="text-xs font-semibold text-[var(--muted)] mr-1 shrink-0">{t.publications.yearLabel}</span>
              <button onClick={() => setYearFilter('all')}
                className={yearFilter === 'all' ? btnActive : btnInactive}>
                {t.publications.yearAll}
              </button>
              {ALL_YEARS.map((y) => (
                <button key={y} onClick={() => setYearFilter(yearFilter === y ? 'all' : y)}
                  className={yearFilter === y ? btnActive : btnInactive}>
                  {y}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Result count */}
        <p className="text-center text-xs text-[var(--muted)] mb-4">
          {lang === 'zh'
            ? `显示 ${filtered.length} / ${publicationsData.length} 篇`
            : `Showing ${filtered.length} of ${publicationsData.length} publications`}
          {yearFilter !== 'all' && ` · ${yearFilter}`}
          {typeFilter !== 'All' && ` · ${TYPE_FILTER_LABELS[typeFilter]}`}
        </p>

        {/* List */}
        <motion.div layout className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] px-6 sm:px-8">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((pub, i) => (
                <PublicationEntry key={pub.id} pub={pub} index={i} t={t} />
              ))
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-14 text-center text-sm text-[var(--muted)]"
              >
                {lang === 'zh' ? '没有符合筛选条件的论文。' : 'No publications match the selected filters.'}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ADS link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <a href="https://ui.adsabs.harvard.edu/public-libraries/rn8ayZ1WR1CJV6DeDhc2Ng" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--color-accent)] transition-colors">
            {t.publications.viewFull}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </motion.div>

        {/* Astronomer's Telegrams collapsible */}
        <div className="mt-10">
          <button
            onClick={() => setAtelOpen(!atelOpen)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--color-accent)]/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--foreground)]">
                Astronomer&apos;s Telegrams (ATel)
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono border border-[var(--color-accent)]/20">
                {atelsData.length}
              </span>
            </div>
            <span className="text-[var(--muted)] group-hover:text-[var(--color-accent)] transition-colors">
              <ChevronIcon open={atelOpen} />
            </span>
          </button>

          <AnimatePresence>
            {atelOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden">
                  <p className="text-xs text-[var(--muted)] px-5 py-3 border-b border-[var(--card-border)] italic">
                    Real-time astronomical observations reported via The Astronomer&apos;s Telegram during undergraduate research at Colgate University (2016).
                  </p>
                  {atelsData.map((atel) => (
                    <AtelRow key={atel.id} atel={atel} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
