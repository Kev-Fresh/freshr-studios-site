import { useForm, ValidationError } from '@formspree/react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

const SERVICES = [
  { value: '',            label: 'Select a service…'         },
  { value: 'first-frame', label: 'First Frame'               },
  { value: 'the-sit-down',label: 'Sit Down'                  },
  { value: 'the-reel',    label: 'Reel'                      },
  { value: 'custom',      label: 'Something custom'          },
  { value: 'not-sure',    label: "Not sure yet — let's talk" },
]

const SERVICE_REDIRECTS = {
  'the-deep-dive': { service: 'custom' },
  'in-the-moment': { service: 'the-reel', message: 'Interested in the full-day upgrade.' },
}

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

function SuccessState() {
  return (
    <motion.div
      key="success"
      className="flex flex-col gap-6 py-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        className="inline-block w-3 h-3 rounded-full"
        style={{ background: 'rgb(var(--rgb-accent))' }}
        aria-hidden="true"
      />
      <p className="font-display text-4xl uppercase text-text-light leading-tight">
        Got it<span className="period-orange" aria-hidden="true" />
      </p>
      <p className="font-body text-muted leading-relaxed">
        I'll contact you within 24 hours.
      </p>
      <div>
        <p className="font-body text-text-light">Kevin Cole Jr.</p>
        <p className="font-body text-xs text-muted mt-1">Founder, Freshr Studios</p>
      </div>
    </motion.div>
  )
}

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xwvzdprg')
  const [searchParams] = useSearchParams()
  const rawService = searchParams.get('service') || ''
  const redirect = SERVICE_REDIRECTS[rawService]
  const defaultService = redirect ? redirect.service : rawService
  const defaultMessage = redirect?.message ?? ''

  return (
    <AnimatePresence mode="wait">
      {state.succeeded ? (
        <SuccessState />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-xl"
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
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

          {/* Service interest */}
          <div className="flex flex-col gap-2">
            <label htmlFor="service" className="font-body text-xs uppercase tracking-widest text-muted">
              What are you looking for? <span className="text-orange">*</span>
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
                defaultValue={defaultMessage}
                placeholder="What's the story you want told?"
                className={`${fieldClass} resize-none`}
              />
            </FieldWrap>
            <ValidationError field="message" errors={state.errors} className="font-body text-sm text-red-400" />
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

          {/* Form-level errors */}
          <ValidationError errors={state.errors} className="font-body text-sm text-red-400" />

          {/* Submit */}
          <button
            type="submit"
            data-cta
            disabled={state.submitting}
            className="w-full md:w-auto mt-2 px-10 py-4 bg-text-light text-dark-bg font-body font-semibold
                       uppercase tracking-widest text-sm transition-all duration-200
                       hover:bg-orange hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.submitting ? 'Sending…' : 'Start the Conversation'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
