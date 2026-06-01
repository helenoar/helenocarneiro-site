'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'CURRÍCULO', href: '/cv' },
  { label: 'PORTFÓLIO', href: '/portfolio' },
  { label: 'VÍDEOS', href: '/videos' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5" style={{ backgroundColor: 'rgba(28,28,28,0.9)', backdropFilter: 'blur(4px)' }}>
      <Link
        href="/"
        className="font-black text-xl tracking-widest uppercase text-white hover:text-pink transition-colors duration-200"
        style={{ fontFamily: 'var(--font-barlow-condensed-var)' }}
      >
        Heleno Carneiro
      </Link>
      <nav className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-barlow-var)',
                letterSpacing: '0.2em',
                color: isActive ? '#FF006E' : 'rgba(255,255,255,0.7)',
              }}
              onMouseEnter={e => { if (!isActive) (e.target as HTMLElement).style.color = '#FFFFFF' }}
              onMouseLeave={e => { if (!isActive) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
