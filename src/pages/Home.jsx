import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import ServiceCard from '../components/ServiceCard'
import WorkItem from '../components/WorkItem'

const SERVICES_PREVIEW = [
  {
    title: 'First Frame',
    tagline: 'Entry-level package',
    description: 'A clean, focused story told well. Photography or video — your first frame with us.',
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
  },
]

const WORK_PREVIEW = [
  { title: 'Skate Park Sessions', category: 'Video' },
  { title: 'East Side Portraits', category: 'Photo' },
  { title: 'Juneteenth Block Party', category: 'Event' },
  { title: 'The Conversation', category: 'Video' },
  { title: 'Allentown Arts Fest', category: 'Event' },
]

export default function Home() {
  const introRef = useRef(null)
  const [glowY, setGlowY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!introRef.current) return
      const rect = introRef.current.getBoundingClientRect()
      const distFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2
      setGlowY(distFromCenter * 0.15)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-start md:items-end pt-36 pb-12 md:pt-0 md:pb-28 section-dark grain-overlay overflow-hidden">
        {/* Background: placeholder until real photography is added */}
        <div className="absolute inset-0 bg-dark-bg" aria-hidden="true" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10 w-full">
          <h1 className="font-display text-[clamp(2.25rem,6.5vw,5.75rem)] uppercase leading-[0.88] text-text-light">
            Buffalo's Story Studio<span className="period-orange" aria-hidden="true" />
          </h1>
          <p className="font-body text-lg md:text-xl text-text-light/70 mt-6 max-w-md">
            We capture authentic stories from the city and its diaspora.
            With intention. With craft.
          </p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:gap-4">
            <Link to="/archive" className="btn-outline text-center md:text-left">
              See the Work
            </Link>
            <Link to="/contact" className="btn-primary text-text-light text-center md:text-left">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* ── Intro statement ──────────────────────────────────── */}
      <section ref={introRef} className="relative section-dark py-28 md:py-40 overflow-hidden">

        {/* Parallax light bloom — sits behind the text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${glowY}px)` }}
        >
          <div
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[56.25rem] h-[37.5rem]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(252,158,79,0.07) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Edge vignettes — shadow framing the light */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 18%, transparent 80%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">
          <p className="font-display text-[clamp(2.5rem,6vw,5.5rem)] text-text-light leading-tight max-w-4xl">
            We don't make content.<br />
            We tell stories<span className="period-orange" aria-hidden="true" />
          </p>
          <p className="font-body text-lg text-muted mt-8 max-w-2xl">
            Freshr Studios is rooted in Buffalo — the culture, the people, the diaspora.
            Every frame is intentional. Every project is a story worth telling.
          </p>
        </div>
      </section>

      {/* ── Services preview ─────────────────────────────────── */}
      <section className="section-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-12">
            <h2 className="section-title text-text-dark">
              The Services<span className="period-orange" aria-hidden="true" />
            </h2>
            <Link
              to="/services"
              className="hidden md:inline font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
            >
              View all →
            </Link>
          </div>
          <div>
            {SERVICES_PREVIEW.map((s, i) => (
              <ServiceCard
                key={s.title}
                index={i + 1}
                title={s.title}
                tagline={s.tagline}
                description={s.description}
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
          <div className="flex items-end justify-between mb-10">
            <h2 className="section-title text-text-light">
              The Archive<span className="period-orange" aria-hidden="true" />
            </h2>
            <Link
              to="/archive"
              className="hidden md:inline font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
            >
              Full portfolio →
            </Link>
          </div>
        </div>

        {/* Horizontal filmstrip — no container max-width */}
        <div className="pl-6 md:pl-10">
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
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-[clamp(48px,8vw,120px)] uppercase leading-none text-text-light">
            Your story<br />
            starts here<span className="period-orange" aria-hidden="true" />
          </h2>
          <p className="font-body text-lg text-text-light/70 mt-6 max-w-md mx-auto">
            Ready to tell something real? Let's talk.
          </p>
          <Link to="/contact" className="mt-10 btn-outline inline-block">
            Start the Conversation
          </Link>
        </div>
      </section>
    </>
  )
}
