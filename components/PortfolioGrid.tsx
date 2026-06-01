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
  works: Work[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function PortfolioGrid({ works }: Props) {
  return (
    <div className="pt-24 pb-20 px-6 md:px-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
      >
        {works.map((work) => (
          <motion.div key={work.slug} variants={cardVariants}>
            <Link
              href={`/portfolio/${work.slug}`}
              className="group block relative overflow-hidden"
              style={{ aspectRatio: '4/3' }}
            >
              {/* Imagem de capa */}
              <Image
                src={`/portfolio/${work.slug}/cover.jpg`}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay sempre presente (gradiente sutil no bottom) */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />

              {/* Overlay hover - pink semitransparente */}
              <div className="absolute inset-0 bg-[#FF006E]/0 group-hover:bg-[#FF006E]/20 transition-colors duration-300" />

              {/* Texto no bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="font-barlow-condensed font-black text-white uppercase tracking-wider text-xl leading-tight">
                  {work.title}
                </h2>
                <p className="text-white/60 text-xs tracking-wider mt-0.5">
                  {work.credit}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
