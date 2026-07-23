import { useState } from 'react'
import Reveal from '../Reveal/Reveal'
import styles from './PastProjects.module.css'

const PROJECTS = [
  {
    abbr: 'DAS / DESE',
    name: 'Data Access Services — Enterprise Service Enhancements',
    clients: ['VHA / VBA', 'Dept. of Defense'],
    role: 'Full SDLC support across Program Management, Architecture, DevOps, Sustainment, ProdOps, QA, and Development.',
    detail: 'Middleware transporting clinical and non-clinical information between producer and consumer applications across the federal health enterprise.',
    badge: 'Rated "Excellence" by Product Owners & COR',
    tags: ['Program Mgmt', 'Architecture', 'DevOps', 'QA', 'ProdOps'],
    featured: true,
  },
  {
    abbr: 'FHIE',
    name: 'Federal Health Information Exchange',
    clients: ['Dept. of Defense', 'Veterans Health Administration', 'Dept. of Health & Human Services'],
    role: 'Design, development, testing, and release of software builds for both the VA and DoD sides of this presidential initiative.',
    detail: 'Enabled DoD to share service members\' Personal Health Information (PHI) using the VistA health system and VHIM architecture. Originated from Presidential Review Directive 5.',
    tags: ['Software Dev', 'Testing', 'Release Mgmt'],
  },
  {
    abbr: 'BHIE',
    name: 'Bi-Directional Health Information Exchange',
    clients: ['Dept. of Defense', 'Veterans Administration'],
    role: 'Design, development, testing, release management, and production operations.',
    detail: 'A service member\'s complete electronic health record follows them from inception into the Military Health System through retirement and ongoing VA care.',
    tags: ['Full SDLC', 'ProdOps'],
  },
  {
    abbr: 'CHDR',
    name: 'Clinical Health Data Repository',
    clients: ['Dept. of Defense', 'Veterans Administration'],
    role: 'Design, data mapping, and quality assurance.',
    detail: 'Enabled exchange of computable outpatient pharmacy and drug allergy information for shared DoD/VA patients — a direct patient-safety mission.',
    tags: ['Data Architecture', 'QA'],
  },
  {
    abbr: 'eMI',
    name: 'Enterprise Messaging Infrastructure',
    clients: ['Veterans Administration'],
    role: '18-month engagement covering production operations, SOA infrastructure support, and delivery of key enhancements to production.',
    detail: 'Minimized point-to-point connections across VA systems using SOAP, REST, and FIPS 140-2 compliant TLS. Promoted ICP, OneVA Pharmacy, and JLFACC enhancements during KJB\'s tenure.',
    tags: ['SOA', 'ProdOps', 'Security'],
  },
]

export default function PastProjects() {
  const [expanded, setExpanded] = useState(null)
  const featured = PROJECTS[0]
  const rest = PROJECTS.slice(1)

  return (
    <section id="past-projects" className={`section ${styles.section}`}>
      <div className="container">

        <Reveal className={styles.header}>
          <div className={styles.rule} aria-hidden="true" />
          <h2 className={`section-heading ${styles.heading}`}>Past Projects</h2>
          <p className={`section-lead ${styles.lead}`}>
            From presidential health information initiatives to VA enterprise middleware,
            KJB has delivered full-lifecycle software solutions where the mission is
            veteran health, benefits, and care.
          </p>
        </Reveal>

        {/* ── Featured project ──────────────────────────────────── */}
        <Reveal className={styles.featured}>
          <div className={styles.featuredLeft}>
            <span className={styles.featuredBadge}>{featured.badge}</span>
            <span className={styles.featuredAbbr}>{featured.abbr}</span>
            <h3 className={styles.featuredName}>{featured.name}</h3>
            <div className={styles.clientChips}>
              {featured.clients.map(c => (
                <span key={c} className={styles.clientChip}>{c}</span>
              ))}
            </div>
          </div>
          <div className={styles.featuredRight}>
            <div className={styles.featuredBlock}>
              <p className={styles.blockLabel}>Our Role</p>
              <p className={styles.blockText}>{featured.role}</p>
            </div>
            <div className={styles.featuredBlock}>
              <p className={styles.blockLabel}>Key Impact</p>
              <p className={styles.blockText}>{featured.detail}</p>
            </div>
            <div className={styles.featuredTags}>
              {featured.tags.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Rest of projects ──────────────────────────────────── */}
        <div className={styles.grid}>
          {rest.map((p, i) => {
            const isOpen = expanded === p.abbr
            return (
              <Reveal key={p.abbr} delay={i * 80} className={styles.cardWrap}>
                <div className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}>
                  <button
                    className={styles.cardBtn}
                    onClick={() => setExpanded(isOpen ? null : p.abbr)}
                    aria-expanded={isOpen}
                    aria-controls={`proj-${p.abbr.replace(/[^a-z]/gi, '')}`}
                  >
                    <div className={styles.cardHead}>
                      <span className={styles.cardAbbr}>{p.abbr}</span>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardName}>{p.name}</span>
                        <div className={styles.cardClients}>
                          {p.clients.map(c => (
                            <span key={c} className={styles.cardClient}>{c}</span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.cardTags}>
                        {p.tags.map(t => (
                          <span key={t} className={styles.tag}>{t}</span>
                        ))}
                      </div>
                      <svg
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                        width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
                      >
                        <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>

                  <div
                    id={`proj-${p.abbr.replace(/[^a-z]/gi, '')}`}
                    className={styles.cardBody}
                    hidden={!isOpen}
                  >
                    <div className={styles.cardDetail}>
                      <p className={styles.blockLabel}>Our Role</p>
                      <p className={styles.blockText}>{p.role}</p>
                    </div>
                    <div className={styles.cardDetail}>
                      <p className={styles.blockLabel}>Key Impact</p>
                      <p className={styles.blockText}>{p.detail}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
