import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import LogoAnimated from './LogoAnimated'

function PillToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center rounded-full border border-current/30 hover:border-orange/60 transition-colors duration-150 p-[3px] w-[48px] h-[26px] shrink-0"
    >
      <motion.div
        className="absolute w-[20px] h-[20px] rounded-full bg-current opacity-90"
        animate={{ x: isDark ? 22 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
      {/* Sun */}
      <span className={`relative z-10 flex-1 flex justify-center transition-opacity duration-200 ${isDark ? 'opacity-60' : 'opacity-0'}`}>
        <svg width="11" height="11" viewBox="0 0 24 24" stroke="#FBBF24" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" fill="#FBBF24" stroke="none"/>
          <line x1="12" y1="2"  x2="12" y2="5"/>
          <line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="2"  y1="12" x2="5"  y2="12"/>
          <line x1="19" y1="12" x2="22" y2="12"/>
          <line x1="4.93" y1="4.93"   x2="7.05" y2="7.05"/>
          <line x1="16.95" y1="16.95" x2="19.07" y2="19.07"/>
          <line x1="4.93" y1="19.07"  x2="7.05" y2="16.95"/>
          <line x1="16.95" y1="7.05"  x2="19.07" y2="4.93"/>
        </svg>
      </span>
      {/* Moon */}
      <span className={`relative z-10 flex-1 flex justify-center transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-60'}`}>
        <svg width="11" height="11" viewBox="0 0 24 24" stroke="#93C5FD" strokeWidth="2.5" fill="#93C5FD" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
    </button>
  )
}

const NAV_LINKS = [
  { to: '/',         label: 'Home',        end: true },
  { to: '/archive',  label: 'The Archive'            },
  { to: '/services', label: 'Services'               },
  { to: '/about',    label: 'About'                  },
  { to: '/contact',  label: 'Contact'                },
]


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark,   setIsDark]   = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )
  const [navBg,       setNavBg]       = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  )
  const [footerVisible,  setFooterVisible]  = useState(false)
  const [scrollingUp,    setScrollingUp]    = useState(false)
  const lastScrollY = useRef(0)
  const sentinelRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])


  // Update on scroll as sections enter the nav zone
  useEffect(() => {
    let rafId = null
    const update = () => {
      const sections = document.querySelectorAll('[data-nav-theme]')
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect()
        if (top <= 32 && bottom > 32) {
          const bg = getComputedStyle(section).backgroundColor
          const [r, g, b] = (bg.match(/\d+/g) ?? ['0', '0', '0']).map(Number)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          setNavBg(luminance < 0.5 ? 'dark' : 'light')
          break
        }
      }
    }
    const onScroll = () => {
      const y = window.scrollY
      setScrollingUp(y < lastScrollY.current)
      lastScrollY.current = y
      if (rafId) return
      rafId = requestAnimationFrame(() => { rafId = null; update() })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [location.pathname, isDark])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(footer)
    return () => obs.disconnect()
  }, [location.pathname])

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.classList.add('theme-transitioning')
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('freshr-theme', next)
    setIsDark(!isDark)
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 500)
  }

  const closeMenu = () => setMenuOpen(false)

  // At the top: home hero is always dark; all other pages flip with the theme.
  // Once scrolled: use scroll-detected navBg (which tracks section transitions).
  const atTopDark = location.pathname === '/' ? true : isDark
  const onDark    = menuOpen ? isDark : (scrolled ? navBg === 'dark' : atTopDark)
  const textColor = onDark ? 'text-white' : 'text-black'
  const barColor  = onDark ? 'bg-white'   : 'bg-black'
  // Links visible at top, on scroll-up, or when menu is open
  const linksVisible = !scrolled || scrollingUp || menuOpen

  return (
    <>
      <div ref={sentinelRef} className="absolute top-20 left-0 h-px w-full pointer-events-none" aria-hidden="true" />

      <header className={`fixed top-3 left-3 right-3 z-50 rounded-2xl transition-transform duration-300 ${
        footerVisible && !menuOpen ? 'md:translate-y-0 -translate-y-full' : 'translate-y-0'
      } ${
        menuOpen
          ? `${isDark ? 'bg-dark-bg/95' : 'bg-white/95'} backdrop-blur-sm`
          : scrolled
            ? `${isDark ? 'bg-dark-bg/40' : 'bg-white/50'} backdrop-blur-md`
            : `${isDark ? 'bg-black/10' : 'bg-white/10'} backdrop-blur-sm`
      }`}>
        <nav className={`w-full pl-6 pr-5 md:pl-10 md:pr-8 flex items-center justify-between transition-all duration-700 ${scrolled ? 'h-14' : 'h-20'}`}>

          {/* Logo — always visible, shrinks on scroll */}
          <NavLink to="/" onClick={closeMenu} className="flex-shrink-0 relative z-10">
            <LogoAnimated
              onDark={onDark}
              className="h-[52px] md:h-[72px] w-auto"
              style={{
                transform:       scrolled ? 'scale(0.58)' : 'scale(1)',
                transformOrigin: 'left center',
                transition:      'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </NavLink>

          {/* Desktop links + theme toggle — fade out on scroll */}
          <div
            className="hidden md:flex items-center gap-8 transition-all duration-400"
            style={{
              opacity:        linksVisible ? 1 : 0,
              pointerEvents:  linksVisible ? 'auto' : 'none',
              transform:      linksVisible ? 'translateY(0)' : 'translateY(-6px)',
              transition:     'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `font-body text-sm uppercase tracking-widest transition-colors duration-150 relative
                       after:absolute after:bottom-[-3px] after:left-0 after:h-[1.5px] after:bg-orange
                       after:transition-[width] after:duration-300 after:ease-out
                       ${isActive
                         ? 'text-orange after:w-full'
                         : `${textColor} hover:text-orange after:w-0 hover:after:w-full`
                       }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <PillToggle isDark={isDark} onToggle={toggleTheme} />
          </div>

          {/* Mobile: theme toggle + hamburger — always visible */}
          <div className="md:hidden flex items-center gap-3">
            <PillToggle isDark={isDark} onToggle={toggleTheme} />
            <button
              className="flex flex-col gap-1.5 p-2 -mr-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`block w-6 h-0.5 ${barColor} transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2'  : ''}`} />
              <span className={`block w-6 h-0.5 ${barColor} transition-opacity duration-300 ${menuOpen ? 'opacity-0'                   : ''}`} />
              <span className={`block w-6 h-0.5 ${barColor} transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-dark-bg flex flex-col items-center justify-center transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-10">
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `font-display text-6xl uppercase tracking-tight transition-colors duration-150 ${
                    isActive ? 'text-orange' : 'text-text-light hover:text-orange'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
