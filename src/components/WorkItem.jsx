/**
 * WorkItem — filmstrip thumbnail card.
 * Hover: slight scale + orange border accent.
 */
export default function WorkItem({ title, category, thumbnail, href = '#' }) {
  const CATEGORY_COLORS = {
    Video: 'text-orange',
    Photo: 'text-white',
    Event: 'text-muted',
  }

  return (
    <a
      href={href}
      className="group relative flex-shrink-0 w-72 md:w-80 overflow-hidden cursor-pointer"
      aria-label={`${title} — ${category}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/5] bg-dark-bg/60 overflow-hidden border border-white/10 group-hover:border-orange transition-colors duration-300">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder when no image yet */
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-7xl text-white/10 select-none">F</span>
          </div>
        )}

        {/* Category tag — bottom-left overlay */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`font-body text-xs uppercase tracking-widest px-2 py-1 bg-dark-bg/80 backdrop-blur-sm ${
              CATEGORY_COLORS[category] ?? 'text-text-light'
            }`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mt-3">
        <p className="font-body font-medium text-text-light group-hover:text-orange transition-colors duration-200 truncate">
          {title}
        </p>
      </div>
    </a>
  )
}
