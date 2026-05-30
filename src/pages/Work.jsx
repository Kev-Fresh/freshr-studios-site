import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import WorkItem from '../components/WorkItem'

const WORK_ITEMS = [
  { title: 'Skate Park Sessions',      category: 'Video' },
  { title: 'East Side Portraits',      category: 'Photo' },
  { title: 'Juneteenth Block Party',   category: 'Event' },
  { title: 'The Conversation',         category: 'Video' },
  { title: 'Allentown Arts Fest',      category: 'Event' },
  { title: 'Corner Store Chronicles',  category: 'Video' },
  { title: 'Studio Portraits: Vol. 1', category: 'Photo' },
  { title: 'The Cookout',              category: 'Event' },
  { title: 'Elmwood Ave Walk',         category: 'Photo' },
  { title: 'Sunday Service',           category: 'Video' },
]

const CATEGORIES = ['All', 'Video', 'Photo', 'Event']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
}

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')
  const reduced = useReducedMotion()

  const filtered =
    activeFilter === 'All'
      ? WORK_ITEMS
      : WORK_ITEMS.filter((w) => w.category === activeFilter)

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="section-dark pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <motion.h1
            className="section-title text-text-light"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            The <span className="whitespace-nowrap">Archive<span className="period-orange" aria-hidden="true" /></span>
          </motion.h1>
          <motion.p
            className="font-body text-lg text-muted mt-4"
            variants={fadeUp}
            initial={reduced ? false : 'hidden'}
            animate="show"
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Video. Photo. Events. Buffalo.
          </motion.p>
        </div>
      </section>

      {/* ── Filter tabs ──────────────────────────────────────── */}
      <section className="section-dark pb-8 border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex gap-6 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-body text-xs uppercase tracking-widest pb-2 border-b-2 transition-all duration-150 ${
                  activeFilter === cat
                    ? 'border-orange text-orange'
                    : 'border-transparent text-muted hover:text-text-light'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid — desktop filmstrip, mobile 2-col ───────────── */}
      <section className="section-dark py-16 md:py-20">
        {/* Mobile: 2-col grid */}
        <div className="md:hidden max-w-screen-xl mx-auto px-6 grid grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial={reduced ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <WorkItem title={item.title} category={item.category} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: horizontal filmstrip */}
        <div className="filmstrip-container hidden md:block pl-10">
          <div className="filmstrip pr-10">
            {filtered.map((item) => (
              <WorkItem
                key={item.title}
                title={item.title}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming soon note ─────────────────────────────────── */}
      <section className="section-dark pb-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <p className="font-body text-xs text-muted uppercase tracking-widest">
            Portfolio expanding. Check back soon.
          </p>
        </div>
      </section>
    </>
  )
}
