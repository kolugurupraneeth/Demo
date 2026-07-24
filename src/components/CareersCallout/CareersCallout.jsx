import { Link } from 'react-router-dom'
import Reveal from '../Reveal/Reveal'
import { JOBS } from '../../data/jobs'
import styles from './CareersCallout.module.css'

const EMAIL = 'kbjsolutions@kjbsolution.com'

export default function CareersCallout() {
  return (
    <section id="careers" className={`section ${styles.section}`} aria-label="Careers">

      {/* ── Hero callout ─────────────────────────────────────────── */}
      <div className={styles.grid} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.content}>
          <p className={styles.tag}>
            <span className={styles.tagBar} aria-hidden="true" />
            Join The Mission
          </p>
          <h2 className={styles.heading}>
            We Hire Veterans.<br />
            <em className={styles.headingAccent}>We Are Veterans.</em>
          </h2>
          <p className={styles.sub}>
            KJB is built by people who know what it means to serve. If you are a
            veteran looking to continue your mission in the federal IT space — you
            belong here.
          </p>
        </Reveal>
      </div>

      {/* ── Job listings ─────────────────────────────────────────── */}
      <div id="open-positions" className={styles.jobsWrap}>
        <div className="container">
          <Reveal className={styles.jobsHeader}>
            <h3 className={styles.jobsHeading}>Open Positions</h3>
            <p className={styles.jobsLead}>
              We're actively looking for mission-driven veterans and IT professionals
              across the following roles.
            </p>
          </Reveal>

          <div className={styles.jobsGrid}>
            {JOBS.map((job, i) => (
              <Reveal key={job.id} delay={i * 80} className={styles.jobCard}>
                <div className={styles.jobTop}>
                  <div>
                    <p className={styles.jobDept}>{job.dept}</p>
                    <h4 className={styles.jobTitle}>{job.title}</h4>
                  </div>
                </div>
                <div className={styles.jobMeta}>
                  <span className={styles.jobTag}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <path d="M8 2C5.24 2 3 4.24 3 7c0 4.25 5 9 5 9s5-4.75 5-9c0-2.76-2.24-5-5-5z" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8" cy="7" r="1.5"/>
                    </svg>
                    {job.location}
                  </span>
                  <span className={styles.jobTag}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" strokeLinecap="round"/>
                      <path d="M8 5v3l2 2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {job.type}
                  </span>
                </div>
                <ul className={styles.jobReqs} aria-label="Requirements">
                  {job.reqs.map(r => (
                    <li key={r} className={styles.jobReq}>
                      <span className={styles.jobReqDot} aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/careers/apply/${job.id}`}
                  className={`btn btn-navy ${styles.applyBtn}`}
                >
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className={styles.jobsFooter}>
            <p className={styles.jobsFooterText}>
              Don't see a fit? We're always looking for talented veterans.
            </p>
            <a href={`mailto:${EMAIL}?subject=General Inquiry – Careers`} className="btn btn-outline">
              Send Your Resume
            </a>
          </Reveal>
        </div>
      </div>

    </section>
  )
}
