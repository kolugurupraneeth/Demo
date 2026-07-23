import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useScrolled } from '../../hooks/useScrolled'
import styles from './Nav.module.css'
import ASSETS from '../../config/assets'

const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'Who We Are', to: '/about',
    children: [
      { label: 'About Ken Brunetto', to: '/about' },
      { label: 'Mission & Vision', to: '/about#mission-vision' },
      { label: 'Core Values', to: '/about#core-values' },
      { label: 'Our Partners', to: '/about#partners' },
    ],
  },
  {
    label: 'What We Do', to: '/solutions',
    children: [
      { label: 'Program Management', to: '/solutions' },
      { label: 'Software Development', to: '/solutions' },
      { label: 'Infrastructure & Consulting', to: '/solutions' },
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
      { label: 'Social Media', to: '/connect' },
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

export default function Nav() {
  const scrolled = useScrolled(60)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()

  // Close mobile menu on route change; desktop dropdown closes via its own onClick
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenDrop(null)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Close dropdown on Escape
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
          {scrolled
            ? <img src={ASSETS['logo-color.png']} alt="KJB Solutions" height="40" />
            : <img src={ASSETS['logo-white.png']} alt="KJB Solutions" height="40" />
          }
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
        </ul>
      </div>
    </header>
  )
}
