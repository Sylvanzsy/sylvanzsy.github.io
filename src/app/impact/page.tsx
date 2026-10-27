'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// ── Section A: Key Numbers ──────────────────────────────────────────────────

const STATS = [
  { value: '20',  keyEN: 'card1Label', sourceEN: '',                sourceZH: '' },
  { value: '9',   keyEN: 'card2Label', sourceEN: '',                sourceZH: '' },
  { value: '635', keyEN: 'card3Label', sourceEN: '',                sourceZH: '' },
  { value: '14',  keyEN: 'card4Label', sourceEN: 'Source: NASA/ADS', sourceZH: '来源：NASA/ADS' },
  { value: '30',  keyEN: 'card5Label', sourceEN: '',                sourceZH: '' },
  { value: '10',  keyEN: 'card6Label', sourceEN: '',                sourceZH: '' },
] as const

function StatCard({ value, label, source }: { value: string; label: string; source?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(76,201,240,0.18)' }}
      transition={{ duration: 0.18 }}
      className="flex flex-col items-center justify-center gap-1 p-6 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] text-center shadow-md"
    >
      <span className="text-4xl sm:text-5xl font-extrabold text-[var(--color-accent)] drop-shadow-[0_0_16px_rgba(76,201,240,0.5)]">
        {value}
      </span>
      <span className="text-sm font-semibold text-[var(--foreground)] mt-1">{label}</span>
      {source && <span className="text-[10px] text-[var(--muted)]/60 mt-0.5">{source}</span>}
    </motion.div>
  )
}

// ── Section B: Awards ───────────────────────────────────────────────────────

type Award = {
  titleEN: string
  titleZH: string
  subtitleEN?: string
  subtitleZH?: string
  year: string
}

const AWARDS: Award[] = [
  {
    titleEN: 'PhD Dissertation Defended, University of Texas at Austin',
    titleZH: '博士论文答辩通过，德克萨斯大学奥斯汀分校',
    subtitleEN: 'Degree conferral expected Dec 2026',
    subtitleZH: '正式学位授予预计于 2026 年 12 月',
    year: 'Aug 2026',
  },
  {
    titleEN: 'CITA Postdoctoral Fellowship, University of Toronto',
    titleZH: 'CITA 博士后奖学金，多伦多大学',
    subtitleEN: '2026 award; expected start Jan 2027',
    subtitleZH: '2026 年授予；预计 2027 年 1 月入职',
    year: '2026',
  },
  {
    titleEN: 'Arts & Science Postdoctoral Fellowship, University of Toronto',
    titleZH: '文理学院博士后奖学金，多伦多大学',
    subtitleEN: '2026 award; expected start Jan 2027',
    subtitleZH: '2026 年授予；预计 2027 年 1 月入职',
    year: '2026',
  },
  {
    titleEN: 'Dissertation Writing Fellowship, UT Austin — $24,000 (competitive)',
    titleZH: '论文写作奖学金，德克萨斯大学奥斯汀分校 — $24,000（竞争性）',
    year: '2025',
  },
  {
    titleEN: 'Co-Investigator, JWST Director\'s Discretionary Program, Cycle 4, DD 9433',
    titleZH: '共同研究员，JWST主任自由支配项目，第4周期，DD 9433',
    subtitleEN: 'Black hole primacy — do supermassive black holes really predate galaxies?',
    subtitleZH: '黑洞优先性——超大质量黑洞真的早于星系形成吗？',
    year: '2025',
  },
  {
    titleEN: 'Co-Investigator, TACC HPC Allocation AST23026, 30,000 node-hours',
    titleZH: '共同研究员，TACC高性能计算资源 AST23026，30,000节点小时',
    subtitleEN: 'The First Stars and Galaxies',
    subtitleZH: '第一批恒星与星系',
    year: '2024',
  },
  {
    titleEN: 'Peer Reviewer: Astronomical Journal (AJ), Physical Review D (PRD), Physical Review Letters (PRL)',
    titleZH: '同行评审：天文学杂志（AJ）、物理评论D（PRD）、物理评论快报（PRL）',
    year: '2025–present',
  },
  {
    titleEN: 'Graduate School Professional Development Award, UT Austin',
    titleZH: '研究生专业发展奖，德克萨斯大学奥斯汀分校',
    year: '2024 / 2025 / 2026',
  },
  {
    titleEN: 'APS DAP Student/Postdoc Travel Grant',
    titleZH: 'APS DAP 学生/博士后旅行资助',
    year: '2022',
  },
]

function AwardRow({ award, isZh }: { award: Award; isZh: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start gap-4 py-4 border-b border-[var(--card-border)] last:border-0"
    >
      <span className="shrink-0 w-16 text-right text-xs font-mono font-semibold text-[var(--color-accent)] pt-0.5">
        {award.year}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--foreground)] leading-snug">
          {isZh ? award.titleZH : award.titleEN}
        </p>
        {(isZh ? award.subtitleZH : award.subtitleEN) && (
          <p className="text-xs text-[var(--muted)] mt-0.5 italic">
            {isZh ? award.subtitleZH : award.subtitleEN}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function ImpactPage() {
  const { lang } = useLang()
  const isZh = lang === 'zh'
  const t = T[lang]

  return (
    <main className="pt-24 pb-28 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {isZh ? '返回主页' : 'Back to Home'}
          </Link>
        </div>

        {/* Page header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            {isZh ? '学术档案' : 'Academic Record'}
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold text-[var(--foreground)] mb-4">
            {t.impact.pageTitle}
          </h1>
          <p className="text-[var(--muted)] text-base max-w-xl mx-auto mb-3">
            {t.impact.pageSubtitle}
          </p>
          <p className="text-sm text-[var(--muted)]/70 max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '学术成果与影响力一览。详细内容请见 Publications、Talks 与 Press 页面。'
              : 'At-a-glance summary of scholarly output and recognition. Full details on Publications, Talks, and Press pages.'}
          </p>
        </motion.div>

        {/* ── Section A: Key Numbers ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-20"
        >
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-3">
            <span className="w-6 h-0.5 bg-[var(--color-accent)] rounded" />
            {t.impact.statsTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STATS.map((s) => (
              <StatCard
                key={s.keyEN}
                value={s.value}
                label={t.impact[s.keyEN as keyof typeof t.impact] as string}
                source={isZh ? s.sourceZH : s.sourceEN}
              />
            ))}
          </div>
        </motion.section>

        {/* ── Section B: Recognition & Awards ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-3">
            <span className="w-6 h-0.5 bg-[var(--color-accent)] rounded" />
            {t.impact.awardsTitle}
          </h2>
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] px-6 sm:px-8">
            {AWARDS.map((award) => (
              <AwardRow key={award.titleEN} award={award} isZh={isZh} />
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  )
}
