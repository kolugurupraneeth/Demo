import styles from './Footer.module.css'

const NAV_COLS = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Program Management', href: '#solutions' },
      { label: 'Software Development', href: '#solutions' },
      { label: 'Infrastructure & Consulting', href: '#solutions' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Partners', href: '#partners' },
      { label: 'Past Projects', href: '#past-projects' },
      { label: 'Careers', href: '#careers' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: '571-277-3586', href: 'tel:571-277-3586' },
      { label: 'kbjsolutions@kjbsolution.com', href: 'mailto:kbjsolutions@kjbsolution.com' },
      { label: 'Send a Message', href: '#contact' },
    ],
  },
]

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function scrollTo(href) {
  if (!href.startsWith('#')) { window.location.href = href; return }
  const el = document.querySelector(href)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">

        {/* Top: logo + nav cols */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#" aria-label="KJB Solutions home">
              <img src="/assets/logo-white.png" alt="KJB Solutions" height="38" className={styles.logo} />
            </a>
            <p className={styles.tagline}>
              Providing IT services to<br />the federal government.
            </p>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/company/kjb-solutions" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://www.facebook.com/KJB-Solutions-LLC-2245607899045874" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://twitter.com/KjbSolutions" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Twitter">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {NAV_COLS.map(col => (
            <div key={col.heading} className={styles.navCol}>
              <h3 className={styles.navColHeading}>{col.heading}</h3>
              <ul className={styles.navColList}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={styles.navColLink}
                      onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Bottom: copyright */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {year} KJB Solutions, LLC. All Rights Reserved.
          </p>
          <p className={styles.copy}>
            Veteran-Owned · Federal IT Services
          </p>
        </div>

      </div>
    </footer>
  )
}
