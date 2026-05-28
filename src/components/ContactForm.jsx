import { useState } from 'react'

const SERVICES = [
  { value: '', label: 'Select a service…' },
  { value: 'first-frame',  label: 'First Frame'   },
  { value: 'the-sit-down', label: 'The Sit Down'  },
  { value: 'the-deep-dive',label: 'The Deep Dive' },
  { value: 'in-the-moment',label: 'In The Moment' },
]

/**
 * ContactForm — wired to Formspree.
 * Replace YOUR_FORM_ID with your actual Formspree endpoint ID.
 */
export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="font-display text-6xl text-orange">✓</span>
        <h3 className="font-display text-4xl uppercase">Message received.</h3>
        <p className="font-body text-muted max-w-sm">
          We'll be in touch soon. The conversation has started.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-ui text-xs uppercase tracking-widest text-muted">
          Name <span className="text-orange">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="bg-transparent border-b border-white/20 py-3 font-body text-text-light placeholder:text-muted/60
                     focus:outline-none focus:border-orange transition-colors duration-200"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-ui text-xs uppercase tracking-widest text-muted">
          Email <span className="text-orange">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="bg-transparent border-b border-white/20 py-3 font-body text-text-light placeholder:text-muted/60
                     focus:outline-none focus:border-orange transition-colors duration-200"
        />
      </div>

      {/* Phone (optional) */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-ui text-xs uppercase tracking-widest text-muted">
          Phone <span className="text-muted/60">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(716) 000-0000"
          className="bg-transparent border-b border-white/20 py-3 font-body text-text-light placeholder:text-muted/60
                     focus:outline-none focus:border-orange transition-colors duration-200"
        />
      </div>

      {/* Service interest */}
      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="font-ui text-xs uppercase tracking-widest text-muted">
          Service <span className="text-orange">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="bg-transparent border-b border-white/20 py-3 font-body text-text-light
                     focus:outline-none focus:border-orange transition-colors duration-200
                     appearance-none cursor-pointer"
        >
          {SERVICES.map(({ value, label }) => (
            <option key={value} value={value} className="bg-dark-bg">
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-ui text-xs uppercase tracking-widest text-muted">
          Message <span className="text-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your story…"
          className="bg-transparent border-b border-white/20 py-3 font-body text-text-light placeholder:text-muted/60
                     focus:outline-none focus:border-orange transition-colors duration-200 resize-none"
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p className="font-body text-sm text-red-400">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start mt-2 px-10 py-4 bg-dark-bg border border-orange text-text-light font-ui font-semibold
                   uppercase tracking-widest text-sm transition-all duration-200
                   hover:bg-orange hover:text-dark-bg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Start the Conversation'}
      </button>
    </form>
  )
}
