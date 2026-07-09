import Reveal from '../Reveal/Reveal'
import styles from './Services.module.css'

const SERVICES = [
  {
    icon: '/assets/icon-program-mgmt.png',
    title: 'Program Management',
    desc: "Agile Program Management frameworks tailored to each agency's stakeholders and process flows. No one-size-fits-all — every engagement is scoped to the mission.",
    href: '#contact',
  },
  {
    icon: '/assets/icon-software-dev.png',
    title: 'Software Development',
    desc: 'DevSecOps programs that support multiple government agencies while maintaining strict compliance with differing guidelines and agency-specific security requirements.',
    href: '#contact',
  },
  {
    icon: '/assets/icon-infrastructure.png',
    title: 'Infrastructure & Consulting',
    desc: 'A proven balance of industry best practices and standards to deliver software infrastructure that is compliant, reference-model aligned, and built to modernize.',
    href: '#contact',
  },
]

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Services() {
  return (
    <section id="solutions" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.layout}>

          {/* Left: header column */}
          <Reveal className={styles.header}>
            <div className={styles.rule} aria-hidden="true" />
            <h2 className={`section-heading ${styles.heading}`}>
              Our Solutions
            </h2>
            <p className={`section-lead ${styles.lead}`}>
              Three core disciplines. One veteran team. Integrated end-to-end
              delivery for the agencies that serve those who served.
            </p>
            <a href="#contact" className={`btn btn-navy ${styles.headerCta}`}>
              Work With KJB
              <ArrowIcon />
            </a>
          </Reveal>

          {/* Right: service rows */}
          <div className={styles.list}>
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 120} className={styles.rowWrap}>
                <a href={svc.href} className={styles.row} aria-label={`Learn about ${svc.title}`}>
                  <div className={styles.iconWrap}>
                    <img src={svc.icon} alt="" width="48" height="48" />
                  </div>
                  <div className={styles.body}>
                    <h3 className={styles.title}>{svc.title}</h3>
                    <p className={styles.desc}>{svc.desc}</p>
                  </div>
                  <div className={styles.arrow}>
                    <ArrowIcon />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
