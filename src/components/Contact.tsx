'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { T } from '@/lib/translations'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function OrcidIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.203 3.872-3.722 0-2.016-1.284-3.722-3.891-3.722h-2.278z"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}

function AdsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 12.5L3.5 10.74v5.01L12 20l8.5-4.25v-5.01L12 15.5z"/>
    </svg>
  )
}

export default function Contact() {
  const { lang } = useLang()
  const t = T[lang]

  // FIX 2: Office Hours row completely removed
  const CONTACT_ITEMS = [
    { icon: <MailIcon />, label: t.contact.labelEmail, value: 'szhangphys@utexas.edu', href: 'mailto:szhangphys@utexas.edu' },
    { icon: <MapPinIcon />, label: t.contact.labelOffice, value: '9.206 PMA, 2515 Speedway, Austin TX 78712', href: 'https://maps.google.com/?q=2515+Speedway+Austin+TX+78712' },
  ]

  const SOCIAL_LINKS = [
    { icon: <GithubIcon />, label: t.contact.findOnline === '在线主页' ? 'GitHub' : 'GitHub', href: 'https://github.com/Sylvanzsy?tab=repositories' },
    { icon: <AdsIcon />, label: 'NASA/ADS Publications', href: 'https://ui.adsabs.harvard.edu/public-libraries/rn8ayZ1WR1CJV6DeDhc2Ng' },
    { icon: <OrcidIcon />, label: 'ORCID: 0000-0003-1541-177X', href: 'https://orcid.org/0000-0003-1541-177X' },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      ),
      label: t.contact.googleScholar,
      href: 'https://scholar.google.com/citations?user=_MmI5KUAAAAJ&hl=en',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1"/>
          <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/>
          <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>
        </svg>
      ),
      label: 'INSPIRE-HEP',
      href: 'https://inspirehep.net/authors/2847731?ui-citation-summary=true',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/saiyang-zhang-7597b910b/',
    },
  ]

  return (
    <section id="contact" className="relative py-28 px-4 pb-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-accent)]/30" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(76,201,240,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-[var(--color-accent)] text-xs font-semibold tracking-[0.25em] uppercase mb-3">{t.contact.sectionNum}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">{t.contact.title}</h2>
          <p className="mt-4 text-[var(--muted)] max-w-md mx-auto text-sm leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 flex flex-col gap-5"
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[var(--color-accent)] rounded" />{t.contact.contactInfo}
            </h3>
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)] mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="text-sm text-[var(--foreground)] hover:text-[var(--color-accent)] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-[var(--foreground)]">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Social + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 flex flex-col gap-5"
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[var(--color-accent)] rounded" />{t.contact.findOnline}
            </h3>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[var(--card-border)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5 text-[var(--muted)] hover:text-[var(--color-accent)] transition-all group">
                  <span className="text-[var(--color-accent)]">{link.icon}</span>
                  <span className="text-sm font-medium">{link.label}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              ))}
            </div>
            <a href="mailto:szhangphys@utexas.edu"
              className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-accent)] text-[#020818] font-semibold text-sm shadow-[0_0_20px_var(--color-accent-glow)] hover:shadow-[0_0_35px_var(--color-accent-glow)] hover:scale-[1.02] transition-all duration-200">
              <MailIcon />{t.contact.sendEmail}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 text-center text-xs text-[var(--muted)]/60"
      >
        <p>{t.contact.footer1}</p>
        <p className="mt-1">{t.contact.footer2}</p>
      </motion.div>
    </section>
  )
}
