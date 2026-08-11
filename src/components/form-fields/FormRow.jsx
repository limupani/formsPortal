import styles from './FormFields.module.css'

export default function FormRow({ label, htmlFor, children, width, stacked = false }) {
  const rowClass = stacked ? `${styles.row} ${styles.rowStacked}` : styles.row
  return (
    <div className={rowClass} style={width ? { maxWidth: width } : undefined}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
    </div>
  )
}
