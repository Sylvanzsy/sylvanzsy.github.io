'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projectsData from '../../content/projects.json'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Project = typeof projectsData[number]

const FILTERS = ['All', 'Dark Matter', 'Early Universe', 'Cosmology'] as const

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

const CATEGORY_COLORS: Record<string, string> = {
  'Dark Matter': 'bg-[#4cc9f0]/15 text-[#4cc9f0] border-[#4cc9f0]/30',
  'Early Universe': 'bg-[#f72585]/15 text-[#f72585] border-[#f72585]/30',
  Cosmology: 'bg-[#7b2fbe]/15 text-[#c77dff] border-[#7b2fbe]/30',
  HPC: 'bg-[#06d6a0]/15 text-[#06d6a0] border-[#06d6a0]/30',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: EASE }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] overflow-hidden flex flex-col"
    >
      {/* Image area */}
      <div className="h-40 bg-gradient-to-br from-[var(--color-space-800)] to-[var(--color-space-700)] relative overflow-hidden">
        {/* Placeholder pattern */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, var(--color-accent) 0%, transparent 50%), radial-gradient(circle at 75% 75%, var(--color-violet) 0%, transparent 50%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-black text-white/10 select-none tracking-tight">
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[project.category] || 'bg-white/10 text-white/60'}`}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--color-accent)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-space-700)]/60 text-[var(--muted)] font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="flex flex-col gap-1">
          {project.highlights.map((h) => (
            <li key={h} className="text-xs text-[var(--muted)] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="flex gap-2 pt-1 border-t border-[var(--card-border)]">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              <GithubIcon /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--color-accent)] transition-colors ml-3"
            >
              <ExternalIcon /> Demo
            </a>
          )}
          {!project.github && !project.demo && (
            <span className="text-xs text-[var(--muted)]/50 italic">Private repository</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-28 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-accent)]/30" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            04 / Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">Projects &amp; Code</h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto text-sm leading-relaxed">
            Open-source tools, simulation pipelines, and data analysis frameworks from my research.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-[var(--color-accent)] text-[#020818] border-[var(--color-accent)] shadow-[0_0_16px_var(--color-accent-glow)]'
                  : 'border-[var(--card-border)] text-[var(--muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
