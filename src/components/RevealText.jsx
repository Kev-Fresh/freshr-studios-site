import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

export default function RevealText({ children, delay = 0, className = '' }) {
  const reduced = useReducedMotion()
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} style={{ overflow: 'hidden' }} className={className}>
      <motion.div
        initial={{ y: reduced ? '0%' : '110%' }}
        animate={{ y: inView ? '0%' : (reduced ? '0%' : '110%') }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
