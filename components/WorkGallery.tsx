'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'

interface Work {
  slug: string
  title: string
  credit: string
  creditEn: string
  photos: string[]
}

interface Props {
  work: Work
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export default function WorkGallery({ work }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  // A capa também abre a galeria, depois vêm as demais fotos
  const photos = ['cover.jpg', ...work.photos]

  const close = useCallback(() => setLightbox(null), [])
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  )
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, close, next, prev])

  return (
    <div className="pt-24 pb-20 px-6 md:px-12">
      {/* Header da obra */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-barlow-condensed font-black text-white uppercase tracking-wider text-4xl md:text-5xl leading-tight">
            {work.title}
          </h1>
          <p className="text-[#FF006E] text-sm tracking-widest uppercase mt-2">
            {work.credit}
          </p>
        </div>
        <Link
          href="/portfolio"
          className="text-white/50 text-sm tracking-wider hover:text-white transition-colors mt-2 flex-shrink-0"
        >
          ← Portfólio
        </Link>
      </div>

      {/* Galeria de fotos */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="columns-1 md:columns-2 gap-2 space-y-2"
      >
        {photos.map((photo, index) => (
          <motion.button
            key={photo}
            variants={itemVariants}
            onClick={() => setLightbox(index)}
            className="group block w-full break-inside-avoid relative overflow-hidden cursor-zoom-in"
            aria-label={`Ampliar foto ${index + 1} de ${work.title}`}
          >
            <Image
              src={`/portfolio/${work.slug}/${photo}`}
              alt={`${work.title} — foto ${index + 1}`}
              width={1600}
              height={1067}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#FF006E]/0 group-hover:bg-[#FF006E]/10 transition-colors duration-300" />
          </motion.button>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            onClick={close}
          >
            {/* Fechar */}
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl leading-none z-10"
            >
              ×
            </button>

            {/* Contador */}
            <span className="absolute top-6 left-6 text-white/50 text-sm tracking-widest z-10">
              {lightbox + 1} / {photos.length}
            </span>

            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  aria-label="Anterior"
                  className="absolute left-2 md:left-6 text-white/50 hover:text-white text-4xl md:text-5xl px-3 z-10"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  aria-label="Próxima"
                  className="absolute right-2 md:right-6 text-white/50 hover:text-white text-4xl md:text-5xl px-3 z-10"
                >
                  ›
                </button>
              </>
            )}

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-[92vw] h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/portfolio/${work.slug}/${photos[lightbox]}`}
                alt={`${work.title} — foto ${lightbox + 1}`}
                fill
                className="object-contain"
                sizes="92vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
