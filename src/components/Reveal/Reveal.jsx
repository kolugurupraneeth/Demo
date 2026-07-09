import { useRef, useEffect, useState } from 'react'
import styles from './Reveal.module.css'

export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
