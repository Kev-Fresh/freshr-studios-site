import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Link, useSearchParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import ContactForm from '../components/ContactForm'
import UnderlineBar from '../components/UnderlineBar'
import KevSignature from '../components/KevSignature'
import { FOUNDING_SPOTS_CLAIMED } from '../components/FoundingFive'

const FOUNDING_TOTAL = 5

const STEPS = [
  { num: '01', text: 'You send this. Takes two minutes.' },
  { num: '02', text: 'I hit you back within 24 hours.' },
  { num: '03', text: 'We hop on a quick call. No pressure, no hard sell.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

function FoundingStrip() {
  const open = FOUNDING_TOTAL - FOUNDING_SPOTS_CLAIMED
  return (
    <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 border border-white/20 px-4 py-2.5 mt-6">
      <div className="flex items-center gap-1.5 shrink-0">
        {Array.from({ length: FOUNDING_TOTAL }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
            style={
              i < FOUNDING_SPOTS_CLAIMED
                ? { border: '1.5px solid rgb(var(--rgb-accent))', background: 'transparent' }
                : { background: 'rgb(var(--rgb-accent))' }
            }
          />
        ))}
      </div>
      <span className="font-body text-xs text-muted">
        Founding Five: {open} of {FOUNDING_TOTAL} spots open
      </span>
      <Link
        to="/founding"
        className="font-body text-xs text-orange hover:text-orange/70 transition-colors duration-150 shrink-0"
      >
        → See the offer
      </Link>
    </div>
  )
}

function KevPhoto() {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null
  return (
    <img
      src="/media/kev.jpg"
      alt="Kevin Cole Jr."
      onError={() => setHidden(true)}
      className="w-24 h-24 md:w-28 md:h-28 object-cover object-top grayscale"
    />
  )
}

export default function Contact() {
  usePageTitle('The Conversation')
  const reduced = useReducedMotion()
  const [searchParams] = useSearchParams()
  const serviceParam = searchParams.get('service')
  const full = FOUNDING_SPOTS_CLAIMED >= FOUNDING_TOTAL
  const showFoundingStrip = !full && (!serviceParam || serviceParam === 'first-frame')

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.h1
            className="section-title text-text-light"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            The <span className="whitespace-nowrap">Conversation<span className="period-orange" aria-hidden="true" /></span>
          </motion.h1>
          <UnderlineBar />
          <motion.p
            className="font-body text-lg text-muted mt-4 max-w-lg"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            No pitch. No pressure. Just a conversation about your story.
          </motion.p>
          {showFoundingStrip && (
            <motion.div
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="show"
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <FoundingStrip />
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Personal note + Form ─────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-16 md:py-24 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

            {/* Note */}
            <motion.div
              className="flex flex-col gap-5"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="show"
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <KevPhoto />
              <p className="font-body text-xs uppercase tracking-widest text-muted">From Kev</p>
              <p className="font-body text-text-light/80 leading-relaxed max-w-[42ch]">
                Every Freshr film starts with a conversation. Tell me a little about you and what you've built. I read every message myself.
              </p>
              <div>
                <KevSignature />
                <p className="font-body text-xs text-muted mt-2">Founder, Freshr Studios</p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="show"
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What Happens Next ────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-16 md:py-24 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="section-title text-text-light">
              What Happens <span className="whitespace-nowrap">Next<span className="period-orange" aria-hidden="true" /></span>
            </h2>
            <UnderlineBar />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mt-12 mb-16">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex flex-col gap-3"
                variants={fadeUp}
                initial={reduced ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-body text-2xl text-orange tabular-nums">{step.num}</span>
                <p className="font-body text-text-light/80 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex flex-col gap-6 md:flex-row md:gap-16"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-muted mb-1">
                Or reach us directly
              </p>
              <a
                href="mailto:hello@freshrstudios.com"
                className="font-body text-text-light hover:text-orange transition-colors duration-150"
              >
                hello@freshrstudios.com
              </a>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-muted mb-1">
                Instagram
              </p>
              <a
                href="https://www.instagram.com/freshr.studios"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-text-light hover:text-orange transition-colors duration-150"
              >
                @freshr.studios
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
