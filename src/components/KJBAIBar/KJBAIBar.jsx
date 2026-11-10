import styles from './KJBAIBar.module.css'

const BASE = 'https://k-jb-f09k1g7yn-kp22.vercel.app'

const LINKS = [
  { label: 'KJB AI Home',  href: `${BASE}/` },
  { label: 'Who We Are',   href: `${BASE}/about` },
  { label: 'What We Do',   href: `${BASE}/solutions` },
  { label: 'Careers',      href: `${BASE}/careers` },
  { label: 'Connect',      href: `${BASE}/connect` },
  { label: 'Contact Us',   href: `${BASE}/contact` },
]

function SparkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={styles.spark}>
      <path d="M6 1l1.2 3.4L11 6 7.2 7.6 6 11l-1.2-3.4L1 6l3.8-1.6L6 1z" fill="currentColor" />
    </svg>
  )
}

export default function KJBAIBar() {
  return (
    <div className={styles.bar} role="navigation" aria-label="KJB AI site navigation">
      <div className={`container ${styles.inner}`}>

        <span className={styles.brand}>
          <SparkIcon />
          <span className={styles.brandText}>KJB AI</span>
        </span>

        <ul className={styles.links}>
          {LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}
