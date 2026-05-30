import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logoLight from '../assets/logos/logo-nav-dark.svg'
import logoDark  from '../assets/logos/2.svg'

const NAV_LINKS = [
  { to: '/archive',  label: 'The Archive' },
  { to: '/services', label: 'Services'    },
  { to: '/about',    label: 'About'       },
  { to: '/contact',  label: 'Contact'     },
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
  const sentinelRef = useRef(null)

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

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.classList.add('theme-transitioning')
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('freshr-theme', next)
    setIsDark(!isDark)
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 500)
  }

  const closeMenu = () => setMenuOpen(false)

  const textColor = isDark ? 'text-white' : 'text-black'
  const barColor  = isDark ? 'bg-white'   : 'bg-black'
  const logo      = isDark ? logoLight    : logoDark

  // Links + toggle fade out on scroll, fade back in at top
  const linksVisible = !scrolled || menuOpen

  return (
    <>
      <div ref={sentinelRef} className="absolute top-20 left-0 h-px w-full pointer-events-none" aria-hidden="true" />

      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo — always visible */}
          <NavLink to="/" onClick={closeMenu} className="flex-shrink-0 relative z-10">
            <img src={logo} alt="Freshr Studios" width="160" height="83" className="w-[10rem] h-auto" />
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
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
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
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
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
