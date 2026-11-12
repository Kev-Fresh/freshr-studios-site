import { useForm, ValidationError } from '@formspree/react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import UnderlineBar from '../components/UnderlineBar'
import { FOUNDING_SPOTS_CLAIMED } from '../components/FoundingFive'

const TOTAL = 5

const fieldClass =
  'w-full bg-transparent py-3 font-body text-text-light placeholder:text-muted/60 focus:outline-none'

function FieldWrap({ children }) {
  return (
    <div className="relative group">
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full bg-text-light/30 pointer-events-none" />
      <span className="absolute bottom-0 left-0 h-[1.5px] bg-orange w-0 group-focus-within:w-full transition-[width] duration-300 ease-out pointer-events-none" />
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

export default function Founding() {
  usePageTitle('Founding Five')
  const reduced = useReducedMotion()
  const [state, handleSubmit] = useForm('xwvzdprg')

  const open = TOTAL - FOUNDING_SPOTS_CLAIMED
  const full = open === 0

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.h1
            className="section-title text-text-light"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Founding <span className="whitespace-nowrap">Five<span className="period-orange period-pulse" aria-hidden="true" /></span>
          </motion.h1>
          <UnderlineBar />

          {/* Spots counter */}
          <motion.div
            className="flex items-center gap-3 mt-6"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {Array.from({ length: TOTAL }).map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="inline-block w-3 h-3 rounded-full shrink-0"
                style={
                  i < FOUNDING_SPOTS_CLAIMED
                    ? { border: '1.5px solid rgb(var(--rgb-accent))', background: 'transparent' }
                    : { background: 'rgb(var(--rgb-accent))' }
                }
              />
            ))}
            <span className="font-body text-sm text-muted ml-1">
              {full ? 'All spots claimed' : `${open} of ${TOTAL} spots open`}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Intro + details ──────────────────────────────────── */}
      <section data-nav-theme="light" className="section-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

            {/* Intro */}
            <motion.div
              className="flex flex-col gap-6"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-body text-lg text-text-dark/80 leading-relaxed max-w-[52ch]">
                I'm building Freshr's archive with five Buffalo businesses this winter. You get a full First Frame film at a founding rate. I get to show the city what we made together.
              </p>
            </motion.div>

            {/* What you get / What I ask */}
            <motion.div
              className="flex flex-col gap-10"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-muted mb-4">What you get</p>
                <ul className="flex flex-col gap-2">
                  {[
                    '1 shoot day',
                    '3–5 min edited film',
                    '3 vertical clips for IG / TikTok',
                    'Music + color grade',
                    '1 round of revisions',
                  ].map((item) => (
                    <li key={item} className="font-body text-text-dark/80 flex items-start gap-2">
                      <span className="text-orange shrink-0 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-body text-xs uppercase tracking-widest text-muted mb-4">What I ask</p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Permission to feature the film in Freshr\'s archive',
                    'A short testimonial after delivery',
                  ].map((item) => (
                    <li key={item} className="font-body text-text-dark/80 flex items-start gap-2">
                      <span className="text-orange shrink-0 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Form / full state ────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-16 md:py-24 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          {full ? (
            <motion.div
              className="max-w-lg"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-4xl md:text-5xl uppercase text-text-light leading-tight">
                Founding Five is full<span className="text-orange">.</span>
              </p>
              <p className="font-body text-muted mt-4">Thank you, Buffalo.</p>
              <Link
                to="/contact"
                className="inline-block mt-8 font-body text-sm uppercase tracking-widest border border-white/30 hover:border-white/70 text-white px-6 py-3 transition-colors duration-150"
              >
                Get in touch →
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              <motion.div
                variants={fadeUp}
                initial={reduced ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <AnimatePresence mode="wait">
                  {state.succeeded ? (
                    <motion.div
                      key="success"
                      className="flex flex-col gap-6 py-8"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ background: 'rgb(var(--rgb-accent))' }}
                        aria-hidden="true"
                      />
                      <p className="font-display text-4xl uppercase text-text-light leading-tight">
                        Got it<span className="period-orange" aria-hidden="true" />
                      </p>
                      <p className="font-body text-muted max-w-sm leading-relaxed">
                        I'll hit you back within 24 hours to set up a quick call. — Kev
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6 w-full max-w-xl"
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3, ease: 'easeIn' }}
                    >
                      <input type="hidden" name="offer" value="founding-five" />
                      <input type="hidden" name="_subject" value="[FOUNDING FIVE] New Founding Application" />

                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ff-name" className="font-body text-xs uppercase tracking-widest text-muted">
                          Name <span className="text-orange">*</span>
                        </label>
                        <FieldWrap>
                          <input
                            id="ff-name"
                            name="name"
                            type="text"
                            required
                            placeholder="Your name"
                            className={fieldClass}
                          />
                        </FieldWrap>
                        <ValidationError field="name" errors={state.errors} className="font-body text-sm text-red-400" />
                      </div>

                      {/* Business name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ff-business" className="font-body text-xs uppercase tracking-widest text-muted">
                          Business name <span className="text-orange">*</span>
                        </label>
                        <FieldWrap>
                          <input
                            id="ff-business"
                            name="business_name"
                            type="text"
                            required
                            placeholder="Your business"
                            className={fieldClass}
                          />
                        </FieldWrap>
                        <ValidationError field="business_name" errors={state.errors} className="font-body text-sm text-red-400" />
                      </div>

                      {/* Instagram */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ff-instagram" className="font-body text-xs uppercase tracking-widest text-muted">
                          Instagram handle <span className="text-muted/60">(optional)</span>
                        </label>
                        <FieldWrap>
                          <input
                            id="ff-instagram"
                            name="instagram"
                            type="text"
                            placeholder="@yourbusiness"
                            className={fieldClass}
                          />
                        </FieldWrap>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ff-email" className="font-body text-xs uppercase tracking-widest text-muted">
                          Email <span className="text-orange">*</span>
                        </label>
                        <FieldWrap>
                          <input
                            id="ff-email"
                            name="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            className={fieldClass}
                          />
                        </FieldWrap>
                        <ValidationError field="email" errors={state.errors} className="font-body text-sm text-red-400" />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ff-phone" className="font-body text-xs uppercase tracking-widest text-muted">
                          Phone <span className="text-muted/60">(optional)</span>
                        </label>
                        <FieldWrap>
                          <input
                            id="ff-phone"
                            name="phone"
                            type="tel"
                            placeholder="(716) 000-0000"
                            className={fieldClass}
                          />
                        </FieldWrap>
                      </div>

                      {/* Story */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="ff-story" className="font-body text-xs uppercase tracking-widest text-muted">
                          What's the story people don't know about your business? <span className="text-orange">*</span>
                        </label>
                        <FieldWrap>
                          <textarea
                            id="ff-story"
                            name="story"
                            required
                            rows={5}
                            placeholder="Tell me something real."
                            className={`${fieldClass} resize-none`}
                          />
                        </FieldWrap>
                        <ValidationError field="story" errors={state.errors} className="font-body text-sm text-red-400" />
                      </div>

                      <ValidationError errors={state.errors} className="font-body text-sm text-red-400" />

                      <button
                        type="submit"
                        data-cta
                        disabled={state.submitting}
                        className="self-start mt-2 px-10 py-4 bg-transparent border border-orange text-text-light font-body font-semibold
                                   uppercase tracking-widest text-sm rounded-sm transition-all duration-200
                                   hover:bg-orange hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {state.submitting ? 'Sending…' : 'Claim my spot'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Sidebar note */}
              <motion.aside
                className="flex flex-col gap-6 md:pt-2"
                variants={fadeUp}
                initial={reduced ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-body text-xs uppercase tracking-widest text-muted">
                  Winter 2026
                </p>
                <p className="font-body text-muted leading-relaxed max-w-[42ch]">
                  No pitch deck. No agency middleman. Just you, your story, and a camera. I'll follow up within 24 hours to set up a quick call.
                </p>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-muted mb-1">Questions?</p>
                  <a
                    href="mailto:hello@freshrstudios.com"
                    className="font-body text-text-light hover:text-orange transition-colors duration-150"
                  >
                    hello@freshrstudios.com
                  </a>
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
