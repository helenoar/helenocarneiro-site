'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguageStore } from '@/lib/language-store'
import Image from 'next/image'

type Lang = 'pt' | 'en' | 'es' | 'fr'

interface CVData {
  lang: string
  sections: {
    cover: {
      name: string
      pronouns: string
      subtitle: string
      contact: {
        instagram: string
        instagramUrl: string
        email: string
        phone: string
      }
      personalInfo?: {
        nationality: string
        pronounsAge: string
      }
      awards?: string[]
    }
    about: {
      title: string
      bio: string
      stats: Array<{ value: string; label: string }>
    }
    choreography: {
      title: string
      works: Array<{ number?: string; title: string; year: string; role: string; description?: string }>
    }
    teaching: {
      title: string
      description?: string
      workshopsHeading?: string
      items: string[]
      juryHeading?: string
      jury?: string[]
    }
    performance: {
      title: string
      subheading?: string
      works: Array<{ title: string; credit?: string; director?: string }>
    }
    training: {
      title: string
      columns: Array<{ heading: string; items: string[] }>
    }
    workshops: {
      title: string
      groups: Array<{ heading: string; items: string[] }>
    }
    festivals: {
      title: string
      subheading?: string
      items: Array<{ name: string; location: string; year?: string }>
    }
    showreel: {
      title: string
      links: Array<{ label: string; url: string; sublabel?: string }>
    }
  }
}

interface Props {
  allCVs: Record<Lang, CVData>
}

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

export default function CVContent({ allCVs }: Props) {
  const { lang } = useLanguageStore()
  const cv = allCVs[lang as Lang]
  const s = cv.sections

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* COVER */}
          <section className="mb-16 flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-48 h-64 flex-shrink-0 overflow-hidden">
              <Image
                src="/cover-photo.jpg"
                alt="Heleno Carneiro"
                fill
                sizes="192px"
                className="object-cover grayscale"
              />
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-white/50 text-xs tracking-widest uppercase mb-2">
                {s.cover.pronouns}
              </p>
              <h1
                className="font-barlow-condensed font-black uppercase text-white leading-none mb-3"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {s.cover.name}
              </h1>
              <p className="text-[#FF006E] text-sm tracking-widest uppercase mb-6 whitespace-pre-line">
                {s.cover.subtitle}
              </p>
              <div className="flex flex-col gap-2 text-sm text-white/70 mb-6">
                <a
                  href={s.cover.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {s.cover.contact.instagram}
                </a>
                <a
                  href={`mailto:${s.cover.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {s.cover.contact.email}
                </a>
                <span>{s.cover.contact.phone}</span>
              </div>
              {s.cover.awards && s.cover.awards.length > 0 && (
                <ul className="space-y-2">
                  {s.cover.awards.map((award, i) => (
                    <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                      <span className="text-[#FF006E] mt-0.5">★</span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* ABOUT */}
          <section className="mb-12">
            <SectionTitle>{s.about.title}</SectionTitle>
            <p className="text-white/80 leading-relaxed mb-8 max-w-3xl text-sm whitespace-pre-line">
              {s.about.bio}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {s.about.stats.map((stat, i) => (
                <div key={i} className="border border-white/10 p-4">
                  <div className="font-barlow-condensed font-black text-[#FF006E] text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CHOREOGRAPHY */}
          <section className="mb-12">
            <SectionTitle>{s.choreography.title}</SectionTitle>
            <div className="space-y-6">
              {s.choreography.works.map((work, i) => (
                <div key={i} className="border-l-2 border-[#FF006E] pl-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-barlow-condensed font-black text-white uppercase tracking-wider text-lg">
                      {work.title}
                    </h3>
                    <span className="text-white/40 text-xs flex-shrink-0">{work.year}</span>
                  </div>
                  <p className="text-[#FF006E] text-xs tracking-wider uppercase mb-1">{work.role}</p>
                  {work.description && (
                    <p className="text-white/60 text-sm mt-1">{work.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* TEACHING */}
          <section className="mb-12">
            <SectionTitle>{s.teaching.title}</SectionTitle>
            {s.teaching.description && (
              <p className="text-white/70 text-sm mb-6 max-w-3xl">{s.teaching.description}</p>
            )}
            {s.teaching.workshopsHeading && (
              <h3 className="text-[#FF006E] text-xs tracking-widest uppercase mb-3">
                {s.teaching.workshopsHeading}
              </h3>
            )}
            <ul className="space-y-2 mb-6">
              {s.teaching.items.map((item, i) => (
                <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-[#FF006E] mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {s.teaching.jury && s.teaching.jury.length > 0 && (
              <>
                {s.teaching.juryHeading && (
                  <h3 className="text-[#FF006E] text-xs tracking-widest uppercase mb-3">
                    {s.teaching.juryHeading}
                  </h3>
                )}
                <ul className="space-y-2">
                  {s.teaching.jury.map((item, i) => (
                    <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-[#FF006E] mt-1">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          {/* PERFORMANCE */}
          <section className="mb-12">
            <SectionTitle>{s.performance.title}</SectionTitle>
            {s.performance.subheading && (
              <p className="text-white/50 text-xs tracking-widest uppercase mb-4">
                {s.performance.subheading}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {s.performance.works.map((work, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="font-barlow-condensed font-black text-white uppercase text-sm tracking-wide">
                    {work.title}
                  </span>
                  {(work.credit || work.director) && (
                    <span className="text-white/40 text-xs">
                      {work.credit || work.director}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* TRAINING */}
          <section className="mb-12">
            <SectionTitle>{s.training.title}</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {s.training.columns.map((col, i) => (
                <div key={i}>
                  <h3 className="text-[#FF006E] text-xs tracking-widest uppercase mb-3">
                    {col.heading}
                  </h3>
                  <ul className="space-y-1">
                    {col.items.map((item, j) => (
                      <li key={j} className="text-white/70 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* WORKSHOPS */}
          <section className="mb-12">
            <SectionTitle>{s.workshops.title}</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {s.workshops.groups.map((group, i) => (
                <div key={i}>
                  <h3 className="text-[#FF006E] text-xs tracking-widest uppercase mb-3">
                    {group.heading}
                  </h3>
                  <ul className="space-y-1">
                    {group.items.map((item, j) => (
                      <li key={j} className="text-white/70 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FESTIVALS */}
          <section className="mb-12">
            <SectionTitle>{s.festivals.title}</SectionTitle>
            {s.festivals.subheading && (
              <p className="text-white/50 text-xs tracking-widest uppercase mb-4">
                {s.festivals.subheading}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {s.festivals.items.map((fest, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="font-barlow-condensed font-black text-white uppercase text-sm tracking-wide">
                    {fest.name}
                  </span>
                  <span className="text-white/40 text-xs">{fest.location}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SHOWREEL */}
          <section className="mb-12">
            <SectionTitle>{s.showreel.title}</SectionTitle>
            <div className="flex flex-wrap gap-4">
              {s.showreel.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-start border border-[#FF006E] text-[#FF006E] px-6 py-3 text-sm tracking-widest uppercase hover:bg-[#FF006E] hover:text-white transition-colors duration-200 group"
                >
                  <span className="flex items-center gap-2">
                    {link.label} <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                  </span>
                  {link.sublabel && (
                    <span className="text-xs tracking-normal normal-case opacity-60 mt-0.5">
                      {link.sublabel}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-barlow-condensed font-black text-[#FF006E] uppercase tracking-widest text-2xl mb-6 pb-2 border-b border-white/10">
      {children}
    </h2>
  )
}
