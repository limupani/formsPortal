import styles from './FormFields.module.css'

export default function SectionWrapper({ title, children }) {
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </section>
  )
}
