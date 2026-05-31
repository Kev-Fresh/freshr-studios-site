import { motion, useReducedMotion } from 'motion/react'
import DirectionalCTA from '../components/DirectionalCTA'
import UnderlineBar from '../components/UnderlineBar'

const PILLARS = [
  {
    name: 'Clarity',
    desc: "No confusion about what you're getting. We walk through every step before we shoot.",
  },
  {
    name: 'Craft',
    desc: 'Cinema-grade glass. DaVinci Resolve. Every frame is deliberate.',
  },
  {
    name: 'Care',
    desc: "We treat your story like it matters. Your project gets our full attention.",
  },
  {
    name: 'Community',
    desc: "We're from Buffalo. We shoot Buffalo. We document the culture of the diaspora and the block.",
  },
  {
    name: 'Continuity',
    desc: "Delivery isn't the end. We build relationships, not transactions.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

export default function About() {
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
            The <span className="whitespace-nowrap">Story<span className="period-orange" aria-hidden="true" /></span>
          </motion.h1>
          <UnderlineBar />
        </div>
      </section>

      {/* ── Studio story ─────────────────────────────────────── */}
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
              <p className="font-body text-lg text-text-dark/80 leading-relaxed max-w-[65ch]">
                Some stories don't get told — not because they aren't worth
                telling, but because nobody pointed a camera at them yet.
              </p>
              <p className="font-body text-text-dark/70 leading-relaxed max-w-[65ch]">
                Freshr Studios exists to change that. For the people moving
                through Buffalo doing real things. For the businesses that want
                to be seen the way they actually are. We show up, we listen,
                and we make something worth watching.
              </p>
              <p className="font-body text-text-dark/70 leading-relaxed max-w-[65ch]">
                Every frame is intentional. Every story is earned.
              </p>
            </motion.div>

            {/* Image slot — replace with real Freshr photography */}
            <motion.div
              className="aspect-[4/5] bg-dark-bg flex items-center justify-center"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* TODO: studio or behind-the-scenes photo, 4:5 portrait aspect */}
              <span className="font-body text-xs uppercase tracking-widest text-white/20">Photo coming soon</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Five Pillars ─────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-20 md:py-28">
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
          <div className="flex flex-col divide-y divide-white/10">
            {PILLARS.map(({ name, desc }, i) => (
              <motion.div
                key={name}
                className="py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-12"
                variants={fadeUp}
                initial={reduced ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-body text-xs text-muted tabular-nums shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-4xl md:text-5xl uppercase text-text-light leading-none w-56 shrink-0">
                  {name}
                </h3>
                <p className="font-body text-muted leading-relaxed max-w-[65ch]">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-20 md:py-24">
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
