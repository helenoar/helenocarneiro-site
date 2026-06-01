'use client'

import Image from 'next/image'
import homeData from '@/data/home.json'
import { useLanguageStore } from '@/lib/language-store'

export default function HomePage() {
  const { lang } = useLanguageStore()
  const subtitle = homeData.subtitles[lang as keyof typeof homeData.subtitles]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Hero background with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="Heleno Carneiro"
          fill
          priority
          className="ken-burns object-cover"
          style={{ transformOrigin: 'center center' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(28,28,28,0.55)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-20 px-12">
        <h1
          className="font-black uppercase leading-none text-white mb-4"
          style={{
            fontFamily: 'var(--font-barlow-condensed-var)',
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            letterSpacing: '0.02em',
          }}
        >
          {homeData.name}
        </h1>
        <p
          className="font-light text-white mb-8"
          style={{
            fontFamily: 'var(--font-barlow-var)',
            fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
            letterSpacing: '0.15em',
            opacity: 0.8,
          }}
        >
          {subtitle.toUpperCase()}
        </p>
        <div className="flex items-center gap-8">
          <a
            href={homeData.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-barlow-var)',
              color: '#FF006E',
              letterSpacing: '0.1em',
            }}
          >
            {homeData.contact.instagram}
          </a>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <a
            href={`mailto:${homeData.contact.email}`}
            className="text-sm transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-barlow-var)',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.05em',
            }}
          >
            {homeData.contact.email}
          </a>
        </div>
      </div>
    </div>
  )
}
