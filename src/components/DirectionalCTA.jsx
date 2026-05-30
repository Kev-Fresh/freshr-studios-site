import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, useReducedMotion } from 'motion/react'

function getSide(e, el) {
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left - r.width  / 2
  const y = e.clientY - r.top  - r.height / 2
  const deg = (Math.atan2(-y, x) * 180 / Math.PI + 360) % 360
  if (deg >= 315 || deg < 45)  return [  '101%', '0%'    ] // right
  if (deg >= 45  && deg < 135) return [  '0%',   '-101%' ] // top
  if (deg >= 135 && deg < 225) return [ '-101%', '0%'    ] // left
  return                              [  '0%',   '101%'  ] // bottom
}

export default function DirectionalCTA({ to, children, className = '', variant = 'outline' }) {
  const wrapRef = useRef(null)
  const fillRef = useRef(null)
  const reduced = useReducedMotion()

  const run = (e, entering) => {
    if (reduced || !fillRef.current || !wrapRef.current) return
    const [sx, sy] = getSide(e, wrapRef.current)
    if (entering) {
      animate(fillRef.current, { x: [sx, '0%'], y: [sy, '0%'] }, { duration: 0.4, ease: [0.16, 1, 0.3, 1] })
    } else {
      animate(fillRef.current, { x: sx, y: sy }, { duration: 0.3, ease: [0.4, 0, 1, 1] })
    }
  }

  const baseClass = variant === 'outline'
    ? 'border border-orange text-orange'
    : 'border-2 border-white bg-dark-bg text-text-light group-hover:border-orange transition-colors duration-300'

  return (
    <Link
      ref={wrapRef}
      to={to}
      className={`group relative overflow-hidden inline-block px-8 py-3 font-body font-semibold uppercase tracking-widest text-sm ${baseClass} ${className}`}
      onMouseEnter={(e) => run(e, true)}
      onMouseLeave={(e) => run(e, false)}
    >
      <span
        ref={fillRef}
        className="absolute inset-0 bg-orange"
        style={{ transform: 'translateX(-101%)' }}
        aria-hidden="true"
      />
      <span className="relative z-10 transition-colors duration-200 group-hover:text-dark-bg">
        {children}
      </span>
    </Link>
  )
}
