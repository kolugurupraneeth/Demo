import Reveal from '../Reveal/Reveal'
import styles from './PastProjects.module.css'

const PROJECTS = [
  {
    abbr: 'FHIE',
    name: 'Federal Health Information Exchange',
    clients: ['Dept. of Defense', 'Veterans Health Administration', 'Dept. of Health & Human Services'],
    role: 'Design, development, testing, and release of software builds for both the VA and DoD sides of this presidential initiative.',
    detail: 'Enabled DoD to share service members\' Personal Health Information (PHI) using the VistA health system and VHIM architecture. Originated from Presidential Review Directive 5.',
    badge: null,
  },
  {
    abbr: 'BHIE',
    name: 'Bi-Directional Health Information Exchange',
    clients: ['Dept. of Defense', 'Veterans Administration'],
    role: 'Design, development, testing, release management, and production operations.',
    detail: 'A service member\'s complete electronic health record follows them from inception into the Military Health System (MHS) through retirement and ongoing VA care.',
    badge: null,
  },
  {
    abbr: 'CHDR',
    name: 'Clinical Health Data Repository',
    clients: ['Dept. of Defense', 'Veterans Administration'],
    role: 'Design, data mapping, and quality assurance.',
    detail: 'Enabled exchange of computable outpatient pharmacy and drug allergy information for shared DoD/VA patients — a direct patient-safety mission.',
    badge: null,
  },
  {
    abbr: 'eMI',
    name: 'Enterprise Messaging Infrastructure',
    clients: ['Veterans Administration'],
    role: '18-month engagement covering production operations, SOA infrastructure support, and delivery of key enhancements to production.',
    detail: 'Minimized point-to-point connections across VA systems using SOAP, REST, and FIPS 140-2 compliant TLS. Promoted ICP, OneVA Pharmacy, and JLFACC enhancements during KJB\'s tenure.',
    badge: null,
  },
  {
    abbr: 'DAS / DESE',
    name: 'Data Access Services — Enterprise Service Enhancements',
    clients: ['VHA / VBA', 'Dept. of Defense'],
    role: 'Full SDLC support across Program Management, Architecture, DevOps, Sustainment, ProdOps, QA, and Development.',
    detail: 'Middleware transporting clinical and non-clinical information between producer and consumer applications across the federal health enterprise.',
    badge: 'Rated "Excellence" by Product Owners & COR',
  },
]

export default function PastProjects() {
  return (
    <section id="past-projects" className={`section ${styles.section}`}>
      <div className="container">

        <Reveal className={styles.header}>
          <div className={styles.rule} aria-hidden="true" />
          <h2 className={`section-heading ${styles.heading}`}>Past Projects</h2>
          <p className={`section-lead ${styles.lead}`}>
            From presidential health information initiatives to ongoing VA enterprise
            middleware, KJB has delivered full-lifecycle software solutions where the
            mission is veteran health, benefits, and care.
          </p>
        </Reveal>

        <div className={styles.list}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.abbr} delay={i * 80} className={styles.card}>
              <div className={styles.cardLeft}>
                <span className={styles.abbr}>{p.abbr}</span>
                <div className={styles.clientList}>
                  {p.clients.map(c => (
                    <span key={c} className={styles.client}>{c}</span>
                  ))}
                </div>
              </div>
              <div className={styles.cardRight}>
                <h3 className={styles.name}>{p.name}</h3>
                {p.badge && (
                  <span className={styles.badge}>{p.badge}</span>
                )}
                <p className={styles.role}>{p.role}</p>
                <p className={styles.detail}>{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
