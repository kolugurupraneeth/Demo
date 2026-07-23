import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const attempt = (tries = 0) => {
        const el = document.querySelector(hash)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 88
          window.scrollTo({ top, behavior: 'smooth' })
        } else if (tries < 8) {
          setTimeout(() => attempt(tries + 1), 80)
        }
      }
      attempt()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
