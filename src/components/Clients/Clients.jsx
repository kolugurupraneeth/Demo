import { Link } from 'react-router-dom'
import Reveal from '../Reveal/Reveal'
import styles from './Clients.module.css'

const HIGHLIGHTS = [
  {
    value: '10+',
    label: 'Years Serving the VA',
    detail: 'Continuous delivery and production support across VA programs',
  },
  {
    value: 'SDLC',
    label: 'End-to-End Delivery',
    detail: 'Requirements through deployment, sustainment, and modernization',
  },
  {
    value: '100%',
    label: 'Mission-Focused',
    detail: 'Every engagement scoped to agency-specific needs and compliance',
  },
]

const AGENCIES = [
  { abbr: 'VA', name: 'Dept. of Veterans Affairs', desc: 'Primary federal client — veteran health, benefits & memorial services' },
  { abbr: 'DoD', name: 'Dept. of Defense', desc: 'Defense-aligned software development and infrastructure consulting' },
  { abbr: 'SBA', name: 'Small Business Administration', desc: 'Certified small business partner supporting federal procurement' },
]

export default function Clients() {
  return (
    <section id="clients" className={`section ${styles.section}`}>
      <div className="container">

        {/* Header */}
        <Reveal className={styles.header}>
          <div className={styles.rule} aria-hidden="true" />
          <h2 className={`section-heading ${styles.heading}`}>Our Clients Say It Best</h2>
          <p className={`section-lead ${styles.lead}`}>
            We develop, sustain, and provide production operation support for the agencies
            that serve those who served. Our clients trust us because we are consumers
            of the mission-critical software we build.
          </p>
        </Reveal>

        {/* Featured client — VA */}
        <Reveal delay={80} className={styles.featured}>
          <div className={styles.featuredBadge}>Primary Federal Client</div>
          <div className={styles.featuredInner}>
            <div className={styles.featuredLeft}>
              <div className={styles.sealWrap} aria-hidden="true">
                <span className={styles.sealAbbr}>VA</span>
                <span className={styles.sealLine} />
                <span className={styles.sealFull}>Dept. of Veterans Affairs</span>
              </div>
              <p className={styles.featuredDesc}>
                KJB is owned and operated by an Army veteran focused on improving veteran
                health, benefits, and memorial services provided by the VA. We understand
                the mission from the inside — as veterans ourselves, we are consumers of
                the very software we build.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Work With KJB →
              </Link>
            </div>

            <div className={styles.featuredRight}>
              {HIGHLIGHTS.map((h, i) => (
                <Reveal key={h.label} delay={i * 100 + 160} as="div" className={styles.highlight}>
                  <span className={styles.highlightValue}>{h.value}</span>
                  <div className={styles.highlightBody}>
                    <strong className={styles.highlightLabel}>{h.label}</strong>
                    <span className={styles.highlightDetail}>{h.detail}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Agency grid */}
        <div className={styles.agencyGrid}>
          {AGENCIES.map((ag, i) => (
            <Reveal key={ag.abbr} delay={i * 100} className={styles.agencyCard}>
              <span className={styles.agencyAbbr}>{ag.abbr}</span>
              <div>
                <strong className={styles.agencyName}>{ag.name}</strong>
                <p className={styles.agencyDesc}>{ag.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
