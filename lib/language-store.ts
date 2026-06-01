'use client'
import { create } from 'zustand'

type Lang = 'pt' | 'en' | 'es' | 'fr'

interface LanguageStore {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: 'pt',
  setLang: (lang) => set({ lang }),
}))
