import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

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
            <span className="font-body text-sm text-orange tabular-nums">
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
          <span className="font-body text-sm text-orange tabular-nums shrink-0 w-8">
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

// list — accordion on dark bg (Contact page)
function ListVariant() {
  const [open, setOpen] = useState(null)

  return (
    <div className="flex flex-col">
      {PILLARS.map(({ name, condensed }, i) => (
        <div key={name} className="border-b border-text-light/10">
          <button
            className="w-full flex items-center gap-4 py-4 text-left group"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-body text-sm text-orange tabular-nums w-6 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-2xl uppercase text-text-light group-hover:text-orange transition-colors duration-150 flex-1">
              {name}
            </span>
            <span className="text-orange text-xl leading-none shrink-0 transition-transform duration-200" aria-hidden="true" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
              +
            </span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="font-body text-sm text-muted pb-4 pl-10 leading-relaxed">
                  {condensed}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
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
