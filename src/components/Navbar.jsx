import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import logoLight from '../assets/logos/logo-nav-dark.svg'  // white wordmark — dark bg
import logoDark  from '../assets/logos/2.svg'              // navy wordmark  — light bg

const NAV_LINKS = [
  { to: '/archive',  label: 'The Archive' },
  { to: '/services', label: 'Services'    },
  { to: '/about',    label: 'About'       },
  { to: '/contact',  label: 'Contact'     },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isDark,    setIsDark]    = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const solidBg   = isDark ? 'bg-dark-bg/95'  : 'bg-white/95'
  const textColor = isDark ? 'text-text-light' : 'text-text-dark'
  const barColor  = isDark ? 'bg-text-light'   : 'bg-text-dark'
  const logo      = isDark ? logoLight         : logoDark

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? `${solidBg} backdrop-blur-sm` : 'bg-transparent'
        }`}
      >
        <nav className="max-w-screen-xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <NavLink to="/" onClick={closeMenu} className="flex-shrink-0">
            <img
              src={logo}
              alt="Freshr Studios"
              width="120"
              height="62"
              className="w-[120px] h-auto"
            />
          </NavLink>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `font-ui text-sm uppercase tracking-widest transition-colors duration-150 ${
                      isActive ? 'text-orange' : `${textColor} hover:text-orange`
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 ${barColor} transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2'  : ''}`} />
            <span className={`block w-6 h-0.5 ${barColor} transition-opacity duration-300 ${menuOpen ? 'opacity-0'                   : ''}`} />
            <span className={`block w-6 h-0.5 ${barColor} transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay — always dark for drama */}
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
