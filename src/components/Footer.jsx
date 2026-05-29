import { Link } from 'react-router-dom'
import logoDark from '../assets/logos/4.svg'

const NAV_LINKS = [
  { to: '/archive',  label: 'The Archive' },
  { to: '/services', label: 'Services'    },
  { to: '/about',    label: 'About'       },
  { to: '/contact',  label: 'Contact'     },
]

export default function Footer() {
  return (
    <footer className="section-dark border-t border-text-light/10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14 md:py-16">

        {/* Mobile: stacked center — Desktop: three-column row */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Link to="/">
              <img src={logoDark} alt="Freshr Studios" className="h-10 w-auto" />
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
        <div className="mt-12 pt-6 border-t border-text-light/10 text-center md:text-left">
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} Freshr Studios.{' '}
            <span className="text-muted/70">A Beam Innovations LLC company.</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
