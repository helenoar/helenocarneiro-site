'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

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
        className="columns-1 md:columns-2 gap-1 space-y-1"
      >
        {work.photos.map((photo, index) => (
          <motion.div
            key={photo}
            variants={itemVariants}
            className="break-inside-avoid relative overflow-hidden"
          >
            <Image
              src={`/portfolio/${work.slug}/${photo}`}
              alt={`${work.title} — foto ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
