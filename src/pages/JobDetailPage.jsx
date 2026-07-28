import { Link, useParams } from 'react-router-dom'
import { getJobById } from '../data/jobs'
import styles from './JobDetailPage.module.css'

export default function JobDetailPage() {
  const { jobSlug } = useParams()
  const job = getJobById(jobSlug)

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

  return (
    <div className={styles.page}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
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
          <div className={styles.headerBottom}>
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
            <ApplyBtn job={job} className={styles.headerApplyBtn} />
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className={`container ${styles.body}`}>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h2 className={styles.sideHeading}>Key Requirements</h2>
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
              KJB Solutions is a veteran-owned VOSB delivering mission-critical IT
              to the VA. We hire veterans first, invest in their growth, and build
              careers with purpose — not just paychecks.
            </p>
          </div>

          <div className={styles.sideApply}>
            <ApplyBtn job={job} />
            <p className={styles.sideApplyNote}>
              {job.applyUrl
                ? 'Opens our official Gusto application portal.'
                : 'Submits directly to the KJB recruiting team.'}
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className={styles.main} id="job-detail">

          {job.description?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>About This Role</h2>
              {job.description.map((para, i) => (
                <p key={i} className={styles.para}>{para}</p>
              ))}
            </section>
          )}

          {job.responsibilities?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Responsibilities</h2>
              <ul className={styles.bulletList} aria-label="Responsibilities">
                {job.responsibilities.map(r => (
                  <li key={r} className={styles.bulletItem}>
                    <span className={styles.bullet} aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {job.qualifications && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Qualifications</h2>

              {job.qualifications.required?.length > 0 && (
                <div className={styles.qualGroup}>
                  <h3 className={styles.qualHeading}>Required</h3>
                  <ul className={styles.bulletList} aria-label="Required qualifications">
                    {job.qualifications.required.map(q => (
                      <li key={q} className={styles.bulletItem}>
                        <span className={styles.bullet} aria-hidden="true" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.qualifications.preferred?.length > 0 && (
                <div className={styles.qualGroup}>
                  <h3 className={styles.qualHeading}>Preferred</h3>
                  <ul className={styles.bulletList} aria-label="Preferred qualifications">
                    {job.qualifications.preferred.map(q => (
                      <li key={q} className={styles.bulletItemPref}>
                        <span className={styles.bulletPref} aria-hidden="true" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Bottom CTA */}
          <div className={styles.bottomCta}>
            <div className={styles.bottomCtaInner}>
              <p className={styles.bottomCtaLabel}>Ready to join the mission?</p>
              <p className={styles.bottomCtaText}>
                KJB Solutions reviews every application. If you meet the requirements,
                our recruiting team will reach out directly.
              </p>
            </div>
            <ApplyBtn job={job} />
          </div>

        </main>
      </div>
    </div>
  )
}

function ApplyBtn({ job, className = '' }) {
  const isExternal = Boolean(job.applyUrl)
  const href = job.applyUrl ?? `/careers/apply/${job.id}`

  const cls = `btn btn-navy ${styles.applyBtn} ${className}`.trim()

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        Apply on Gusto
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3H3v10h10v-3M13 3l-6 6M10 3h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    )
  }

  return (
    <Link to={href} className={cls}>
      Apply Now
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )
}
