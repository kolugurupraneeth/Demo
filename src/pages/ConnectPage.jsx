import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader/PageHeader'
import Social from '../components/Social/Social'
import Reveal from '../components/Reveal/Reveal'
import styles from './ConnectPage.module.css'

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        title="Connect with KJB"
        lead="Follow our journey, stay up to date on company news, and find us across all platforms."
        accent="Stay Connected"
      />
      <Social />

      {/* News placeholder */}
      <section id="news" className={`section ${styles.newsSection}`}>
        <div className="container">
          <Reveal className={styles.newsHeader}>
            <div className={styles.rule} aria-hidden="true" />
            <h2 className={`section-heading ${styles.newsHeading}`}>News &amp; Updates</h2>
            <p className={`section-lead ${styles.newsLead}`}>
              Company announcements, contract updates, and KJB team news.
            </p>
          </Reveal>

          <Reveal delay={100} className={styles.newsEmpty}>
            <div className={styles.newsEmptyIcon} aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
              </svg>
            </div>
            <h3 className={styles.newsEmptyTitle}>Coming Soon</h3>
            <p className={styles.newsEmptyText}>
              News and updates are on the way. Follow us on social media to be
              the first to hear about KJB announcements and contract wins.
            </p>
            <Link to="/contact" className="btn btn-navy" style={{ marginTop: '1.25rem' }}>
              Get In Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
