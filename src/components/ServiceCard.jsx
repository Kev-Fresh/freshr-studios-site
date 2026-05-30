import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import DirectionalCTA from './DirectionalCTA'

export default function ServiceCard({ title, tagline, description, cta = 'Book this', ctaHref = '/contact', index, onDark = true, image }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  const borderColor = onDark ? 'border-text-light/10' : 'border-text-dark/10'
  const descColor   = onDark ? 'text-text-light/80'   : 'text-text-dark/70'

  return (
    <div className={`border-b last:border-b-0 ${borderColor}`}>
      <button
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-6">
          <span className="font-body text-xs text-muted tabular-nums w-6 shrink-0">
            {String(index).padStart(2, '0')}
          </span>
          <span className="font-display text-4xl md:text-5xl uppercase leading-none group-hover:text-orange transition-colors duration-200">
            {title}
          </span>
        </div>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.25, ease: 'easeInOut' }}
          className="font-body text-2xl text-orange ml-4 shrink-0 inline-block"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="relative">

              {/* Full-bleed image background */}
              {image && (
                <>
                  <motion.img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={reduced ? false : { scale: 1.06, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Gradient scrim — readable left, photo visible right */}
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/80 to-dark-bg/30" />
                </>
              )}

              {/* Content */}
              <div className={`relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 ${
                image ? 'pl-12 py-12 pr-6 md:pr-16' : 'pl-12 pb-8'
              }`}>
                <div className="flex flex-col gap-3 max-w-xl">
                  <p className={`font-body font-semibold text-sm uppercase tracking-widest ${image ? 'text-orange' : 'text-orange'}`}>
                    {tagline}
                  </p>
                  <p className={`font-body leading-relaxed ${image ? 'text-white/90' : descColor}`}>
                    {description}
                  </p>
                </div>
                <DirectionalCTA to={ctaHref} className="shrink-0 self-start md:self-auto">
                  {cta}
                </DirectionalCTA>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
