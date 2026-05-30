import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import DirectionalCTA from './DirectionalCTA'

function ServiceModal({ title, tagline, description, cta, ctaHref, image, video, reduced, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Media layer */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1.04 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : image ? (
          <img src={image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-dark-bg" />
        )}

        {/* Scrim — heavy at bottom where content lives, fades out top */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/55 to-dark-bg/10" />
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-150"
        aria-label="Close"
      >
        <span className="font-body text-4xl leading-none">×</span>
      </button>

      {/* Content — sits at bottom */}
      <motion.div
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-32"
        initial={reduced ? false : { y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-body text-xs uppercase tracking-widest text-orange mb-4">
          {tagline}
        </p>
        <h2 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase text-white leading-none mb-6">
          {title}<span className="period-orange" aria-hidden="true" />
        </h2>
        <p className="font-body text-white/80 text-lg leading-relaxed max-w-2xl mb-10">
          {description}
        </p>
        <DirectionalCTA to={ctaHref}>
          {cta}
        </DirectionalCTA>
      </motion.div>
    </motion.div>
  )
}

export default function ServiceCard({ title, tagline, description, cta = 'Book this', ctaHref = '/contact', index, onDark = true, image, video }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  const borderColor = onDark ? 'border-text-light/10' : 'border-text-dark/10'

  return (
    <>
      <div className={`border-b last:border-b-0 ${borderColor}`}>
        <button
          className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
          onClick={() => setOpen(true)}
          aria-label={`Open ${title}`}
        >
          <div className="flex items-baseline gap-6">
            <span className="font-body text-xs text-muted tabular-nums w-6 shrink-0">
              {String(index).padStart(2, '0')}
            </span>
            <span className="font-display text-4xl md:text-5xl uppercase leading-none group-hover:text-orange transition-colors duration-200">
              {title}
            </span>
          </div>
          <span className="font-body text-2xl text-orange ml-4 shrink-0" aria-hidden="true">
            +
          </span>
        </button>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <ServiceModal
              title={title}
              tagline={tagline}
              description={description}
              cta={cta}
              ctaHref={ctaHref}
              image={image}
              video={video}
              reduced={reduced}
              onClose={() => setOpen(false)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
