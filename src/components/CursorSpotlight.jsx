import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

export default function CursorSpotlight() {
  const ref     = useRef(null)
  const reduced = useReducedMotion()
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      reduced ||
      !isDark ||
      window.matchMedia('(hover: none) and (pointer: coarse)').matches
    ) {
      el.style.opacity = '0'
      return
    }

    const onMove = ({ clientX: x, clientY: y }) => {
      // pointer-events:none means elementFromPoint sees through the overlay
      const under = document.elementFromPoint(x, y)
      const inLightSection = under?.closest('.section-light')

      if (inLightSection) {
        el.style.opacity = '0'
        return
      }

      el.style.opacity = '1'
      el.style.background = `radial-gradient(
        circle 500px at ${x}px ${y}px,
        transparent 0%,
        rgba(0,0,0,0.06) 40%,
        rgba(0,0,0,0.22) 75%,
        rgba(0,0,0,0.28) 100%
      )`
    }

    const onLeave = () => { el.style.opacity = '0' }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      el.style.opacity = '0'
    }
  }, [reduced, isDark])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[45]"
      style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
      aria-hidden="true"
    />
  )
}
