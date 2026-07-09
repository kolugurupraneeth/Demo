import Reveal from '../Reveal/Reveal'
import styles from './Partners.module.css'

const PARTNERS = [
  {
    abbr: 'CSRA',
    programs: ['Enterprise Messaging Service (eMI)'],
    services: ['Project Management Consulting Services'],
  },
  {
    abbr: 'CACI',
    programs: ['Data Access Services (DAS)'],
    services: ['Development', 'Operations', 'Partner Management', 'PM Consulting Services'],
  },
  {
    abbr: 'SBG',
    programs: ['VistA EVOlution'],
    services: ['Engineering Support & Consulting Services'],
  },
  {
    abbr: 'Price Meridian',
    programs: ['Data Access Services (DAS)', 'Enterprise Service Enhancements (DESE)'],
    services: ['Development', 'Operations', 'Partner Management', 'PM Consulting Services'],
  },
  {
    abbr: 'VetsEZ',
    programs: ['Data Access Services (DAS)', 'Enterprise Service Enhancements (DESE)'],
    services: ['Development', 'Operations', 'Partner Management', 'PM Consulting Services', 'Cloud Systems Engineering'],
  },
]

export default function Partners() {
  return (
    <section id="partners" className={`section ${styles.section}`}>
      <div className="container">

        <Reveal className={styles.header}>
          <div className={styles.rule} aria-hidden="true" />
          <h2 className={`section-heading ${styles.heading}`}>Our Partners</h2>
          <p className={`section-lead ${styles.lead}`}>
            KJB collaborates with trusted industry partners to deliver mission-critical
            VA programs — from enterprise messaging and data services to infrastructure
            modernization across the federal landscape.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {PARTNERS.map((p, i) => (
            <Reveal key={p.abbr} delay={i * 80} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.abbr}>{p.abbr}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.block}>
                  <span className={styles.blockLabel}>Programs Supported</span>
                  <ul className={styles.list}>
                    {p.programs.map(prog => (
                      <li key={prog}>{prog}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.block}>
                  <span className={styles.blockLabel}>Services Delivered</span>
                  <ul className={styles.list}>
                    {p.services.map(svc => (
                      <li key={svc}>{svc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
