'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguageStore } from '@/lib/language-store'
import navData from '@/data/nav.json'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang } = useLanguageStore()

  const navItems = [
    { label: navData.cv[lang as keyof typeof navData.cv].toUpperCase(), href: '/cv' },
    { label: navData.portfolio[lang as keyof typeof navData.portfolio].toUpperCase(), href: '/portfolio' },
    { label: navData.videos[lang as keyof typeof navData.videos].toUpperCase(), href: '/videos' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1C]/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 md:px-8 py-5">
        <Link
          href="/"
          className="font-black text-xl tracking-widest uppercase text-white hover:text-[#FF006E] transition-colors duration-200"
          style={{ fontFamily: 'var(--font-barlow-condensed-var)' }}
        >
          Heleno Carneiro
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                  isActive ? 'text-[#FF006E]' : 'text-white/70 hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-barlow-var)' }}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="flex items-center ml-8 pl-8 border-l border-white/20">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col border-t border-white/10">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-6 py-4 text-sm tracking-[0.2em] uppercase transition-colors duration-200 ${
                  isActive ? 'text-[#FF006E]' : 'text-white/70 hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-barlow-var)' }}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="px-6 py-4 border-t border-white/10">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  )
}
