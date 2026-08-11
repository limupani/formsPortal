import styles from './FormFields.module.css'

export default function FileUpload({ id, fileName, onChange }) {
  return (
    <label htmlFor={id} className={styles.uploadBtn}>
      {fileName || 'Upload'} <span aria-hidden="true">⬆</span>
      <input
        id={id}
        type="file"
        className={styles.uploadInput}
        onChange={(e) => onChange?.(e.target.files?.[0] ?? null)}
      />
    </label>
  )
}
