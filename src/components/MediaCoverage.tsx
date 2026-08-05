'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import mediaData from '../../content/media.json'
import videosData from '../../content/videos.json'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'
import { VideoCard, type VideoItem } from '@/components/VideoCard'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Article = typeof mediaData[number]

const pbhArticles = mediaData.filter((a) => a.topic === 'PBH')
const darkStarArticles = mediaData.filter((a) => a.topic === 'Dark Stars')

// Outlet domain + brand color config
const OUTLET_CONFIG: Record<string, { domain: string; color: string; darkColor: string }> = {
  'NASA':                   { domain: 'science.nasa.gov',          color: '#FC3D21', darkColor: '#FF6B5A' },
  'NASA Webb':              { domain: 'science.nasa.gov',          color: '#FC3D21', darkColor: '#FF6B5A' },
  'ESA':                    { domain: 'esa.int',                   color: '#003247', darkColor: '#5BA3D9' },
  'Quanta Magazine':        { domain: 'quantamagazine.org',        color: '#FF6B35', darkColor: '#FF8C5A' },
  'Scientific American':    { domain: 'scientificamerican.com',    color: '#000000', darkColor: '#E5E7EB' },
  'The Guardian':           { domain: 'theguardian.com',           color: '#052962', darkColor: '#5B9BD5' },
  'New Scientist':          { domain: 'newscientist.com',          color: '#E8001C', darkColor: '#FF6666' },
  'Science Alert':          { domain: 'sciencealert.com',          color: '#1a73e8', darkColor: '#5BA3F5' },
  'Space.com':              { domain: 'space.com',                 color: '#111111', darkColor: '#E5E7EB' },
  'Phys.org':               { domain: 'phys.org',                  color: '#006699', darkColor: '#33AACC' },
  'Interesting Engineering':{ domain: 'interestingengineering.com',color: '#FF6B35', darkColor: '#FF8C5A' },
  'Daily Galaxy':           { domain: 'dailygalaxy.com',           color: '#8B5CF6', darkColor: '#A78BFA' },
  'Yahoo News':             { domain: 'yahoo.com',                 color: '#720E9E', darkColor: '#C084FC' },
  'University of Cambridge':{ domain: 'cam.ac.uk',                 color: '#0072CE', darkColor: '#4DA3E8' },
  'Live Science':           { domain: 'livescience.com',          color: '#FF7E00', darkColor: '#FFA94D' },
  'Engadget':               { domain: 'engadget.com',             color: '#00ABD1', darkColor: '#4DD0E8' },
  'Sci.News':               { domain: 'sci.news',                 color: '#1F4E79', darkColor: '#5B9BD5' },
  'AAS Nova':               { domain: 'aasnova.org',              color: '#1F5A8C', darkColor: '#4D8EC4' },
}

// Tier helpers — prominence ordering: official > featured > standard
const TIER_RANK: Record<string, number> = { official: 0, featured: 1, standard: 2 }
const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

function isAsset(a: Article): boolean {
  return ('isImageAsset' in a && !!a.isImageAsset) || ('isAudioAsset' in a && !!a.isAudioAsset)
}

function articleTier(a: Article): 'official' | 'featured' | 'standard' {
  if ('tier' in a && a.tier === 'official') return 'official'
  if (('tier' in a && a.tier === 'featured') || a.featured) return 'featured'
  return 'standard'
}

function tierRank(a: Article): number {
  return TIER_RANK[articleTier(a)] ?? 2
}

// Parse "May 2026" / "Dec. 2025" / "2024 / 2025" into a sortable month index
function dateScore(d: string): number {
  const m = d.toLowerCase().match(/([a-z]{3})[a-z]*\.?\s+(\d{4})/)
  if (!m) {
    const yr = d.match(/(\d{4})/)
    return yr ? parseInt(yr[1], 10) * 12 : 0
  }
  return parseInt(m[2], 10) * 12 + (MONTHS[m[1]] ?? 0)
}

// Prominence first (official > featured > standard), then most-recent first
function byProminenceThenDate(a: Article, b: Article): number {
  const r = tierRank(a) - tierRank(b)
  if (r !== 0) return r
  return dateScore(b.date) - dateScore(a.date)
}

const articleCount = (arr: Article[]) => arr.filter((a) => !isAsset(a)).length

// Default number of top cards shown before the "Show all" toggle
const TOP_VISIBLE = 6

function StarIcon({ size = 12 }: { size?: number }) {
  // Silver star marks a "featured" major outlet
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#C0C0C0" stroke="#9CA3AF" strokeWidth="0.75" xmlns="http://www.w3.org/2000/svg" aria-label="Featured outlet">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function OutletLogo({ outlet, domain, compact = false }: { outlet: string; domain: string; compact?: boolean }) {
  const [errored, setErrored] = useState(false)
  const cfg = OUTLET_CONFIG[outlet]
  const bg = cfg?.color ?? '#4cc9f0'
  const sizeClass = compact ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-base'

  if (errored) {
    return (
      <div
        className={`${sizeClass} rounded-md flex items-center justify-center text-white font-bold shrink-0 select-none`}
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
      width={compact ? 32 : 40}
      height={compact ? 32 : 40}
      className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-md object-contain shrink-0 bg-white p-0.5`}
      onError={() => setErrored(true)}
    />
  )
}

function ArticleCard({ article, isDark, lang, compact = false }: { article: Article; isDark: boolean; lang: string; compact?: boolean }) {
  const t = T[lang as 'en' | 'zh']
  const isPBH = article.topic === 'PBH'
  const cfg = OUTLET_CONFIG[article.outlet]
  const outletColor = cfg ? (isDark ? cfg.darkColor : cfg.color) : (isDark ? '#9CA3AF' : '#374151')
  const domain = cfg?.domain ?? new URL(article.url).hostname.replace('www.', '')
  const tier = articleTier(article)
  const isOfficial = tier === 'official'
  const isFeatured = tier === 'featured'
  const isImage = 'isImageAsset' in article && article.isImageAsset
  const isAudio = 'isAudioAsset' in article && article.isAudioAsset

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
        className={`${compact ? 'h-0.5' : 'h-1'} w-full shrink-0 ${
          isPBH
            ? 'bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-400'
            : 'bg-gradient-to-r from-purple-400 via-purple-500 to-violet-400'
        }`}
      />

      {/* Card body */}
      <div className={`flex flex-col flex-1 ${compact ? 'gap-2 p-3.5' : 'gap-3.5 p-5'}`}>
        {/* Official Press Release badge — gold */}
        {isOfficial && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30">
              {lang === 'zh' ? '\u5B98\u65B9\u65B0\u95FB\u7A3F' : 'Official Press Release'}
            </span>
          </div>
        )}

        {/* Header: logo + outlet name + star + date */}
        <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>
          <OutletLogo outlet={article.outlet} domain={domain} compact={compact} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`font-bold ${compact ? 'text-xs' : 'text-sm'} leading-tight truncate`}
                style={{ color: outletColor }}
              >
                {article.outlet}
              </span>
              {isImage && <span className="text-sm" title="Image asset">📷</span>}
              {isAudio && <span className="text-sm" title="Audio asset">🔊</span>}
              {isFeatured && <StarIcon size={compact ? 11 : 12} />}
            </div>
          </div>
          <span className={`${compact ? 'text-[10px]' : 'text-xs'} text-[var(--muted)]/60 shrink-0 tabular-nums`}>{article.date}</span>
        </div>

        {/* Headline */}
        <div className="flex-1">
          <p className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-[var(--foreground)] leading-snug ${compact ? 'line-clamp-2' : 'line-clamp-3'} group-hover:text-[var(--color-accent)] transition-colors duration-200`}>
            {article.headline}
          </p>
          {lang === 'zh' && article.titleZh && (
            <p className={`${compact ? 'text-[10px]' : 'text-xs'} italic text-slate-500 dark:text-slate-400 mt-1 line-clamp-2`}>
              {article.titleZh}
            </p>
          )}
        </div>

        {/* Footer: topic tag + read link */}
        <div className={`flex items-center justify-between ${compact ? 'pt-1.5' : 'pt-2.5'} border-t border-[var(--card-border)]`}>
          <span
            className={`${compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'} rounded-full font-semibold ${
              isPBH
                ? 'bg-teal-500/12 text-teal-400 border border-teal-500/25'
                : 'bg-purple-500/12 text-purple-400 border border-purple-500/25'
            }`}
          >
            {isPBH ? t.media.topicPBH : t.media.topicDarkStars}
          </span>
          <span className={`${compact ? 'text-[10px]' : 'text-xs'} text-[var(--color-accent)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium`}>
            {t.media.readArticle}
          </span>
        </div>

        {/* Related paper — omitted in compact view to keep cards dense */}
        {!compact && 'relatedPaper' in article && article.relatedPaper && (
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
  lang,
}: {
  label: string
  color: 'teal' | 'purple'
  count: number
  lang: string
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
        {lang === 'zh' ? `${count}篇报道` : `${count} articles`}
      </span>
    </div>
  )
}

export default function MediaCoverage() {
  const { lang } = useLang()
  const { theme } = useTheme()
  const t = T[lang]
  const isDark = theme === 'dark'
  const [expanded, setExpanded] = useState(false)

  // Article counts exclude image/audio media assets
  const totalCount = articleCount(mediaData)

  // PBH cards sorted by prominence (official > featured > standard), then most recent
  const sortedPBH = pbhArticles.slice().sort(byProminenceThenDate)
  const topPBH = sortedPBH.slice(0, TOP_VISIBLE)
  const restPBH = sortedPBH.slice(TOP_VISIBLE)
  const hasMore = restPBH.length > 0

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
          <GroupDivider label={t.media.groupPBH} color="teal" count={articleCount(pbhArticles)} lang={lang} />

          {/* Top cards — full size, 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topPBH.map((article, i) => (
              <ArticleCard key={`${article.url}-${article.date}-${i}`} article={article} isDark={isDark} lang={lang} />
            ))}
          </div>

          {/* Remaining cards — compact, denser 4-column grid, revealed on expand */}
          <AnimatePresence initial={false}>
            {expanded && hasMore && (
              <motion.div
                key="pbh-rest"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 mt-3.5">
                  {restPBH.map((article, i) => (
                    <ArticleCard key={`${article.url}-${article.date}-${i}`} article={article} isDark={isDark} lang={lang} compact />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand / collapse toggle */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-semibold hover:bg-teal-500/20 hover:border-teal-400/50 transition-all duration-200"
              >
                {expanded
                  ? (lang === 'zh' ? '收起报道 ↑' : 'Show less ↑')
                  : (lang === 'zh' ? `显示全部${totalCount}篇报道 ↓` : `Show all ${totalCount} articles ↓`)}
              </button>
            </div>
          )}
        </div>

        {/* Dark Stars Group */}
        <div className="mb-14">
          <GroupDivider label={t.media.groupDarkStars} color="purple" count={articleCount(darkStarArticles)} lang={lang} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {darkStarArticles.map((article, i) => (
              <ArticleCard key={`${article.url}-${article.date}-${i}`} article={article} isDark={isDark} lang={lang} />
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="border-t border-dashed border-teal-500/40 pt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold text-[var(--foreground)]">{t.videos.sectionTitle}</h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(videosData as VideoItem[])
              .slice()
              .sort((a, b) => (a.type === b.type ? 0 : a.type === 'media' ? -1 : 1))
              .map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
