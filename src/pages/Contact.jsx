import { motion, useReducedMotion } from 'motion/react'
import { Link, useSearchParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import ContactForm from '../components/ContactForm'
import UnderlineBar from '../components/UnderlineBar'
import FilmGrain from '../components/FilmGrain'
import PageHero from '../components/PageHero'
import { FOUNDING_SPOTS_CLAIMED } from '../components/FoundingFive'

const FOUNDING_TOTAL = 5

const STEPS = [
  { num: '01', text: 'You send this. Takes two minutes.' },
  { num: '02', text: 'I contact you within 24 hours.' },
  { num: '03', text: 'We hop on a quick call. No pressure, no hard sell.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

function FoundingStrip({ onImage }) {
  const open = FOUNDING_TOTAL - FOUNDING_SPOTS_CLAIMED
  return (
    <div
      className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 mt-6"
      style={{
        border: `1px solid ${onImage ? 'rgba(255,255,255,0.3)' : 'rgb(var(--rgb-text-light) / 0.2)'}`,
      }}
    >
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
      <span
        className="font-body text-xs"
        style={{ color: onImage ? 'rgba(255,255,255,0.6)' : 'rgb(var(--rgb-muted))' }}
      >
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

export default function Contact() {
  usePageTitle('The Conversation')
  const reduced = useReducedMotion()
  const [searchParams] = useSearchParams()
  const serviceParam = searchParams.get('service')
  const full = FOUNDING_SPOTS_CLAIMED >= FOUNDING_TOTAL
  const showFoundingStrip = !full && (!serviceParam || serviceParam === 'first-frame')

  return (
    <>
      <FilmGrain opacity={0.045} />

      {/* ── Header ───────────────────────────────────────────── */}
      <PageHero src="/media/contact-hero.jpg" className="pt-32 pb-12 md:pt-40 md:pb-16">
        {({ hasHero }) => (
          <>
            <motion.h1
              className="section-title"
              style={{ color: hasHero ? '#ffffff' : 'rgb(var(--rgb-text-light))' }}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="show"
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              The <span className="whitespace-nowrap">Conversation<span className="period-orange" aria-hidden="true" /></span>
            </motion.h1>
            <UnderlineBar />
            <motion.p
              className="font-body text-lg mt-4 max-w-lg"
              style={{ color: hasHero ? 'rgba(255,255,255,0.75)' : 'rgb(var(--rgb-muted))' }}
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
                <FoundingStrip onImage={hasHero} />
              </motion.div>
            )}
          </>
        )}
      </PageHero>

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
              <p className="font-body text-xs uppercase tracking-widest text-muted">From the Founder</p>
              <p className="font-body text-text-light/80 leading-relaxed max-w-[42ch]">
                Every Freshr film starts with a conversation. Tell me a little about you and what you've built. I read every message myself.
              </p>
              <div className="mt-3">
                <p className="font-body text-[18px] font-semibold text-text-light">Kevin Cole Jr.</p>
                <p className="font-body text-xs text-muted mt-1">Founder, Freshr Studios</p>
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
