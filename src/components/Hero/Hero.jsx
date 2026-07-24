import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'
import { HERO_IMAGES } from '../../config/assets'

const SLIDES = [
  {
    image: HERO_IMAGES.hero1,
    tag: 'Veteran-Owned · Federal IT',
    heading: 'Choose KJB for Your SDLC',
    sub: 'A veteran-owned small business delivering complete software development lifecycle solutions to the federal government.',
    ctas: [
      { label: 'Who We Are', to: '/about', primary: true },
      { label: 'Our Solutions', to: '/solutions' },
    ],
  },
  {
    image: HERO_IMAGES.hero2,
    tag: 'Client Confidence',
    heading: 'Our Clients Say It Best',
    sub: "We understand and support our clients' needs for custom, mission-critical federal IT solutions built on decades of field experience.",
    ctas: [
      { label: 'Our Solutions', to: '/solutions', primary: true },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    image: HERO_IMAGES.hero3,
    tag: 'Serving Veterans',
    heading: 'Making a Difference for Veterans',
    sub: "KJB develops, sustains, and provides production operation support for systems that deliver veteran health and benefits — because we're veterans too.",
    ctas: [
      { label: 'Our Mission', to: '/about#mission-vision', primary: true },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    image: HERO_IMAGES.hero4,
    tag: 'Ready to Serve',
    heading: 'KJB Is Ready to Serve You',
    sub: 'End-to-end solutions for program management, software development, and infrastructure consulting — tailored to federal agency requirements.',
    ctas: [
      { label: 'Get Started', to: '/contact', primary: true },
      { label: 'Our Solutions', to: '/solutions' },
    ],
  },
]

const INTERVAL = 5500

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [next, paused])

  const goTo = (i) => {
    setCurrent(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  return (
    <section className={styles.hero} aria-label="Hero slideshow">

      {/* Background slides */}
      <div className={styles.slides} aria-hidden="true">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
          >
            <picture className={styles.slideMedia}>
              <source type="image/avif" srcSet={slide.image.avifSrcSet} sizes={slide.image.sizes} />
              <source type="image/webp" srcSet={slide.image.webpSrcSet} sizes={slide.image.sizes} />
              <img
                src={slide.image.src}
                srcSet={slide.image.srcSet}
                sizes={slide.image.sizes}
                alt=""
                className={styles.slideImage}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </picture>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className={styles.contentWrap}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.content} ${i === current ? styles.contentActive : ''}`}
            aria-hidden={i !== current}
          >
            <div className="container">
              <p className={styles.tag}>
                <span className={styles.tagBar} aria-hidden="true" />
                {slide.tag}
              </p>
              <h1 className={styles.heading}>{slide.heading}</h1>
              <p className={styles.sub}>{slide.sub}</p>
              <div className={styles.actions}>
                {slide.ctas.map(cta => (
                  <Link
                    key={cta.label}
                    to={cta.to}
                    className={`btn ${cta.primary ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {cta.label}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${slide.heading}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollText}>scroll</span>
        <span className={styles.scrollLine} />
      </div>

      {/* Crimson accent */}
      <div className={styles.accentLine} aria-hidden="true" />
    </section>
  )
}
