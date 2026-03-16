import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Saiyang Zhang | Astrophysics PhD',
  description:
    'Personal academic portfolio of Saiyang Zhang (张赛旸), PhD Candidate in Theoretical & Computational Astrophysics at UT Austin. Research in dark matter, early Universe, and Population III stars.',
  keywords: [
    'Saiyang Zhang',
    'astrophysics',
    'dark matter',
    'PBH',
    'SIDM',
    'Population III',
    'UT Austin',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
