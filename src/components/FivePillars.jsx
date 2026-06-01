import { motion, useReducedMotion } from 'motion/react'

const PILLARS = [
  {
    name: 'Clarity',
    condensed: "No confusion about what you're getting. Ever.",
    expanded: "No confusion about what you're getting. We walk through every step before we shoot.",
  },
  {
    name: 'Craft',
    condensed: 'Every frame is intentional. We edit with purpose.',
    expanded: 'Cinema-grade glass. DaVinci Resolve. Every frame is deliberate.',
  },
  {
    name: 'Care',
    condensed: 'We treat your story like it matters. Because it does.',
    expanded: "We treat your story like it matters. Your project gets our full attention.",
  },
  {
    name: 'Community',
    condensed: 'Rooted in Buffalo. Always.',
    expanded: "We're from Buffalo. We shoot Buffalo. We document the culture of the diaspora and the block.",
  },
  {
    name: 'Continuity',
    condensed: "Delivery isn't the end. We build relationships, not transactions.",
    expanded: "Delivery isn't the end. We build relationships, not transactions.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

// grid — 5-column layout on light bg (Services page)
function GridVariant({ reduced }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      {PILLARS.map(({ name, condensed }, i) => (
        <motion.div
          key={name}
          className="flex flex-col gap-3"
          variants={fadeUp}
          initial={reduced ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3">
            <span className="font-body text-xs text-muted tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-text-dark/20" />
          </div>
          <h3 className="font-display text-3xl uppercase text-text-dark">{name}</h3>
          <p className="font-body text-sm text-muted leading-relaxed">{condensed}</p>
        </motion.div>
      ))}
    </div>
  )
}

// stack — stacked rows on dark bg (About page)
function StackVariant({ reduced }) {
  return (
    <div className="flex flex-col divide-y divide-text-light/10">
      {PILLARS.map(({ name, expanded }, i) => (
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
          <p className="font-body text-muted leading-relaxed max-w-[65ch]">{expanded}</p>
        </motion.div>
      ))}
    </div>
  )
}

// list — names only, on dark bg (Contact page)
function ListVariant() {
  return (
    <div className="flex flex-col gap-4">
      {PILLARS.map(({ name }, i) => (
        <div key={name} className="flex items-center gap-4 py-3 border-b border-text-light/10">
          <span className="font-body text-xs text-muted tabular-nums w-6 shrink-0">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="font-display text-2xl uppercase text-text-light">{name}</span>
          <span className="text-orange ml-auto" aria-hidden="true">·</span>
        </div>
      ))}
    </div>
  )
}

export default function FivePillars({ variant = 'grid' }) {
  const reduced = useReducedMotion()
  if (variant === 'stack') return <StackVariant reduced={reduced} />
  if (variant === 'list')  return <ListVariant />
  return <GridVariant reduced={reduced} />
}
