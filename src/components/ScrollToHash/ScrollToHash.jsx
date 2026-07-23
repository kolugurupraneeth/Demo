import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { pathname, hash } = useLocation()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    const crossPage = prevPathname.current !== pathname
    prevPathname.current = pathname

    if (hash) {
      const attempt = (tries = 0) => {
        const el = document.querySelector(hash)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 88
          window.scrollTo({ top, behavior: 'smooth' })
        } else if (tries < 15) {
          setTimeout(() => attempt(tries + 1), 80)
        }
      }
      // On cross-page nav, wait for the page-in animation to start
      // before scrolling so the motion feels coordinated
      setTimeout(attempt, crossPage ? 320 : 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
