import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export default function WorkItem({ title, category, thumbnail, video, comingSoon, href = '#' }) {
  const reduced  = useReducedMotion()
  const videoRef = useRef(null)

  const CATEGORY_COLORS = {
    Video: 'text-orange',
    Photo: 'text-white',
    Event: 'text-muted',
  }

  const handleEnter = () => {
    if (videoRef.current) videoRef.current.play()
  }
  const handleLeave = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <motion.a
      href={href}
      className="group relative flex-shrink-0 w-72 md:w-80 overflow-hidden cursor-pointer"
      aria-label={`${title}, ${category}${comingSoon ? ' — Coming Soon' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Thumbnail / Video */}
      <div className="relative aspect-[4/5] bg-[#0E0E0E] overflow-hidden border border-white/10 group-hover:border-orange transition-colors duration-300">
        {video ? (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : thumbnail ? (
          <motion.img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={reduced ? {} : { scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-body text-xs uppercase tracking-widest text-white/20 text-center px-4">
              {title}
            </span>
          </div>
        )}

        {/* Coming Soon badge */}
        {comingSoon && (
          <div className="absolute top-3 left-3">
            <span className="font-body text-[10px] uppercase tracking-widest px-2 py-1 bg-black/70 text-white/50 backdrop-blur-sm">
              Coming Soon
            </span>
          </div>
        )}

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`font-body text-xs uppercase tracking-widest px-2 py-1 bg-black/80 backdrop-blur-sm ${
              CATEGORY_COLORS[category] ?? 'text-white'
            }`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mt-3">
        <p className="font-body font-medium text-white group-hover:text-orange transition-colors duration-200 truncate">
          {title}
        </p>
      </div>
    </motion.a>
  )
}
