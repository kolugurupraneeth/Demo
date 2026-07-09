import { useState, useEffect } from 'react'
import { useScrolled } from '../../hooks/useScrolled'
import styles from './Nav.module.css'

const NAV = [
  { label: 'Home', href: '#' },
  {
    label: 'Solutions', href: '#solutions',
    children: [
      { label: 'Program Management', href: '#solutions' },
      { label: 'Software Development', href: '#solutions' },
      { label: 'Infrastructure & Consulting', href: '#solutions' },
    ],
  },
  { label: 'Clients', href: '#clients' },
  { label: 'Careers', href: '#careers' },
  {
    label: 'About Us', href: '#about',
    children: [
      { label: 'Partners', href: 'https://kjbsolution.com/about-us/partners/' },
      { label: 'Past Projects', href: 'https://kjbsolution.com/about-us/past-projects/' },
    ],
  },
  { label: 'Contact', href: '#contact', cta: true },
]

function ChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" className={styles.chevron}>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const scrolled = useScrolled(60)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <a href="#" className={styles.logo} aria-label="KJB Solutions — home">
          {scrolled
            ? <img src="/assets/logo-color.png" alt="KJB Solutions" height="40" />
            : <img src="/assets/logo-white.png" alt="KJB Solutions" height="40" />
          }
        </a>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {NAV.map(item => (
              <li key={item.label} className={item.children ? styles.hasDrop : ''}>
                <a
                  href={item.href}
                  className={`${styles.link} ${item.cta ? styles.ctaLink : ''}`}
                >
                  {item.label}
                  {item.children && <ChevronIcon />}
                </a>

                {item.children && (
                  <ul className={styles.dropdown} role="menu">
                    {item.children.map(child => (
                      <li key={child.label} role="none">
                        <a href={child.href} role="menuitem" className={styles.dropLink}>
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={`${styles.mobileOverlay} ${open ? styles.mobileOpen : ''}`}
        aria-hidden={!open}
      >
        <ul className={styles.mobileList}>
          {NAV.map(item => (
            <li key={item.label} className={styles.mobileItem}>
              <a
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
              {item.children && (
                <ul className={styles.mobileSub}>
                  {item.children.map(child => (
                    <li key={child.label}>
                      <a
                        href={child.href}
                        className={styles.mobileSubLink}
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
