import { useState, useCallback } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader/PageHeader'
import Reveal from '../components/Reveal/Reveal'
import Lightbox from '../components/Lightbox/Lightbox'
import { AWS_SUMMIT_PHOTOS, FEDTALKS_PHOTOS } from '../config/assets'
import styles from './EventDetailPage.module.css'

const EVENTS = {
  'aws-summit-dc-2026': {
    title: 'AWS Summit Washington, D.C.',
    type: 'Conference',
    year: '2026',
    location: 'Washington, D.C.',
    duration: '2-Day Event',
    body: [
      'Our KJB Solutions team had a fantastic time attending the two-day AWS Summit in Washington, D.C.!',
      'Throughout the event, our team took part in a variety of informative sessions covering the latest advancements in cloud technology, artificial intelligence, cybersecurity, and federal IT modernization. We also had the opportunity to connect with industry leaders, partners, and vendors, gaining valuable insights and building meaningful relationships.',
      'Beyond the learning and networking, the summit was a welcome chance to spend time together as a team, collaborate, and keep investing in the knowledge and connections that help us better serve our clients.',
      'Thank you to Amazon Web Services (AWS) for hosting another outstanding event. We look forward to applying what we learned and continuing to support innovative solutions across the federal space.',
    ],
    photos: [
      { src: AWS_SUMMIT_PHOTOS.keynote,  alt: 'AWS Summit keynote presentation on stage' },
      { src: AWS_SUMMIT_PHOTOS.sign,     alt: 'KJB team members in front of the large AWS letters' },
      { src: AWS_SUMMIT_PHOTOS.rooftop,  alt: 'KJB team on the rooftop terrace overlooking Washington D.C.' },
      { src: AWS_SUMMIT_PHOTOS.floor,    alt: 'AWS Summit exhibition floor' },
      { src: AWS_SUMMIT_PHOTOS.team,     alt: 'KJB Solutions team at the AWS Summit' },
    ],
  },
  'fedtalks-2026': {
    title: 'FedTalks 2026',
    type: 'Conference',
    year: '2026',
    location: 'Washington, D.C.',
    duration: '1-Day Event',
    body: [
      'KJB Solutions attended FedTalks 2026 in Washington, D.C., joining federal leaders, technology innovators, and industry professionals for conversations about the future of government technology.',
      'The event brought together perspectives from across the federal landscape, with discussions centered on AI adoption, legacy modernization, cybersecurity, data infrastructure, and the evolving role of technology in government operations.',
      'A key takeaway was the growing focus on moving beyond AI experimentation and turning emerging technologies into practical solutions that improve agency operations and service delivery.',
      'For KJB, staying connected to these conversations matters. As a government contractor working in technology and middleware, we value the chance to hear directly about agency priorities, understand where the industry is headed, and build relationships with others working toward similar goals.',
      'Thank you to FedScoop for bringing together such a great group of federal and industry leaders!',
    ],
    photos: [
      { src: FEDTALKS_PHOTOS.photo1, alt: 'KJB Solutions team at FedTalks 2026' },
      { src: FEDTALKS_PHOTOS.photo2, alt: 'FedTalks 2026 event in Washington, D.C.' },
    ],
  },
}

export default function EventDetailPage() {
  const { eventSlug } = useParams()
  const event = EVENTS[eventSlug]

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [lightboxDir, setLightboxDir] = useState('next')

  const openAt = (i) => { setLightboxDir('next'); setLightboxIndex(i) }
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const goNext = useCallback(() => {
    setLightboxDir('next')
    setLightboxIndex(i => (i + 1) % event.photos.length)
  }, [event?.photos.length])
  const goPrev = useCallback(() => {
    setLightboxDir('prev')
    setLightboxIndex(i => (i - 1 + event.photos.length) % event.photos.length)
  }, [event?.photos.length])

  if (!event) return <Navigate to="/connect" replace />

  return (
    <>
      <PageHeader
        title={event.title}
        lead={`${event.location} · ${event.year} · ${event.duration}`}
        accent={event.type}
      />

      <section className={`section ${styles.articleSection}`}>
        <div className="container">
          <div className={styles.articleGrid}>

            <Reveal className={styles.articleBody}>
              {event.body.map((para, i) => (
                <p key={i} className={styles.para}>{para}</p>
              ))}
            </Reveal>

            <Reveal delay={150} className={styles.sidebar}>
              <div className={styles.sideCard}>
                <p className={styles.sideLabel}>Event</p>
                <p className={styles.sideValue}>{event.title}</p>
              </div>
              <div className={styles.sideCard}>
                <p className={styles.sideLabel}>Location</p>
                <p className={styles.sideValue}>{event.location}</p>
              </div>
              <div className={styles.sideCard}>
                <p className={styles.sideLabel}>Year</p>
                <p className={styles.sideValue}>{event.year}</p>
              </div>
              <div className={styles.sideCard}>
                <p className={styles.sideLabel}>Type</p>
                <p className={styles.sideValue}>{event.type}</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─── Photo Gallery ─────────────────────────────────────────── */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          <Reveal className={styles.galleryHeader}>
            <div className={styles.galleryRule} aria-hidden="true" />
            <h2 className={styles.galleryHeading}>From the Event</h2>
            <p className={styles.galleryHint}>Click any photo to view full screen</p>
          </Reveal>

          <div className={styles.galleryGrid}>
            {event.photos.length <= 2 ? (
              /* Side-by-side layout for 1–2 photos */
              event.photos.map((photo, i) => (
                <Reveal key={i} delay={i * 80} className={styles.galleryFeatured}>
                  <button
                    className={styles.galleryBtn}
                    onClick={() => openAt(i)}
                    aria-label={`View photo: ${photo.alt}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className={styles.galleryImg}
                      loading="lazy"
                    />
                    <span className={styles.zoomIcon} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M8 3H3v5M17 8V3h-5M3 12v5h5M12 17h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </Reveal>
              ))
            ) : (
              <>
                {/* Featured first photo */}
                <Reveal className={styles.galleryFeatured}>
                  <button
                    className={styles.galleryBtn}
                    onClick={() => openAt(0)}
                    aria-label={`View photo: ${event.photos[0].alt}`}
                  >
                    <img
                      src={event.photos[0].src}
                      alt={event.photos[0].alt}
                      className={styles.galleryImg}
                      loading="lazy"
                    />
                    <span className={styles.zoomIcon} aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M8 3H3v5M17 8V3h-5M3 12v5h5M12 17h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </Reveal>

                {/* 2×2 grid for remaining photos */}
                <div className={styles.galleryQuad}>
                  {event.photos.slice(1).map((photo, i) => (
                    <Reveal key={i} delay={i * 80} className={styles.galleryThumb}>
                      <button
                        className={styles.galleryBtn}
                        onClick={() => openAt(i + 1)}
                        aria-label={`View photo: ${photo.alt}`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className={styles.galleryImg}
                          loading="lazy"
                        />
                        <span className={styles.zoomIcon} aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M8 3H3v5M17 8V3h-5M3 12v5h5M12 17h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </button>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Back nav ──────────────────────────────────────────────── */}
      <section className={`section ${styles.backSection}`}>
        <div className="container">
          <Reveal className={styles.backRow}>
            <Link to="/connect#events" className={styles.backLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Events
            </Link>
          </Reveal>
        </div>
      </section>

      <Lightbox
        photos={event.photos}
        activeIndex={lightboxIndex}
        direction={lightboxDir}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  )
}
