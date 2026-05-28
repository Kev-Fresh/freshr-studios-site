import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'

const SERVICES = [
  {
    title: 'First Frame',
    tagline: 'Entry-level package — photography & video',
    description:
      'A clean, focused story told well. Perfect for solo entrepreneurs, small businesses, or anyone stepping into professional storytelling for the first time. One session. One deliverable. Done right.',
    cta: 'Book First Frame',
  },
  {
    title: 'The Sit Down',
    tagline: 'Interview & portrait format',
    description:
      'One subject. One story. We position you, light you, and let the conversation breathe. Boom or hot-shoe mount — no clip mic in sight. The result is a portrait session or short interview that feels documentary, not corporate.',
    cta: 'Book The Sit Down',
  },
  {
    title: 'The Deep Dive',
    tagline: 'Full production — extended coverage',
    description:
      "Multiple angles. Extended coverage. Editorial post-production in DaVinci Resolve. For stories that deserve the full treatment — brand films, documentary shorts, full-day portrait series. This is where the FX30 and Sigma 18-50 do what they're built for.",
    cta: 'Book The Deep Dive',
  },
  {
    title: 'In The Moment',
    tagline: 'Live event coverage',
    description:
      'Live, reactive, real-time storytelling. We show up to your event, read the room, and capture what actually happens. Cultural events, community gatherings, performances, celebrations. No staged moments — just real ones.',
    cta: 'Book In The Moment',
  },
]

const PILLARS = [
  { name: 'Clarity',    body: "No confusion about what you're getting — ever." },
  { name: 'Craft',      body: 'Every frame is intentional. We edit with purpose.' },
  { name: 'Care',       body: 'We treat your story like it matters. Because it does.' },
  { name: 'Community',  body: 'Rooted in Buffalo. Always.' },
  { name: 'Continuity', body: "The relationship doesn't end at delivery." },
]

export default function Services() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <h1 className="section-title text-text-light">
            The Services<span className="period-orange" aria-hidden="true" />
          </h1>
          <p className="font-body text-lg text-muted mt-6 max-w-xl">
            Four offerings. One standard of care.
          </p>
        </div>
      </section>

      {/* ── Service accordion ────────────────────────────────── */}
      <section className="section-dark pb-20 md:pb-32 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              index={i + 1}
              title={s.title}
              tagline={s.tagline}
              description={s.description}
              cta={s.cta}
            />
          ))}
        </div>
      </section>

      {/* ── Five Pillars ─────────────────────────────────────── */}
      <section className="section-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <h2 className="section-title text-text-dark mb-14">
            The Five Pillars<span className="period-orange" aria-hidden="true" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PILLARS.map(({ name, body }, i) => (
              <div key={name} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs text-muted tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-text-dark/20" />
                </div>
                <h3 className="font-display text-3xl uppercase text-text-dark">
                  {name}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-dark py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display text-4xl md:text-5xl uppercase text-text-light leading-tight">
              Not sure which service<br />is right for you<span className="text-orange">?</span>
            </p>
            <p className="font-body text-muted mt-4 max-w-sm">
              Tell us about your project. We'll figure it out together.
            </p>
          </div>
          <Link to="/contact" className="btn-outline shrink-0">
            Talk to us
          </Link>
        </div>
      </section>
    </>
  )
}
