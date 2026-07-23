import styles from './PageHeader.module.css'

export default function PageHeader({ title, lead, accent }) {
  return (
    <section className={styles.header} aria-label={`${title} page header`}>
      <div className="container">
        <div className={styles.inner}>
          {accent && <span className={styles.accent}>{accent}</span>}
          <div className={styles.rule} aria-hidden="true" />
          <h1 className={styles.title}>{title}</h1>
          {lead && <p className={styles.lead}>{lead}</p>}
        </div>
      </div>
    </section>
  )
}
