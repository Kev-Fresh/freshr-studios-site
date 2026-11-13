import { useState } from 'react'

export default function KevSignature() {
  const [imgState, setImgState] = useState('loading')

  return (
    <>
      <img
        src="/media/kev-signature.png"
        alt="Kevin Cole Jr."
        onLoad={() => setImgState('loaded')}
        onError={() => setImgState('failed')}
        className="sig-img w-[140px] md:w-[180px]"
        style={{ display: imgState === 'loaded' ? 'block' : 'none' }}
      />
      {imgState !== 'loaded' && (
        <span
          style={{
            fontFamily: "'Mrs Saint Delafield', 'Homemade Apple', cursive",
            fontSize: 'clamp(2.75rem, 4vw, 3.25rem)',
            display: 'inline-block',
            transform: 'rotate(-3deg)',
            color: 'rgb(var(--rgb-text-light))',
            lineHeight: 1.2,
          }}
        >
          Kevin Cole Jr.
        </span>
      )}
    </>
  )
}
