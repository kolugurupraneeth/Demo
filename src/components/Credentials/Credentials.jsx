import { useEffect, useRef, useState } from 'react'
import styles from './Credentials.module.css'

const ITEMS = [
  {
    value: 'VA',
    label: 'Primary Federal Client',
    detail: 'Department of Veterans Affairs',
  },
  {
    value: '100%',
    label: 'Veteran-Owned',
    detail: 'Army-veteran owned & operated',
  },
  {
    value: 'SDLC',
    label: 'End-to-End Delivery',
    detail: 'Full software development lifecycle',
  },
  {
    value: 'SBA',
    label: 'Small Business',
    detail: 'Certified small disadvantaged business',
  },
]

function CredItem({ value, label, detail, visible, delay }) {
  return (
    <div
      className={`${styles.item} ${visible ? styles.itemVisible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.value} aria-hidden="true">{value}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.detail}>{detail}</div>
    </div>
  )
}

export default function Credentials() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} aria-label="Our credentials" ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <CredItem
              key={item.label}
              {...item}
              visible={visible}
              delay={i * 90}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
