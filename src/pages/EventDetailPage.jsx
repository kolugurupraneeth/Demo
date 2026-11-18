import { Link, useParams, Navigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader/PageHeader'
import Reveal from '../components/Reveal/Reveal'
import { AWS_SUMMIT_PHOTOS } from '../config/assets'
import styles from './EventDetailPage.module.css'

const EVENTS = {
  'aws-summit-dc-2025': {
    title: 'AWS Summit Washington, D.C.',
    type: 'Conference',
    year: '2025',
    location: 'Washington, D.C.',
    duration: '2-Day Event',
    tags: [
      '#AWSSummit', '#AWS', '#CloudComputing', '#FederalIT',
      '#GovTech', '#Innovation', '#Cybersecurity',
      '#ArtificialIntelligence', '#KJBSolutions', '#Networking',
    ],
    body: [
      'Our KJB Solutions team had a great time attending the two-day AWS Summit Washington, D.C.!',
      'Throughout the event, our team participated in a variety of informative sessions covering the latest advancements in cloud technology, artificial intelligence, cybersecurity, and federal IT modernization. We also had the opportunity to connect with industry leaders, partners, and vendors, gaining valuable insights and building meaningful relationships.',
      'Beyond the learning and networking, it was a great opportunity to spend time together as a team, collaborate, and continue investing in the knowledge and connections that help us better serve our clients.',
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
}

export default function EventDetailPage() {
  const { eventSlug } = useParams()
  const event = EVENTS[eventSlug]

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

              <div className={styles.tags}>
                {event.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
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
          </Reveal>

          <div className={styles.galleryGrid}>
            {/* Featured first photo — full width */}
            <Reveal className={styles.galleryFeatured}>
              <img
                src={event.photos[0].src}
                alt={event.photos[0].alt}
                className={styles.galleryImg}
                loading="lazy"
              />
            </Reveal>

            {/* 2×2 grid for the remaining 4 */}
            <div className={styles.galleryQuad}>
              {event.photos.slice(1).map((photo, i) => (
                <Reveal key={i} delay={i * 80} className={styles.galleryThumb}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className={styles.galleryImg}
                    loading="lazy"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Back nav ──────────────────────────────────────────────── */}
      <section className={`section ${styles.backSection}`}>
        <div className="container">
          <Reveal className={styles.backRow}>
            <Link to="/connect" className={styles.backLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Connect
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
