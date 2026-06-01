import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'motion/react'

export default function CursorDot() {
  const dotRef    = useRef(null)
  const rippleRef = useRef(null)
  const overLink  = useRef(false)
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const x = useSpring(rawX, { stiffness: 600, damping: 35, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 600, damping: 35, mass: 0.5 })

  const rippleOpacity = useMotionValue(0)
  const rippleScale   = useMotionValue(0.5)

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return
    const el = dotRef.current
    if (!el) return

    const onMove  = (e) => { rawX.set(e.clientX); rawY.set(e.clientY) }
    const onLeave = () => { rawX.set(-200); rawY.set(-200) }

    const onOver = (e) => {
      if (!e.target.closest('a, button')) return
      overLink.current = true
      animate(el, { width: 40, height: 40 }, { duration: 0.2, ease: 'easeOut' })
      el.style.background  = 'transparent'
      el.style.borderColor = '#ffffff'
    }
    const onOut = (e) => {
      if (!e.target.closest('a, button')) return
      overLink.current = false
      animate(el, { width: 10, height: 10 }, { duration: 0.2, ease: 'easeOut' })
      el.style.background  = 'rgb(var(--rgb-accent))'
      el.style.borderColor = 'transparent'
    }

    const onClick = () => {
      // Update ripple color before animating
      if (rippleRef.current) {
        rippleRef.current.style.borderColor = overLink.current
          ? '#ffffff'
          : 'rgb(var(--rgb-accent))'
      }
      rippleScale.set(0.5)
      rippleOpacity.set(0.7)
      animate(rippleScale,   5, { duration: 0.55, ease: [0.16, 1, 0.3, 1] })
      animate(rippleOpacity, 0, { duration: 0.55, ease: [0.16, 1, 0.3, 1] })
    }

    window.addEventListener('mousemove', onMove,   { passive: true })
    window.addEventListener('mousedown', onClick)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onClick)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [rawX, rawY, rippleOpacity, rippleScale])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[200]"
      style={{ x, y }}
    >
      {/* Ripple — motion values drive opacity/scale; ref lets us swap border color on click */}
      <motion.div
        ref={rippleRef}
        style={{
          position:     'absolute',
          top:          0,
          left:         0,
          width:        10,
          height:       10,
          borderRadius: '50%',
          border:       '1.5px solid rgb(var(--rgb-accent))',
          x:            '-50%',
          y:            '-50%',
          opacity:      rippleOpacity,
          scale:        rippleScale,
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          width:        10,
          height:       10,
          borderRadius: '50%',
          transform:    'translate(-50%, -50%)',
          background:   'rgb(var(--rgb-accent))',
          border:       '1.5px solid transparent',
          boxShadow:    '0 0 0 1.5px rgba(0,0,0,0.25)',
          transition:   'background 0.15s ease, border-color 0.15s ease',
        }}
      />
    </motion.div>
  )
}
