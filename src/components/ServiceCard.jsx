import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import DirectionalCTA from './DirectionalCTA'
import heroVideo from '../assets/Videos/Shelly Test.mov'

function ServiceModal({ title, tagline, description, included, cta, ctaHref, image, video, reduced, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const paragraphs = Array.isArray(description) ? description : [description]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end overflow-y-auto"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Media layer */}
      <motion.div
        className="fixed inset-0"
        initial={reduced ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1.04 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {video ? (
          <video src={video} poster={image} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : image ? (
          <img src={image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
        ) : (
          <video src={heroVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-150"
        aria-label="Close"
      >
        <span className="font-body text-4xl leading-none">×</span>
      </button>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-32 text-white"
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

        <div className="flex flex-col gap-3 max-w-2xl mb-8">
          {paragraphs.map((para, i) => (
            <p key={i} className="font-body text-white/80 text-lg leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {included && included.length > 0 && (
          <div className="mb-10">
            <p className="font-body text-xs uppercase tracking-widest text-muted mb-3">
              What's included
            </p>
            <ul className="flex flex-col gap-1.5">
              {included.map((item) => (
                <li key={item} className="font-body text-sm text-white/70 flex items-start gap-2">
                  <span className="text-orange shrink-0 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <DirectionalCTA to={ctaHref}>{cta}</DirectionalCTA>
      </motion.div>
    </motion.div>
  )
}

export default function ServiceCard({ title, tagline, description, included, cta = 'Book this', ctaHref = '/contact', price, index, onDark = true, image, video }) {
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
          <div className="flex items-baseline gap-6 flex-1 min-w-0">
            <span className="font-body text-xs text-muted tabular-nums w-6 shrink-0">
              {String(index).padStart(2, '0')}
            </span>
            <span className="font-display text-4xl md:text-5xl uppercase leading-none group-hover:text-orange transition-colors duration-200 truncate">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-6 shrink-0 ml-4">
            {price && (
              <span className="hidden md:block font-body text-sm text-muted uppercase tracking-widest">
                {price}
              </span>
            )}
            <span className="font-body text-2xl text-orange" aria-hidden="true">+</span>
          </div>
        </button>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <ServiceModal
              title={title}
              tagline={tagline}
              description={description}
              included={included}
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
