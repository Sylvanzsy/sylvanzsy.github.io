'use client'

import { motion } from 'framer-motion'
import talksData from '../../content/talks.json'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Talk = typeof talksData[number]

const GROUPS: { type: Talk['type']; label: string; number: string; accent: string; dot: string }[] = [
  {
    type: 'Invited Talk',
    label: 'Invited Talks',
    number: '06a',
    accent: 'text-[#f72585]',
    dot: 'bg-[#f72585] shadow-[0_0_8px_rgba(247,37,133,0.5)]',
  },
  {
    type: 'Contributed Talk',
    label: 'Contributed Talks & Seminars',
    number: '06b',
    accent: 'text-[#4cc9f0]',
    dot: 'bg-[#4cc9f0] shadow-[0_0_8px_rgba(76,201,240,0.5)]',
  },
  {
    type: 'Poster',
    label: 'Posters',
    number: '06c',
    accent: 'text-[#c77dff]',
    dot: 'bg-[#c77dff] shadow-[0_0_8px_rgba(199,125,255,0.4)]',
  },
]

const TYPE_BADGE: Record<string, string> = {
  'Invited Talk': 'text-[#f72585] bg-[#f72585]/10 border-[#f72585]/30',
  'Contributed Talk': 'text-[#4cc9f0] bg-[#4cc9f0]/10 border-[#4cc9f0]/30',
  Poster: 'text-[#c77dff] bg-[#7b2fbe]/10 border-[#7b2fbe]/30',
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function TalkRow({ talk, index, dotClass }: { talk: Talk; index: number; dotClass: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
      className="group flex items-start gap-4 py-3 border-b border-[var(--card-border)] last:border-0"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center gap-1 pt-1.5 shrink-0 w-2.5">
        <div className={`w-2 h-2 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-125 ${dotClass}`} />
      </div>

      {/* Date */}
      <div className="w-20 shrink-0 pt-0.5">
        <span className="text-xs font-mono text-[var(--muted)]">{talk.date}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--color-accent)] transition-colors">
          {talk.title}
        </p>
        <div className="flex items-center gap-1 mt-0.5 text-xs text-[var(--muted)]">
          <MapPinIcon />
          <span>{talk.venue} · {talk.location}</span>
        </div>
      </div>

      {/* Badge */}
      <span className={`hidden sm:inline-flex shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${TYPE_BADGE[talk.type]}`}>
        {talk.type === 'Invited Talk' ? '● Invited' : talk.type === 'Poster' ? '◆ Poster' : '○ Seminar'}
      </span>
    </motion.div>
  )
}

export default function Talks() {
  // Sort each group by sortKey descending (newest first)
  const sorted = [...talksData].sort((a, b) => b.sortKey.localeCompare(a.sortKey))

  return (
    <section id="talks" className="relative py-28 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-accent)]/30" />
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-3">06 / Talks</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">Talks &amp; Presentations</h2>
          <p className="mt-4 text-xs text-[var(--muted)]">
            <span className="text-[#f72585]">●</span> Invited &nbsp;·&nbsp;
            <span className="text-[#4cc9f0]">○</span> Contributed/Seminar &nbsp;·&nbsp;
            <span className="text-[#c77dff]">◆</span> Poster
          </p>
        </motion.div>

        {/* Three groups */}
        <div className="flex flex-col gap-12">
          {GROUPS.map((group, gi) => {
            const talks = sorted.filter((t) => t.type === group.type)
            if (talks.length === 0) return null
            return (
              <motion.div
                key={group.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
              >
                {/* Group heading */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold tracking-widest uppercase ${group.accent}`}>
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-[var(--card-border)]" />
                  <span className="text-xs font-mono text-[var(--muted)]/50">{talks.length}</span>
                </div>

                {/* Rows inside a card */}
                <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-5 divide-y-0">
                  {talks.map((talk, i) => (
                    <TalkRow key={talk.id} talk={talk} index={i} dotClass={group.dot} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
