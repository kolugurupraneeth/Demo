import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Lightbox.module.css'

export default function Lightbox({ photos, activeIndex, direction, onClose, onPrev, onNext }) {
  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, onClose, onPrev, onNext])

  // Lock body scroll while open
  useEffect(() => {
    if (activeIndex !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [activeIndex])

  if (activeIndex === null) return null

  const photo = photos[activeIndex]
  const total = photos.length
  const animClass = direction === 'prev' ? styles.slideFromLeft : styles.slideFromRight

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      {/* Close */}
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close photo viewer">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 3l14 14M17 3L3 17"/>
        </svg>
      </button>

      {/* Prev */}
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous photo"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4l-7 7 7 7"/>
        </svg>
      </button>

      {/* Image */}
      <div className={styles.imgWrap} onClick={(e) => e.stopPropagation()}>
        <img
          key={`${activeIndex}-${direction}`}
          src={photo.src}
          alt={photo.alt}
          className={`${styles.img} ${animClass}`}
          draggable={false}
        />
      </div>

      {/* Next */}
      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next photo"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4l7 7-7 7"/>
        </svg>
      </button>

      {/* Counter + caption */}
      <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.dots}>
          {photos.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => { if (i !== activeIndex) i > activeIndex ? onNext() : onPrev() }}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
        <p className={styles.counter}>{activeIndex + 1} / {total}</p>
        {photo.alt && <p className={styles.caption}>{photo.alt}</p>}
      </div>
    </div>,
    document.body
  )
}
