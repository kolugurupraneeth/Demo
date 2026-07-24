import Reveal from '../Reveal/Reveal'
import styles from './Social.module.css'

const PLATFORMS = [
  {
    name: 'LinkedIn',
    handle: 'KJB Solutions',
    url: 'https://www.linkedin.com/company/kjb-solutions',
    desc: 'Company updates, contract announcements, veteran hiring opportunities, and federal IT insights.',
    cta: 'Follow on LinkedIn',
    color: '#0077b5',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'KJB Solutions LLC',
    url: 'https://www.facebook.com/KJB-Solutions-LLC-2245607899045874',
    desc: 'Community highlights, veteran spotlights, company milestones, and behind-the-scenes updates.',
    cta: 'Follow on Facebook',
    color: '#1877f2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@kjb.solutions',
    url: 'https://www.instagram.com/kjb.solutions',
    desc: 'Behind-the-scenes moments, team culture, veteran spotlights, and visual updates from the KJB team.',
    cta: 'Follow on Instagram',
    color: '#e1306c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="30" height="30" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    handle: '@KjbSolutions',
    url: 'https://twitter.com/KjbSolutions',
    desc: 'Real-time industry news, federal IT commentary, and quick updates from the KJB team.',
    cta: 'Follow on X',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

export default function Social() {
  return (
    <section id="social" className={`section ${styles.section}`}>
      <div className="container">

        <Reveal className={styles.header}>
          <div className={styles.rule} aria-hidden="true" />
          <h2 className={`section-heading ${styles.heading}`}>Connect with KJB</h2>
          <p className={`section-lead ${styles.lead}`}>
            Stay connected with our team, follow our mission, and be the first to
            hear about contract opportunities, veteran hiring, and company news.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className={styles.cardWrap}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={`KJB Solutions on ${p.name}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap} style={{ '--platform-color': p.color }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className={styles.platformName}>{p.name}</p>
                    <p className={styles.handle}>{p.handle}</p>
                  </div>
                </div>
                <p className={styles.desc}>{p.desc}</p>
                <div className={styles.cta}>
                  {p.cta}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
