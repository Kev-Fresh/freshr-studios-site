import { motion, useReducedMotion } from 'motion/react'
import usePageTitle from '../hooks/usePageTitle'
import DirectionalCTA from '../components/DirectionalCTA'
import UnderlineBar from '../components/UnderlineBar'
import FivePillars from '../components/FivePillars'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

export default function About() {
  usePageTitle('The Story')
  const reduced = useReducedMotion()

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.h1
            className="section-title text-text-light"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            The <span className="whitespace-nowrap">Story<span className="period-orange" aria-hidden="true" style={{ marginLeft: '-0.02em' }} /></span>
          </motion.h1>
          <UnderlineBar />
        </div>
      </section>

      {/* ── Mission section ───────────────────────────────────── */}
      <section data-nav-theme="light" className="section-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div
              className="flex flex-col gap-6"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-5xl md:text-6xl uppercase text-text-dark leading-none">
                Some stories<br />don't get<br />told<span className="period-orange" aria-hidden="true" />
              </h2>
              <p className="font-body text-text-dark/70 leading-relaxed max-w-[65ch]">
                Buffalo is a city full of rich culture. There are communities that form cultures
                and subcultures within those cultures. It's what makes Buffalo what it is. With so
                many things going on but not enough eyes on them, Freshr aims to tell the stories
                of the people and places that are shaping Buffalo for the better.
              </p>
              <p className="font-body text-text-dark/70 leading-relaxed max-w-[65ch]">
                We show up and put what they do under a cinematic camera lens to connect Buffalo with itself.
              </p>
            </motion.div>

            {/* Image slot */}
            <motion.div
              className="aspect-[4/5] bg-dark-bg flex items-center justify-center"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-body text-xs uppercase tracking-widest text-white/20">Photo coming soon</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pull quote ───────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-24 md:py-36 border-t border-white/10">
        <blockquote className="max-w-screen-xl mx-auto px-6 md:px-10">
          <p className="font-display text-[clamp(2rem,5.5vw,5rem)] uppercase text-text-light leading-[0.92] max-w-5xl">
            {[
              '"Buffalo has stories',
              'worth seeing that',
              'nobody has pointed',
              'a camera at yet."',
            ].map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </p>
          <motion.footer
            className="mt-10 font-body text-sm uppercase tracking-widest text-muted"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            — Kevin Cole Jr., Founder, Freshr Studios
          </motion.footer>
        </blockquote>
      </section>

      {/* ── Five Pillars ─────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-20 md:py-28 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.h2
            className="section-title text-text-light"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            The Five <span className="whitespace-nowrap">Pillars<span className="period-orange" aria-hidden="true" /></span>
          </motion.h2>
          <UnderlineBar className="mb-14" />
          <FivePillars variant="stack" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-20 md:py-24 border-t border-white/10">
        <motion.div
          className="max-w-screen-xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-4xl md:text-5xl uppercase text-text-light leading-tight">
            Ready to work<span className="text-orange">?</span>
          </p>
          <DirectionalCTA to="/contact" className="shrink-0">
            Start the Conversation
          </DirectionalCTA>
        </motion.div>
      </section>
    </>
  )
}
