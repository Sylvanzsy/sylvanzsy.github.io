'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

// ── Section A: Key Numbers ──────────────────────────────────────────────────

const STATS = [
  { value: '20', keyEN: 'card1Label', sourceEN: '', sourceZH: '' },
  { value: '8',  keyEN: 'card2Label', sourceEN: '', sourceZH: '' },
  { value: '416', keyEN: 'card3Label', sourceEN: '', sourceZH: '' },
  { value: '11', keyEN: 'card4Label', sourceEN: 'Source: NASA/ADS', sourceZH: '来源：NASA/ADS' },
  { value: '11', keyEN: 'card5Label', sourceEN: '', sourceZH: '' },
  { value: '3',  keyEN: 'card6Label', sourceEN: '', sourceZH: '' },
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
    titleEN: 'CITA Postdoctoral Fellowship, Canadian Institute for Theoretical Astrophysics, University of Toronto',
    titleZH: 'CITA博士后研究员，加拿大理论天体物理研究所，多伦多大学',
    year: '2026',
  },
  {
    titleEN: 'Arts & Science Postdoctoral Fellowship, University of Toronto',
    titleZH: '文理学院博士后研究员，多伦多大学',
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

// ── Section C: Contributions ────────────────────────────────────────────────

type Contribution = {
  title: string
  journal: string
  arxiv: string
  impactEN: string
  impactZH: string
}

const CONTRIBUTIONS: Contribution[] = [
  {
    title: 'Primordial Black Holes as Seeds for Extremely Overmassive AGN Observed by JWST',
    journal: 'ApJL 1000, L19 (2026)',
    arxiv: 'https://arxiv.org/abs/2512.14066',
    impactEN: 'Proposed the first simulation-based framework demonstrating that massive primordial black holes can directly seed the overmassive AGN population discovered by JWST. This work provides a dark matter origin explanation for the so-called \'Little Red Dot\' systems and connects early-universe dark matter physics to high-redshift observations for the first time.',
    impactZH: '首次提出原初黑洞可直接作为JWST发现的超质量AGN（"小红点"）种子的模拟框架，将早期宇宙暗物质物理与高红移观测直接联系起来。',
  },
  {
    title: 'How do Massive Primordial Black Holes Impact the Formation of the First Stars and Galaxies',
    journal: 'ApJ 987, 185 (2025)',
    arxiv: 'https://arxiv.org/abs/2503.17585',
    impactEN: 'Quantified for the first time how million-solar-mass PBHs disrupt hierarchical structure formation, reshape early star formation timescales, and complicate feedback-regulated galaxy assembly. Identified PBH-driven accretion feedback as a previously unmodeled mechanism affecting early cosmic history.',
    impactZH: '首次定量研究百万太阳质量原初黑洞对早期星系形成与分级结构演化的破坏效应，发现了此前未被建模的吸积反馈机制。',
  },
  {
    title: 'How do Primordial Black Holes change the Halo Mass Function and Structure',
    journal: 'ApJ 975, 139 (2024)',
    arxiv: 'https://arxiv.org/abs/2405.11381',
    impactEN: 'Developed a comprehensive analytical and simulation-based framework for PBH effects on the halo mass function, providing testable predictions distinguishing PBH dark matter from standard ΛCDM for future JWST, Roman, and SKA surveys.',
    impactZH: '构建了原初黑洞对暗晕质量函数影响的解析与模拟框架，为未来JWST、罗曼望远镜和SKA提供可检验的区分性预测。',
  },
  {
    title: 'Detectability of Supermassive Dark Stars with the Roman Space Telescope',
    journal: 'ApJ 965, 121 (2024)',
    arxiv: 'https://arxiv.org/abs/2306.11606',
    impactEN: 'Established the first photometric and spectroscopic detection criteria for supermassive dark stars using Roman Space Telescope and JWST. Identified the HeII 1640Å absorption line as a \'smoking gun\' signature, creating a concrete observational roadmap for this dark matter candidate.',
    impactZH: '首次建立了利用罗曼望远镜和JWST探测超大质量暗物质星的光度和光谱判据，识别出HeII 1640Å吸收线作为关键探测特征。',
  },
  {
    title: 'Distinguishing the impact and signature of black holes from different origins in early cosmic history',
    journal: 'MNRAS 528, 180 (2023)',
    arxiv: 'https://arxiv.org/abs/2310.01763',
    impactEN: 'Demonstrated how to observationally distinguish PBH-seeded black holes from stellar-mass and direct-collapse origins using early galaxy statistics. Provided a methodology that has since been applied to interpret JWST observations of high-redshift black hole populations.',
    impactZH: '提出了利用早期星系统计学区分不同起源黑洞的观测方法，该方法已被应用于JWST高红移黑洞观测数据的解读。',
  },
]

function ContribCard({ contrib, isZh, t }: { contrib: Contribution; isZh: boolean; t: typeof T['en'] }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-[var(--color-accent)]/5 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <a
            href={contrib.arxiv}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--color-accent)] transition-colors leading-snug block mb-2"
          >
            {contrib.title}
          </a>
          <span className="inline-block text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
            {contrib.journal}
          </span>
        </div>
        <span className="shrink-0 mt-0.5 text-[var(--muted)] text-xs font-medium whitespace-nowrap">
          {open ? t.impact.collapseLabel : t.impact.expandLabel}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[var(--card-border)]">
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-[0.15em] mt-4 mb-2">
                {t.impact.impactLabel}
              </p>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {isZh ? contrib.impactZH : contrib.impactEN}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
          <p className="text-[var(--muted)] text-base max-w-xl mx-auto">
            {t.impact.pageSubtitle}
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
          className="mb-20"
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

        {/* ── Section C: Selected Contributions ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-3">
            <span className="w-6 h-0.5 bg-[var(--color-accent)] rounded" />
            {t.impact.contribTitle}
          </h2>
          <p className="text-sm text-[var(--muted)] mb-8 ml-9">{t.impact.contribSubtitle}</p>
          <div className="flex flex-col gap-3">
            {CONTRIBUTIONS.map((c) => (
              <ContribCard key={c.arxiv} contrib={c} isZh={isZh} t={t} />
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  )
}
