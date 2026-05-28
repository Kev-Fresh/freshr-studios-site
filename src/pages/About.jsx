import { Link } from 'react-router-dom'

const PILLARS = [
  {
    name: 'Clarity',
    desc: "No confusion about what you're getting. We walk through every step before we shoot.",
  },
  {
    name: 'Craft',
    desc: 'Sony FX30. Sigma 18-50. DaVinci Resolve. Every frame is deliberate.',
  },
  {
    name: 'Care',
    desc: "We treat your story like it matters — because it does. Your project gets our full attention.",
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

export default function About() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <h1 className="section-title text-text-light">
            The Studio<span className="period-orange" aria-hidden="true" />
          </h1>
        </div>
      </section>

      {/* ── Studio story ─────────────────────────────────────── */}
      <section className="section-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Text */}
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-5xl md:text-6xl uppercase text-text-dark leading-none">
                Buffalo<span className="period-orange" aria-hidden="true" /><br />
                Rooted<span className="period-orange" aria-hidden="true" /><br />
                Real<span className="period-orange" aria-hidden="true" />
              </h2>
              <p className="font-body text-lg text-text-dark/80 leading-relaxed">
                Freshr Studios was built to document Buffalo — its culture, its
                people, and the diaspora that carries this city with them wherever
                they go.
              </p>
              <p className="font-body text-text-dark/70 leading-relaxed">
                We're not a one-size-fits-all content shop. We're a boutique
                operation. The Sony FX30 and Sigma 18-50mm go everywhere. DaVinci
                Resolve is where the story gets finished. Boom or hot-shoe mount
                only — we want the sound of the room, not a clip mic cutting out.
              </p>
              <p className="font-body text-text-dark/70 leading-relaxed">
                Photography &gt; illustration. Authenticity &gt; aesthetic.
                Story &gt; product.
              </p>
            </div>

            {/* Placeholder image block */}
            <div className="aspect-[4/5] bg-dark-bg flex items-center justify-center">
              <span className="font-display text-9xl text-white/10 select-none">F</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Five Pillars ─────────────────────────────────────── */}
      <section className="section-dark py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <h2 className="section-title text-text-light mb-14">
            The Five Pillars<span className="period-orange" aria-hidden="true" />
          </h2>
          <div className="flex flex-col divide-y divide-white/10">
            {PILLARS.map(({ name, desc }, i) => (
              <div key={name} className="py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                <span className="font-ui text-xs text-muted tabular-nums shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-4xl md:text-5xl uppercase text-text-light leading-none w-56 shrink-0">
                  {name}
                </h3>
                <p className="font-body text-muted leading-relaxed max-w-lg">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipment note ───────────────────────────────────── */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <h2 className="font-display text-4xl md:text-5xl uppercase text-text-dark mb-8">
            The Kit<span className="period-orange" aria-hidden="true" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Camera',        value: 'Sony FX30' },
              { label: 'Glass',         value: 'Sigma 18-50mm f/2.8' },
              { label: 'Post',          value: 'DaVinci Resolve' },
              { label: 'Audio',         value: 'Boom / hot-shoe mount — no clip mics' },
              { label: 'Based in',      value: 'Buffalo, NY' },
              { label: 'Operating as',  value: 'Beam Innovations LLC DBA' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="font-ui text-xs uppercase tracking-widest text-muted">
                  {label}
                </p>
                <p className="font-ui font-medium text-text-dark">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-dark py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <p className="font-display text-4xl md:text-5xl uppercase text-text-light leading-tight">
            Ready to work<span className="text-orange">?</span>
          </p>
          <Link to="/contact" className="btn-outline shrink-0">
            Start the Conversation
          </Link>
        </div>
      </section>
    </>
  )
}
