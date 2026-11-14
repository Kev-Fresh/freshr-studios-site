import { useState } from 'react'

export default function PageHero({ src, className = '', children }) {
  const [heroState, setHeroState] = useState('pending')
  const hasHero = heroState === 'loaded'

  return (
    <section
      data-nav-theme="dark"
      className={`relative overflow-hidden section-dark ${className}`}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        onLoad={() => setHeroState('loaded')}
        onError={() => setHeroState('failed')}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: hasHero ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.65) 0%,
            rgba(0,0,0,0.55) 35%,
            rgba(0,0,0,0.28) 58%,
            rgb(var(--rgb-dark-bg)) 84%
          )`,
          opacity: hasHero ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
      <div className="relative z-[2] max-w-screen-xl mx-auto px-6 md:px-10">
        {typeof children === 'function' ? children({ hasHero }) : children}
      </div>
    </section>
  )
}
