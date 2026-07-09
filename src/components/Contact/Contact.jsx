import { useState } from 'react'
import Reveal from '../Reveal/Reveal'
import styles from './Contact.module.css'

const PHONE = '571-277-3586'
const EMAIL = 'kbjsolutions@kjbsolution.com'

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', contract: false })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 1400)
  }

  const reset = () => { setForm({ name: '', email: '', phone: '', message: '', contract: false }); setStatus('idle') }

  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.layout}>

          {/* Left: info */}
          <Reveal className={styles.infoCol}>
            <div className={styles.rule} aria-hidden="true" />
            <h2 className={`section-heading ${styles.heading}`}>
              Contact KJB Solutions
            </h2>
            <p className={`section-lead ${styles.lead}`}>
              Ready to discuss a federal IT engagement? Reach out directly or
              use the form — we respond within one business day.
            </p>

            <div className={styles.contactItems}>
              <a href={`tel:${PHONE}`} className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.16h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.74a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Phone</span>
                  <span className={styles.contactValue}>{PHONE}</span>
                </div>
              </a>

              <a href={`mailto:${EMAIL}`} className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Email</span>
                  <span className={styles.contactValue}>{EMAIL}</span>
                </div>
              </a>
            </div>

            <div className={styles.socials}>
              <a href="https://www.linkedin.com/company/kjb-solutions" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="KJB on LinkedIn"><LinkedInIcon /></a>
              <a href="https://www.facebook.com/KJB-Solutions-LLC-2245607899045874" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="KJB on Facebook"><FacebookIcon /></a>
              <a href="https://twitter.com/KjbSolutions" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="KJB on Twitter"><TwitterIcon /></a>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={150} className={styles.formCol}>
            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.success}>
                  <div className={styles.successIcon} aria-hidden="true">✓</div>
                  <h3 className={styles.successTitle}>Message Sent</h3>
                  <p className={styles.successText}>
                    Thank you for reaching out. A member of the KJB team will respond within one business day.
                  </p>
                  <button onClick={reset} className="btn btn-navy" style={{ marginTop: '1.5rem' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="cf-name" className={styles.fieldLabel}>Full Name *</label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        className={styles.input}
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="cf-email" className={styles.fieldLabel}>Email Address *</label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className={styles.input}
                        placeholder="jane@agency.gov"
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="cf-phone" className={styles.fieldLabel}>Phone Number</label>
                    <input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className={styles.input}
                      placeholder="(555) 000-0000"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="cf-message" className={styles.fieldLabel}>Message *</label>
                    <textarea
                      id="cf-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Tell us about your project or engagement..."
                    />
                  </div>

                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      name="contract"
                      checked={form.contract}
                      onChange={handleChange}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxLabel}>
                      I am interested in discussing a contract opportunity
                    </span>
                  </label>

                  <button
                    type="submit"
                    className={`btn btn-crimson ${styles.submit}`}
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send Message'}
                    {status !== 'submitting' && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
