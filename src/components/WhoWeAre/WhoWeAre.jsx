import Reveal from '../Reveal/Reveal'
import styles from './WhoWeAre.module.css'

const CORE_VALUES = [
  {
    name: 'Service First',
    desc: 'We are driven by a commitment to serve—putting mission needs, client goals, and veteran outcomes at the center of everything we do.',
    featured: true,
  },
  {
    name: 'Integrity & Accountability',
    desc: 'We operate with honesty, transparency, and fiscal responsibility, honoring the trust placed in us and the responsibility to U.S. taxpayers.',
  },
  {
    name: 'Veteran Empowerment',
    desc: 'We train, employ, and support veterans, valuing their experience, discipline, and leadership as essential to our success.',
  },
  {
    name: 'Technical Excellence',
    desc: 'We deliver well-designed, secure, and reliable solutions across the SDLC, built for long-term performance and modernization.',
  },
  {
    name: 'Partnership & Collaboration',
    desc: 'We work closely with our clients, listening first and building strong, long-term relationships based on trust and shared goals.',
  },
  {
    name: 'Adaptability & Innovation',
    desc: 'We embrace change, continuously improving our processes and solutions to meet evolving mission and technology needs.',
  },
  {
    name: 'Result-Driven Mindset',
    desc: 'We focus on measurable outcomes, holding ourselves accountable to delivering solutions that achieve mission objectives and create real value.',
  },
  {
    name: 'Excellence in Delivery',
    desc: 'We execute with discipline, quality, and attention to detail—meeting commitments, exceeding expectations, and delivering on time and within scope.',
  },
  {
    name: 'Security & Reliability',
    desc: 'We prioritize security, resilience, and compliance in everything we build, ensuring systems are dependable and mission-critical operations remain uninterrupted.',
  },
]

export default function WhoWeAre() {
  return (
    <>
      {/* ─── Ken Brunetto ─────────────────────────────────────────── */}
      <section id="who-we-are" className={`section ${styles.kenSection}`}>
        <div className="container">
          <div className={styles.kenGrid}>

            <Reveal className={styles.kenCopy}>
              <p className={styles.kenRole}>Founder &amp; Owner</p>
              <div className={styles.rule} aria-hidden="true" />
              <h2 className={styles.kenHeading}>Ken Brunetto</h2>
              <p className={styles.kenBio}>
                Ken, the owner and founder of KJB Solutions, is an Army veteran with a
                strong background in IT Services within the Federal space. His time in the
                military shaped the way he approaches leadership, placing a high value on
                accountability, reliability, and service.
              </p>
              <p className={styles.kenBio}>
                Ken started KJB Solutions to provide dependable IT Services and software
                support to government agencies while also creating meaningful opportunities
                for fellow veterans in the IT field. He remains closely involved in the
                day-to-day work of the company, focusing on clear communication, practical
                &amp; cost efficient solutions, and building long-term relationships based
                on trust and results.
              </p>
            </Reveal>

            <Reveal delay={180} className={styles.kenCallout}>
              <div className={styles.monogram} aria-hidden="true">KB</div>
              <div className={styles.kenBadges}>
                <span className={styles.kenBadge}>Army Veteran</span>
                <span className={styles.kenBadge}>VOSB Founder</span>
                <span className={styles.kenBadge}>Federal IT</span>
              </div>
              <blockquote className={styles.kenQuote}>
                "Leadership is an attitude,<br />not a position."
              </blockquote>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─── About KJB ────────────────────────────────────────────── */}
      <section id="about-kjb" className={`section ${styles.aboutSection}`}>
        <div className="container">
          <Reveal className={styles.aboutHeader}>
            <div className={styles.ruleNavy} aria-hidden="true" />
            <h2 className={`section-heading ${styles.aboutHeading}`}>About KJB Solutions</h2>
          </Reveal>
          <div className={styles.aboutGrid}>
            <Reveal delay={80}>
              <p className={styles.aboutBody}>
                KJB Solutions is a veteran-owned small business (VOSB) dedicated to delivering
                dependable, high-quality, efficient and cost effective solutions that help
                organizations operate more securely, modernly, and efficiently. Founded by an
                Army veteran, KJB Solutions is driven by a mission to improve veteran health,
                benefits, and memorial services provided by the Department of Veterans Affairs.
              </p>
              <p className={styles.aboutBody}>
                We train and employ veterans and bring a unique perspective to our work as both
                system integrators and end users of the software we build. This firsthand
                experience allows us to deliver practical, mission-focused solutions that
                support all phases of the Software Development Life Cycle (SDLC).
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className={styles.aboutBody}>
                From our beginnings as a small, client-focused operation, KJB Solutions has
                grown into a trusted consulting partner by prioritizing integrity,
                adaptability, and fiscal responsibility. We design and build robust, reliable
                systems that are easy to maintain and flexible enough to support future
                modernization—while remaining accountable to the U.S. taxpayer.
              </p>
              <p className={styles.aboutBody}>
                At KJB Solutions, our focus is on long-term partnerships, measurable results,
                and solutions that truly make a difference.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─────────────────────────────────────── */}
      <section id="mission-vision" className={`section ${styles.mvSection}`}>
        <div className="container">
          <div className={styles.mvGrid}>

            <Reveal className={styles.mvCard}>
              <p className={styles.mvLabel}>Mission</p>
              <h3 className={styles.mvHeading}>What We Do</h3>
              <p className={styles.mvBody}>
                To deliver reliable, high-quality solutions that improve veteran health,
                benefits, and memorial services by combining technical excellence, real-world
                experience, and responsible stewardship of public resources.
              </p>
            </Reveal>

            <Reveal delay={150} className={`${styles.mvCard} ${styles.mvVision}`}>
              <p className={styles.mvLabel}>Vision</p>
              <h3 className={styles.mvHeading}>Where We're Going</h3>
              <p className={styles.mvBody}>
                To be a trusted partner in advancing modern, sustainable systems that
                strengthen mission outcomes, empower veterans, and support organizations
                serving those who have served our nation.
              </p>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─── Core Values ──────────────────────────────────────────── */}
      <section id="core-values" className={`section ${styles.coreSection}`}>
        <div className="container">

          <Reveal className={styles.coreHeader}>
            <div className={styles.ruleCrimson} aria-hidden="true" />
            <h2 className={`section-heading ${styles.coreHeading}`}>Core Values</h2>
            <p className={`section-lead ${styles.coreLead}`}>
              The principles that guide every decision, every engagement, every line of code.
            </p>
          </Reveal>

          {/* Featured first value */}
          <Reveal className={styles.coreFeatured}>
            <div className={styles.coreFeaturedBody}>
              <strong className={styles.coreFeaturedName}>Service First</strong>
              <p className={styles.coreFeaturedDesc}>
                We are driven by a commitment to serve—putting mission needs, client goals,
                and veteran outcomes at the center of everything we do.
              </p>
            </div>
          </Reveal>

          {/* Remaining 8 in 2-column grid */}
          <div className={styles.coreGrid}>
            {CORE_VALUES.slice(1).map((v, i) => (
              <Reveal key={v.name} delay={i * 55} className={styles.coreItem}>
                <div>
                  <strong className={styles.coreName}>{v.name}</strong>
                  <p className={styles.coreDesc}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
