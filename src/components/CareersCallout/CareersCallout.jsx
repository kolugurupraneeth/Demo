import Reveal from '../Reveal/Reveal'
import styles from './CareersCallout.module.css'

const EMAIL = 'kbjsolutions@kjbsolution.com'

const JOBS = [
  {
    title: 'Program Manager — Federal IT',
    dept: 'Program Management',
    location: 'DC Metro / Remote',
    type: 'Full-Time',
    reqs: [
      '5+ years federal IT program management',
      'Experience with VA or DoD programs',
      'PMP or equivalent preferred',
      'Active security clearance preferred',
    ],
  },
  {
    title: 'Software Developer — VA Systems',
    dept: 'Software Development',
    location: 'Remote',
    type: 'Full-Time',
    reqs: [
      '3+ years software development in federal health systems',
      'SDLC experience (design through production ops)',
      'VistA, HL7, or FHIR experience a plus',
      'Ability to obtain clearance',
    ],
  },
  {
    title: 'DevSecOps Engineer',
    dept: 'Infrastructure & Security',
    location: 'Remote / Hybrid',
    type: 'Full-Time',
    reqs: [
      'CI/CD pipeline design and management',
      'FIPS 140-2 and federal security compliance',
      'Experience with NIST RMF or ATO processes',
      'Active security clearance preferred',
    ],
  },
  {
    title: 'IT Infrastructure Consultant',
    dept: 'Infrastructure & Consulting',
    location: 'DC Metro / Remote',
    type: 'Full-Time',
    reqs: [
      'SOA, middleware, and enterprise integration',
      'Production operations in federal environments',
      'Network and systems administration experience',
      'Clearance eligible',
    ],
  },
]

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
      <div className={styles.jobsWrap}>
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
              <Reveal key={job.title} delay={i * 80} className={styles.jobCard}>
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
                <a
                  href={`mailto:${EMAIL}?subject=Application: ${job.title}`}
                  className={`btn btn-navy ${styles.applyBtn}`}
                >
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
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
