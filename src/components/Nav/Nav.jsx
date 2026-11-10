import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrolled } from '../../hooks/useScrolled'
import styles from './Nav.module.css'
import { DENSITY_IMAGES } from '../../config/assets'

const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'Who We Are', to: '/about',
    children: [
      { label: 'About Ken Brunetto', to: '/about#who-we-are' },
      { label: 'Mission & Vision', to: '/about#mission-vision' },
      { label: 'Core Values', to: '/about#core-values' },
      { label: 'Our Partners', to: '/about#partners' },
    ],
  },
  {
    label: 'What We Do', to: '/solutions',
    children: [
      { label: 'Program Management', to: '/solutions#program-management' },
      { label: 'Software Development', to: '/solutions#software-development' },
      { label: 'Infrastructure & Consulting', to: '/solutions#infrastructure-consulting' },
      { label: 'Past Projects', to: '/solutions#past-projects' },
    ],
  },
  {
    label: 'Careers', to: '/careers',
    children: [
      { label: 'Open Positions', to: '/careers#open-positions' },
      { label: 'Events & Conferences', to: '/careers#events' },
    ],
  },
  {
    label: 'Connect', to: '/connect',
    children: [
      { label: 'Social Media', to: '/connect#social' },
      { label: 'News & Updates', to: '/connect#news' },
    ],
  },
  { label: 'Contact Us', to: '/contact', cta: true },
]

function ChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" className={styles.chevron}>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="3.25" fill="currentColor" />
      <line x1="8.5" y1="1"   x2="8.5" y2="3"   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8.5" y1="14"  x2="8.5" y2="16"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="1"   y1="8.5" x2="3"   y2="8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14"  y1="8.5" x2="16"  y2="8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="3.5" y1="3.5" x2="4.9" y2="4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12.1" y1="12.1" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12.1" y1="4.9" x2="13.5" y2="3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="3.5" y1="13.5" x2="4.9" y2="12.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 10.1A6 6 0 0 1 5.9 2.5a6 6 0 1 0 7.6 7.6z"
        fill="currentColor"
      />
    </svg>
  )
}

function ThemeToggle({ isDark, onToggle, scrolled }) {
  return (
    <button
      className={`${styles.themeToggle} ${scrolled ? styles.themeToggleScrolled : ''}`}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`${styles.iconWrap} ${isDark ? styles.iconVisible : styles.iconHidden}`}>
        <SunIcon />
      </span>
      <span className={`${styles.iconWrap} ${!isDark ? styles.iconVisible : styles.iconHidden}`}>
        <MoonIcon />
      </span>
    </button>
  )
}

export default function Nav({ theme, toggleTheme }) {
  const scrolled = useScrolled(60)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()
  const isDark = theme === 'dark'

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    function onClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDrop(null)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') { setOpenDrop(null); setMobileOpen(false) } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function isActive(item) {
    const path = location.pathname
    if (item.to === '/') return path === '/'
    return path.startsWith(item.to)
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner" ref={navRef}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="KJB Solutions — home">
          {scrolled ? (
            <img
              src={DENSITY_IMAGES.colorLogo.src}
              srcSet={DENSITY_IMAGES.colorLogo.srcSet}
              alt="KJB Solutions"
              width="298"
              height="40"
              decoding="async"
            />
          ) : (
            <img
              src={DENSITY_IMAGES.whiteLogo.src}
              srcSet={DENSITY_IMAGES.whiteLogo.srcSet}
              alt="KJB Solutions"
              height="40"
              decoding="async"
            />
          )}
        </Link>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {NAV.map(item => {
              const isOpen = openDrop === item.label
              const active = isActive(item)
              return (
                <li key={item.label} className={item.children ? styles.hasDrop : ''}>
                  {item.children ? (
                    <button
                      className={`${styles.link} ${isOpen || active ? styles.linkActive : ''}`}
                      onClick={() => setOpenDrop(prev => prev === item.label ? null : item.label)}
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronIcon />
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      className={`${styles.link} ${item.cta ? styles.ctaLink : ''} ${active ? styles.linkActive : ''}`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.children && (
                    <ul className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`} role="menu">
                      {item.children.map(child => (
                        <li key={child.label} role="none">
                          <Link
                            to={child.to}
                            role="menuitem"
                            className={styles.dropLink}
                            onClick={() => setOpenDrop(null)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Theme toggle — always visible */}
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} scrolled={scrolled} />

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
              {item.children ? (
                <>
                  <button
                    className={styles.mobileGroupBtn}
                    onClick={() => setOpenDrop(prev => prev === item.label ? null : item.label)}
                    aria-expanded={openDrop === item.label}
                  >
                    {item.label}
                    <ChevronIcon />
                  </button>
                  {openDrop === item.label && (
                    <ul className={styles.mobileSub}>
                      {item.children.map(child => (
                        <li key={child.label}>
                          <Link
                            to={child.to}
                            className={styles.mobileSubLink}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.to}
                  className={`${styles.mobileLink} ${item.cta ? styles.mobileCta : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          {/* Theme toggle in mobile overlay */}
          <li className={styles.mobileItem}>
            <button
              className={styles.mobileThemeBtn}
              onClick={() => { toggleTheme(); setMobileOpen(false) }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
