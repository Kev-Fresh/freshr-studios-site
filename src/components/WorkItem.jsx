import { motion, useReducedMotion } from 'motion/react'

export default function WorkItem({ title, category, thumbnail, href = '#' }) {
  const reduced = useReducedMotion()

  const CATEGORY_COLORS = {
    Video: 'text-orange',
    Photo: 'text-white',
    Event: 'text-muted',
  }

  return (
    <motion.a
      href={href}
      className="group relative flex-shrink-0 w-72 md:w-80 overflow-hidden cursor-pointer"
      aria-label={`${title}, ${category}`}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/5] bg-dark-bg/60 overflow-hidden border border-white/10 group-hover:border-orange transition-colors duration-300">
        {thumbnail ? (
          <motion.img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={reduced ? {} : { scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          /* Labeled placeholder slot */
          <div className="w-full h-full flex items-center justify-center">
            {/* TODO: replace with real project thumbnail */}
            <span className="font-body text-xs uppercase tracking-widest text-white/20 text-center px-4">
              {title}
            </span>
          </div>
        )}

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`font-body text-xs uppercase tracking-widest px-2 py-1 bg-dark-bg/80 backdrop-blur-sm ${
              CATEGORY_COLORS[category] ?? 'text-text-light'
            }`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mt-3">
        <p className="font-body font-medium text-text-light group-hover:text-orange transition-colors duration-200 truncate">
          {title}
        </p>
      </div>
    </motion.a>
  )
}
