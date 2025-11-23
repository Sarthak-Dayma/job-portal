"use client"

import { useLanguage } from '@/lib/i18n/language-context'
import { Languages } from 'lucide-react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="flex items-center gap-2 px-4 py-2 bg-background/20 hover:bg-background/30 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm"
      title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
    >
      <Languages className="w-4 h-4" />
      <span className="hidden sm:inline font-semibold">{language === 'en' ? 'हिंदी' : 'English'}</span>
    </button>
  )
}
