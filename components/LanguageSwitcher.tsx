'use client'
import { useLanguageStore } from '@/lib/language-store'

const langs = ['PT', 'EN', 'ES', 'FR'] as const
const langMap = { PT: 'pt', EN: 'en', ES: 'es', FR: 'fr' } as const

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguageStore()

  return (
    <div className="flex items-center gap-4">
      {langs.map((l) => {
        const code = langMap[l]
        const isActive = lang === code
        return (
          <button
            key={l}
            onClick={() => setLang(code)}
            className={`text-xs tracking-[0.2em] font-barlow transition-colors duration-200 ${
              isActive
                ? 'text-[#FF006E] font-bold'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}
