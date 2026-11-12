import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import DirectionalCTA from './DirectionalCTA'

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
      className="fixed inset-0 z-[100] overflow-y-auto"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Media layer — fixed so it stays put while content scrolls */}
      <motion.div
        className="fixed inset-0 bg-[#0E0E0E]"
        initial={reduced ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1.04 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {video ? (
          <video src={video} poster={image} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : image ? (
          <img src={image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </motion.div>

      {/* Close button — fixed so it never scrolls away */}
      <button
        onClick={onClose}
        className="fixed top-24 right-8 z-20 w-10 h-10 flex items-center justify-center text-orange hover:text-orange/70 transition-colors duration-150"
        aria-label="Close"
      >
        <span className="font-body text-4xl leading-none">×</span>
      </button>

      {/* Content — scrolls over the fixed background */}
      <motion.div
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-24 text-white"
        style={{ paddingTop: 'max(6rem, calc(env(safe-area-inset-top, 0px) + 4rem))' }}
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

export default function ServiceCard({
  title, tagline, description, included,
  cta = 'Book this', ctaHref = '/contact',
  bestFor, badge, badgeHref, featured = false,
  index, onDark = true, image, video,
  id, initialOpen = false,
}) {
  const [open, setOpen] = useState(initialOpen)
  const reduced = useReducedMotion()

  const borderColor = onDark ? 'border-text-light/10' : 'border-text-dark/10'
  const featuredBg  = featured
    ? (onDark ? 'rgba(255,255,255,0.04)' : '#F7F7F7')
    : undefined
  const featuredBorder = featured
    ? '3px solid rgb(var(--rgb-accent))'
    : undefined

  return (
    <>
      <div
        id={id}
        style={{ scrollMarginTop: '6rem', backgroundColor: featuredBg, borderLeft: featuredBorder }}
        className={`border-b last:border-b-0 ${borderColor}`}
      >
        <div className="flex items-center py-6 md:py-8">

          {/* Left: accordion toggle */}
          <button
            className="flex items-start gap-6 flex-1 min-w-0 text-left group"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? `Close ${title}` : `Open ${title}`}
          >
            <span className="font-body text-xs text-muted tabular-nums w-6 shrink-0 mt-2">
              {String(index).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display text-4xl md:text-5xl uppercase leading-none group-hover:text-orange transition-colors duration-200">
                  {title}
                </span>
                {badge && (badgeHref ? (
                  <Link
                    to={badgeHref}
                    onClick={(e) => e.stopPropagation()}
                    className="font-body text-[10px] uppercase tracking-widest bg-[#0E0E0E] text-white px-1.5 py-[3px] leading-none shrink-0 self-center hover:opacity-70 transition-opacity duration-150"
                  >
                    {badge}
                  </Link>
                ) : (
                  <span className="font-body text-[10px] uppercase tracking-widest bg-[#0E0E0E] text-white px-1.5 py-[3px] leading-none shrink-0 self-center">
                    {badge}
                  </span>
                ))}
              </div>
              {bestFor && (
                <span className="font-body text-sm text-muted">
                  {bestFor}
                </span>
              )}
            </div>
          </button>

          {/* Right: Book link + toggle */}
          <div className="flex items-center gap-4 ml-4 shrink-0">
            <Link
              to={ctaHref}
              className="font-body text-xs uppercase tracking-widest text-orange hover:text-orange/70 transition-colors duration-150 hidden sm:inline"
            >
              Book →
            </Link>
            <button
              onClick={() => setOpen(o => !o)}
              className="font-body text-2xl text-orange leading-none"
              aria-hidden="true"
              tabIndex={-1}
            >
              {open ? '×' : '+'}
            </button>
          </div>

        </div>
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
