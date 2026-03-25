'use client'

import { motion } from 'framer-motion'
import mediaData from '../../content/media.json'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Article = typeof mediaData[number]

const pbhArticles = mediaData.filter((a) => a.topic === 'PBH')
const darkStarArticles = mediaData.filter((a) => a.topic === 'Dark Stars')

function ArticleCard({ article, lang }: { article: Article; lang: string }) {
  const t = T[lang as 'en' | 'zh']
  const isPBH = article.topic === 'PBH'

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5 shadow-sm hover:shadow-md hover:border-[var(--color-accent)]/30 transition-all duration-200 cursor-pointer"
    >
      {/* Top row: outlet badge + date */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isPBH
              ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
              : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
          }`}
        >
          📰 {article.outlet}
          {article.featured && <span className="ml-0.5">⭐</span>}
        </span>
        <span className="text-xs text-[var(--muted)]/70 shrink-0">{article.date}</span>
      </div>

      {/* Headline */}
      <p className="text-sm font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--color-accent)] transition-colors line-clamp-3">
        {article.headline}
      </p>

      {/* Footer: topic tag + read link */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <span
          className={`text-xs px-2 py-0.5 rounded-md font-medium ${
            isPBH
              ? 'bg-teal-500/10 text-teal-400'
              : 'bg-purple-500/10 text-purple-400'
          }`}
        >
          {isPBH ? t.media.topicPBH : t.media.topicDarkStars}
        </span>
        <span className="text-xs text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
          {t.media.readArticle}
        </span>
      </div>
    </motion.a>
  )
}

function GroupDivider({ label, color }: { label: string; color: 'teal' | 'purple' }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div
        className={`w-2 h-2 rounded-full shrink-0 ${color === 'teal' ? 'bg-teal-400' : 'bg-purple-400'}`}
      />
      <span
        className={`text-sm font-semibold tracking-wide ${color === 'teal' ? 'text-teal-400' : 'text-purple-400'}`}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--card-border)]" />
      <span className="text-xs text-[var(--muted)]/50">
        {color === 'teal' ? pbhArticles.length : darkStarArticles.length} articles
      </span>
    </div>
  )
}

export default function MediaCoverage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <section id="press" className="relative py-24 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-accent)]/30" />

      <div className="max-w-6xl mx-auto">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">{t.media.title}</h2>
        </motion.div>

        {/* PBH Group */}
        <div className="mb-12">
          <GroupDivider label={t.media.groupPBH} color="teal" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pbhArticles.map((article) => (
              <ArticleCard key={article.url} article={article} lang={lang} />
            ))}
          </div>
        </div>

        {/* Dark Stars Group */}
        <div>
          <GroupDivider label={t.media.groupDarkStars} color="purple" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {darkStarArticles.map((article) => (
              <ArticleCard key={article.url} article={article} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
