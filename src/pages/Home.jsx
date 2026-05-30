import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import WorkItem from '../components/WorkItem'
import DirectionalCTA from '../components/DirectionalCTA'
import inTheMomentImg from '../assets/images/event-roller-skate.png'

const SERVICES_PREVIEW = [
  {
    title: 'First Frame',
    tagline: 'Entry-level package',
    description: 'A clean, focused story told well. Photography or video. Your first frame with us.',
  },
  {
    title: 'The Sit Down',
    tagline: 'Interview / portrait',
    description: 'One subject. One story. Thoughtfully captured and carefully finished.',
  },
  {
    title: 'The Deep Dive',
    tagline: 'Full production',
    description: 'Extended coverage, multiple angles, editorial post. For stories that deserve the full treatment.',
  },
  {
    title: 'In The Moment',
    tagline: 'Event coverage',
    description: 'Live, reactive, real-time storytelling. We show up and capture what actually happens.',
    image: inTheMomentImg,
  },
]

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
  const introRef = useRef(null)
  const reduced  = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ['start end', 'end start'],
  })
  const glowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex items-start md:items-end pt-36 pb-12 md:pt-0 md:pb-28 section-dark grain-overlay overflow-hidden">
        {/* Hero image slot — replace src with real photography */}
        <div className="absolute inset-0 bg-dark-bg" aria-hidden="true">
          {/* TODO: hero full-bleed photo, 1920×1080, from actual Freshr shoot */}
          <div className="w-full h-full bg-gradient-to-b from-dark-bg/60 via-transparent to-dark-bg/80" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 w-full">
          <motion.h1
            className="font-display text-[clamp(2.25rem,6.5vw,5.75rem)] uppercase text-text-light"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Buffalo's Story Studio<span className="period-orange" aria-hidden="true" />
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl text-text-light/70 mt-6 max-w-md"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            We capture authentic stories from the city and its diaspora.
            With intention. With craft.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 md:flex-row md:gap-4"
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
      <section ref={introRef} className="relative section-dark py-28 md:py-40 overflow-hidden">

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
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 18%, transparent 80%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        <motion.div
          className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-text-light max-w-4xl">
            We don't make content.<br />
            We tell stories<span className="period-orange" aria-hidden="true" />
          </h2>
          <p className="font-body text-lg text-muted mt-8 max-w-[65ch]">
            Freshr Studios is rooted in Buffalo: the culture, the people, the diaspora.
            Every frame is intentional. Every project is a story worth telling.
          </p>
        </motion.div>
      </section>

      {/* ── Services preview ─────────────────────────────────── */}
      <section className="section-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.div
            className="flex items-end justify-between mb-12"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="section-title text-text-dark">
              The <span className="whitespace-nowrap">Services<span className="period-orange" aria-hidden="true" /></span>
            </h2>
            <Link
              to="/services"
              className="hidden md:inline font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
            >
              View all →
            </Link>
          </motion.div>
          <div>
            {SERVICES_PREVIEW.map((s, i) => (
              <ServiceCard
                key={s.title}
                index={i + 1}
                title={s.title}
                tagline={s.tagline}
                description={s.description}
                image={s.image}
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
      <section className="section-dark py-20 md:py-28 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.div
            className="flex items-end justify-between mb-10"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="section-title text-text-light">
              The <span className="whitespace-nowrap">Archive<span className="period-orange" aria-hidden="true" /></span>
            </h2>
            <Link
              to="/archive"
              className="hidden md:inline font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
            >
              Full portfolio →
            </Link>
          </motion.div>
        </div>

        <div className="filmstrip-container pl-6 md:pl-10">
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
      <section className="section-dark py-24 md:py-32">
        <motion.div
          className="max-w-screen-xl mx-auto px-6 md:px-10 text-center"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[clamp(48px,8vw,120px)] uppercase leading-none text-text-light">
            Your story<br />
            starts here<span className="period-orange" aria-hidden="true" />
          </h2>
          <p className="font-body text-lg text-text-light/70 mt-6 max-w-md mx-auto">
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
