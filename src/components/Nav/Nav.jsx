import { useState, useEffect, useRef } from 'react'
import { useScrolled } from '../../hooks/useScrolled'
import styles from './Nav.module.css'
import ASSETS from '../../config/assets'

const NAV = [
  { label: 'Home', href: '#' },
  {
    label: 'Who We Are', href: '#who-we-are',
    children: [
      { label: 'About Ken Brunetto', href: '#who-we-are' },
      { label: 'About KJB', href: '#about-kjb' },
      { label: 'Mission & Vision', href: '#mission-vision' },
      { label: 'Core Values', href: '#core-values' },
      { label: 'Partners', href: '#partners' },
      { label: 'Past Projects', href: '#past-projects' },
    ],
  },
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
  { label: 'Contact', href: '#contact', cta: true },
]

function scrollToSection(href) {
  if (!href) return
  if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  if (!href.startsWith('#')) { window.location.href = href; return }
  const el = document.querySelector(href)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

function ChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" className={styles.chevron}>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav() {
  const scrolled = useScrolled(60)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState(null)
  const navRef = useRef(null)

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDrop(null)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // close dropdown on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpenDrop(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function handleNavClick(e, item) {
    e.preventDefault()
    if (item.children) {
      setOpenDrop(prev => prev === item.label ? null : item.label)
      if (item.href) scrollToSection(item.href)
    } else if (item.href) {
      setOpenDrop(null)
      scrollToSection(item.href)
    }
  }

  function handleChildClick(e, child) {
    e.preventDefault()
    setOpenDrop(null)
    scrollToSection(child.href)
  }

  function handleMobileChildClick(child) {
    setMobileOpen(false)
    setOpenDrop(null)
    setTimeout(() => scrollToSection(child.href), 50)
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner" ref={navRef}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault(); scrollToSection('#') }} className={styles.logo} aria-label="KJB Solutions — home">
          {scrolled
            ? <img src={ASSETS['logo-color.png']} alt="KJB Solutions" height="40" />
            : <img src={ASSETS['logo-white.png']} alt="KJB Solutions" height="40" />
          }
        </a>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {NAV.map(item => {
              const isOpen = openDrop === item.label
              return (
                <li key={item.label} className={item.children ? styles.hasDrop : ''}>
                  <a
                    href={item.href || '#'}
                    className={`${styles.link} ${item.cta ? styles.ctaLink : ''} ${isOpen ? styles.linkActive : ''}`}
                    onClick={e => handleNavClick(e, item)}
                    aria-expanded={item.children ? isOpen : undefined}
                  >
                    {item.label}
                    {item.children && <ChevronIcon />}
                  </a>

                  {item.children && (
                    <ul className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`} role="menu">
                      {item.children.map(child => (
                        <li key={child.label} role="none">
                          <a
                            href={child.href}
                            role="menuitem"
                            className={styles.dropLink}
                            onClick={e => handleChildClick(e, child)}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul className={styles.mobileList}>
          {NAV.map(item => (
            <li key={item.label} className={styles.mobileItem}>
              <a
                href={item.href || '#'}
                className={styles.mobileLink}
                onClick={e => {
                  e.preventDefault()
                  if (item.children) return // just show sub-links below, don't close
                  setMobileOpen(false)
                  setTimeout(() => scrollToSection(item.href), 50)
                }}
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
                        onClick={e => { e.preventDefault(); handleMobileChildClick(child) }}
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
