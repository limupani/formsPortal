import styles from './FormListRow.module.css'

export default function FormListRow({ index, title, expiredOn, onClick }) {
  if (expiredOn) {
    return (
      <div className={styles.rowExpired}>
        <span className={styles.index}>{index}.</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.expiredOn}>[{expiredOn}]</span>
      </div>
    )
  }

  return (
    <button type="button" className={styles.row} onClick={onClick}>
      <span className={styles.index}>{index}.</span>
      <span className={styles.title}>{title}</span>
    </button>
  )
}
