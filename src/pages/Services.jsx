import { motion, useReducedMotion } from 'motion/react'
import usePageTitle from '../hooks/usePageTitle'
import ServiceCard from '../components/ServiceCard'
import DirectionalCTA from '../components/DirectionalCTA'
import UnderlineBar from '../components/UnderlineBar'
import FivePillars from '../components/FivePillars'
import { SERVICES } from '../data/services'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

export default function Services() {
  usePageTitle('The Services')
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
            The <span className="whitespace-nowrap">Services<span className="period-orange" aria-hidden="true" /></span>
          </motion.h1>
          <UnderlineBar />
          <motion.p
            className="font-body text-lg text-muted mt-6 max-w-xl"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Four offerings. One standard of care.
          </motion.p>
        </div>
      </section>

      {/* ── Service accordion ────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark pb-20 md:pb-32 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              index={i + 1}
              title={s.title}
              tagline={s.tagline}
              description={s.description}
              included={s.included}
              price={s.price}
              cta={s.cta}
              ctaHref={s.ctaHref}
              image={s.image}
            />
          ))}
        </div>
      </section>

      {/* ── Five Pillars ─────────────────────────────────────── */}
      <section data-nav-theme="light" className="section-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.h2
            className="section-title text-text-dark"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            The Five <span className="whitespace-nowrap">Pillars<span className="period-orange" aria-hidden="true" /></span>
          </motion.h2>
          <UnderlineBar className="mb-14" />
          <FivePillars variant="grid" />
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
          <div>
            <p className="font-display text-4xl md:text-5xl uppercase text-text-light leading-tight">
              Not sure which service<br />is right for you<span className="text-orange">?</span>
            </p>
            <p className="font-body text-muted mt-4 max-w-sm">
              Tell us about your project. We'll figure it out together.
            </p>
          </div>
          <DirectionalCTA to="/contact" className="shrink-0">
            Talk to us
          </DirectionalCTA>
        </motion.div>
      </section>
    </>
  )
}
