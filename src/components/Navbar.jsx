import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import logoWhite       from '../assets/logos/logo-white.svg'
import logoBlack       from '../assets/logos/logo-black.svg'
import logoWhiteOrange from '../assets/logos/logo-white-orange.svg'
import logoWhiteGreen  from '../assets/logos/logo-white-green.svg'
import logoWhiteRed    from '../assets/logos/logo-white-red.svg'
import logoWhiteBlue   from '../assets/logos/logo-white-blue.svg'
import logoWhiteViolet from '../assets/logos/logo-white-violet.svg'
import logoBlackViolet from '../assets/logos/logo-black-violet.svg'
import logoWhiteYellow from '../assets/logos/logo-white-yellow.svg'
import logoBlackOrange from '../assets/logos/logo-black-orange.svg'
import logoBlackGreen  from '../assets/logos/logo-black-green.svg'
import logoBlackRed    from '../assets/logos/logo-black-red.svg'
import logoBlackBlue   from '../assets/logos/logo-black-blue.svg'
import logoBlackYellow from '../assets/logos/logo-black-yellow.svg'

// [white-wordmark (on dark), black-wordmark (on light)]
const LOGO_MAP = {
  orange: [logoWhiteOrange, logoBlackOrange],
  green:  [logoWhiteGreen,  logoBlackGreen ],
  red:    [logoWhiteRed,    logoBlackRed   ],
  cobalt: [logoWhiteBlue,   logoBlackBlue  ],
  violet: [logoWhiteViolet, logoBlackViolet],
  yellow: [logoWhiteYellow, logoBlackYellow],
}

const NAV_LINKS = [
  { to: '/',         label: 'Home',        end: true },
  { to: '/archive',  label: 'The Archive'            },
  { to: '/services', label: 'Services'               },
  { to: '/about',    label: 'About'                  },
  { to: '/contact',  label: 'Contact'                },
]

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <motion.circle cx="12" cy="12" r="5" fill="currentColor"
        initial={{ fillOpacity: 0 }}
        animate={{ fillOpacity: 1 }}
        transition={{ duration: 0.35, delay: 0.15, ease: 'easeIn' }}
      />
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <motion.path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="currentColor"
        initial={{ fillOpacity: 0 }}
        animate={{ fillOpacity: 1 }}
        transition={{ duration: 0.35, delay: 0.15, ease: 'easeIn' }}
      />
    </svg>
  )
}

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
  const accentKey = document.documentElement.getAttribute('data-accent') || 'orange'
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
  const [logoDarkVariant, logoLightVariant] = LOGO_MAP[accentKey] ?? [logoWhite, logoBlack]
  const logo = onDark ? logoDarkVariant : logoLightVariant

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
            <img
              src={logo}
              alt="Freshr Studios"
              width="110"
              height="85"
              className="h-[75px] md:h-[95px] w-auto"
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
                      `font-body text-sm uppercase tracking-widest transition-colors duration-150 ${
                        isActive ? 'text-orange' : `${textColor} hover:text-orange`
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleTheme}
              className={`${textColor} hover:text-orange transition-colors duration-150 p-1 overflow-hidden relative w-[26px] h-[26px]`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{    y: -10, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger — always visible */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`${textColor} hover:text-orange transition-colors duration-150 p-1 overflow-hidden relative w-[26px] h-[26px]`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{    y: -10, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </button>
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
