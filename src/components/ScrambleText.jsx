import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]

const scramble = (text) =>
  text.split('').map((c) => (c === ' ' ? ' ' : randomChar())).join('')

export default function ScrambleText({ text, started, delay = 0, duration = 1100 }) {
  const reduced  = useReducedMotion()
  const [display, setDisplay] = useState(() => reduced ? text : scramble(text))

  useEffect(() => {
    if (!started || reduced) {
      setDisplay(text)
      return
    }

    let raf
    const timeout = setTimeout(() => {
      const start = Date.now()
      const tick = () => {
        const progress = Math.min((Date.now() - start) / duration, 1)
        const resolved  = Math.floor(progress * text.replace(/ /g, '').length)
        let count = 0
        const result = text.split('').map((char) => {
          if (char === ' ') return ' '
          return count++ < resolved ? char : randomChar()
        }).join('')
        setDisplay(result)
        if (progress < 1) raf = requestAnimationFrame(tick)
        else setDisplay(text)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [started, reduced, text, duration, delay])

  return (
    <span aria-label={text} aria-live="off">
      {display}
    </span>
  )
}
