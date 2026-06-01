'use client'
import { motion } from 'framer-motion'

interface Video {
  id: string
  label: string
  youtubeId: string
  description: string
}

interface Props {
  videos: Video[]
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function VideosList({ videos }: Props) {
  return (
    <div className="pt-24 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {videos.map((video) => (
          <motion.div key={video.id} variants={itemVariants}>
            <div className="mb-4">
              <h2 className="font-barlow-condensed font-black text-white uppercase tracking-wider text-3xl">
                {video.label}
              </h2>
              <p className="text-white/50 text-sm mt-1">{video.description}</p>
            </div>
            <div
              className="relative w-full overflow-hidden bg-black"
              style={{ aspectRatio: '16/9' }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
