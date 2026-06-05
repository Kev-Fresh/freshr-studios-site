import { useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export default function WorkItem({ title, category, thumbnail, video, comingSoon }) {
  const reduced  = useReducedMotion()
  const videoRef = useRef(null)
  const [flashing, setFlashing] = useState(false)
  const timerRef = useRef(null)

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

  const handleTap = () => {
    if (flashing) return
    setFlashing(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setFlashing(false), 1400)
  }

  return (
    <motion.div
      className="group relative flex-shrink-0 w-72 md:w-80 overflow-hidden cursor-pointer"
      aria-label={`${title}, ${category}${comingSoon ? ' — Coming Soon' : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleTap}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Thumbnail / Video */}
      <div className="relative aspect-[4/5] bg-[#0E0E0E] overflow-hidden border border-white/10 group-hover:border-orange/40 transition-colors duration-300">
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

        {/* Permanent coming soon overlay */}
        {comingSoon && (
          <>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div className="absolute top-3 left-3">
              <span className="font-body text-[10px] uppercase tracking-widest px-2 py-1 bg-black/70 text-white/50 backdrop-blur-sm">
                Coming Soon
              </span>
            </div>
          </>
        )}

        {/* Tap flash overlay — all cards */}
        <AnimatePresence>
          {flashing && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <motion.p
                className="font-display text-2xl uppercase tracking-widest text-white"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, delay: 0.05, ease: 'easeOut' }}
              >
                Coming soon<span className="period-orange" aria-hidden="true" />
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category tag — always visible at bottom */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`block font-body text-xs uppercase tracking-widest px-2 py-1 bg-black/80 backdrop-blur-sm
              ${CATEGORY_COLORS[category] ?? 'text-white'}`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mt-3">
        <p className="font-body font-medium text-white truncate">
          {title}
        </p>
      </div>
    </motion.div>
  )
}
