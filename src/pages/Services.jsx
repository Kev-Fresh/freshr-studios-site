import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'
import ServiceCard from '../components/ServiceCard'
import DirectionalCTA from '../components/DirectionalCTA'
import UnderlineBar from '../components/UnderlineBar'
import FivePillars from '../components/FivePillars'
import FoundingFive, { FIRST_FRAME_BADGE } from '../components/FoundingFive'
import PageHero from '../components/PageHero'
import { SERVICES } from '../data/services'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

const getServiceId = (s) => s.ctaHref.replace('/contact?service=', '')

export default function Services() {
  usePageTitle('The Services')
  const reduced  = useReducedMotion()
  const { hash } = useLocation()
  const targetId = hash.slice(1)

  useEffect(() => {
    if (!targetId) return
    const el = document.getElementById(targetId)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    setTimeout(() => window.scrollTo({ top: y, behavior: 'smooth' }), 120)
  }, [targetId])

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <PageHero src="/media/services-hero.png" className="pt-32 pb-8 md:pt-40 md:pb-10">
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
              The <span className="whitespace-nowrap">Services<span className="period-orange period-pulse" aria-hidden="true" /></span>
            </motion.h1>
            <UnderlineBar />
            <motion.p
              className="font-body text-lg mt-6 max-w-xl"
              style={{ color: hasHero ? 'rgba(255,255,255,0.75)' : 'rgb(var(--rgb-muted))' }}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="show"
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Three ways in. One standard of care.
            </motion.p>
            <motion.div
              className="mt-4"
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              animate="show"
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <FoundingFive />
            </motion.div>
          </>
        )}
      </PageHero>

      {/* ── Service accordion ────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark pb-20 md:pb-32 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">

          {/* Lane 1 */}
          <div className="pt-6 pb-2">
            <span className="inline-block font-body text-xs uppercase tracking-widest bg-[#0E0E0E] text-white px-2 py-0.5 mb-2">For businesses &amp; people</span>
            <p className="font-body text-sm text-muted">Your story, told on camera.</p>
          </div>
          {SERVICES.slice(0, 2).map((s, i) => (
            <ServiceCard
              key={s.title}
              id={getServiceId(s)}
              initialOpen={getServiceId(s) === targetId}
              index={i + 1}
              title={s.title}
              tagline={s.tagline}
              description={s.description}
              included={s.included}
              upgradeLine={s.upgradeLine}
              bestFor={s.bestFor}
              badge={s.title === 'First Frame' ? FIRST_FRAME_BADGE : undefined}
              badgeHref={s.title === 'First Frame' ? '/founding' : undefined}
              featured={s.title === 'First Frame'}
              cta={s.cta}
              ctaHref={s.ctaHref}
              image={s.image}
              video={s.video}
            />
          ))}

          <p className="font-body text-sm text-muted mt-6 mb-2">
            Something bigger? Multi-day docs and custom projects.{' '}
            <Link to="/contact?service=custom" className="text-orange hover:text-orange/70 transition-colors duration-150">
              Let's talk →
            </Link>
          </p>

          {/* Lane 2 */}
          <div className="pt-14 pb-2">
            <span className="inline-block font-body text-xs uppercase tracking-widest bg-[#0E0E0E] text-white px-2 py-0.5 mb-2">For events</span>
            <p className="font-body text-sm text-muted">The room, the energy, the night.</p>
          </div>
          {SERVICES.slice(2).map((s, i) => (
            <ServiceCard
              key={s.title}
              id={getServiceId(s)}
              initialOpen={getServiceId(s) === targetId}
              index={i + 3}
              title={s.title}
              tagline={s.tagline}
              description={s.description}
              included={s.included}
              upgradeLine={s.upgradeLine}
              bestFor={s.bestFor}
              badge={undefined}
              featured={false}
              cta={s.cta}
              ctaHref={s.ctaHref}
              image={s.image}
              video={s.video}
            />
          ))}

          <p className="font-body text-sm text-muted mt-10">
            Not sure which one fits?{' '}
            <Link to="/contact" className="text-orange hover:text-orange/70 transition-colors duration-150">
              Let's talk →
            </Link>
          </p>

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
          <DirectionalCTA to="/contact?service=not-sure" className="shrink-0">
            Talk to us
          </DirectionalCTA>
        </motion.div>
      </section>
    </>
  )
}
