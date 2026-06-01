import { useRef } from 'react'
import usePageTitle from '../hooks/usePageTitle'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import WorkItem from '../components/WorkItem'
import DirectionalCTA from '../components/DirectionalCTA'
import RevealText from '../components/RevealText'
import UnderlineBar from '../components/UnderlineBar'
import heroVideo from '../assets/Videos/Shelly.mp4'
import { SERVICES } from '../data/services'

const WORK_PREVIEW = [
  { title: 'Skate Park Sessions', category: 'Video' },
  { title: 'East Side Portraits', category: 'Photo' },
  { title: 'Juneteenth Block Party', category: 'Event' },
  { title: 'The Conversation', category: 'Video' },
  { title: 'Allentown Arts Fest', category: 'Event' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
}

export default function Home() {
  usePageTitle(null)
  const introRef  = useRef(null)
  const ctaRef    = useRef(null)
  const periodRef = useRef(null)
  const reduced   = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ['start end', 'end start'],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40])

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'center center'],
  })
  const circleScale    = useTransform(ctaProgress, [0, 1], reduced ? [1, 1] : [140, 1])
  const contentOpacity = useTransform(ctaProgress, [0.4, 1], reduced ? [1, 1] : [0, 1])

  // Animate circle from section center toward the real period position
  const circleOffsetX = useTransform(ctaProgress, (p) => {
    if (!periodRef.current || !ctaRef.current) return 0
    const pr = periodRef.current.getBoundingClientRect()
    const sr = ctaRef.current.getBoundingClientRect()
    return (pr.left - sr.left + pr.width / 2 - sr.width / 2) * p
  })
  const circleOffsetY = useTransform(ctaProgress, (p) => {
    if (!periodRef.current || !ctaRef.current) return 0
    const pr = periodRef.current.getBoundingClientRect()
    const sr = ctaRef.current.getBoundingClientRect()
    return (pr.top - sr.top + pr.height / 2 - sr.height / 2) * p
  })

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section data-nav-theme="dark" className="relative min-h-[100dvh] flex items-end pb-12 md:pb-28 grain-overlay overflow-hidden" style={{ backgroundColor: '#000' }}>
        {/* Hero image slot — replace src with real photography */}
        <div className="absolute inset-0 bg-black" aria-hidden="true">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 w-full pl-10 pr-6 md:pl-16 md:pr-10">
          <motion.h1
            className="font-display text-[clamp(2.25rem,6.5vw,5.75rem)] uppercase text-white"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Buffalo's Story Studio<span className="period-orange" aria-hidden="true" />
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl text-white/70 mt-6 max-w-md"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Cinematic storytelling for the people and places shaping Buffalo.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 md:flex-row md:gap-4 text-white"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <DirectionalCTA to="/archive" className="text-center md:text-left">
              See the Work
            </DirectionalCTA>
            <DirectionalCTA to="/contact" variant="primary" className="text-center md:text-left">
              Start a Project
            </DirectionalCTA>
          </motion.div>
        </div>
      </section>

      {/* ── Intro statement ──────────────────────────────────── */}
      <section ref={introRef} data-nav-theme="dark" className="relative section-dark py-28 md:py-40 overflow-hidden">

        {/* Parallax light bloom — Motion useScroll, no raw listener */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ y: glowY }}
        >
          <div
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[56.25rem] h-[37.5rem]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(252,158,79,0.07) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
        </motion.div>

        {/* Edge vignettes */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgb(var(--rgb-dark-bg)) 0%, transparent 18%, transparent 80%, rgb(var(--rgb-dark-bg)) 100%)',
          }}
        />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-text-light max-w-4xl">
            <RevealText>We don't make content.</RevealText>
            <RevealText delay={0.1}>
              We tell stories<span className="period-orange" aria-hidden="true" />
            </RevealText>
          </h2>
          <motion.p
            className="font-body text-lg text-muted mt-8 max-w-[65ch]"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Most of what makes Buffalo worth living in never makes it on camera.
            Freshr Studios documents the people, places, and events shaping this city — the ones
            residents might not even know about. Cinematically.
          </motion.p>
        </div>
      </section>

      {/* ── Services preview ─────────────────────────────────── */}
      <section data-nav-theme="light" className="section-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.div
            className="flex items-end justify-between mb-12"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h2 className="section-title text-text-dark">
                The <span className="whitespace-nowrap">Services<span className="period-orange" aria-hidden="true" /></span>
              </h2>
              <UnderlineBar />
            </div>
            <Link
              to="/services"
              className="hidden md:inline font-body text-sm uppercase tracking-widest text-text-dark/60 hover:text-orange transition-colors duration-150"
            >
              View all →
            </Link>
          </motion.div>
          <div>
            {SERVICES.map((s, i) => (
              <ServiceCard
                key={s.title}
                index={i + 1}
                title={s.title}
                tagline={s.tagline}
                description={s.description}
                included={s.included}
                cta={s.cta}
                ctaHref={s.ctaHref}
                image={s.image}
                video={s.video}
                onDark={false}
              />
            ))}
          </div>
          <Link
            to="/services"
            className="mt-8 inline-block md:hidden font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
          >
            View all services →
          </Link>
        </div>
      </section>

      {/* ── Work teaser ──────────────────────────────────────── */}
      <section data-nav-theme="dark" className="section-dark py-20 md:py-28 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.div
            className="flex items-end justify-between mb-10"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h2 className="section-title text-text-light">
                The <span className="whitespace-nowrap">Archive<span className="period-orange" aria-hidden="true" /></span>
              </h2>
              <UnderlineBar />
            </div>
            <Link
              to="/archive"
              className="hidden md:inline font-body text-sm uppercase tracking-widest text-text-light/60 hover:text-orange transition-colors duration-150"
            >
              Full portfolio →
            </Link>
          </motion.div>
        </div>

        <div className="filmstrip-container pl-10 md:pl-16">
          <div className="filmstrip pr-6 md:pr-10">
            {WORK_PREVIEW.map((item) => (
              <WorkItem
                key={item.title}
                title={item.title}
                category={item.category}
                href="/archive"
              />
            ))}
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-10 mt-10">
          <Link
            to="/archive"
            className="inline-block md:hidden font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
          >
            Full portfolio →
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section ref={ctaRef} data-nav-theme="light" className="section-light relative overflow-hidden py-24 md:py-32">
        {/* Period bloom — starts full-screen, tracks to real period position on scroll */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            aria-hidden="true"
            className="rounded-full"
            style={{
              width:      '1rem',
              height:     '1rem',
              background: 'rgb(var(--rgb-accent))',
              x:          circleOffsetX,
              y:          circleOffsetY,
              scale:      circleScale,
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 text-center"
          style={{ opacity: contentOpacity }}
        >
          <h2 className="font-display text-[clamp(48px,8vw,120px)] uppercase leading-none text-text-dark">
            Your story<br />
            starts here<span ref={periodRef} className="period-orange" aria-hidden="true" />
          </h2>
          <p className="font-body text-lg text-text-dark/60 mt-6 max-w-md mx-auto">
            Ready to tell something real? Let's talk.
          </p>
          <DirectionalCTA to="/contact" className="mt-10">
            Start the Conversation
          </DirectionalCTA>
        </motion.div>
      </section>
    </>
  )
}
