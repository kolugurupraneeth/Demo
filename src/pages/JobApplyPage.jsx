import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJobById } from '../data/jobs'
import styles from './JobApplyPage.module.css'

const MAX_FILE_BYTES = 2 * 1024 * 1024 // 2 MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const EXP_OPTIONS = ['< 1 year', '1–2 years', '3–5 years', '6–10 years', '10+ years']
const CLEARANCE_OPTIONS = ['None', 'Public Trust', 'Secret', 'Top Secret', 'TS/SCI']
const VETERAN_OPTIONS = ['Veteran', 'Active Duty', 'Reservist / National Guard', 'Not a Veteran', 'Prefer not to say']

export default function JobApplyPage() {
  const { jobSlug } = useParams()
  const job = getJobById(jobSlug)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', linkedin: '',
    yearsExp: '', clearance: '', usCitizen: '', veteranStatus: '',
    coverLetter: '',
  })
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef(null)

  if (!job) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1 className={styles.nfHeading}>Position Not Found</h1>
          <p className={styles.nfSub}>This listing may have been filled or removed.</p>
          <Link to="/careers" className="btn btn-navy">View Open Positions</Link>
        </div>
      </div>
    )
  }

  function field(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleFile(e) {
    const f = e.target.files?.[0]
    if (!f) return
    if (!ALLOWED_TYPES.includes(f.type)) {
      setFileError('Please upload a PDF or Word document (.pdf, .doc, .docx)')
      setFile(null)
      e.target.value = ''
      return
    }
    if (f.size > MAX_FILE_BYTES) {
      setFileError('Resume must be under 2 MB')
      setFile(null)
      e.target.value = ''
      return
    }
    setFileError('')
    setFile(f)
  }

  function handleDrop(e) {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile({ target: { files: [f] } })
  }

  function removeFile(e) {
    e.stopPropagation()
    setFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) { setFileError('Please attach your resume'); return }

    setStatus('loading')
    setErrorMsg('')

    try {
      const base64 = await toBase64(file)
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          ...form,
          resumeBase64: base64,
          resumeName: file.name,
          resumeType: file.type,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed. Please try again.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successWrap}>
        <div className={`container ${styles.successInner}`}>
          <div className={styles.successCheck} aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7 16l6 6 12-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className={styles.successHeading}>Application Submitted</h1>
          <p className={styles.successSub}>
            Thank you, {form.name.split(' ')[0]}. Your application for <strong>{job.title}</strong> has
            been received. We review every submission and will reach out to qualified candidates.
          </p>
          <Link to="/careers" className="btn btn-navy">View More Positions</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className="container">
          <Link to="/careers" className={styles.back}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Careers
          </Link>
          <p className={styles.dept}>{job.dept}</p>
          <h1 className={styles.title}>{job.title}</h1>
          <div className={styles.metaRow}>
            <span className={styles.metaTag}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M8 2C5.24 2 3 4.24 3 7c0 4.25 5 9 5 9s5-4.75 5-9c0-2.76-2.24-5-5-5z" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="7" r="1.5"/>
              </svg>
              {job.location}
            </span>
            <span className={styles.metaTag}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="8" cy="8" r="6" strokeLinecap="round"/>
                <path d="M8 5v3l2 2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {job.type}
            </span>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className={`container ${styles.body}`}>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h2 className={styles.sideHeading}>Requirements</h2>
            <ul className={styles.reqList}>
              {job.reqs.map(r => (
                <li key={r} className={styles.reqItem}>
                  <span className={styles.reqDot} aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.sideCard}>
            <h2 className={styles.sideHeading}>Why KJB?</h2>
            <p className={styles.sideText}>
              KJB Solutions is a veteran-owned VOSB delivering mission-critical IT to the VA.
              We hire veterans first, invest in their growth, and build careers with purpose.
            </p>
          </div>
        </aside>

        {/* Application form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.formHeading}>Your Application</h2>

          <div className={styles.row}>
            <Field label="Full Name" required>
              <input id="name" className={styles.input} type="text"
                value={form.name} onChange={e => field('name', e.target.value)}
                required placeholder="Jane Smith" />
            </Field>
            <Field label="Email Address" required>
              <input id="email" className={styles.input} type="email"
                value={form.email} onChange={e => field('email', e.target.value)}
                required placeholder="jane@example.com" />
            </Field>
          </div>

          <div className={styles.row}>
            <Field label="Phone Number" required>
              <input id="phone" className={styles.input} type="tel"
                value={form.phone} onChange={e => field('phone', e.target.value)}
                required placeholder="(555) 000-0000" />
            </Field>
            <Field label="LinkedIn Profile">
              <input id="linkedin" className={styles.input} type="url"
                value={form.linkedin} onChange={e => field('linkedin', e.target.value)}
                placeholder="linkedin.com/in/yourname" />
            </Field>
          </div>

          <div className={styles.row}>
            <Field label="Years of Relevant Experience" required>
              <select id="yearsExp" className={styles.select}
                value={form.yearsExp} onChange={e => field('yearsExp', e.target.value)} required>
                <option value="">Select…</option>
                {EXP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Security Clearance Level" required>
              <select id="clearance" className={styles.select}
                value={form.clearance} onChange={e => field('clearance', e.target.value)} required>
                <option value="">Select…</option>
                {CLEARANCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          <div className={styles.row}>
            <Field label="U.S. Citizen / Authorized to Work" required>
              <select id="usCitizen" className={styles.select}
                value={form.usCitizen} onChange={e => field('usCitizen', e.target.value)} required>
                <option value="">Select…</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </Field>
            <Field label="Military / Veteran Status" required>
              <select id="veteranStatus" className={styles.select}
                value={form.veteranStatus} onChange={e => field('veteranStatus', e.target.value)} required>
                <option value="">Select…</option>
                {VETERAN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Cover Letter / Message">
            <textarea id="coverLetter" className={styles.textarea} rows={5}
              value={form.coverLetter} onChange={e => field('coverLetter', e.target.value)}
              placeholder="Tell us about your relevant experience and why you want to join the KJB team…" />
          </Field>

          <Field label="Resume" required>
            <div
              className={`${styles.dropZone} ${file ? styles.hasFile : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={handleDrop}
              aria-label="Upload resume — click or drop a file"
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFile}
                style={{ display: 'none' }}
                aria-hidden="true"
              />
              {file ? (
                <div className={styles.fileRow}>
                  <svg className={styles.fileIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>{(file.size / 1024).toFixed(0)} KB</span>
                  <button type="button" className={styles.removeBtn} onClick={removeFile}>Remove</button>
                </div>
              ) : (
                <div className={styles.dropPrompt}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.uploadIcon} aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className={styles.dropMain}>Drop your resume or <span className={styles.browse}>browse</span></span>
                  <span className={styles.dropHint}>PDF, DOC, or DOCX · Max 2 MB</span>
                </div>
              )}
            </div>
            {fileError && <p className={styles.fieldErr} role="alert">{fileError}</p>}
          </Field>

          {status === 'error' && (
            <div className={styles.submitErr} role="alert">{errorMsg}</div>
          )}

          <button
            type="submit"
            className={`btn btn-navy ${styles.submitBtn}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                Submit Application
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>

          <p className={styles.disclaimer}>
            By submitting, you agree that KJB Solutions may use your information to contact you
            about this and future opportunities.
          </p>
        </form>

      </div>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.req} aria-label="required"> *</span>}
      </label>
      {children}
    </div>
  )
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
