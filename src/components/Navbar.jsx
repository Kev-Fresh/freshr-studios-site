import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark,   setIsDark]   = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )
  const [navBg,       setNavBg]       = useState('dark')
  const [footerVisible, setFooterVisible] = useState(false)
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
      if (rafId) return
      rafId = requestAnimationFrame(() => { rafId = null; update() })
    }
    const timer = setTimeout(update, 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
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

  // Menu open → contrast against solid menu bg (isDark)
  // At top (not scrolled) → contrast against semi-transparent nav bg (isDark)
  // Scrolled (transparent nav) → contrast against section behind nav (navBg)
  const onDark    = menuOpen ? isDark : (scrolled ? navBg === 'dark' : true)
  const textColor = onDark ? 'text-white' : 'text-black'
  const barColor  = onDark ? 'bg-white'   : 'bg-black'
  const [logoDarkVariant, logoLightVariant] = LOGO_MAP[accentKey] ?? [logoWhite, logoBlack]
  const logo = onDark ? logoDarkVariant : logoLightVariant

  // Links + toggle fade out on scroll, fade back in at top
  const linksVisible = !scrolled || menuOpen

  return (
    <>
      <div ref={sentinelRef} className="absolute top-20 left-0 h-px w-full pointer-events-none" aria-hidden="true" />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        footerVisible && !menuOpen ? 'md:translate-y-0 -translate-y-full' : 'translate-y-0'
      } ${
        menuOpen
          ? `${isDark ? 'bg-dark-bg/95' : 'bg-white/95'} backdrop-blur-sm`
          : 'bg-transparent'
      }`}>
        <nav className={`w-full pl-10 pr-8 md:pl-16 md:pr-12 flex items-center justify-between transition-all duration-700 ${scrolled ? 'h-16' : 'h-24'}`}>

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
              className={`${textColor} hover:text-orange transition-colors duration-150 p-1`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger — always visible */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`${textColor} hover:text-orange transition-colors duration-150 p-1`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
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
