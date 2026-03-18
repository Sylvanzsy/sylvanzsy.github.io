'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>{children}</LanguageProvider>
    </NextThemesProvider>
  )
}
