import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoWhite       from '../assets/logos/logo-white.svg'
import logoBlack       from '../assets/logos/logo-black.svg'
import logoWhiteOrange from '../assets/logos/logo-white-orange.svg'
import logoWhiteGreen  from '../assets/logos/logo-white-green.svg'
import logoWhiteRed    from '../assets/logos/logo-white-red.svg'
import logoWhiteBlue   from '../assets/logos/logo-white-blue.svg'
import logoWhiteViolet from '../assets/logos/logo-white-violet.svg'
import logoWhiteYellow from '../assets/logos/logo-white-yellow.svg'
import logoBlackOrange from '../assets/logos/logo-black-orange.svg'
import logoBlackGreen  from '../assets/logos/logo-black-green.svg'
import logoBlackRed    from '../assets/logos/logo-black-red.svg'
import logoBlackBlue   from '../assets/logos/logo-black-blue.svg'
import logoBlackYellow from '../assets/logos/logo-black-yellow.svg'
import logoBlackViolet from '../assets/logos/logo-black-violet.svg'
import bisonSvg        from '../assets/images/Buffalo-Silhouette.svg'

const LOGO_MAP = {
  orange: [logoWhiteOrange, logoBlackOrange],
  green:  [logoWhiteGreen,  logoBlackGreen ],
  red:    [logoWhiteRed,    logoBlackRed   ],
  cobalt: [logoWhiteBlue,   logoBlackBlue  ],
  violet: [logoWhiteViolet, logoBlackViolet],
  yellow: [logoWhiteYellow, logoBlackYellow],
}

const NAV_LINKS = [
  { to: '/archive',  label: 'The Archive' },
  { to: '/services', label: 'Services'    },
  { to: '/about',    label: 'About'       },
  { to: '/contact',  label: 'Contact'     },
]

export default function Footer() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const accentKey = document.documentElement.getAttribute('data-accent') || 'orange'
  const [logoDarkVariant, logoLightVariant] = LOGO_MAP[accentKey] ?? [logoWhite, logoBlack]
  const logo = isDark ? logoDarkVariant : logoLightVariant

  return (
    <footer className="section-dark border-t border-text-light/10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14 md:py-16">

        {/* Mobile: stacked center — Desktop: three-column row */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link to="/">
              <img src={logo} alt="Freshr Studios" className="h-[65px] md:h-[100px] w-auto" />
            </Link>
            <p className="font-body text-muted text-xs uppercase tracking-widest">
              Buffalo's Story Studio
            </p>
          </div>

          {/* Nav links — vertical stack on mobile, horizontal on desktop */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + contact */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href="https://instagram.com/freshrstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
              aria-label="Freshr Studios on Instagram"
            >
              Instagram
            </a>
            <a
              href="mailto:hello@freshrstudios.com"
              className="font-body text-sm text-muted hover:text-orange transition-colors duration-150"
            >
              hello@freshrstudios.com
            </a>
          </div>

        </div>

        {/* Legal */}
        <div className="mt-12 pt-6 border-t border-text-light/10 flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <p className="font-body text-xs text-muted text-center md:text-left">
            © {new Date().getFullYear()} Freshr Studios.{' '}
            <span className="text-muted/70">A Beam Innovations LLC company.</span>
          </p>
          <p className="font-body text-xs text-muted uppercase tracking-widest text-center md:text-right flex items-center justify-center md:justify-end gap-2">
            <img
              src={bisonSvg}
              alt=""
              aria-hidden="true"
              className="h-5 w-auto"
              style={{ filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)' }}
            />
            Born in Buffalo
          </p>
        </div>

      </div>
    </footer>
  )
}
