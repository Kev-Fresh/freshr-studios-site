import { motion, useReducedMotion } from 'motion/react'

export default function UnderlineBar({ className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      className={`h-[5px] bg-orange mt-1 ml-[18px] ${className}`}
      style={{ width: '3.5rem', transformOrigin: 'left' }}
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
    />
  )
}
