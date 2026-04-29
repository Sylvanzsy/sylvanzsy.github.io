'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import mediaData from '../../content/media.json'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Article = typeof mediaData[number]

const pbhArticles = mediaData.filter((a) => a.topic === 'PBH')
const darkStarArticles = mediaData.filter((a) => a.topic === 'Dark Stars')

// Outlet domain + brand color config
const OUTLET_CONFIG: Record<string, { domain: string; color: string; darkColor: string }> = {
  'The Guardian':           { domain: 'theguardian.com',          color: '#052962', darkColor: '#5B9BD5' },
  'New Scientist':          { domain: 'newscientist.com',          color: '#E8001C', darkColor: '#FF6666' },
  'Science Alert':          { domain: 'sciencealert.com',          color: '#1a73e8', darkColor: '#5BA3F5' },
  'Space.com':              { domain: 'space.com',                 color: '#111111', darkColor: '#E5E7EB' },
  'Phys.org':               { domain: 'phys.org',                  color: '#006699', darkColor: '#33AACC' },
  'Interesting Engineering':{ domain: 'interestingengineering.com',color: '#FF6B35', darkColor: '#FF8C5A' },
  'Daily Galaxy':           { domain: 'dailygalaxy.com',           color: '#8B5CF6', darkColor: '#A78BFA' },
  'Yahoo News':             { domain: 'yahoo.com',                 color: '#720E9E', darkColor: '#C084FC' },
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg" aria-label="Featured">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function OutletLogo({ outlet, domain }: { outlet: string; domain: string }) {
  const [errored, setErrored] = useState(false)
  const cfg = OUTLET_CONFIG[outlet]
  const bg = cfg?.color ?? '#4cc9f0'

  if (errored) {
    return (
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-base shrink-0 select-none"
        style={{ backgroundColor: bg }}
      >
        {outlet[0]}
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={`${outlet} logo`}
      width={40}
      height={40}
      className="w-10 h-10 rounded-md object-contain shrink-0 bg-white p-0.5"
      onError={() => setErrored(true)}
    />
  )
}

function ArticleCard({ article, isDark, lang }: { article: Article; isDark: boolean; lang: string }) {
  const t = T[lang as 'en' | 'zh']
  const isPBH = article.topic === 'PBH'
  const cfg = OUTLET_CONFIG[article.outlet]
  const outletColor = cfg ? (isDark ? cfg.darkColor : cfg.color) : (isDark ? '#9CA3AF' : '#374151')
  const domain = cfg?.domain ?? new URL(article.url).hostname.replace('www.', '')

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ y: -5, transition: { duration: 0.18 } }}
      className={`group flex flex-col rounded-2xl overflow-hidden border bg-[var(--card)] cursor-pointer transition-all duration-200 ${
        isPBH
          ? 'border-teal-500/20 hover:border-teal-400/50 hover:shadow-[0_8px_30px_rgba(20,184,166,0.18)]'
          : 'border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_8px_30px_rgba(168,85,247,0.18)]'
      } shadow-md hover:shadow-xl`}
    >
      {/* Colored accent bar */}
      <div
        className={`h-1 w-full shrink-0 ${
          isPBH
            ? 'bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-400'
            : 'bg-gradient-to-r from-purple-400 via-purple-500 to-violet-400'
        }`}
      />

      {/* Card body */}
      <div className="flex flex-col gap-3.5 p-5 flex-1">
        {/* Header: logo + outlet name + star + date */}
        <div className="flex items-center gap-3">
          <OutletLogo outlet={article.outlet} domain={domain} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="font-bold text-sm leading-tight truncate"
                style={{ color: outletColor }}
              >
                {article.outlet}
              </span>
              {article.featured && <StarIcon />}
            </div>
          </div>
          <span className="text-xs text-[var(--muted)]/60 shrink-0 tabular-nums">{article.date}</span>
        </div>

        {/* Headline */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--foreground)] leading-snug line-clamp-3 group-hover:text-[var(--color-accent)] transition-colors duration-200">
            {article.headline}
          </p>
          {lang === 'zh' && article.titleZh && (
            <p className="text-xs italic text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {article.titleZh}
            </p>
          )}
        </div>

        {/* Footer: topic tag + read link */}
        <div className="flex items-center justify-between pt-2.5 border-t border-[var(--card-border)]">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
              isPBH
                ? 'bg-teal-500/12 text-teal-400 border border-teal-500/25'
                : 'bg-purple-500/12 text-purple-400 border border-purple-500/25'
            }`}
          >
            {isPBH ? t.media.topicPBH : t.media.topicDarkStars}
          </span>
          <span className="text-xs text-[var(--color-accent)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium">
            {t.media.readArticle}
          </span>
        </div>

        {/* Related paper */}
        {'relatedPaper' in article && article.relatedPaper && (
          <p className="text-[10px] text-[var(--muted)]/60 mt-2 leading-snug">
            📄 Related: {article.relatedPaper as string}
          </p>
        )}
      </div>
    </motion.a>
  )
}

function GroupDivider({
  label,
  color,
  count,
}: {
  label: string
  color: 'teal' | 'purple'
  count: number
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div
        className={`w-3 h-3 rounded-sm rotate-45 shrink-0 ${
          color === 'teal' ? 'bg-teal-400' : 'bg-purple-400'
        }`}
      />
      <span
        className={`text-sm font-bold tracking-wide whitespace-nowrap ${
          color === 'teal' ? 'text-teal-400' : 'text-purple-400'
        }`}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-[var(--card-border)] to-transparent" />
      <span
        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
          color === 'teal'
            ? 'text-teal-400 border-teal-500/30 bg-teal-500/10'
            : 'text-purple-400 border-purple-500/30 bg-purple-500/10'
        }`}
      >
        {count} articles
      </span>
    </div>
  )
}

export default function MediaCoverage() {
  const { lang } = useLang()
  const { theme } = useTheme()
  const t = T[lang]
  const isDark = theme === 'dark'
  const totalCount = mediaData.length

  return (
    <section id="press" className="relative py-24 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-accent)]/30" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            {t.media.sectionNum}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            {t.media.title}
          </h2>
          <p className="mt-3 text-[var(--muted)] text-sm">{t.media.subtitle}</p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <span className="text-xs font-semibold text-[var(--color-accent)]">
              {lang === 'zh' ? `${totalCount}篇报道` : `${totalCount} articles`}
            </span>
          </div>
        </motion.div>

        {/* PBH Group */}
        <div className="mb-14">
          <GroupDivider label={t.media.groupPBH} color="teal" count={pbhArticles.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pbhArticles.map((article) => (
              <ArticleCard key={article.url} article={article} isDark={isDark} lang={lang} />
            ))}
          </div>
        </div>

        {/* Dark Stars Group */}
        <div>
          <GroupDivider label={t.media.groupDarkStars} color="purple" count={darkStarArticles.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {darkStarArticles.map((article) => (
              <ArticleCard key={article.url} article={article} isDark={isDark} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
