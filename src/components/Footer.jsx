import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
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
  const reduced = useReducedMotion()
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
    <footer data-nav-theme="dark" className="section-dark border-t border-text-light/10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-12">

        {/* Main grid: tagline left, columns right */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 md:gap-8">

          {/* Left — logo + tagline */}
          <div className="flex flex-col gap-8">
            <Link to="/">
              <img src={logo} alt="Freshr Studios" className="h-[65px] md:h-[100px] w-auto" />
            </Link>
            <h2 className="font-display text-[clamp(1.8rem,3vw,3rem)] uppercase leading-[0.92] text-text-light">
              Every story<br />deserves<br />a frame<span className="period-orange" aria-hidden="true" />
            </h2>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p className="font-body text-xs uppercase tracking-widest text-muted/50 mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
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

          {/* Contact */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted/50 mb-5">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@freshrstudios.com"
                className="font-body text-sm text-orange hover:text-orange/70 transition-colors duration-150"
              >
                hello@freshrstudios.com
              </a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted/50 mb-5">Follow</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/freshr.studios"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
                aria-label="Freshr Studios on Instagram"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@freshr.studios"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
                aria-label="Freshr Studios on TikTok"
              >
                TikTok
              </a>
              <a
                href="https://www.youtube.com/@Freshr.Studios"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm uppercase tracking-widest text-muted hover:text-orange transition-colors duration-150"
                aria-label="Freshr Studios on YouTube"
              >
                YouTube
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-text-light/10 flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <p className="font-body text-xs text-muted text-center md:text-left">
            © {new Date().getFullYear()} Freshr Studios.{' '}
            <span className="text-muted/70">A Beam Innovations LLC company.</span>
          </p>
          <p className="font-body text-xs text-muted uppercase tracking-widest text-center md:text-right flex items-center justify-center md:justify-end gap-2">
            <motion.img
              src={bisonSvg}
              alt=""
              aria-hidden="true"
              className="h-5 w-auto"
              style={{ filter: 'brightness(0) saturate(100%) invert(72%) sepia(60%) saturate(600%) hue-rotate(333deg) brightness(104%)' }}
              initial={reduced ? false : { y: 6, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 14, mass: 0.8, delay: 0.8 }}
            />
            Born in Buffalo
          </p>
        </div>

      </div>
    </footer>
  )
}
