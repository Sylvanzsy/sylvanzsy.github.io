'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export type VideoItem = {
  id: number
  type: 'media' | 'mytalk'
  title: string
  channel: string
  url: string
  thumbnail: string
  views: string
  date: string
  note_en: string
  note_zh: string
  relatedPaper: string
}

export function VideoCard({ video }: { video: VideoItem }) {
  const { lang } = useLang()
  const t = T[lang]
  const note = lang === 'zh' ? video.note_zh : video.note_en
  const isMedia = video.type === 'media'

  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="group flex flex-col rounded-xl overflow-hidden border border-[var(--card-border)] bg-[var(--card)] cursor-pointer shadow-md hover:shadow-lg transition-all duration-200"
    >
      {/* Thumbnail 16:9 */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
        {/* Tag badge top-left */}
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isMedia
              ? 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300'
              : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
          }`}>
            {isMedia ? t.videos.tagMedia : t.videos.tagMyTalk}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="text-sm font-semibold text-[var(--foreground)] leading-snug line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
          {video.title}
        </p>
        <div className="flex items-center justify-between mt-0.5 gap-2">
          <span className="text-xs text-[var(--muted)] truncate">
            {video.channel}{video.views ? ` · ${video.views}` : ''}
          </span>
          <span className="text-xs text-[var(--muted)] shrink-0">{video.date}</span>
        </div>
        {note && (
          <p className="text-xs italic text-[var(--muted)]/70 mt-1 line-clamp-2">{note}</p>
        )}
        {video.relatedPaper && (
          <p className="text-[10px] text-[var(--muted)]/60 mt-1 leading-snug">📄 {video.relatedPaper}</p>
        )}
      </div>
    </motion.a>
  )
}
