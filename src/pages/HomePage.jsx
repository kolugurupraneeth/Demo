import { Link } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import Services from '../components/Services/Services'
import WhyKJB from '../components/WhyKJB/WhyKJB'
import Credentials from '../components/Credentials/Credentials'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyKJB />
      <Credentials />

      {/* Homepage CTA strip */}
      <section className={styles.cta} aria-label="Contact call to action">
        <div className={`container ${styles.ctaInner}`}>
          <div className={styles.ctaCopy}>
            <h2 className={styles.ctaHeading}>Ready to partner with KJB?</h2>
            <p className={styles.ctaLead}>
              Let's discuss your next federal IT engagement.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
            <Link to="/solutions" className="btn btn-outline">View Our Work</Link>
          </div>
        </div>
      </section>
    </>
  )
}
