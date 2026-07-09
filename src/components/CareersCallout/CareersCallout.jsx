import Reveal from '../Reveal/Reveal'
import styles from './CareersCallout.module.css'

export default function CareersCallout() {
  return (
    <section id="careers" className={`section ${styles.section}`} aria-label="Careers">
      {/* Decorative grid overlay */}
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
          <div className={styles.actions}>
            <a href="#contact" className="btn btn-primary">
              View Open Positions
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact HR
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
