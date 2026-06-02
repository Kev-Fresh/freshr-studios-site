import { useForm, ValidationError } from '@formspree/react'
import { useSearchParams } from 'react-router-dom'

const SERVICES = [
  { value: '',             label: 'Select a service…'              },
  { value: 'first-frame',  label: 'First Frame — Starting at $800' },
  { value: 'the-sit-down', label: 'The Sit Down — Starting at $3,000' },
  { value: 'the-deep-dive',label: 'The Deep Dive — Starting at $5,000' },
  { value: 'in-the-moment',label: 'In The Moment — Starting at $1,200' },
  { value: 'not-sure',     label: "Not sure yet — let's talk"      },
]

const fieldClass = `w-full bg-transparent py-3 font-body text-text-light placeholder:text-muted/60 focus:outline-none`

function FieldWrap({ children }) {
  return (
    <div className="relative group">
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full bg-text-light/30 pointer-events-none" />
      <span className="absolute bottom-0 left-0 h-[1.5px] bg-orange w-0 group-focus-within:w-full transition-[width] duration-300 ease-out pointer-events-none" />
    </div>
  )
}

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xwvzdprg')
  const [searchParams] = useSearchParams()
  const defaultService = searchParams.get('service') || ''

  if (state.succeeded) {
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
        <label htmlFor="name" className="font-body text-xs uppercase tracking-widest text-muted">
          Name <span className="text-orange">*</span>
        </label>
        <FieldWrap>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={fieldClass}
          />
        </FieldWrap>
        <ValidationError field="name" errors={state.errors} className="font-body text-sm text-red-400" />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-body text-xs uppercase tracking-widest text-muted">
          Email <span className="text-orange">*</span>
        </label>
        <FieldWrap>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className={fieldClass}
          />
        </FieldWrap>
        <ValidationError field="email" errors={state.errors} className="font-body text-sm text-red-400" />
      </div>

      {/* Phone (optional) */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-body text-xs uppercase tracking-widest text-muted">
          Phone <span className="text-muted/60">(optional)</span>
        </label>
        <FieldWrap>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(716) 000-0000"
            className={fieldClass}
          />
        </FieldWrap>
      </div>

      {/* Service interest */}
      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="font-body text-xs uppercase tracking-widest text-muted">
          Service <span className="text-orange">*</span>
        </label>
        <FieldWrap>
          <select
            id="service"
            name="service"
            required
            defaultValue={defaultService}
            className={`${fieldClass} appearance-none cursor-pointer`}
          >
            {SERVICES.map(({ value, label }) => (
              <option key={value} value={value} className="bg-dark-bg">
                {label}
              </option>
            ))}
          </select>
        </FieldWrap>
        <ValidationError field="service" errors={state.errors} className="font-body text-sm text-red-400" />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-body text-xs uppercase tracking-widest text-muted">
          Message <span className="text-orange">*</span>
        </label>
        <FieldWrap>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your story…"
            className={`${fieldClass} resize-none`}
          />
        </FieldWrap>
        <ValidationError field="message" errors={state.errors} className="font-body text-sm text-red-400" />
      </div>

      {/* Form-level errors */}
      <ValidationError errors={state.errors} className="font-body text-sm text-red-400" />

      {/* Submit */}
      <button
        type="submit"
        data-cta
        disabled={state.submitting}
        className="self-start mt-2 px-10 py-4 bg-transparent border border-orange text-text-light font-body font-semibold
                   uppercase tracking-widest text-sm rounded-sm transition-all duration-200
                   hover:bg-orange hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
