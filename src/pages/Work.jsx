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

import { useState } from 'react'

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All'
      ? WORK_ITEMS
      : WORK_ITEMS.filter((w) => w.category === activeFilter)

  return (
    <>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="section-dark pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <h1 className="section-title text-text-light">
            The Archive<span className="period-orange" aria-hidden="true" />
          </h1>
          <p className="font-body text-lg text-muted mt-4">
            Video. Photo. Events. Buffalo.
          </p>
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
          {filtered.map((item) => (
            <WorkItem
              key={item.title}
              title={item.title}
              category={item.category}
            />
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
            Portfolio expanding — check back soon.
          </p>
        </div>
      </section>
    </>
  )
}
