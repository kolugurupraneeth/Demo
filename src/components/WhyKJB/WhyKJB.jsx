import Reveal from '../Reveal/Reveal'
import styles from './WhyKJB.module.css'

const PILLARS = [
  { label: 'Veteran-Owned', desc: 'Army-veteran leadership with first-hand VA service experience.' },
  { label: 'SDLC Insiders', desc: 'We consume the software we build. No proxy understanding.' },
  { label: 'Fiscally Responsible', desc: 'Stewardship of taxpayer dollars is a core operating principle.' },
]

export default function WhyKJB() {
  return (
    <section id="about" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>

          {/* Photo */}
          <Reveal className={styles.photoCol}>
            <div className={styles.photoFrame}>
              <img
                src="/assets/handshake.jpg"
                alt="KJB Solutions team building a federal partnership"
                className={styles.photo}
                loading="lazy"
              />
              {/* Floating badge */}
              <div className={styles.badge} aria-hidden="true">
                <span className={styles.badgeStar}>★</span>
                <span className={styles.badgeText}>Veteran-Owned<br />Small Business</span>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className={styles.copyCol}>
            <Reveal>
              <div className={styles.rule} aria-hidden="true" />
              <h2 className={`section-heading ${styles.heading}`}>
                Why Choose KJB
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className={styles.body}>
                KJB is owned and operated by an Army veteran focused on improving
                the veteran health, benefits, and memorial services provided by the VA.
                We train and employ veterans — and we have a unique perspective:
                we not only support all phases of the Software Development Life Cycle,
                we are consumers of the software we build.
              </p>
              <p className={styles.body}>
                We pride ourselves on providing consulting services that encompass the full
                SDLC while being fiscally responsible with U.S. taxpayer dollars. Designing
                and building robust, reliable solutions that are easy to maintain and flexible
                for modernization is our goal on every project.
              </p>
            </Reveal>

            <div className={styles.pillars}>
              {PILLARS.map((p, i) => (
                <Reveal key={p.label} delay={i * 100 + 200} className={styles.pillarWrap}>
                  <div className={styles.pillar}>
                    <div className={styles.pillarDot} aria-hidden="true" />
                    <div>
                      <strong className={styles.pillarLabel}>{p.label}</strong>
                      <p className={styles.pillarDesc}>{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <a href="#contact" className={`btn btn-outline ${styles.cta}`}>
                Partner with KJB
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}
