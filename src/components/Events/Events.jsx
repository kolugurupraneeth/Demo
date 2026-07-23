import Reveal from '../Reveal/Reveal'
import styles from './Events.module.css'

const PAST_EVENTS = [
  {
    name: 'AFCEA Small Business IT Day',
    location: 'Bethesda, MD',
    date: '2025',
    type: 'Conference',
  },
  {
    name: 'National Veterans Small Business Engagement',
    location: 'Washington, D.C.',
    date: '2025',
    type: 'Engagement',
  },
]

export default function Events() {
  return (
    <section id="events" className={`section ${styles.section}`}>
      <div className="container">

        <Reveal className={styles.header}>
          <div className={styles.rule} aria-hidden="true" />
          <h2 className={`section-heading ${styles.heading}`}>Events &amp; Conferences</h2>
          <p className={`section-lead ${styles.lead}`}>
            KJB Solutions actively engages with the federal contracting and veteran
            business community throughout the year. Find us at industry events,
            procurement forums, and veteran-focused conferences.
          </p>
        </Reveal>

        {/* Upcoming events placeholder */}
        <Reveal delay={100} className={styles.upcomingBox}>
          <div className={styles.upcomingYear}>2026</div>
          <div className={styles.upcomingContent}>
            <p className={styles.upcomingLabel}>Upcoming Events</p>
            <h3 className={styles.upcomingHeading}>Schedule Coming Soon</h3>
            <p className={styles.upcomingBody}>
              KJB Solutions is finalizing its 2026 conference and event calendar.
              Follow us on social media or reach out directly to stay informed about
              where we'll be throughout the year.
            </p>
            <div className={styles.upcomingActions}>
              <a href="#social" className="btn btn-primary">Follow Us</a>
              <a href="#contact" className="btn btn-outline">Get Notified</a>
            </div>
          </div>
        </Reveal>

        {/* Past events */}
        <Reveal delay={200} className={styles.pastSection}>
          <h3 className={styles.pastHeading}>Past Appearances</h3>
          <div className={styles.pastGrid}>
            {PAST_EVENTS.map((e, i) => (
              <div key={i} className={styles.pastCard}>
                <span className={styles.pastType}>{e.type}</span>
                <p className={styles.pastName}>{e.name}</p>
                <div className={styles.pastMeta}>
                  <span className={styles.pastMetaItem}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M8 2C5.24 2 3 4.24 3 7c0 4.25 5 9 5 9s5-4.75 5-9c0-2.76-2.24-5-5-5z" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8" cy="7" r="1.5"/>
                    </svg>
                    {e.location}
                  </span>
                  <span className={styles.pastMetaItem}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <rect x="2" y="3" width="12" height="11" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 2v2M11 2v2M2 7h12" strokeLinecap="round"/>
                    </svg>
                    {e.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  )
}
