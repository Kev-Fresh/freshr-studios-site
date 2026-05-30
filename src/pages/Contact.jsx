import { motion, useReducedMotion } from 'motion/react'
import ContactForm from '../components/ContactForm'

const PILLARS = ['Clarity', 'Craft', 'Care', 'Community', 'Continuity']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

export default function Contact() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="section-dark pt-32 pb-12 md:pt-40 md:pb-16">
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
          <motion.p
            className="font-body text-lg text-muted mt-4 max-w-lg"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Tell us your story. We'll tell you how we can help.
          </motion.p>
        </div>
      </section>

      {/* ── Form + sidebar ───────────────────────────────────── */}
      <section className="section-dark py-16 md:py-24 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="show"
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactForm />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="flex flex-col gap-10"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="show"
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <h2 className="font-display text-3xl uppercase text-text-light mb-4">
                  The Experience<span className="period-orange" aria-hidden="true" />
                </h2>
                <p className="font-body text-muted leading-relaxed max-w-[65ch]">
                  Every Freshr client interaction is guided by five pillars. Your
                  experience starts with this form.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {PILLARS.map((p, i) => (
                  <div key={p} className="flex items-center gap-4 py-3 border-b border-white/10">
                    <span className="font-body text-xs text-muted tabular-nums w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-2xl uppercase text-text-light">
                      {p}
                    </span>
                    <span className="text-orange ml-auto" aria-hidden="true">·</span>
                  </div>
                ))}
              </div>

              <div className="mt-2">
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
                  href="https://instagram.com/freshrstudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-text-light hover:text-orange transition-colors duration-150"
                >
                  @freshrstudios
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  )
}
