import { Link } from 'react-router-dom'

// ← Change this number as spots are claimed (0–5)
export const FOUNDING_SPOTS_CLAIMED = 0

const TOTAL = 5

export const FIRST_FRAME_BADGE =
  FOUNDING_SPOTS_CLAIMED < TOTAL ? 'START HERE · FOUNDING RATE' : 'START HERE'

export default function FoundingFive() {
  const open = TOTAL - FOUNDING_SPOTS_CLAIMED
  const full = open === 0

  return (
    <div className="w-full bg-[#0E0E0E] text-white px-5 py-4">
      {full ? (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="font-body text-sm">
            Founding Five is full. Thank you, Buffalo.
          </p>
          <Link
            to="/contact"
            className="font-body text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-150 shrink-0"
          >
            Get in touch →
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div className="flex flex-col gap-2">
            <span className="font-body text-xs uppercase tracking-widest text-white/40">
              Founding Five — Booking Through March 2027
            </span>
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="inline-block w-3.5 h-3.5 rounded-full shrink-0"
                  style={
                    i < FOUNDING_SPOTS_CLAIMED
                      ? { border: '1.5px solid rgb(var(--rgb-accent))', background: 'transparent' }
                      : { background: 'rgb(var(--rgb-accent))' }
                  }
                />
              ))}
              <span className="font-body text-sm text-white/50 ml-1">
                {open} of {TOTAL} spots open
              </span>
            </div>
            <p className="font-body text-sm text-white/80">
              Five Buffalo stories. Founding rate.
            </p>
          </div>
          <Link
            to="/founding"
            className="font-body text-xs uppercase tracking-widest border border-white/30 hover:border-white/70 text-white px-4 py-2 transition-colors duration-150 shrink-0"
          >
            Claim a spot →
          </Link>
        </div>
      )}
    </div>
  )
}
