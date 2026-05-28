import { Link } from 'react-router-dom'
import logoDark from '../assets/logos/4.svg'

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Link to="/">
              <img src={logoDark} alt="Freshr Studios" className="h-12 w-auto" />
            </Link>
            <p className="font-body text-muted text-sm uppercase tracking-widest">
              Buffalo's Story Studio
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { to: '/archive',  label: 'The Archive' },
                { to: '/services', label: 'Services' },
                { to: '/about',    label: 'About'    },
                { to: '/contact',  label: 'Contact'  },
              ].map(({ to, label }) => (
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
          <div className="flex flex-col gap-3 text-right">
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
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} Freshr Studios.{' '}
            <span className="text-muted/70">A Beam Innovations LLC company.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
