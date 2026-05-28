import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * ServiceCard — Vol. One Studios–style accordion.
 * Service name large on left, expand (+) on click.
 */
export default function ServiceCard({ title, tagline, description, cta = 'Book this', ctaHref = '/contact', index, onDark = true }) {
  const [open, setOpen] = useState(false)

  const borderColor = onDark ? 'border-white/10' : 'border-black/10'
  const descColor   = onDark ? 'text-text-light/80' : 'text-text-dark/70'

  return (
    <div className={`border-b last:border-b-0 ${borderColor}`}>
      <button
        className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-6">
          {/* Index number */}
          <span className="font-ui text-xs text-muted tabular-nums w-6 shrink-0">
            {String(index).padStart(2, '0')}
          </span>
          {/* Service title */}
          <span className="font-display text-4xl md:text-5xl uppercase leading-none group-hover:text-orange transition-colors duration-200">
            {title}
          </span>
        </div>

        {/* Expand / collapse indicator */}
        <span
          className={`font-ui text-2xl text-orange transition-transform duration-300 ml-4 shrink-0 ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-400 ${
          open ? 'max-h-96 pb-8' : 'max-h-0'
        }`}
      >
        <div className="pl-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="font-ui font-semibold text-orange text-sm uppercase tracking-widest">
              {tagline}
            </p>
            <p className={`font-body leading-relaxed ${descColor}`}>
              {description}
            </p>
          </div>
          <Link
            to={ctaHref}
            className="btn-outline shrink-0 self-start md:self-auto"
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
