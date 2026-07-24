import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { DENSITY_IMAGES } from '../../config/assets'

const NAV_COLS = [
  {
    heading: 'What We Do',
    links: [
      { label: 'Program Management', to: '/solutions#program-management' },
      { label: 'Software Development', to: '/solutions#software-development' },
      { label: 'Infrastructure & Consulting', to: '/solutions#infrastructure-consulting' },
      { label: 'Past Projects', to: '/solutions#past-projects' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Who We Are', to: '/about#who-we-are' },
      { label: 'Mission & Values', to: '/about#mission-vision' },
      { label: 'Core Values', to: '/about#core-values' },
      { label: 'Our Partners', to: '/about#partners' },
      { label: 'Careers', to: '/careers' },
      { label: 'Open Positions', to: '/careers#open-positions' },
      { label: 'Connect', to: '/connect' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: '571-277-3586', to: 'tel:571-277-3586', external: true },
      { label: 'kbjsolutions@kjbsolution.com', to: 'mailto:kbjsolutions@kjbsolution.com', external: true },
      { label: 'Send a Message', to: '/contact' },
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
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">

        {/* Top: logo + nav cols */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" aria-label="KJB Solutions home">
              <img
                src={DENSITY_IMAGES.whiteLogo.src}
                srcSet={DENSITY_IMAGES.whiteLogo.srcSet}
                alt="KJB Solutions"
                height="38"
                className={styles.logo}
                decoding="async"
              />
            </Link>
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
              <a href="https://www.instagram.com/kjb.solutions" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {NAV_COLS.map(col => (
            <div key={col.heading} className={styles.navCol}>
              <h3 className={styles.navColHeading}>{col.heading}</h3>
              <ul className={styles.navColList}>
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.to} className={styles.navColLink}>{link.label}</a>
                    ) : (
                      <Link to={link.to} className={styles.navColLink}>{link.label}</Link>
                    )}
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
